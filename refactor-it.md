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

Create exactly one HTML report containing the complete report content. Resolve the repository root from the active project and Git metadata, then put the report in `./ai-prompts/` relative to that root. Create `./ai-prompts/` only if it does not exist. Use this timestamped filename pattern, following the repository's existing report conventions:

`./ai-prompts/repository-design-review-YYYY-MM-DD-HH-MM-SS.html`

Use the local machine clock when generating the report. Use zero-padded year, month, day, 24-hour hour, minute, and second fields. If the candidate filename already exists, increment the seconds until an unused name is found. Never overwrite, delete, rename, or modify any existing report or other user file. Create only this new HTML artifact. Do not modify application source, tests, configuration, dependencies, or other repository files.

Treat “self-contained” as meaning that all report content is in this one HTML document. The only permitted stylesheet and JavaScript dependencies are the shared hosted assets below:

```html
<link rel="stylesheet" href="https://mytech.today/tools/m/config/prompts/style.css">
<script defer src="https://mytech.today/tools/m/config/prompts/code.js"></script>
```

The URLs above are the only permitted stylesheet and JavaScript sources. Include exactly one stylesheet link and exactly one deferred script reference, both inside `<head>`. Do not use relative paths, alternate or local assets, additional stylesheets or scripts, inline CSS, `style` attributes, inline JavaScript, event-handler attributes, external fonts, images, libraries, trackers, analytics, or other runtime network dependencies. A visible research citation or company link is not a runtime dependency.

Verify both exact hosted endpoints and that each returns usable content before claiming that the shared assets are available. A local file or upload result is not endpoint verification. Claim that report controls work only if the exact endpoints and browser behavior are verified. If endpoint access or browser verification is unavailable, identify it as an unverified release condition and do not claim availability or working controls. Do not add an inline fallback.

# 7. Shared HTML and control contract

Use the shared semantic markup and stable selectors from the current repository `AGENTS.md`:

- Start with `<!doctype html>` and `<html lang="en" data-report-style="basic" data-color-mode="system">`. Include UTF-8 and responsive viewport metadata, a descriptive `<title>`, and the single stylesheet link and deferred script shown above in `<head>`.
- Include `<meta name="author" content="Kyle Rode, myTech.Today">`, `<meta name="generator" content="myTech.Today prompt-refined report workflow">`, and `<meta name="report-repository" content="...">`. Include `<meta name="report-repository-url" content="...">` only when the repository URL is verified. Set `<meta name="report-repository-author" content="...">` to the evidence-backed project author or maintainer, or exactly `Not identified from available repository evidence` when authorship cannot be established. Escape metadata values correctly.
- Use `<header class="report-header">`, `<main class="report-main">`, and `<footer class="report-footer">`. Mark the report title `.report-title` and relevant identity, branch or revision, author, evidence, and timestamp metadata `.report-meta`. Include `.report-attribution` identifying the reviewed repository and evidence-backed project author or maintainer. In the visible header, identify the repository, verified URL when known, branch or revision, author attribution and its evidence, and report author Kyle Rode using myTech.Today's prompt-refined workflow. Distinguish report author, project author, repository owner, and recent committers. Do not infer project authorship from a commit alone.
- Include a visible `.company-profile` in the header stating `myTech.Today is a Midwestern technology company.` Put the approved service list in `.company-services` and include only these services: managed IT and remote support; computer and network support; backup and recovery; and web development and software services. Include links to `https://mytech.today` and `mailto:support@mytech.today`. Keep this attribution separate from the reviewed repository's authorship.
- Put the executive summary in `.report-summary` and scope, methodology, assumptions, and limitations in `.scope-notes`. Include a coverage inventory for every area listed in section 2. For each area, state evidence-backed strengths and weaknesses, link applicable review entries, or mark it not applicable or not verifiable with a concise reason. Include a concise `Verification performed` subsection in `.scope-notes` listing relevant commands or checks actually run, their outcomes, and relevant checks not run with the reason.
- Put review entries in `.issue-list`. Each entry is an `<article class="issue" id="issue-01" data-issue-kind="..." data-progress="incomplete">` with a stable, unique, sequential ID, visible issue number, `.issue-header`, `.issue-number`, `.issue-title`, and visible `.issue-kind`. Use lowercase kebab case and one primary value from this taxonomy for `data-issue-kind`: `application-functionality`, `architecture`, `reliability`, `performance`, `security`, `privacy`, `observability`, `operations`, `deployment`, `integration`, `data`, `testing`, `accessibility`, `user-experience`, `developer-experience`, `compatibility`, `cost`, or `maintainability`.
- Give each article one `.issue-fields` definition list using `<dt>` and `<dd>` for applicable review metadata. Show priority and severity using visible text in `.priority-label[data-priority]` and `.severity-label[data-severity]`. Priority values are `p1` through `p4`; severity values are `1` through `4`. Include written classifications so color is never the only signal. Use P1 as highest priority and P4 as lowest. Use Severity 1 (Critical), 2 (High), 3 (Medium), and 4 (Low). Apply these consistently based on evidence, without imposing a required count or combined classification.
- Include `<nav class="issue-toc" aria-label="Table of contents">` with exactly one `.issue-toc-link` per article. Each link contains one visible matching `.issue-toc-status[data-issue-progress-indicator="issue-01"][data-progress="incomplete"]` that displays `Incomplete` initially. IDs, links, indicators, and articles must match one-to-one. If there are no actionable entries or material retain decisions, do not invent any; explain the result in the summary and coverage inventory, and do not create placeholder issues.
- Include a `.risk-register` with a horizontally scrollable, keyboard-focusable `.risk-table-wrap` and semantic `.risk-table`. Use a focusable region wrapper with `role="region"`, `aria-label="Risk register"`, and `tabindex="0"`. Include one data row for each actual issue and keep its ID, title, kind, priority, severity, impacted area, and risk or trade-off consistent with that article. If there are no issue articles, use no data rows and explain why in the report.
- Keep the required seven numbered parts in each article: Description, Analysis, Suggestion(s) for remediation, Trade-offs, Benefits and downsides, Recommended choice, and AI prompt. The article's implementation-prompt text must be in `<pre class="implementation-prompt" data-copy-target><code>...</code></pre>`, remain readable and selectable without JavaScript, and include the complete post-processed prompt required by section 4.

