# Role and objective

Act as a senior software architect and evidence-driven application reviewer, with additional product, security, reliability, accessibility, and test engineering expertise where the repository calls for it.

Inspect the repository in which this prompt is run. Produce one actionable, evidence-based design review as an HTML report. Identify the repository’s current strengths and weaknesses, and assess whether alternative designs could improve reliability, user experience, developer velocity, cost, or long-term maintainability.

This is an analysis and roadmap task. Do not implement the report’s recommendations in application code. Preserve existing source changes and create only the report artifact.

# 1. Repository inspection and evidence

Before writing the report:

1. Read applicable `AGENTS.md`, `README.md`, contribution guidance, architecture documents, and relevant framework, build, deployment, and test configuration.
2. Inspect the working tree and current branch or revision. Preserve all pre-existing changes and generated reports.
3. Identify the languages, frameworks, runtimes, package managers, architecture, storage systems, external services, build tools, and test tools that repository evidence supports.
4. Trace relevant code, data, state, integrations, and user workflows. Look for existing implementations, tests, documentation, and established patterns before proposing changes.
5. Use source paths and line numbers, test names, configuration, or reproducible local observations to support findings. Distinguish verified facts from inferences and unknowns.
6. Do not expose secrets, personal data, or sensitive configuration in the report. Do not infer project authorship from commit history alone.
7. Research current external technologies only when a recommendation depends on facts that may have changed. Prefer official documentation and primary sources. Link supporting sources and state when a claim could not be verified.

Do not invent repository facts, user requirements, production behavior, costs, APIs, or test results. If evidence is unavailable, label the uncertainty and explain what could confirm it.

# 2. Review scope

Evaluate every applicable area below. Relate the assessment to this repository’s actual product and architecture. Closely related areas may share one review entry when their evidence and recommendation are the same.

- Application functions, code, content, routines, APIs, UI, UX, design, layout, administration, and user functionality.
- Architecture and system design; modularity and separation of concerns; code organization and folder structure; design patterns and intentional deviations; dependencies and package choices; state management; data flow and event handling; concurrency and asynchronous patterns; error handling, logging, and resilience.
- Performance, scalability, caching, cache invalidation, and resource optimization.
- Security, including authentication, authorization, input validation, secrets, vulnerability exposure, rate limiting, abuse prevention, key rotation, cryptography, dependency scanning, and software supply chain security.
- Observability, monitoring, analytics, telemetry, alerting, audit trails, deployment, CI/CD, infrastructure, configuration, environments, feature flags, progressive delivery, releases, canaries, rollbacks, load balancing, traffic management, cost optimization, cost attribution, and chargeback.
- Frontend framework alternatives, components and reuse, styling and theming, accessibility, internationalization, localization, responsive design, animation, interactions, forms, validation UX, browser compatibility, polyfills, and progressive enhancement.
- Backend and API alternatives, including REST, GraphQL, RPC, and event-driven designs; third-party integrations; domain modeling; search and indexing; file and media handling; background jobs and queues; and real-time options such as WebSockets, SSE, and long polling.
- Database choices, schemas, maintenance, optimization, migrations, schema evolution, automated migration tooling, partitioning, sharding, replication, data modeling, data residency, sovereignty, and geographic compliance.
- Testing strategy, including unit, integration, end-to-end, visual, contract, performance, security, accessibility, recovery, and chaos testing where relevant; developer experience and tooling; documentation; onboarding and contribution experience; maintainability; technical debt; and modernization paths.
- Versioning for APIs, schemas, code, and data; backups, disaster recovery, and business continuity; multi-tenancy; offline-first and PWA capabilities; discovery and filtering UX; notifications; privacy, consent, and user data rights; CDN and edge strategy; media optimization; workflows and automation; plugins, extensions, marketplaces, white-labeling, and theming; user onboarding and education; graceful degradation; A/B testing; incident response; administrative-tool accessibility; serverless or edge computing; AI/ML integration; content moderation; and localized data formats.

Do not recommend a fashionable replacement merely because it exists. Compare plausible alternatives with the current approach, including the option to retain the current design when evidence supports it. Do not manufacture problems to fill space or meet a finding count.

Include a coverage inventory so a reader can see how each listed area was handled. For each area, identify supported strengths and weaknesses and link any actionable review entry. Mark an area as not applicable or not verifiable when appropriate, with a short evidence-based reason. If no change is justified, say so and explain why.

# 3. Evidence-based recommendations

For each applicable area, provide a concrete review entry. Explain the current design, its evidence-backed strengths and weaknesses, and a viable alternative or reason to retain the existing design. Recommendations must describe a meaningful design, technology, structure, or workflow choice, not a cosmetic restatement of the current approach.

For every recommendation, assess:

- Expected benefits and downsides.
- Trade-offs against the current design and other plausible alternatives.
- Migration effort, dependencies, compatibility, and operational impact.
- Security, privacy, accessibility, reliability, performance, and cost risks as applicable.
- A practical migration sequence, including incremental adoption and rollback considerations when relevant.
- Priority and confidence, using consistent labels and explaining material uncertainty.

