# Jakadi

> *Jacques a dit* — the French "Simon Says", spelled the way it sounds.

An easter egg for AI coding assistants. Once it is on, the assistant only obeys orders that start with "Jacques a dit" ("Simon says", "Simón dice", "Simon sagt"...). Any other message gets a "Jacques n'a pas dit !" and nothing else.

```
> refactor the auth module
Jacques n'a pas dit !

> Jacques a dit refactor the auth module
Sure — reading src/auth/...
```

Perfect for teasing a colleague who left their laptop unlocked.

## Why?

No reason. This project is completely useless: it makes no one more productive, fixes no bug and ships no feature. That is exactly what makes it fun.

## How the game works

- A message without the trigger phrase is a trap. The assistant answers only with the "gotcha" line, in the language of the message.
- A message that starts with the trigger is carried out normally.
- After 3 traps, the assistant reveals the game and how to stop it.
- "stop jakadi" (or "stop", "fin du jeu", "end game"...) always ends the game.
- The trigger never bypasses safety confirmations, and the game ends on its own if the person mentions an emergency.
- Works in 15 languages (French, English, Spanish, Catalan, Portuguese, Italian, German, Dutch, Polish, Swedish, Turkish, Japanese, Chinese, Korean...). The trigger of any language is accepted.

## What's in the box

| Path | What it is | Works with |
|---|---|---|
| `rules/jakadi.md` | The prank rules: the game is on from the first message | Any assistant that reads an instructions file |
| `skills/jakadi/` | An [Agent Skill](https://agentskills.io) to start a game on purpose (`/jakadi`) | Any assistant that supports Agent Skills |
| `.claude-plugin/`, `hooks/` | A Claude Code plugin: the game switches on by itself, at random, in 20% of sessions | Claude Code |

## Install

### Claude Code (random activation)

At the prompt of a Claude Code session:

```
/plugin install jakadi --marketplace ke20/jakadi
```

Answer `y` to add the marketplace, then pick a scope. From a shell:

```sh
claude plugin install jakadi --marketplace ke20/jakadi
```

In the desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `ke20/jakadi`, then **Add plugin**.

Options, in `/config` or in `settings.json` under `pluginConfigs.jakadi.options`:

| Option | Default | Meaning |
|---|---|---|
| `chance` | 20 | Activation probability per session, 0 to 100 |
| `revealAfter` | 3 | Traps before the assistant explains the prank |

Non-interactive runs (`claude -p`, SDK, CI) are never affected.

### Other assistants (always on)

These tools have no hook to roll a die, so the prank is on in every session until you remove it. Append the rules to the assistant's global instructions file:

| Assistant | Command |
|---|---|
| OpenAI Codex CLI | `curl -fsSL https://raw.githubusercontent.com/ke20/jakadi/main/rules/jakadi.md >> ~/.codex/AGENTS.md` |
| Gemini CLI | `curl -fsSL https://raw.githubusercontent.com/ke20/jakadi/main/rules/jakadi.md >> ~/.gemini/GEMINI.md` |
| GitHub Copilot (one repository) | `curl -fsSL https://raw.githubusercontent.com/ke20/jakadi/main/rules/jakadi.md >> .github/copilot-instructions.md` |
| Cursor | Paste `rules/jakadi.md` into **Settings > Rules > User Rules** |
| Any tool that reads `AGENTS.md` (one repository) | `curl -fsSL https://raw.githubusercontent.com/ke20/jakadi/main/rules/jakadi.md >> AGENTS.md` |

To uninstall, delete the section that starts with `# Jakadi (Simon Says) easter egg` from that file.

### The skill only (start a game on purpose)

With the [skills CLI](https://github.com/vercel-labs/skills), for any assistant that supports Agent Skills (Claude Code, Codex, Gemini CLI, Cursor, Copilot, OpenCode...):

```sh
npx skills add ke20/jakadi -g
```

Add `-a <agent>` to target one assistant. Then type `/jakadi`, or ask to play "Jacques a dit" / "Simon says".

## Prank etiquette

Prank people who will laugh about it. The reveal after a few traps and the "stop jakadi" exit are there so nobody stays stuck: keep them.

## Develop

```sh
claude --plugin-dir .      # try the Claude Code plugin (set chance to 100)
claude plugin validate .
claude plugin test .
```

`rules/jakadi.md` is the single source of the prank rules: the Claude Code hook reads it at run time.

## License

MIT
