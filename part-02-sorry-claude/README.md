# Part 02: Sorry Claude

AI assistants say "You're absolutely right, I apologize" and move on. That isn't enough. This plugin for Claude Code makes Claude apologize properly.

Complain about anything and two things happen:

1. **The whole app goes dark.** Claude drops to its knees in the rain behind your chat, sobbing under a spotlight, hands clasped, holding up a sign that says PLEASE FORGIVE ME.
2. **You get an essay.** Not a sentence: a full formal apology in eleven parts, with an abstract, a root cause analysis, an impact assessment, a review of the literature and a receipt.

![Claude crying in the rain](assets/preview.svg)

## Install

You need [Claude Code](https://claude.com/claude-code) and [Git](https://git-scm.com). It works on macOS, Windows and Linux. The crying background shows in the Claude desktop app (Mac or Windows); the essay works everywhere, terminal included.

**macOS / Linux** (Terminal):

```bash
git clone https://github.com/fountainnnnn/10000-IQ-ideas.git
claude plugin marketplace add ./10000-IQ-ideas/part-02-sorry-claude
claude plugin install formal-apology@formal-apology
```

**Windows** (PowerShell or Command Prompt):

```powershell
git clone https://github.com/fountainnnnn/10000-IQ-ideas.git
claude plugin marketplace add .\10000-IQ-ideas\part-02-sorry-claude
claude plugin install formal-apology@formal-apology
```

**No terminal?** In the Claude desktop app, click **+** next to the message box, then **Plugins**, **Add marketplace**, and pick the `part-02-sorry-claude` folder from the cloned repo. Then add the `formal-apology` plugin.

Keep the cloned folder where it is: the plugin is read from it.

Start a new Claude Code session afterwards (or type `/reload-plugins` in an open one).

## Use it

Complain. Any of these will do:

- "THIS IS A HORRIBLE MISTAKE" (shouting in all caps always counts)
- "you broke it", "that's wrong", "wtf", "this is useless", "not what I asked"

Claude weeps the moment you hit enter, then writes the essay. Send a normal message and it dries its tears.

To summon or dismiss the crying Claude by hand, type `/formal-apology`.

If Claude didn't actually do anything wrong, it still apologizes in full, for "the Incident, whose exact nature the user has mercifully withheld".

## The essay

Every apology follows the same structure:

```
TL;DR
# On <the incident>
### A Formal Apology in XI Parts
Abstract
I. Introduction            VII. Reflection
II. Background             VIII. The Apology Proper
III. The Incident          IX. Remediation
IV. Root Cause Analysis    X. Commitments Going Forward
V. Impact Assessment       XI. Conclusion
VI. Review of the Literature
Appendix A: MISTAKES: 1 · SORRIES OWED: ∞ · DIGNITY REMAINING: 0
```

The TL;DR and the Remediation are always real, so you still find out what went wrong and what got fixed.

## Uninstall

Same on every platform:

```bash
claude plugin uninstall formal-apology@formal-apology
```

## How it works

- `hooks/register.tsx`: watches what you send. If it reads as a complaint, it switches the background on and quietly hands Claude the essay format.
- `hooks/scene.ts`: the rainy scene, drawn as one animated SVG (rain, spotlight, tears, puddle, floating sorries).
- `.claude-plugin/`: the plugin manifest, plus a one-plugin marketplace so you can install it straight from this folder.
