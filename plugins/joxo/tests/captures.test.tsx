import { expect, mock, test } from 'claude-code/testing'
import type { Engine } from 'claude-code/testing'

import { NOW_MS, SETUP, TEAM, json } from './fixtures.ts'
import { textOf } from './render-text.ts'

/**
 * Text captures of what the mod draws, laid out the way a terminal would (no color). They print
 * between `=== capture <name> ===` markers so a run can be saved: claude plugin test . | tee run.txt
 */
/** The test environment has no console type of its own; its output is what `claude plugin test` prints. */
declare const console: { log: (...args: unknown[]) => void }

const BAND = { hasSurvey: false, isWorking: false, maxRows: 4, bodyColumns: 110, scroll: { offset: 0, bodyRows: 4 }, view: {} }
const PANE = { title: 'Joxo', isFocused: true, bodyColumns: 100, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} } as const

test('captures: band and pane on the terminal and in the desktop app', { options: SETUP }, async ($: Engine, on) => {
  mock.clock(on, { now: NOW_MS })
  mock.store(on, {})
  on('session.cwd', () => ({ value: '/work/launch' }))
  on('session.surfaces', () => ({ value: [] }))
  on('process.run', () => ({ value: { exitCode: 0, stdout: json(TEAM), stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }))
  await $.command.run({ command: 'team', args: '' } as Parameters<Engine['command']['run']>[0])
  for (const surface of ['terminal', 'desktop'] as const) {
    const band = await $.ui.mount({ plugin: 'joxo', surface, component: 'AbovePrompt', props: BAND })
    const pane = await $.ui.mount({ plugin: 'joxo', surface, component: 'Pane', props: PANE, requestId: 'joxo' })
    console.log(`=== capture band-${surface} ===\n${textOf(await band.drawn())}\n=== end ===`)
    console.log(`=== capture pane-${surface} ===\n${textOf(await pane.drawn())}\n=== end ===`)
    await band.unmount()
    await pane.unmount()
  }
  expect(true).toBe(true)
})
