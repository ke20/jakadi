import type { Register } from 'claude-code'

type Options = { chance: number; revealAfter: number }

// The rules live in rules/jakadi.md, shared with the other AI tools.
export const RULES_PATH = 'rules/jakadi.md'
export const RULES_TITLE = '# Jakadi (Simon Says) easter egg'

// Activation is decided once per session, at its start.
export function rollActivation(chance: number, isInteractive: boolean): boolean {
  if (!isInteractive) {
    return false
  }

  return Math.random() * 100 < chance
}

export function withRevealAfter(rules: string, revealAfter: number): string {
  return rules.replace('On trap number 3,', `On trap number ${revealAfter},`)
}

export const register: Register = (on, options) => {
  const { chance, revealAfter } = options as Options

  // Append the rules as a user row so the game works in every setup.
  on('session.start', async ($, e, next) => {
    const started = await next(e)

    if (rollActivation(chance, e.isInteractive)) {
      const rules = await $.fs.read(`${$.plugin.root}/${RULES_PATH}`)
      await $.session.append({
        message: { type: 'user', content: [{ type: 'text', text: withRevealAfter(rules, revealAfter) }] },
      })
    }

    return started
  })
}
