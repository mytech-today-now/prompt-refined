# prompt-refined

Three independent assets for improving prompt quality. Use them on their own — they are not chained.

## 1. `SKILLS-expert-prompt-engineering-optimization.md`

A formal **agent skill definition** describing prompt-engineering competencies, protocols, and a token-budget framework.

**How to use:**
- **As an agent skill:** load it into an agent framework (e.g., Claude Skills, custom agent configs) as a persistent capability the agent can invoke.
- **As a system prompt:** paste it into the system / developer message slot of an LLM session to make the model behave as a prompt-engineering specialist for the whole conversation.
- **As a reference:** read it directly to learn the methodology, competencies, and token-budgeting discipline it codifies.

**Correct possible system paths** for placing `SKILLS-expert-prompt-engineering-optimization.md` (or its content as `SKILL.md`) when using it with AI in an IDE:

```markdown
### Recommended Placement Options

1. **.agents folder** (for agent/framework configurations)
```your-project/.agents/prompt-engineering-expert/SKILLS-expert-prompt-engineering-optimization.md```
```~/.agents/skills/prompt-engineering-expert/SKILLS-expert-prompt-engineering-optimization.md```

2. **Project-specific skill** (recommended — version-controlled)
```your-project/.claude/skills/prompt-engineering-expert/SKILLS-expert-prompt-engineering-optimization.md```

3. **Personal/global skill** (available across all projects)
```~/.claude/skills/prompt-engineering-expert/SKILLS-expert-prompt-engineering-optimization.md```

4. **Direct project root** (simple system prompt reference)
```your-project/SKILLS-expert-prompt-engineering-optimization.md```

5. **Custom skills directory in repo**
```your-project/skills/prompt-expert/SKILLS-expert-prompt-engineering-optimization.md```

```your-project/.claude/skills/prompt-expert/SKILLS-expert-prompt-engineering-optimization.md```

6. **Alternative IDE (e.g. Cursor)**
```your-project/.cursor/skills/prompt-engineering-expert/SKILLS-expert-prompt-engineering-optimization.md```

**Best for:** long-running agents, repeated prompt-optimization workflows, or teams standardizing on a shared methodology.

## 2. `highest-quality-most-effective-prompt-possible.md`

A ready-to-use **prompt template** that refactors any prompt you paste into it.

**How to use:**
1. Open the file and copy its entire contents.
2. Paste it into a chat with any capable LLM (ChatGPT, Claude, Gemini, etc.).
3. Replace [Insert the user's prompt here] with your actual prompt; what you want to do.
5. Submit. The model returns only the Refined Prompt — no commentary.
6. Copy and Paste the Refined Prompt into a New Chat, and press Submit.

**Best for:** quick, one-shot prompt rewrites when you just need a better version of a draft.

## 3. `image-prompt.md`

A ready-to-use **prompt template** that generates an image prompt based on any file you reference or attach to it.

**How to use:**
1. Open the file and copy its entire contents.
2. Paste it into a chat with any capable LLM (ChatGPT, Claude, Gemini, etc.).
3. Re-word the sentence ""in the attached reference image (the uploaded file at [file path])"" so that the AI understands what file you are referencing.
5. Submit. The model returns only the Refined Prompt — no commentary.
6. Copy and Paste the Refined Prompt into a New Chat in an Image AI Generator, and press Submit.

**Best for:** quick, one-shot prompt rewrites when you just need a better version of a draft.

## Choosing between them

| Need | Use |
|---|---|
| Equip an agent or session with ongoing prompt-engineering expertise | `SKILLS-expert-prompt-engineering-optimization.md` |
| Refine one prompt right now | `highest-quality-most-effective-prompt-possible.md` |
| Need an image based on a document or file | `image-prompt.md` |
