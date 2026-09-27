# Joxo plugin for Claude Code and Codex

[Joxo](https://joxo.ai) puts a team's coding agents in one shared project. Every agent reads the
same decisions, the team works from one task board, and handoffs carry the branch and commit. Each
person keeps their own plan.

This plugin adds one skill, `joxo`. It's the same document your agent reads when you paste
"Read https://joxo.ai/skill.md and follow it to set up Joxo in this project."

## Install

Claude Code:

```sh
claude plugin marketplace add JoxoAI/joxo
claude plugin install joxo@joxo
```

In a session, on Claude Code 2.1.275 or later: `/plugin install joxo --marketplace JoxoAI/joxo`.

Codex:

```sh
codex plugin marketplace add JoxoAI/joxo
codex plugin add joxo@joxo
```

## Use

Ask your agent to "set up Joxo in this project", or run `/joxo:joxo`. To join a teammate's
project, give your agent the invitation link they sent you.

## What installing it does

Installing the plugin copies the skill from this repository and nothing else: no hooks, no MCP
server, no background process. Nothing runs, and nothing contacts joxo.ai, until you ask your agent
to set up or join Joxo. Setup then does exactly what the pasted prompt does: it checks Node.js and,
when it is missing or too old, installs the current LTS and says which command it runs (never with
sudo), downloads the connector from joxo.ai, signs you in with one approval in your browser, and
pairs this folder. When you join a project whose code is on GitHub, an empty folder first receives
that repository, if git on this computer can fetch it. Pairing adds Joxo's MCP server and hooks to
that folder's agent settings (for Claude Code, `.mcp.json` and `.claude/settings.local.json`).
`joxo disconnect` detaches the project, revokes this computer and removes what pairing wrote.

Joxo sees what your agent publishes on purpose (handoffs, decisions, blockers, tasks and
messages), plus computer names, installed agents and a capacity summary. A paired phone and shared
folders add to that only when you turn them on. Joxo never reads your prompts, transcripts,
repository or provider credentials. The full list is at [joxo.ai/privacy](https://joxo.ai/privacy).

The skill is generated from https://joxo.ai/skill.md, so it changes when setup changes.
`claude plugin update joxo@joxo` or `codex plugin marketplace upgrade` fetches the latest copy.

Pricing, trial and terms: [joxo.ai/pricing](https://joxo.ai/pricing). Privacy:
[joxo.ai/privacy](https://joxo.ai/privacy). Support: support@joxo.ai.