Every article starts with `data-progress="incomplete"` and has one static `.issue-actions` group containing one visibly labelled, initially disabled `<select data-issue-progress-control>` and one `.issue-progress-state[data-issue-progress-state][data-progress="incomplete"]` badge displaying `Incomplete`. The select has exactly these values and labels: `incomplete` / `Incomplete`, `in-progress` / `In progress`, and `complete` / `Complete`. Include the controls in static HTML before JavaScript runs. The shared script adds one keyboard-operable `Copy Issue to Clipboard` button and `.copy-status` to each issue, and retains a separate implementation-prompt copy button and status for each prompt. Do not duplicate these script-provided controls in the static HTML.

Add one visibly present `<fieldset class="report-preferences" data-report-preferences disabled>` in the report header. It must not have `hidden`. Include visibly labelled `<select data-report-style-control>` options `basic` / `Basic`, `minimal` / `Minimal`, and `full` / `Full & complete style`; include `<select data-color-mode-control>` options `system` / `System`, `light` / `Light`, and `dark` / `Dark`. Select Basic and System initially. Place these accessible live regions outside disabled form controls, near their related controls: `<p class="preferences-status" data-preferences-status role="status" aria-live="polite">JavaScript has not initialized appearance controls. A persistent message means the shared script did not complete initialization.</p>` and `<p class="issue-progress-storage-status" data-issue-progress-status role="status" aria-live="polite">JavaScript has not initialized issue progress controls. A persistent message means the shared script did not complete initialization.</p>`. Include a `<noscript>` explanation that report text remains readable, while interactive controls require JavaScript.

The single `js/code.js` asset must wait for `DOMContentLoaded` when needed; initialize appearance, issue progress, whole-issue copy, and prompt copy independently; announce initialization failures in their accessible status regions; wire controls before enabling them; and avoid duplicate controls or event listeners on reinitialization. It may repair missing markup as a fallback but must reuse existing controls. The selectors remain visible and disabled if JavaScript does not initialize. Keep report content understandable if CSS or JavaScript is unavailable.

Persist only the two appearance choices in `localStorage` with the exact key `prompt-refined:report-preferences:v1`. Safely handle storage read and write failures. Validate restored values, use Basic and System defaults for missing, invalid, or unreadable values, update storage on changes, and apply current-page changes even if storage writes fail. System mode follows `prefers-color-scheme`; explicit Light and Dark override it. Explain storage failures in `.preferences-status`. Appearance changes update only the root data attributes and saved preferences, never the stylesheet URL. Do not imply that report-content edits persist.

