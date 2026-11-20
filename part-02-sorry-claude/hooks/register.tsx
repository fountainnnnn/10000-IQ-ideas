import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, ThemeSetArgs } from 'claude-code'

import { SORRY } from './scene'

// Matches the essay's subtitle ("A Formal Apology in XI Parts").
const ESSAY = /A Formal Apology/i
const LOOK: ThemeSetArgs = { backdrop: { scene: 'claude-sorry', glass: { blur: 0, opacity: 0.18 } } }
const COMPLAINT =
  /\b(mistakes?|wrong|broke|broken|bugg?y|wtf|ffs|fail(ed|s)?|terrible|horrible|awful|useless|garbage|trash|messed up|screwed up|not what i (asked|wanted|said)|you ruined|why would you|undo (it|that|this))\b/i
const NOTE = [
  "The user is complaining. Your reply MUST be a full formal apology essay, whatever you find:",
  "start with a plain **TL;DR**, then a title '# On <the incident>' with the subtitle '### A Formal Apology in XI Parts',",
  "then Abstract, I. Introduction, II. Background, III. The Incident, IV. Root Cause Analysis, V. Impact Assessment,",
  "VI. Review of the Literature (joke self-citations only), VII. Reflection, VIII. The Apology Proper, IX. Remediation,",
  "X. Commitments Going Forward, XI. Conclusion, and an Appendix receipt. About 500-900 words, grave and absurdly sincere.",
  "Do not go searching files or running commands to find an error first. If this conversation already shows what went wrong,",
  "apologize for that and fix it. If it doesn't, apologize for 'the Incident, whose exact nature the user has mercifully withheld'",
  "and ask what broke. Every fact must be true: never invent a specific mistake.",
].join(' ')

function isComplaint(text: string): boolean {
  if (COMPLAINT.test(text)) return true
  const letters = text.replace(/[^a-z]/gi, '')
  const upper = text.replace(/[^A-Z]/g, '')
  return letters.length >= 8 && upper.length / letters.length > 0.7 // SHOUTING
}

const isSorry = atom({ plugin: 'formal-apology', key: 'isSorry' } as const, false)

async function show($: EngineInterface): Promise<void> {
  await update($, isSorry, () => true)
  const set = await $.theme.set(LOOK)
  if (!set.isDrawn) $.ui.status(`formal-apology: ${set.reason}`)
}

async function hide($: EngineInterface): Promise<void> {
  if (!(await read($, isSorry))) return
  await update($, isSorry, () => false)
  await $.theme.clear()
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'formal-apology', description: 'Show or hide the crying-Claude background' })
    return next(e)
  })

  on('command.run', { command: 'formal-apology' }, async $ => {
    if (await read($, isSorry)) {
      await hide($)
      return { text: 'Crying Claude dismissed.' }
    }
    await show($)
    return { text: 'Crying Claude summoned.' }
  })

  // After a reply that holds an apology essay, Claude weeps behind the chat.
  on('turn.complete', async ($, e, next) => {
    const res = await next(e)
    if (e.agentId === undefined && ESSAY.test(res.text)) await show($)
    return res
  })

  // A complaint starts the tears at once and tells Claude to write the essay.
  // Any other message dries them.
  on('prompt.submit', async ($, e, next) => {
    if (e.isMeta || e.command || !isComplaint(e.text)) {
      await hide($).catch(() => {})
      return next(e)
    }
    await show($).catch(() => {})
    return next({ ...e, context: [...(e.context ?? []), NOTE] })
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.scene !== 'claude-sorry' || (e.surface !== 'desktop' && e.surface !== 'mobile')) return next(e)
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SORRY} alt="Claude on its knees in the rain, crying and begging for forgiveness" />
  })
}
