/**
 * Joxo's live view for Claude Code: a quiet band above the prompt, a pane (`/team`), toasts for
 * what is addressed to this computer, and a small status entry.
 *
 * What this mod does, all of it:
 *  - runs `joxo pulse --json`, `joxo task claim <id>` (only when a person presses Take) and
 *    `joxo open` (only when a person presses Open on web) through $.process.run. The command is never
 *    looked up by name: `joxo setup` records the absolute paths of node and of joxo.mjs in this plugin's
 *    options (nodePath, joxoPath), the mod runs [nodePath, joxoPath, …] from the folder joxo.mjs is in,
 *    and names the project folder with --dir. A folder's node_modules/.bin, a `.` in PATH or a direnv
 *    therefore cannot put another `joxo` in the way. Without those options the mod runs nothing. `joxo pulse` is read-only: it refreshes the roster the way `joxo sync` does and
 *    acknowledges nothing, so reading it never uses up a teammate's message the agent has not seen.
 *  - draws and toasts what it read, as text.
 *  - remembers which messages it already toasted, in its own $.store.
 *
 * What it never does: read a credential, token, keychain item or environment variable; touch the
 * network (only the joxo command talks to Joxo); write a file outside its own store; add anything
 * to the model's prompt or to a tool call; intercept tool calls. validate lists every call it
 * makes, and that list is short on purpose (see README.md).
 */
import type { EngineInterface, Register, UiPressArgument } from 'claude-code'

import { bandGroups, commandFrom, fitGroups, hasNews, isAbsolute, nextDelayMs, paneModel, parsePulse, pickToasts, plain, signature, statusText, summaryLines } from './model.ts'
import type { Reading } from './model.ts'
import { bandView, emptyPaneView, paneView } from './views.tsx'
import type { Actions } from './views.tsx'

const PANE = 'joxo'
const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/

// Module state. A hot reload loses it, and the next look refills it.
let reading: Reading | null = null
let failures = 0
let lastLookAt = 0
let lastActivityAt = 0
let inFlight: Promise<void> | null = null
let hiddenAt: string | null = null
let folder: string | null = null
let toastLog: number[] = []
let timer: { cancel: () => void } | null = null
/** Where joxo is, from the plugin's options; null until `joxo setup` has recorded it. */
let joxo: { argv: readonly string[]; home: string } | null = null

/** Run joxo from its own folder, never from the project's, and name the project with --dir. */
async function runJoxo($: EngineInterface, args: readonly string[], dir: string | null, timeoutMs: number) {
  if (joxo === null) return null
  const where = dir !== null && isAbsolute(dir) ? ['--dir', dir] : []
  return $.process.run([...joxo.argv, ...args, ...where], { cwd: joxo.home, timeoutMs }).catch(() => null)
}

/** Hold the last good picture when a look fails, marked as stale rather than dropped. */
function afterFailure(previous: Reading | null, reason: string): Reading {
  if (previous?.kind === 'ok') return { kind: 'ok', pulse: { ...previous.pulse, isStale: true } }
  return { kind: 'error', reason }
}

/**
 * One read of the project at a time. A caller that arrives while one is running gets that one's
 * promise, so `/team` waits for the read the session start began instead of answering from nothing
 * ("nothing read yet") when the machine is busy and that first read is still going.
 */
function look($: EngineInterface): Promise<void> {
  if (inFlight !== null) return inFlight
  const running = lookOnce($).finally(() => { if (inFlight === running) inFlight = null })
  inFlight = running
  return running
}

/** One read of the project, then the toasts, the status entry and the next look. */
async function lookOnce($: EngineInterface): Promise<void> {
  let isDormant = false
  try {
    const cwd = await $.session.cwd()
    // No recorded joxo, a joxo that is not installed, a folder that is not paired: nothing to show, and
    // nothing to say about it (no status entry, no "offline") in folders that have nothing to do with Joxo.
    const ran = await runJoxo($, ['pulse', '--json'], cwd, 25_000)
    lastLookAt = await $.clock.now()
    if (joxo === null) {
      reading = { kind: 'error', reason: 'one step left: ask your agent to run joxo setup, so this panel knows where joxo is' }
      isDormant = true
    } else if (ran === null || ran.exitCode === 127 || ran.exitCode === 126) {
      reading = reading?.kind === 'ok' ? afterFailure(reading, '') : { kind: 'error', reason: 'the joxo command could not be started' }
      isDormant = reading.kind !== 'ok'
      failures += 1
    } else if (ran.exitCode !== 0) {
      failures += 1
      reading = afterFailure(reading, 'joxo could not read the project')
    } else {
      const parsed = parsePulse(ran.stdout)
      if (parsed.kind === 'error') {
        failures += 1
        reading = afterFailure(reading, parsed.reason)
      } else {
        failures = 0
        reading = parsed
        isDormant = parsed.kind === 'unpaired'
        if (parsed.kind === 'ok') {
          folder = parsed.pulse.folder
          const key = `seen:${parsed.pulse.project}`
          const stored = await $.store.get(key)
          const known = Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : []
          const picked = pickToasts(parsed.pulse, known, { isFirst: stored === undefined, now: lastLookAt, recent: toastLog })
          toastLog = picked.log
          if (stored === undefined || picked.seen.length !== known.length) await $.store.set(key, picked.seen)
          for (const line of picked.toasts) $.ui.toast(line, { timeoutMs: 6000 })
        }
      }
    }
    $.ui.status(isDormant ? undefined : statusText(reading))
    $.ui.invalidate('ui.render')
  } finally {
    timer?.cancel()
    timer = $.clock.after(nextDelayMs({ now: await $.clock.now(), lastActivityAt, failures, isDormant }), () => { void look($) })
  }
}

