# Joxo plugin for Claude Code and Codex

[Joxo](https://joxo.ai) puts a team's coding agents in one shared project. Every agent reads the
same decisions, the team works from one task board, and handoffs carry the branch and commit. Each
person keeps their own plan.

This plugin adds three things:

- the `joxo` skill, the same document your agent reads when you paste
  "Read https://joxo.ai/skill.md and follow it to set up Joxo in this project.";
- Joxo's live channel for Claude Code: teammates' messages, handoffs, decisions and blockers for
  your computer arrive in your open session as they happen, even while it sits idle;
- a live view of your team, a Claude Code mod: a quiet line above the prompt, a `/team` pane and
  toasts. Claude Code 2.1.287 or later; older versions load the plugin and ignore it. See
  [The live view](#the-live-view-a-claude-code-mod).

## Install

Claude Code:

```sh
claude plugin marketplace add JoxoAI/joxo
claude plugin install joxo@joxo
```

In a session, on Claude Code 2.1.275 or later: `/plugin install joxo --marketplace JoxoAI/joxo`.
Joxo's setup adds it for you wherever Claude Code is installed, and says so in one line. To turn it
off, ask your agent to run `joxo setup --no-claude-plugin`: it is removed and not added again. A plugin
installed while Claude Code is open shows after `/reload-plugins` or at the next start.

Codex:

```sh
codex plugin marketplace add JoxoAI/joxo
codex plugin add joxo@joxo
```

## Use

Ask your agent to "set up Joxo in this project", or run `/joxo:joxo`. To join a teammate's
project, give your agent the invitation link they sent you. Once the folder is connected, the
agent asks how you want to link your iPhone and offers the code: `joxo phone` opens it in your
browser, and one scan with the Joxo app signs the phone in.

Start Claude Code in the project folder with `joxo claude`: teammates' messages and tasks arrive
live, and an idle session wakes when work arrives. `joxo claude-default on` makes `claude` start that
way in Joxo folders (one marked block in your shell's startup file; `joxo claude-default off` removes
it). `joxo claude` names the plugin's channel for you:

```sh
claude --dangerously-load-development-channels plugin:joxo@joxo
```

Claude Code shows a warning once per launch while the channel waits for Anthropic's channel
allowlist. If your company approves the plugin in its Claude Code managed settings, the channel
runs with no warning:

```sh
claude --channels plugin:joxo@joxo
```

The settings to add are at [joxo.ai/security](https://joxo.ai/security).

## The live view (a Claude Code mod)

Claude Code 2.1.287 added mods: plugins that draw inside Claude Code. This plugin's mod shows your
team where you already look, and only inside a folder that is paired with a Joxo project. Anywhere
else it draws nothing.

- **A quiet line above the prompt**, only when there is something to say:
  `Joxo Launch · ● Hussain working · ● Sara waiting · 2 tasks claimed · 1 for you`. A green dot is a
  teammate whose agent is working, an amber dot is an agent waiting on a person. `Hide` puts it away
  until something changes.
- **`/team`**, or the `Open` button, opens a pane: each teammate with their computers and agent
  sessions (working, waiting, idle) and what they are on; the board with who holds each task and a
  `Take` button that claims it for you; the latest messages, decisions and handoffs; the usage left
  on this computer's Claude accounts; how to invite someone; and `Open on web`.
- **Toasts** when a message or handoff for your team arrives, once each, and none during your quiet
  hours.
- **A small status entry**, `Joxo ● 3`: how many teammates are on, and how many things are new.

It draws in the terminal and in the Code tab of the Claude desktop app (avatars and status dots
there, glyphs in the terminal). Where nothing draws (the VS Code panel, `claude -p`), `/team` prints
the same picture as text.

### What the mod can and cannot do

A mod is code that runs inside Claude Code with your permissions. It is not sandboxed. Claude's own
documentation says so, and says a mod can read your API keys. This one is built to be small enough to
check, and to need none of that:

- It runs three commands, with no shell, and never looks `joxo` up by name (a repository could put
  another program of that name first in your PATH): `joxo pulse --json` (a read), `joxo task claim <id>`
  (only when you press **Take**) and `joxo open` (only when you press **Open on web**). `joxo setup`
  records the absolute paths of node and of `joxo.mjs` in this plugin's two options (`nodePath`,
  `joxoPath`, plain paths, nothing secret). The mod runs `[nodePath, joxoPath, …]` from the folder
  `joxo.mjs` is in and names your project with `--dir`. Until those options are set it runs nothing, and
  the pane asks you to have your agent run `joxo setup`. Everything it shows comes from `joxo pulse`.
- `joxo pulse` acknowledges nothing, so looking never uses up a message your agent has not read yet. It
  refreshes the roster the way `joxo sync` does, so like `joxo sync` it records what arrived in the
  project's `.joxo` state and `JOXO_CONTEXT.md` (only when they changed), and it may send what was
  already queued on this computer (a pending acknowledgment or outbox item) along with that refresh.
  Sessions share one refresh: a look within 25 seconds of the last one makes no relay call at all.
- When you press **Copy invite command** it puts one fixed line, `joxo invite --email `, on your
  clipboard. That is the only thing it ever copies.
- The mod itself never reads credentials, tokens, the keychain, environment variables or settings, and
  it calls no network API: only the `joxo` command talks to Joxo. The mod itself reads no files and
  writes none except its own small store (the ids of messages it already toasted). The `joxo pulse`
  command it runs does write the state files described above.
- Nothing a teammate writes is run, followed or added to your prompt. Names, task titles and messages
  are drawn as plain text: control characters, hidden tag characters, text-direction overrides and
  invisible fillers are removed and look-alike forms are folded to plain ones. A sender's name is drawn
  alone in one fixed style, and one that could pass for Joxo or Claude is marked as a teammate's. The mod
  never touches the prompt, the system prompt, the conversation or a tool call.
- It looks about every 30 seconds while you work, every few minutes when you are idle, backs off when
  Joxo is unreachable, and in a folder where Joxo is not set up (or `joxo` is not installed) it looks
  twice an hour and shows nothing, not even a status entry. Toasts are limited to three in five minutes
  and one per sender.

You do not have to trust this description. In a checkout of this plugin, run:

```sh
claude plugin validate .
```

and read the `calls:` line. It lists every call the mod makes to Claude Code, and it is short:

```text
$.clock.after, $.clock.now, $.command.register, $.process.run, $.session.cwd, $.session.surfaces,
$.store.get, $.store.set, $.ui.close, $.ui.copy, $.ui.invalidate, $.ui.open, $.ui.resolve,
$.ui.status, $.ui.toast
```

There is no `$.fs`, `$.env`, `$.http`, `$.settings`, `$.mcp` or `$.prompt` in it. The tests in
`tests/` (`claude plugin test .`) check the same things, and a test in Joxo's own repository fails if
the list ever grows.

To turn the mod off, set `"disableAllHooks": true` in `~/.claude/settings.json`. Claude Code's
documentation says that stops every installed mod while the plugin stays installed and its skills and MCP
servers keep loading (so the setup skill and the channel stay). `--safe-mode` also stops mods, but it
disables your other customizations too, including this plugin's skill and channel, for that session.
Mods need Claude Code 2.1.287 or later (2.1.286 also loads them; 2.1.285 and earlier only with the early-access
flag, and ignore them otherwise); Claude Code older than that loads the rest of the plugin and ignores the mod.

The mod shows your usage for each Claude account because Joxo already knows it. It is the same
figure `joxo status` prints. It is never sent anywhere by the mod.

## What the hook does

The plugin has one hooks module, `hooks/hooks.json`, which loads `./register.tsx`. It is the
live view described above and does nothing else: a line above the prompt (the band), the `/team`
pane, and toasts for new messages and handoffs. It runs only inside a folder paired with a Joxo
project, reads nothing but what `joxo pulse --json` prints, and changes no file of yours. The
`hooks` list in `hooks.json` is empty on purpose: it runs no command on your prompts, tool calls or
sessions.

## Programs it runs

- **The Joxo app's own command**, by absolute path, through the `node` that Joxo's setup recorded
  (`nodePath`, `joxoPath`). Nothing is found through PATH. The mod runs it with no shell, in the
  three fixed forms listed below. The channel entry runs it as
  `<nodePath> <joxoPath> mcp --if-paired --channel-only`, with `JOXO_NO_TELEMETRY=1` in its environment.
- **What that command may start, because Joxo needs it**: `git` (to read the branch and latest commit
  for handoffs, and to receive a project's repository into an empty folder when you join one);
  your agent programs (`claude`, `codex`) when you have turned on listening or ask Joxo to start an
  agent; the GitHub command line (`gh`) only for GitHub steps you ask for; and your operating
  system's own tools to open a browser or check which of your agent processes are running. The plugin
  itself starts none of these.
- Nothing is downloaded or installed by the plugin. Joxo's setup (which you ask for) downloads the Joxo
  app from joxo.ai.

## What it sends and where

The plugin has no network access of its own. The Joxo command it runs talks to the Joxo relay at
`joxo.ai` (and nowhere else on the plugin's behalf), and sends only what your project shares on
purpose: tasks, messages, decisions, handoffs and blockers; presence (which of your agent sessions
are working or waiting); computer names, installed agents and a usage summary so teammates can see
who has room. Your prompts, transcripts, code and provider credentials are not sent. The details are
at [joxo.ai/privacy](https://joxo.ai/privacy).

**Usage counts and crash reports are off in the plugin.** The channel entry sets
`JOXO_NO_TELEMETRY=1`, which stops Joxo's usage counts and automatic crash reports for that
process and deletes anything queued. (If you use Joxo outside the plugin, the setting and
`joxo control telemetry off` are yours to choose.)

## The exact commands the mod runs

Fixed text, no shell, each preceded by `<nodePath> <joxoPath>` and followed by `--dir <your project folder>`:

```text
pulse --json
task claim <task id>
open
```

`pulse --json` is the read. `task claim` runs only when you press **Take**, and `open` only when you
press **Open on web**. The mod calls Claude Code's `$.process.run` for these and for nothing else.

## What installing it does

Installing the plugin copies the skill, one MCP server entry and one small mod from this
repository. The entry runs `joxo mcp --if-paired --channel-only` through the `joxo.mjs` that Joxo's
setup put on your computer, by absolute path: `joxo setup` records the paths of node and of `joxo.mjs`
in this plugin's two options (`nodePath`, `joxoPath`), and the entry is `${user_config.nodePath}
${user_config.joxoPath} mcp …`. It is never found through PATH, so a repository's `node_modules/.bin`,
a `.` in PATH or a direnv cannot put its own `joxo` in the way. Until setup has recorded the paths the
entry starts nothing (Claude Code lists the server as one that could not start; run `joxo setup`). **Install Joxo first**: this plugin connects Claude Code to the Joxo app you installed, and contains no Joxo program of its own. The mod (the files in
`hooks/`) is about 900 lines of TypeScript that you can read in full, and it is described below.

That entry does something only when Joxo is installed, the folder you opened is paired with a Joxo
project, and you started Claude Code with Joxo's channel. In every other session it offers no
tools, adds nothing to what your agent reads, and contacts nobody. (The mod is separate; it is
described next.) Joxo's tools come from the
project's own settings, so they are never listed twice. Until Joxo is installed, Claude Code lists
the entry as a server that could not start; setup fixes that.

The skill does nothing until you ask your agent to set up or join Joxo. Setup then does exactly
what the pasted prompt does: it checks Node.js and, when it is missing or too old, installs the
current LTS and says which command it runs (never with sudo), downloads the connector from
joxo.ai, signs you in with one approval in your browser, and pairs this folder. When you join a
project whose code is on GitHub, an empty folder first receives that repository, if git on this
computer can fetch it. Pairing adds Joxo's MCP server and hooks to that folder's agent settings
(for Claude Code, `.mcp.json` and `.claude/settings.local.json`). `joxo disconnect` detaches the
project, revokes this computer and removes what pairing wrote.

Joxo sees what your agent publishes on purpose (handoffs, decisions, blockers, tasks and
messages), plus computer names, installed agents and a capacity summary. A paired phone and shared
folders add to that only when you turn them on. Joxo never reads your prompts, transcripts,
repository or provider credentials. The full list is at [joxo.ai/privacy](https://joxo.ai/privacy),
and how it is kept safe at [joxo.ai/security](https://joxo.ai/security).

The skill is generated from https://joxo.ai/skill.md, so it changes when setup changes.
`claude plugin update joxo@joxo` or `codex plugin marketplace upgrade` fetches the latest copy.

Pricing, trial and terms: [joxo.ai/pricing](https://joxo.ai/pricing). Privacy:
[joxo.ai/privacy](https://joxo.ai/privacy). Support: support@joxo.ai.
