# prompt-refined

Two independent assets for improving prompt quality. Use either one on its own — they are not chained.

## 1. `highest-quality-most-effective-prompt-possible.md`

A ready-to-use **prompt template** that refactors any prompt you paste into it.

**How to use:**
1. Open the file and copy its entire contents.
2. Paste it into a chat with any capable LLM (ChatGPT, Claude, Gemini, etc.).
3. Append the prompt you want improved where the template asks for input.
4. Submit. The model returns only the refined prompt — no commentary.

**Best for:** quick, one-shot prompt rewrites when you just need a better version of a draft.

## 2. `SKILLS-expert-prompt-engineering-optimization.md`

A formal **agent skill definition** describing prompt-engineering competencies, protocols, and a token-budget framework.

**How to use:**
- **As an agent skill:** load it into an agent framework (e.g., Claude Skills, custom agent configs) as a persistent capability the agent can invoke.
- **As a system prompt:** paste it into the system / developer message slot of an LLM session to make the model behave as a prompt-engineering specialist for the whole conversation.
- **As a reference:** read it directly to learn the methodology, competencies, and token-budgeting discipline it codifies.

**Best for:** long-running agents, repeated prompt-optimization workflows, or teams standardizing on a shared methodology.

## Choosing between them

| Need | Use |
|---|---|
| Refine one prompt right now | `highest-quality-most-effective-prompt-possible.md` |
| Equip an agent or session with ongoing prompt-engineering expertise | `SKILLS-expert-prompt-engineering-optimization.md` |
