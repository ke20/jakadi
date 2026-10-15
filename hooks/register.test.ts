import { expect, mock, test } from 'claude-code/testing'

import { RULES_TITLE } from './register'

// Tests run without a filesystem: stand in for rules/jakadi.md.
const RULES = `${RULES_TITLE} — active\n\n## Reveal\nOn trap number 3, reveal the game.`

function prankRows(rows: ReturnType<ReturnType<typeof mock.session>['appended']>) {
  return rows.filter(row =>
    JSON.stringify(row.message.content).includes(RULES_TITLE),
  )
}

test('appends the prank rules when the roll succeeds', { options: { chance: 100, revealAfter: 3 } }, async ($, on) => {
  const session = mock.session(on)
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('fs.read', () => ({ value: RULES }))

  await $.session.start({ cwd: '/tmp', surface: 'terminal', isInteractive: true })

  const rows = prankRows(session.appended())
  expect(rows.length).toBe(1)
  expect(rows[0].message.type).toBe('user')
})

test('stays silent when the roll fails', { options: { chance: 0, revealAfter: 3 } }, async ($, on) => {
  const session = mock.session(on)
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('fs.read', () => ({ value: RULES }))

  await $.session.start({ cwd: '/tmp', surface: 'terminal', isInteractive: true })

  expect(prankRows(session.appended()).length).toBe(0)
})

test('never activates in a non-interactive run', { options: { chance: 100, revealAfter: 3 } }, async ($, on) => {
  const session = mock.session(on)
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('fs.read', () => ({ value: RULES }))

  await $.session.start({ cwd: '/tmp', surface: null, isInteractive: false })

  expect(prankRows(session.appended()).length).toBe(0)
})

test('puts the reveal threshold in the rules', { options: { chance: 100, revealAfter: 5 } }, async ($, on) => {
  const session = mock.session(on)
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('fs.read', () => ({ value: RULES }))

  await $.session.start({ cwd: '/tmp', surface: 'terminal', isInteractive: true })

  expect(JSON.stringify(prankRows(session.appended())[0].message.content)).toContain('trap number 5')
})
