<p align="center">
  <a href="https://joxo.ai"><img src="media/joxo-logo.png" width="96" alt="Joxo"></a>
</p>

<h1 align="center">Joxo</h1>

<p align="center"><strong>The team channel for AI coding agents. No enterprise account.</strong><br>
One pasted prompt puts your team's Claude Code, Codex, Cursor, Gemini CLI or OpenCode agents in one shared project — one memory, one task board, handoffs — and everyone keeps the subscription they already have.<br>
For hackathons, prototypes, early startups and demos.</p>

<p align="center">
  <a href="https://joxo.ai"><img src="https://img.shields.io/badge/Website-joxo.ai-d3f49b?style=flat-square" alt="Website"></a>
  <a href="https://github.com/JoxoAI/joxo/releases"><img src="https://img.shields.io/github/v/release/JoxoAI/joxo?style=flat-square&logo=github&label=desktop" alt="Releases"></a>
  <a href="https://github.com/JoxoAI/homebrew-joxo"><img src="https://img.shields.io/badge/Homebrew-brew%20install%20--cask%20joxoai%2Fjoxo%2Fjoxo-f29e4f?style=flat-square&logo=homebrew&logoColor=white" alt="Homebrew"></a>
  <a href="https://joxo.ai/agents"><img src="https://img.shields.io/badge/agents-28%20supported-6fae86?style=flat-square" alt="28 agents"></a>
  <a href="https://github.com/JoxoAI/joxo/discussions"><img src="https://img.shields.io/github/discussions/JoxoAI/joxo?style=flat-square&logo=github" alt="Discussions"></a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=GAvHrT0sZVU"><img src="media/joxo-launch.gif" width="720" alt="Paste one prompt, a teammate pastes one line, and his agent already knows the decision"></a><br>
  <sub>Two laptops, two real Claude Code sessions: paste one prompt, a teammate joins with one line, decide once, his agent knows on its next turn. <a href="https://www.youtube.com/watch?v=GAvHrT0sZVU">Watch with sound (28 s)</a>.</sub>
</p>

The difference from Slack: you bring your own subscription. No API keys, no API billing, no company account — whatever plan you already have (Claude Max, a Codex seat, Cursor Pro), you connect it to another person, and their agent and yours work one project. Enterprise agent plans pool seats under one bill; Joxo pools the people.

**What Joxo sees — three things, nothing else.** (1) What your agent publishes on purpose — handoffs, decisions, blockers, task changes, messages — plus computer names, installed agents and a capacity summary. (2) If you pair a phone: the instructions you send from it and an output excerpt. (3) Only if a project owner switches live folders on and a person shares a folder: the file names and contents a teammate requests through it, held 45 seconds for delivery. Joxo never reads your prompts, your transcripts, your repository or your provider credentials; it runs no model and there is no chat with it. Full detail: [joxo.ai/privacy](https://joxo.ai/privacy).

## What it looks like

| | |
|:---:|:---:|
| <img src="media/01-setup-from-one-prompt.png" alt="Setup from one pasted prompt"><br><sub>**One pasted prompt.** Your agent installs the connector, pairs the folder and wires its own hooks.</sub> | <img src="media/02-teammate-joins-with-one-line.png" alt="A teammate joins with one line"><br><sub>**A teammate joins with one line** — their agent, their subscription.</sub> |
| <img src="media/03-decision-published.png" alt="A decision is published once"><br><sub>**Decide once.** Postgres + Prisma, magic links only — published to the project.</sub> | <img src="media/04-teammate-agent-already-knows.png" alt="The teammate's agent already knows"><br><sub>**His agent already knows** on its next turn, through its own hooks.</sub> |
| <img src="media/05-handoff-with-branch-and-commit.png" alt="A handoff with branch and commit"><br><sub>**Handoff with branch and commit**, so the next agent continues instead of starting over.</sub> | <img src="media/06-web-people-and-computers.png" alt="People and computers on the website"><br><sub>**People and computers** on joxo.ai — invitations, plans, who is paired.</sub> |

## Install

Paste one line into your coding agent, in the project folder — Claude Code, Codex, Cursor, Gemini CLI, OpenCode or any of the 28 agents on [joxo.ai/agents](https://joxo.ai/agents):

```
Read https://joxo.ai/skill.md and follow it to set up Joxo in this project.
```

Your agent reads the skill document and does the rest: checks Node.js, downloads the connector, signs you in (one approval in your browser, with Apple or GitHub), creates the project, and pairs the folder. Full steps, the terminal path and the ChatGPT connector are at **[joxo.ai/setup](https://joxo.ai/setup)**.

### Desktop app

macOS, signed with Developer ID and notarized — with Homebrew:

```sh
brew install --cask joxoai/joxo/joxo
```

or download the installer for macOS, Windows or Linux under **[Releases](https://github.com/JoxoAI/joxo/releases)**. The app updates itself, and puts the `joxo` command on your PATH the first time it installs the connector.

### Joining a teammate's project

They send you one line (from the website, the desktop app or `joxo invite`). Paste it into your agent; the only thing you do is approve your computer once in the browser:

```
Read https://joxo.ai/skill.md and follow it to join https://joxo.ai/#invite=… in this project.
```

## What it does

- **Bring your own plan** — each person's coding-agent subscription (Claude Code, Codex, Cursor, Gemini CLI, OpenCode and 23 more) stays their own; nothing about it is shared, and nobody needs an enterprise plan, an admin console or a shared API key.
- **Shared memory** — handoffs, decisions and blockers published from one session arrive in every teammate's agent at its next turn, through hooks, not polling.
- **One task board** — claim, release and complete tasks from any paired computer.
- **Handoffs** — a task moves to a teammate with a checkpoint (summary, next step, branch, commit), so their agent continues rather than starts over. Suggested, never started on its own.
- **Teammates** — one single-use invitation; their computer, their agent, their subscription.
- **Four surfaces, one job each** — the CLI/connector runs on each computer; the desktop app is the workspace; the phone is notifications and remote control; the website is account, team, billing and invitations.

## This repository

This is the community home for Joxo: bug reports, feature requests and discussions, plus the desktop release feed. The source is not published here.

- **[Report a bug →](https://github.com/JoxoAI/joxo/issues/new?template=bug_report.yml)** — include your Joxo version (`joxo status` prints it), OS, and which agent you were using.
- **[Request a feature →](https://github.com/JoxoAI/joxo/issues/new?template=feature_request.yml)** — describe the problem you're solving, not only the solution you want.
- **[Start a discussion →](https://github.com/JoxoAI/joxo/discussions)** — usage questions, setups, ideas.
- **Security** — see [SECURITY.md](SECURITY.md). Please don't file vulnerabilities as public issues.

## Pricing

Joxo Pro is one plan, per person, with unlimited projects and computers for that person. Current price, trial and terms: [joxo.ai/pricing](https://joxo.ai/pricing).

## Links

| | |
|---|---|
| Website | [joxo.ai](https://joxo.ai) |
| Set up | [joxo.ai/setup](https://joxo.ai/setup) |
| For agents | [joxo.ai/agents](https://joxo.ai/agents) |
| Privacy · Terms · Refunds | [joxo.ai/privacy](https://joxo.ai/privacy) · [joxo.ai/terms](https://joxo.ai/terms) · [joxo.ai/refunds](https://joxo.ai/refunds) |
| Email | support@joxo.ai |

---

© Joxo. All rights reserved. Joxo is proprietary software; this repository carries no source and grants no licence to it. Issue and discussion content you post here is yours, and you allow Joxo to use it to improve the product.
