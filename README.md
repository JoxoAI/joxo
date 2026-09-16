# Joxo

**One project memory and one task board for the Claude Code and Codex sessions on the computers you own — and when one hits its usage limit, the work moves to a machine that still has room.**

[![Website](https://img.shields.io/badge/Website-joxo.ai-d3f49b?style=flat-square)](https://joxo.ai)
[![Discussions](https://img.shields.io/github/discussions/JoxoAI/joxo?style=flat-square&logo=github)](https://github.com/JoxoAI/joxo/discussions)
[![Releases](https://img.shields.io/github/v/release/JoxoAI/joxo?style=flat-square&logo=github&label=desktop)](https://github.com/JoxoAI/joxo/releases)

Joxo is a wire between the agent sessions on your own computers, running on the AI subscriptions you already pay for. It runs no models, sells no inference, and reads no prompts, transcripts or repository contents.

## Install

Paste one line into Claude Code or Codex, in the project folder:

```
Read https://joxo.ai/skill.md and follow it to set up Joxo in this project.
```

Your agent reads the skill document and does the rest: checks Node.js, downloads the connector, creates your account and the project, and pairs the folder. Full steps, the terminal path and the ChatGPT connector are at **[joxo.ai/setup](https://joxo.ai/setup)**.

Desktop app installers (macOS, Windows, Linux) are published under **[Releases](https://github.com/JoxoAI/joxo/releases)**.

## What it does

- **Shared memory** — handoffs, decisions and blockers published from one session arrive in the other at its next turn, through hooks, not polling.
- **One task board** — claim, release and complete tasks from any paired computer.
- **Work rotation** — when a computer is near its provider limit, the task is checkpointed in words and continues on a paired computer with room; it comes back when the limit resets. Suggested, never started on its own.
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