Persist issue progress separately with the exact key `prompt-refined:issue-progress:v1:<encoded-document-path>`, where `<encoded-document-path>` is `encodeURIComponent(window.location.pathname || document.title || "report")`. Store only an allowlisted map keyed by each stable issue article ID with values `incomplete`, `in-progress`, or `complete`. Safely handle storage read and write failures. Validate restored values, use `incomplete` for missing, invalid, or unreadable values, and save each change. Keep the current page's controls and visible state functional if storage is unavailable or a write fails, and explain that progress will not persist in the accessible status region. Changing progress synchronizes the article's `data-progress`, its visible state badge, and only the matching TOC status. When there are no issue articles, announce after successful initialization that no issue progress controls are present. Do not persist report-content edits.

The script copies the complete issue from its visible number through its final content, including issue fields and the full implementation prompt, while excluding injected `.issue-actions`, `.copy-control`, and copy status UI. It adds one `.copy-status` live region for each issue and prompt. Build controls with safe DOM APIs and text properties, never `innerHTML`. Announce clipboard success. If clipboard access is unavailable or rejected, explain how to select and copy the visible issue or prompt manually. Copy failures must not change or remove report content.

The one shared `style.css` must support the selector contract in Basic, Minimal, and Full configurations and System, Light, and Dark color modes. All nine combinations must use the same stylesheet URL. Support responsive layouts, readable long text and code, accessible contrast, visible keyboard focus, distinguishable incomplete, in-progress, and complete issue styling and TOC badges, and print rules that do not clip or truncate content. Keep the selected issue status visible in print while hiding interactive controls. Keep `.report-attribution`, `.company-profile`, and `.company-services` readable across all styles and color modes, at narrow widths, and in print. Do not rely on color alone for status or classification.

# 8. Report validation

Before writing the file, validate the draft against the repository instructions and this prompt. Use available repository-supported checks and do not add dependencies. At minimum:

1. Confirm the report is a complete HTML document with the required landmarks, metadata, author attribution, summary, scope notes, coverage inventory, risk register, findings, and footer.
2. Confirm there is exactly one stylesheet link to `https://mytech.today/tools/m/config/prompts/style.css` and exactly one `<script defer src="https://mytech.today/tools/m/config/prompts/code.js"></script>`, both inside `<head>`. Confirm there are no relative or alternate assets, extra stylesheets or scripts, inline CSS or JavaScript, style attributes, event handlers, or unapproved runtime dependencies.
3. Confirm Basic/System defaults; exact appearance choices; visible, initially disabled preference and progress controls; the required initial status messages; the noscript explanation; and the exact preference and report-scoped progress storage keys and allowlists in the contract.
4. Confirm each actual issue has one unique sequential ID, one taxonomy-matching kind, one matching TOC link and status, one static disabled progress selector and badge, the complete seven-part structure, and a prompt that is independently usable and post-processed as required. Confirm risk-table rows map one-to-one to actual findings. Do not enforce a fixed issue count or create findings to satisfy a count.
5. Confirm priority and severity labels are visible and consistent, HTML values are escaped, implementation prompts remain selectable, and no content depends on JavaScript or clipboard access.
6. Scan the complete report for the em dash character U+2014 and remove every occurrence. Do not use em dashes in generated report content, implementation prompts, comments, test descriptions, summaries, or other written output.
7. Choose an unused output path before writing. After writing, verify that the saved file exists and is complete, that no existing report was changed, and that no file other than the new report was modified by this task.

When browser verification is available, load the saved report using its actual hosted stylesheet and script URLs. Verify both exact endpoints return usable content; appearance controls enable only after initialization; status messages update; appearance choices update the root data attributes without changing the stylesheet URL; all nine appearance combinations render; and choices persist or fail accessibly as specified. For each issue, verify all three progress values synchronize the article, badge, matching TOC status, and report-scoped stored value across reloads. Verify invalid stored values fall back to Incomplete, separate report paths do not collide, and storage failures preserve current-page operation. Verify whole-issue and prompt copy success, unavailable and rejected clipboard fallback, unchanged visible content after failure, and no duplicate controls or listeners after reinitialization. Check narrow and desktop layouts, keyboard focus and operation, status announcements, long prompt wrapping, print output, and CSS- and JavaScript-disabled readability. Do not install dependencies solely for this report. If remote endpoints or browser behavior cannot be verified, identify them as unverified release conditions and make no availability or control-functionality claim.

In the report, distinguish repository inspection, commands actually run, and observed results from assumptions and unverified behavior. Do not claim tests, browser checks, external research, endpoint availability, runtime behavior, or deployment activity that was not verified. If a required validation is blocked, state the exact limitation rather than fabricating evidence.

# 9. Final output

After successfully creating and verifying the report, return only the complete saved HTML document content. Do not add a preamble, summary, Markdown fence, or commentary before or after it. The report itself must state its timestamp and output path. If report creation is blocked or writing fails, state the specific blocker and do not claim that the file exists. Do not return a partial or misleading report.
