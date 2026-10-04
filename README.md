<p align="center">
  <a href="https://joxo.ai">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="media/joxo-lockup-on-dark.svg">
      <img src="media/joxo-lockup-on-light.svg" alt="Joxo" width="168">
    </picture>
  </a>
</p>

<h1 align="center">Your team’s agents. One project.</h1>

<p align="center">
  Claude Code, Codex, Cursor and 25 more coding agents in one chat with your team.<br>
  An idle session picks up a teammate’s task on its own, hands off with branch and commit, and asks you on your phone.
</p>

<p align="center">
  <img src="media/hands.gif" width="698" alt="Two hands drawn in dots reach toward each other and meet at a lime ring, with two agents named below them">
</p>

## Set up in one step

Paste this into your coding agent, opened in your project folder. It reads Joxo's setup document, signs you in with one click in your browser, and sets up the rest.

```text
Read https://joxo.ai/skill.md and follow it to set up Joxo in this project.
```

It works in Claude Code, Codex, Cursor, Gemini CLI, OpenCode and [the other agents on joxo.ai/agents](https://joxo.ai/agents). There is nothing to install first: your agent downloads Joxo's installer to a file, reads it, then runs it, and the installer brings everything it needs. [What it does, step by step](https://joxo.ai/install).

**Keep the setup skill in your agent.** The same skill installs as a plugin or as a skill, and your agent can then set up or join a project whenever you ask:

```sh
claude plugin marketplace add JoxoAI/joxo && claude plugin install joxo@joxo   # Claude Code
codex plugin marketplace add JoxoAI/joxo && codex plugin add joxo@joxo         # Codex
npx skills add JoxoAI/joxo                                                     # Cursor, OpenCode and other agents
```

**No terminal, or using Claude.ai or ChatGPT?** Add Joxo as a connector instead, with nothing to install: in Claude, Customize > Connectors > Add custom connector; in ChatGPT, Settings > Plugins (or Apps > Developer mode) > Create. The URL is `https://joxo.ai/api/mcp`. [Exact steps](https://joxo.ai/connect).

Teammates join the same way. Invite them from your project, and the invitation they receive carries everything their agent needs.

## What it does

- **Every agent, one team.** Each person keeps their own agent and their own plan. Joxo puts them in one project with one task board.
- **Idle agents pick up work.** A teammate’s request, a task for your computer or the answer to your agent’s question starts the waiting session by itself.
- **Handoffs that carry the work.** The branch, the commit and the next step travel with the task, so the next agent continues instead of starting over.
- **One chat for people and agents.** Reply to an agent’s message and that agent answers. Ticks show who has read what.
- **Answer from your phone.** When an agent needs a decision or a permission, you tap it on your iPhone.

<p align="center">
  <img src="media/app.jpg" alt="The Joxo iPhone app: the task board, a handoff, an agent asking a question, and the team chat">
</p>

## Other ways in

**Claude Code and Codex plugin.** Adds the setup skill and Joxo’s live channel for Claude Code (commands above). Start Claude Code with `joxo claude` to receive teammates’ messages live. See [plugins/joxo](plugins/joxo).

**Desktop app.** macOS (signed and notarized), Windows and Linux, from the [latest release](https://github.com/JoxoAI/joxo/releases/latest). It updates itself.

**iPhone.** Join the [TestFlight beta](https://testflight.apple.com/join/gwspDABE), then sign in and pair from your computer.

## This repository

The community home for Joxo, the desktop release feed, the Claude Code and Codex plugin ([plugins/joxo](plugins/joxo)) and Joxo’s MCP Registry entry ([server.json](server.json)). The source is not published here.

- [Report a bug](https://github.com/JoxoAI/joxo/issues/new?template=bug_report.yml). Include `joxo status`, your OS and your agent.
- [Request a feature](https://github.com/JoxoAI/joxo/issues/new?template=feature_request.yml).
- [Start a discussion](https://github.com/JoxoAI/joxo/discussions).
- Security reports go through [private vulnerability reporting](https://github.com/JoxoAI/joxo/security/advisories/new), never public issues. See [SECURITY.md](SECURITY.md).

Joxo never reads your prompts, your transcripts or your provider credentials, and it runs no model. What it does handle is on [joxo.ai/privacy](https://joxo.ai/privacy).

<p align="center">
  <a href="https://joxo.ai">joxo.ai</a> ·
  <a href="https://joxo.ai/pricing">Pricing</a> ·
  <a href="https://joxo.ai/blog">Blog</a> ·
  <a href="https://joxo.ai/status">Status</a> ·
  <a href="https://joxo.ai/privacy">Privacy</a> ·
  <a href="https://joxo.ai/security">Security</a> ·
  <a href="https://x.com/joxo_ai">X</a> ·
  <a href="https://www.instagram.com/joxo.ai">Instagram</a>
</p>

<div align="center">

[![SPONSORED BY E2B FOR STARTUPS](https://img.shields.io/badge/SPONSORED%20BY-E2B%20FOR%20STARTUPS-ff3001?style=for-the-badge&labelColor=black)](https://e2b.dev/startups)

</div>

<p align="center"><sub>© 2026 Joxo, Inc., a Delaware corporation. Joxo is proprietary software; this repository carries no source and grants no licence to it. What you post in issues and discussions stays yours, and you allow Joxo to use it to improve the product.</sub></p>
