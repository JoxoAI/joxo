# Joxo plugin for Claude Code and Codex

[Joxo](https://joxo.ai) puts a team's coding agents in one shared project. Every agent reads the
same decisions, the team works from one task board, and handoffs carry the branch and commit. Each
person keeps their own plan.

This plugin adds two things:

- the `joxo` skill, the same document your agent reads when you paste
  "Read https://joxo.ai/skill.md and follow it to set up Joxo in this project.";
- Joxo's live channel for Claude Code: teammates' messages, handoffs, decisions and blockers for
  your computer arrive in your open session as they happen, even while it sits idle.

## Install

Claude Code:

```sh
claude plugin marketplace add JoxoAI/joxo
claude plugin install joxo@joxo
```

In a session, on Claude Code 2.1.275 or later: `/plugin install joxo --marketplace JoxoAI/joxo`.
Once Joxo is set up, `joxo setup` in a terminal also offers to install it for you.

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

## What installing it does

Installing the plugin copies the skill and one MCP server entry from this repository. The entry
runs `joxo mcp --if-paired --channel-only`: the `joxo` command that Joxo's setup puts on your
computer. The plugin contains no Joxo program of its own and no hooks.

That entry does something only when Joxo is installed, the folder you opened is paired with a Joxo
project, and you started Claude Code with Joxo's channel. In every other session it offers no
tools, adds nothing to what your agent reads, and contacts nobody. Joxo's tools come from the
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
