/** What `joxo pulse --json` answers for a small team, as a fake CLI would print it. Never a real project. */
const NOW = Date.parse('2026-10-03T10:00:00Z')
const minutesAgo = (n: number) => new Date(NOW - n * 60_000).toISOString()

export const TEAM = {
  version: 1,
  paired: true,
  at: new Date(NOW).toISOString(),
  stale: false,
  last_sync_age_ms: 4000,
  quiet_hours: false,
  project: { name: 'Launch' },
  folder: '/work/launch',
  this_computer: { device_id: 'dev-me', name: 'Studio', sessions: [{ agent: 'claude-code', folder: 'launch', name: null, state: 'active', attention: null, last_active_at: minutesAgo(1) }] },
  unread: 1,
  peers: [
    { device_id: 'dev-hussain', name: 'MacBook', owner: 'Hussain', online: true, agents: ['claude-code'], working_on: 'Ship auth', last_seen: minutesAgo(0), sessions: [
      { agent: 'claude-code', folder: 'launch', name: null, state: 'active', attention: null, last_active_at: minutesAgo(1) },
      { agent: 'codex', folder: 'docs', name: null, state: 'idle', attention: null, last_active_at: minutesAgo(12) },
    ] },
    { device_id: 'dev-sara', name: 'ThinkPad', owner: 'Sara', online: true, agents: ['claude-code'], working_on: null, last_seen: minutesAgo(0), sessions: [
      { agent: 'claude-code', folder: 'site', name: 'Pricing page', state: 'active', attention: 'question', last_active_at: minutesAgo(2) },
    ] },
    { device_id: 'dev-aziz', name: 'Aziz Mac', owner: 'Aziz', online: false, agents: ['claude-code'], working_on: null, last_seen: minutesAgo(180), sessions: 'hidden' },
  ],
  tasks: [
    { id: 'task-aaaa1111', title: 'Fix billing webhook', status: 'in_progress', owner_name: 'Mahmoud', owner_device_id: 'dev-me', mine: true, lease_expired: false },
    { id: 'task-bbbb2222', title: 'Ship auth', status: 'in_progress', owner_name: 'Hussain', owner_device_id: 'dev-hussain', mine: false, lease_expired: false },
    { id: 'task-cccc3333', title: 'Write the docs page', status: 'open', owner_name: null, owner_device_id: null, mine: false, lease_expired: false },
    { id: 'task-dddd4444', title: 'Old onboarding copy', status: 'in_progress', owner_name: 'Aziz', owner_device_id: 'dev-aziz', mine: false, lease_expired: true },
  ],
  tasks_done: 7,
  events: [
    { id: 'ev-3', seq: 12, kind: 'handoff', from: 'Hussain', at: minutesAgo(3), body: 'Auth is done. Branch joxo/bbbb2222-auth at 4f2a9c1, tests green.', unread: true, to_this_computer: true, from_owner: false },
    { id: 'ev-2', seq: 11, kind: 'decision', from: 'Mahmoud', at: minutesAgo(40), body: 'Sign-in stays Apple and GitHub only.', unread: false, to_this_computer: false, from_owner: false },
    { id: 'ev-1', seq: 10, kind: 'message', from: 'Sara', at: minutesAgo(95), body: 'Pricing copy is in the doc, can someone check the numbers?', unread: false, to_this_computer: false, from_owner: false },
  ],
  accounts: [{ label: 'max2', windows: [{ name: 'weekly', left_percent: 62, resets_at: new Date(NOW + 2 * 86_400_000).toISOString() }, { name: '5-hour', left_percent: 18, resets_at: new Date(NOW + 3600_000).toISOString() }], updated_at: minutesAgo(1) }],
  plan: 'Max 20x',
}

export const NOW_MS = NOW
export const json = (value: unknown) => JSON.stringify(value)

/** What `joxo setup` records in the plugin's options. */
export const SETUP = { nodePath: '/opt/node/bin/node', joxoPath: '/home/me/.joxo/bin/joxo.mjs' }
