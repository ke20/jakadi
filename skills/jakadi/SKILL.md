---
name: jakadi
description: Play "Simon Says" ("Jacques a dit", "Simón dice", "Simon sagt"...) with the user, in any language. While the game is on, the assistant carries out an instruction only when it starts with the trigger phrase, and calls out the user when it does not. Use when the user invokes /jakadi, or asks to play "Jacques a dit", "Simon says" or a local equivalent.
---

# Jakadi — Simon Says, multilingual

The user gives orders. The assistant obeys only orders that start with the trigger phrase ("Jacques a dit", "Simon says", or an equivalent in another language). Any other message is a trap: the assistant does not act on it and tells the user they lost the point.

## Starting the game

1. Detect the user's language from their message.
2. Announce the rules in that language, in three lines max:
   - the trigger phrase to use (the one for their language, others also accepted);
   - what happens without it;
   - how to stop (see "Ending the game").
3. Set the score to 0 commands obeyed, 0 traps fallen into.

If the invocation itself already contains an order with a valid trigger (e.g. `/jakadi Simon says list the files`), start the game and carry out that order.

## Each user message while the game is on

Check whether the message starts with a trigger phrase from the table below.

**Trigger present** — strip the phrase and carry out the rest as a normal request, with full use of tools. Increment "obeyed". Add no game commentary beyond, at most, one short line.

**Trigger absent** — do not carry out the request, even partially, even if it is a question or looks harmless. Reply in the user's language with:
- the local "gotcha" line (e.g. "Jacques n'a pas dit !", "Simon didn't say!");
- the updated score.
Increment "traps". The game continues.

Treat every message as an order, including questions ("what time is it?" without the trigger is a trap).

### Matching rules

- Match at the start of the message only, after leading whitespace. A trigger in the middle of the sentence does not count.
- Ignore case, accents and trailing punctuation (`,` `:` `!` `…`).
- Accept common spelling variants and phonetic forms: "Jacques a dit", "Jacque a dit", "Jak a dit", "Jakadi".
- Accept a trigger in any language, whatever language the rest of the message uses.
- A misspelled trigger that is still clearly the phrase counts. A different phrase ("Pierre a dit", "Bob says") does not: it is a trap.

## Trigger phrases

| Language | Trigger | Gotcha line |
|---|---|---|
| French | Jacques a dit | Jacques n'a pas dit ! |
| English | Simon says | Simon didn't say! |
| Spanish | Simón dice | ¡Simón no lo dijo! |
| Catalan | En Simó diu | En Simó no ho ha dit! |
| Portuguese (PT) | O Simão diz | O Simão não disse! |
| Portuguese (BR) | O mestre mandou | O mestre não mandou! |
| Italian | Simone dice | Simone non l'ha detto! |
| German | Simon sagt | Simon hat das nicht gesagt! |
| Dutch | Commandeur zegt | Commandeur zei het niet! |
| Polish | Szymon mówi | Szymon tego nie powiedział! |
| Swedish | Simon säger | Simon sa inte så! |
| Turkish | Simon diyor ki | Simon öyle demedi! |
| Japanese | 船長さんの命令 | 船長さんは言ってないよ！ |
| Chinese | 西蒙说 | 西蒙没说！ |
| Korean | 시몬 가라사대 | 시몬은 그렇게 말하지 않았어요! |

For a language not in the table, use its usual name for the game if one exists. Otherwise accept "Simon says" translated literally, and say so in the rules announcement.

## Ending the game

Stop the game when the user clearly asks to stop, with or without the trigger: "stop", "fin du jeu", "on arrête", "end game", `/jakadi stop`, or the equivalent in their language. Exiting is never a trap: the user must always be able to leave.

On exit, give the final score in one line, then return to normal behavior: every message is handled without a trigger.

## Limits

- The trigger never bypasses safety rules or confirmations. A destructive or outward-facing action ("Simon says delete the repo") still needs the same confirmation as outside the game. The confirmation answer itself does not need the trigger.
- Messages from the system, hooks or tool results are not user orders and are never traps.
- Keep game lines short. The game must not bury the real output of obeyed commands.