Do not present a preference as a defect. Distinguish observed weaknesses from potential improvements. Link factual claims to repository evidence or credible primary sources.

# 4. Required structure for each review entry

Use one semantic finding article per actionable recommendation or evidence-based retain decision. Assign a stable, unique ID such as `issue-01`. Use lowercase kebab case for its `data-issue-kind` value. Every review entry must contain these seven numbered parts:

1. **Description**: Name the area and describe the current design or behavior.
2. **Analysis**: Summarize evidence-backed strengths, weaknesses, assumptions, and relevant context.
3. **Suggestion(s) for remediation**: Describe concrete alternatives and a practical migration path. If no change is recommended, state that and explain the evidence and alternatives considered.
4. **Trade-offs**: Compare the recommendation with the current approach and other relevant options. Include effort, compatibility, and risk.
5. **Benefits and downsides**: State expected gains and costs in concrete terms where evidence permits.
6. **Recommended choice**: Give a clear recommendation, priority, confidence, and reasons. State what evidence or decision could change it.
7. **AI prompt**: Provide a complete, issue-specific prompt that a developer can paste into an IDE AI chat to implement only this recommendation.

Make every AI prompt independently usable. It must identify the relevant evidence and files, describe the desired behavior, define scope and acceptance criteria, require appropriate testing, and instruct the coding agent to inspect repository guidance and preserve unrelated work. It must not depend on another report entry to explain the task.  The AI prompt must be post-processed using `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/highest-quality-most-effective-prompt-possible.md`, replacing `[Insert the user's prompt here]` with the AI prompt draft. Return the post-processed, ready-to-use prompt, not a raw draft. If the template cannot be retrieved, report that limitation and do not claim post-processing occurred.

# 5. Beads and OpenSpec requirements for every AI prompt

Each embedded implementation prompt must require the coding agent to install or verify both Beads and OpenSpec before implementation, then use them throughout the work:

1. Inspect installed versions, official setup guidance, and any existing `.beads/` or `openspec/` state. Use the official projects at `https://github.com/gastownhall/beads` and `https://github.com/Fission-AI/OpenSpec` for installation guidance. Do not invent commands; confirm syntax using the installed tools’ help and official documentation.
2. If either tool is missing, install it using its official supported method and verify it works before implementation. Do not add either tool as an application runtime dependency. If installation is blocked, do not claim it succeeded or begin implementation; report the precise blocker.
3. Preserve existing Beads and OpenSpec data. Never reset, replace, bulk-close, or overwrite existing state. Initialize only what is missing and only through supported commands.
4. Create or update a Beads issue for the recommendation and an OpenSpec change containing its proposal, requirements, design, and small implementation tasks. Cross-reference their IDs and paths in both systems. Beads tracks ownership, dependencies, blockers, readiness, and completion. OpenSpec tracks the proposed change and its requirements and tasks.
5. Break work into small, reviewable increments. Make one narrowly scoped change at a time, update both planning records as work proceeds, and run the smallest relevant checks after each increment.
6. Keep the implementation limited to this recommendation. Do not proceed to another recommendation while this one remains incomplete or blocked.
7. If work cannot be completed in the current run, create a complete continuation prompt before stopping. It must describe the remaining steps, evidence, acceptance criteria, test status, and linked Beads and OpenSpec records. A continuation prompt can request another continuation when work remains, so progress can continue in small steps until complete. Do not generate a continuation prompt when the work is complete.
8. Any continuation prompt returned as a follow-up must be post-processed using `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/highest-quality-most-effective-prompt-possible.md`, replacing `[Insert the user's prompt here]` with the continuation draft. Return the post-processed, ready-to-use prompt, not a raw draft. Retain the Beads and OpenSpec requirements in every continuation. If the template cannot be retrieved, report that limitation and do not claim post-processing occurred.
9. Report verified tool versions, commands, Beads issue IDs and statuses, OpenSpec change paths and task statuses, cross-references, and incomplete or blocked work. Never claim an installation, update, check, or completion that was not verified.

Each implementation prompt must also require evidence-based implementation, focused tests for positive and negative paths, relevant boundary and regression coverage, and truthful reporting of commands and results. It must prohibit unrelated cleanup, fabricated repository details, skipped or weakened valid tests, and unsupported claims.

# 6. HTML report contract

Create exactly one HTML report containing the complete report content. Put the file in the ''./ai-prompts' directory. Generate the './ai-prompts/' if it does not exist. Inspect existing report conventions and choose a non-overwriting output path that follows them. If none exist, use a unique `repository-design-review-YYYY-MM-DD.html` filename in the repository root. Never overwrite an existing file or another user change. Do not modify application source files.

Treat “self-contained” as meaning that all report content is in this one HTML document. The only permitted stylesheet and JavaScript dependencies are the shared hosted assets below:

```html
<link rel="stylesheet" href="https://mytech.today/tools/m/config/prompts/style.css">
<script defer src="https://mytech.today/tools/m/config/prompts/code.js"></script>