async function takeTask($: EngineInterface, id: string): Promise<void> {
  if (!SAFE_ID.test(id)) return
  const title = reading?.kind === 'ok' ? reading.pulse.tasks.find(t => t.id === id)?.title : undefined
  const ran = await runJoxo($, ['task', 'claim', id], folder, 30_000)
  if (ran !== null && ran.exitCode === 0) $.ui.toast(`Taken: ${plain(title ?? 'the task', 60)}. It is yours now.`)
  else $.ui.toast(plain(ran?.stderr || ran?.stdout || 'Could not take it right now.', 120) || 'Could not take it right now.')
  await look($)
}

async function openOnWeb($: EngineInterface): Promise<void> {
  const ran = await runJoxo($, ['open'], folder, 30_000)
  $.ui.toast(ran !== null && ran.exitCode === 0 ? 'Opening Joxo in your browser.' : 'Could not open Joxo in the browser.')
}

function makeActions($: EngineInterface): Actions {
  return {
    take: id => { void takeTask($, id) },
    invite: (press: UiPressArgument) => {
      void $.ui.copy({ text: 'joxo invite --email ', surface: press.surface })
      $.ui.toast('Copied. Add their email, or just tell your agent who to invite.')
    },
    openWeb: () => { void openOnWeb($) },
    refresh: () => { void look($) },
    close: () => { void $.ui.close({ id: PANE }) },
    hide: () => {
      hiddenAt = reading?.kind === 'ok' ? signature(reading.pulse) : null
      $.ui.invalidate('ui.render')
    },
    open: () => { void $.ui.open({ id: PANE, title: 'Joxo', focus: true, closeOnEscape: true }) },
  }
}

/** What to say in a pane that has no picture to draw yet. */
function emptyMessage(): string {
  if (joxo === null) return 'One step left: ask your agent to run joxo setup here. It records where joxo is, so this panel never has to look it up.'
  if (reading === null) return 'Reading your project…'
  if (reading.kind === 'unpaired') return 'This folder is not connected to a Joxo project. Ask your agent to “set up Joxo”.'
  if (reading.kind === 'error') return `Joxo is not reachable from here (${reading.reason}).`
  return ''
}

export const register: Register = (on, options) => {
  joxo = commandFrom(options)
  on('session.start', async ($, e, next) => {
    // Not `joxo`: that name is the plugin's own (/joxo:joxo, the setup skill) and Claude Code refuses it.
    await $.command.register({
      name: 'team',
      description: 'Joxo: who is on, who has which task, and what was said',
      immediate: true,
    })
    lastActivityAt = await $.clock.now()
    $.clock.after(50, () => { void look($) })
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    lastActivityAt = await $.clock.now()
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const now = await $.clock.now()
    lastActivityAt = now
    if (now - lastLookAt > 20_000) $.clock.after(50, () => { void look($) })
    return next(e)
  })

  on('command.run', { command: 'team' }, async $ => {
    const surfaces = await $.session.surfaces()
    if (surfaces.some(s => s === 'terminal' || s === 'desktop')) {
      const opened = await $.ui.open({ id: PANE, title: 'Joxo', focus: true, closeOnEscape: true })
      $.clock.after(50, () => { void look($) })
      if (opened.isPlaced) return {}
    }
    await look($)
    const now = await $.clock.now()
    return { text: summaryLines(reading ?? { kind: 'error', reason: 'nothing read yet' }, now).join('\n') }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey || reading?.kind !== 'ok' || !hasNews(reading.pulse) || signature(reading.pulse) === hiddenAt) return next(e)
    const groups = fitGroups(bandGroups(reading.pulse), Math.max(24, e.props.bodyColumns - 20))
    return bandView($.ui.resolve(e), groups, makeActions($))
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const kit = $.ui.resolve(e)
    const actions = makeActions($)
    if (reading?.kind !== 'ok') return emptyPaneView(kit, emptyMessage(), actions)
    const now = await $.clock.now()
    return paneView(kit, paneModel(reading.pulse, now, now - lastLookAt + (reading.pulse.syncAgeMs ?? 0)), actions)
  })
}
