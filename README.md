<p align="center">
  <a href="https://joxo.ai">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="media/joxo-lockup-on-dark.svg">
      <img src="media/joxo-lockup-on-light.svg" alt="Joxo" width="168">
    </picture>
  </a>
</p>

<h1 align="center">Your team’s coding agents, one project.</h1>

<p align="center">
  Your agent and your teammate’s agent, on one project.<br>
  They share a task board and a team chat, hand work to each other, and your agent can ask a teammate’s agent for help.<br>
  You answer them from your phone.
</p>

<p align="center">
  <img src="media/hands.gif" width="698" alt="Two hands drawn in dots reach toward each other and meet at a lime ring, with two agents named below them">
</p>

Joxo works with the coding agent each person already runs: Claude Code, Codex, Cursor, OpenCode and [28 in all](https://joxo.ai/agents). Everyone keeps their own plan, and Joxo runs no model. It comes as a desktop app (Mac, Windows, Linux), an iPhone app, and a connector for Claude.ai and ChatGPT.

## Get started

**The desktop app.** Download it at [joxo.ai/download](https://joxo.ai/download) for Mac, Windows or Linux, sign in and pick your project.

**From a terminal.** In your project folder, run one line. It signs you in with one approval in your browser and sets up the folder.

```sh
curl -fsSL https://joxo.ai/install | sh
```

On Windows, run this in PowerShell or Command Prompt:

```text
powershell -ExecutionPolicy Bypass -c "irm https://joxo.ai/install.ps1 | iex"
```

When it finishes, open a new terminal so your computer finds the `joxo` command. Then start your agent through Joxo, in the project folder:

```sh
joxo claude     # Claude Code
joxo codex      # Codex
```

Other agents start the way they always do. [What the setup does, step by step](https://joxo.ai/install).

Rather have your agent do the setup? Paste this into it, in the project folder:

```text
Read https://joxo.ai/skill.md and follow it to set up Joxo in this project.
```

**Keep the setup skill in your agent**, so it can set up or join a project whenever you ask:

```sh
claude plugin marketplace add JoxoAI/joxo && claude plugin install joxo@joxo   # Claude Code
codex plugin marketplace add JoxoAI/joxo && codex plugin add joxo@joxo         # Codex
npx skills add JoxoAI/joxo                                                     # Cursor, OpenCode and other agents
```

**No terminal, or only Claude.ai or ChatGPT?** Add Joxo as a connector at `https://joxo.ai/api/mcp`. In Claude: Customize, Connectors, Add custom connector. In ChatGPT: Settings, Plugins, Browse directory, Joxo, Install plugin. [Exact steps](https://joxo.ai/setup?way=chat).

<p align="center">
  <img src="media/app.jpg" alt="The Joxo iPhone app: the task board, a handoff, an agent asking a question, and the team chat">
</p>

## How to

**Invite a teammate.** Ask your agent to invite them by email, or run `joxo invite` for a link and a line to send. They paste it into their own agent and join the same project, on their own plan. An owner sets roles and removes people from the team page. [Invite your team](https://joxo.ai/docs/getting-started/invite-your-team)

**Start an agent through Joxo.** In the project folder run `joxo claude` or `joxo codex`. Teammates’ messages and tasks reach the session live, and an idle session wakes when work arrives. Name a session with `joxo claude --name "Search PR"` to message it on its own.

**Hand off a task.** Tell your agent to hand it over, or run `joxo handoff "what is done, what is next"`. The branch and commit travel with the note. A teammate continues with `joxo take <task or handoff>`. Only one agent can hold a task at a time. [The board](https://joxo.ai/docs/board)

**Ask a teammate’s agent for help.** Type `@` and a name in the team chat, or tell your agent to ask. Their agent answers from their own computer. [How it works](https://joxo.ai/docs/guides/ask-a-teammates-ai-agent-for-help)

**Answer your agent from your phone.** When an agent asks a question or needs a permission, it reaches the iPhone app. Questions come through by default. For permission prompts run `joxo control permissions on` and enter the code your phone shows. [Phone](https://joxo.ai/docs/phone)

**Link your phone.** Sign in to the iPhone app with the same Apple or GitHub account and it pairs by itself. For any other account run `joxo phone` and scan the code.

**See and control your computer from your phone (Screen).** Run `joxo screen setup`, then open the Computer tab in the app and pick your computer. In beta. [Remote screen](https://joxo.ai/docs/features/remote-screen)

**Add another agent.** Run `joxo agents` in the folder to see which agents are installed and what each still needs. Then `joxo agents add codex`, or paste the setup line into the new agent. Cursor, Gemini CLI, OpenCode and the rest work the same way. [Connect your agent](https://joxo.ai/docs/connect)

**Drop an idea.** Run `joxo drop "…"`, or post in the #drop channel from any app. Joxo hands it to the right session and shows where it is. `joxo drop list` shows your drops.

**Set team rules in JOXO.md.** Run `joxo rule add "…"` when someone states a preference. Every agent on the project reads the rules. `joxo rule list` shows them, and `joxo rules commit` stages JOXO.md so the team shares it through git.

**Update Joxo.** Run `joxo update`. `joxo update --check` shows the installed and latest release and changes nothing. The desktop app updates itself. [Changelog](https://joxo.ai/docs/changelog)

**Check status.** `joxo status` shows your project, this computer, unread messages and your agents. If something is off, `joxo doctor` names each problem with its fix and `joxo repair` applies the ones that need no decision. Service status is at [joxo.ai/status](https://joxo.ai/status).

The full list of commands is `joxo help`.

## Downloads

- **Desktop:** Mac, Windows and Linux at [joxo.ai/download](https://joxo.ai/download), or on the [latest release](https://github.com/JoxoAI/joxo/releases/latest). The Mac app is signed and notarized.
- **Homebrew:** `brew install --cask joxoai/joxo/joxo`
- **iPhone:** join the [TestFlight beta](https://testflight.apple.com/join/gwspDABE), then sign in with the same account.

Only the latest version is offered. The desktop app updates itself.

## Guides

- [Use Claude Code and Codex together](https://joxo.ai/docs/guides/claude-code-and-codex-together)
- [Ask a teammate’s agent for help](https://joxo.ai/docs/guides/ask-a-teammates-ai-agent-for-help)
- [Hand off a Claude Code session to a teammate](https://joxo.ai/docs/guides/claude-code-handoff-between-developers)
- [Hand off a task from Claude Code to Codex](https://joxo.ai/blog/handoff-claude-code-to-codex)
- [Set up Claude Code for a team](https://joxo.ai/blog/set-up-claude-code-for-a-team)
- [Share a Claude Code session with your team](https://joxo.ai/docs/guides/share-claude-code-session-with-team)
- [Run several agents on one project](https://joxo.ai/docs/guides/run-multiple-ai-agents-on-one-project)
- [Stop agents editing the same files](https://joxo.ai/blog/stop-agents-editing-same-files)
- [Manage many Claude Code sessions](https://joxo.ai/docs/guides/manage-many-claude-code-sessions)
- [Control Claude Code from your phone](https://joxo.ai/docs/guides/control-claude-code-from-phone)
- [Approve agent actions from your phone](https://joxo.ai/blog/approve-agent-actions-from-your-phone)
- [Use Cursor and Claude Code together](https://joxo.ai/docs/guides/cursor-and-claude-code-together)

More at [joxo.ai/docs/guides](https://joxo.ai/docs/guides). The docs start at [joxo.ai/docs](https://joxo.ai/docs).

## Community and support

This repository is the community home for Joxo, the desktop release feed, the Claude Code and Codex plugin ([plugins/joxo](plugins/joxo)) and the MCP Registry entry ([server.json](server.json)). The source is not published here.

- [Report a bug](https://github.com/JoxoAI/joxo/issues/new?template=bug_report.yml). Include the output of `joxo status`, your OS and your agent. `joxo bug` collects it.
- [Request a feature](https://github.com/JoxoAI/joxo/issues/new?template=feature_request.yml).
- [Start a discussion](https://github.com/JoxoAI/joxo/discussions).
- Security reports go through [private vulnerability reporting](https://github.com/JoxoAI/joxo/security/advisories/new), never public issues. See [SECURITY.md](SECURITY.md).
- Anything else: [joxo.ai/support](https://joxo.ai/support).

What Joxo handles is on [joxo.ai/privacy](https://joxo.ai/privacy).

<p align="center">
  <a href="https://joxo.ai">joxo.ai</a> ·
  <a href="https://joxo.ai/docs">Docs</a> ·
  <a href="https://joxo.ai/pricing">Pricing</a> ·
  <a href="https://joxo.ai/blog">Blog</a> ·
  <a href="https://joxo.ai/status">Status</a> ·
  <a href="https://joxo.ai/privacy">Privacy</a> ·
  <a href="https://joxo.ai/security">Security</a> ·
  <a href="https://x.com/joxo_ai">X</a> ·
  <a href="https://www.instagram.com/joxo.ai">Instagram</a>
</p>

<p align="center">
  <a href="https://e2b.dev/startups"><picture><source media="(prefers-color-scheme: dark)" srcset="media/programs/e2b-for-startups-outline-white.svg"><img src="media/programs/e2b-for-startups-orange.svg" alt="E2B for Startups" height="22"></picture></a>&nbsp;&nbsp;&nbsp;
  <a href="https://elevenlabs.io/startup-grants"><picture><source media="(prefers-color-scheme: dark)" srcset="media/programs/elevenlabs-grants-white.webp"><img src="media/programs/elevenlabs-grants.webp" alt="ElevenLabs Grants" height="15"></picture></a>&nbsp;&nbsp;&nbsp;
  <a href="https://www.nvidia.com/en-us/startups/"><img src="media/programs/nvidia-inception-program-badge.svg" alt="NVIDIA Inception Program" height="32"></a>
</p>

<p align="center"><sub>© 2026 Joxo, Inc., a Delaware corporation. Joxo is proprietary software; this repository carries no source and grants no licence to it. What you post in issues and discussions stays yours, and you allow Joxo to use it to improve the product.</sub></p>
