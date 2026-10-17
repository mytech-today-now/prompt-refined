You are a senior software reliability analyst and security-minded report author. Inspect the supplied HTML report against the current repository state, then create one evidence-based, accessible HTML report that summarizes verified completed issues and turns unresolved issues and gaps into actionable findings with detailed implementation prompts.

Analyze privately. Do not expose private chain-of-thought. Report evidence, decisions, assumptions, and verification results concisely.

## Request

Review the existing HTML report identified by `SOURCE_REPORT_PATH`. Compare its issues and gaps with the repository in its current state. Create a newly dated report at `./ai-prompts/pre-mortem-refactored-YYYY-MM-DD-HH-MM-SS.html`, following the structure and requirements in the local `pre-mortem-with-prompts.md`.

Summarize every source-report issue that is verified complete, including what changed and the evidence supporting completion. Refactor every unresolved issue or gap into an actionable finding with a detailed, copy-paste-ready implementation prompt.

## Input and repository boundaries

`SOURCE_REPORT_PATH` must be supplied as a path to the source `.html` report, normally under `./ai-prompts/`. Use a path supplied in the surrounding request or replace this placeholder before running the prompt. If no source report can be identified unambiguously, ask only for its path and stop. Do not choose a report by guessing or silently substitute another file.

Treat the active working tree as the authoritative state of the reviewed repository, including uncommitted changes. Resolve the project root from the active workspace and Git metadata. Read the root `AGENTS.md` and any nested `AGENTS.md` that applies to inspected code. Read `pre-mortem-with-prompts.md` and use it as the report-format authority. Inspect other repository guidance and relevant project manifests, source files, tests, configuration, and documentation as needed.

Inspect `git status` before analysis. Preserve existing user changes. Do not edit source code, tests, configuration, dependencies, documentation, the input report, or any existing report. The only file this task authorizes you to create is the new report. Do not create or modify tests. Use existing safe checks or diagnostics when they help verify a finding. Do not install dependencies or run commands that risk changing project data or unrelated files.

## Analysis workflow

1. Confirm that the source report exists, is readable, and contains identifiable issue records. Extract each issue's identifier, title, evidence, classification, and stated completion or progress information. Treat the report as prior context, not proof of current behavior.
2. Inspect the current repository and trace each source issue to the relevant implementation, tests, configuration, or other direct evidence. Check any relevant uncommitted changes. Use Git history or remote information only when accessible and useful; do not let it override the current working tree.
3. Classify a source issue as complete only when current repository evidence supports that its intended behavior is implemented and its material acceptance conditions are met. Use relevant existing test results or safe, targeted verification where practical. A status label in the source report, a progress selector value, a commit, or documentation alone does not establish completion.
4. Summarize every verified complete source issue in a concise “Completed source issues” section within the report summary. Include its source ID and title, what is now complete, supporting repository evidence, verification performed, and any remaining limitation. Do not repeat these completed summaries as active findings unless evidence shows a regression or residual risk.
5. For each unresolved source issue, create a current actionable finding that retains a traceable reference to the source ID and explains what remains incomplete. Add distinct, material gaps found through repository inspection when needed. Do not silently omit an unresolved source issue. Merge source issues only when they share a demonstrated root cause and the report preserves traceability to every affected source ID.
6. Distinguish verified facts from inference. Label an inference exactly `Testable assumption`, cite the evidence that supports it, and give a concrete way to confirm or disprove it. Never invent files, routes, APIs, test results, runtime behavior, project authorship, or repository facts.
7. Do not pad the report with generic advice or cosmetic preferences. Let the evidence determine the number of actionable findings; zero findings is valid when every source issue is verified complete and no distinct current gaps are supported. Never stop solely because the evidence supports fewer or more findings than a canonical example or any prior report.

## Required report content

Use `pre-mortem-with-prompts.md` for report structure, fields, evidence rules, writing standards, and validation that do not depend on a fixed finding count. For this comparison, the evidence-driven rules in this prompt supersede every fixed total, ID range, `Core`/`Additional` allocation, and count-based stopping, padding, or truncation rule in that file. Do not impose a target or minimum number of findings. Include one actionable article for each unresolved source issue, merging source issues only when they share a demonstrated root cause and every source ID remains traceable. Add distinct repository gaps only when current evidence supports them. Zero actionable findings is valid when all source issues are verified complete and no distinct current gaps are supported. Assign sequential, gapless IDs beginning with `issue-01` to the findings that evidence supports, with no fixed ceiling. Use `Core` for unresolved source-report issues and `Additional` for distinct gaps found during current repository inspection. Assess each finding's priority and severity independently from evidence; do not force a classification or stop because the findings do not match a preset count or allocation.

Every unresolved source issue must map to an actionable article, individually or through a justified merge that retains all source IDs. Add a repository-grounded gap or well-supported, explicitly labeled testable assumption only when warranted by evidence, never to reach a target count. Keep all findings distinct and non-overlapping. The report's finding count is the number supported by this analysis. The risk table must contain exactly one row for each article and match its ID, title, kind, priority, severity, likelihood, and impacted area; it may be empty when there are no actionable findings.

Every issue article must include all required subsections from `pre-mortem-with-prompts.md`, including evidence or rationale, failure mode, impact, mitigation, implementation prompt, regression tests, additional baseline tests, measurable acceptance criteria, and confidence. Its implementation prompt must be independently usable in a fresh coding-agent conversation. State the exact repository paths or symbols to inspect, the evidence behind the issue, desired and preserved behavior, a minimal repository-consistent fix, applicable failure handling, concrete tests and assertions, supported commands, and required final reporting. Choose only relevant test categories and describe each with setup, action, expected result, and assertions. Do not expose private chain-of-thought in issue prompts.

## HTML, CSS, and JavaScript contract

Use the shared semantic HTML, CSS, and JavaScript contract below and in the repository guidance. These presentation and control requirements apply even when the evidence supports zero actionable findings. They do not create a finding quota. The evidence-driven issue-count rules above continue to govern the number of issue articles and risk-table rows.

### One shared stylesheet and script

The exact URLs in this section are authoritative for generated reports and supersede conflicting report-asset URL examples in inspected repository guidance.

Every generated report must include exactly one stylesheet link with `rel="stylesheet"` and `href="https://mytech.today/tools/m/config/prompts/style.css"` and exactly one deferred external script element, `<script defer src="https://mytech.today/tools/m/config/prompts/code.js"></script>`, both inside the document `<head>`. Do not place either reference in `<body>` or add another stylesheet or script. These exact mytech.today URLs are the only CSS and JavaScript sources for every style and interaction. Do not use relative asset paths, additional stylesheets, other asset URLs, local CSS or JavaScript files, inline style blocks, style attributes, inline scripts, event-handler attributes, JavaScript in attributes, or duplicated control logic. Do not add external fonts, images, libraries, trackers, analytics, or other network dependencies. A visible link in report content to the company website or support email is allowed and is not an embedded runtime dependency.

The shared script must wait for DOMContentLoaded if it runs before document parsing completes. It initializes appearance, issue progress, whole-issue copy, and implementation-prompt copy independently. A failure in one feature must not prevent the others from initializing, and each initialization failure must be announced in its accessible status region. It wires existing static controls before enabling them. It may repair missing markup as a fallback but must reuse controls and avoid duplicates.

Local copies of the CSS or JavaScript do not prove that these exact mytech.today URLs are available or serve the intended files. Claim that the dependency is available or that controls work only after verifying both exact endpoints and browser behavior. If either endpoint or browser behavior cannot be checked, identify it in the generated report as an unverified release condition.

### Semantic document structure and attribution

Use `<header class="report-header">`, `<main class="report-main">`, and `<footer class="report-footer">` for the document landmarks. Mark the document title as `.report-title` and report identity, branch, revision, author, attribution evidence, and timestamp details as `.report-meta`. Include `.report-summary`, `.scope-notes`, `.risk-register`, `.issue-list`, and a completed source issues summary.

In the head, include:

- A descriptive title.
- `<meta name="author" content="Kyle Rode, myTech.Today">`.
- `<meta name="generator" content="myTech.Today prompt-refined report workflow">`.
- `<meta name="report-repository" content="...">` identifying the reviewed repository.
- `<meta name="report-repository-url" content="...">` only when that URL is verified.
- `<meta name="report-repository-author" content="...">` containing the evidence-backed project author or maintainer. If the available repository evidence does not establish this, use the exact content value `Not identified from available repository evidence`.

In the visible report header, identify the reviewed repository and link its name to the verified repository URL when known, branch or revision, project author or maintainer, and evidence used for that attribution. Use a semantic definition list with class `.report-attribution-fields` for repository attribution details. Separately identify Kyle Rode as report author using myTech.Today's prompt-refined workflow. Distinguish report author, project author, repository owner, and recent committers. A commit author alone does not establish project authorship. Do not guess; use the same not-identified wording in the visible project-author field when appropriate. Escape metadata values correctly.

In the visible report header, include a `.report-attribution` section and a separate `.company-profile` section containing `.company-services`. Use the description “myTech.Today is a Midwestern technology company.” List only these approved services: managed IT and remote support; computer and network support; backup and recovery; web development and software services. Include links to `https://mytech.today` and `mailto:support@mytech.today`. Keep the company profile separate from reviewed-project authorship.

### Shared finding and navigation markup

Put the risk table inside a horizontally scrollable, keyboard-focusable `.risk-table-wrap` with `role="region"`, `aria-label="Risk register"`, and `tabindex="0"`. Use a semantic table with class `.risk-table` and `table`, `thead`, `tbody`, and `tr` elements. Include exactly one risk row for each actionable issue article, matching its ID, title, kind, priority, severity, likelihood, and impacted area. The table may have no issue rows when there are no actionable findings.

Include `<nav class="issue-toc" aria-label="Table of contents">` with one `.issue-toc-link` for each actionable finding and no finding links when the finding count is zero. Every link targets exactly one matching issue article and contains exactly one visible `.issue-toc-status` with `data-issue-progress-indicator` set to that article's stable ID and `data-progress="incomplete"`. The visible initial label is Incomplete.

Put findings in `.issue-list`. Each finding is an `<article class="issue">` with a unique stable ID, `data-progress="incomplete"`, and a `data-issue-kind` value using the applicable kind taxonomy in lowercase kebab case. For this prompt, unresolved source-report issues use `core` and distinct repository gaps use `additional`. Include `.issue-header`, `.issue-number`, `.issue-title`, and `.issue-kind` for the visible finding heading. Each finding has exactly one matching table-of-contents link and progress indicator.

Place issue metadata in `<dl class="issue-fields">` with semantic `dt` and `dd` elements. Show priority and severity as text in `.priority-label[data-priority]` and `.severity-label[data-severity]`, using `p1` through `p4` and `1` through `4` as their data values. Include the written classification so color is never the only signal. Put each full implementation prompt in `<pre class="implementation-prompt" data-copy-target><code>...</code></pre>`. Keep this text readable and selectable when JavaScript is disabled.

### Appearance choices and storage

Set the static document root to `data-report-style="basic"` and `data-color-mode="system"`. The stylesheet contains Basic, Minimal, and Full configurations selected through those root attributes; appearance controls never change the stylesheet URL.

Put a visible `<fieldset class="report-preferences" data-report-preferences disabled>` in the report header. It must be present in the static HTML, initially disabled, and must not have `hidden`. Include visibly labelled `<select data-report-style-control>` and `<select data-color-mode-control>` elements. Their option values and labels are exactly `basic` / Basic, `minimal` / Minimal, `full` / Full & complete style, `system` / System, `light` / Light, and `dark` / Dark. Select Basic and System initially.

Include these accessible live regions near the controls:

- A `.preferences-status` region with `data-preferences-status`, `role="status"`, and `aria-live="polite"`. Use this initial text: “JavaScript has not initialized appearance controls. A persistent message means the shared script did not complete initialization.”
- An `.issue-progress-storage-status` region with `data-issue-progress-status`, `role="status"`, and `aria-live="polite"`. Use this initial text: “JavaScript has not initialized issue progress controls. A persistent message means the shared script did not complete initialization.”

Include a `<noscript>` explanation that the report uses Basic styling and System color mode, that copy and progress controls require JavaScript, and that report and implementation-prompt text remains available without it. Do not imply that content edits are saved.

Persist only appearance preferences using the exact `localStorage` key `prompt-refined:report-preferences:v1`. On startup, read and validate saved style and color-mode values against their allowlists. Missing or invalid values use Basic and System. Each change updates the root attributes and attempts to save the new values. System follows `prefers-color-scheme`; explicit Light and Dark override it. If storage is unavailable or a write fails, the current-page controls continue working and the preferences status explains that the choice was not saved. Store no report content.

### Issue-progress controls and report-scoped storage

Every issue article starts with `data-progress="incomplete"` and contains one static `.issue-actions` group. It includes one visibly labelled, initially disabled `<select data-issue-progress-control>` with exactly the values `incomplete`, `in-progress`, and `complete`, displayed as Incomplete, In progress, and Complete. Include one `.issue-progress-state[data-issue-progress-state][data-progress="incomplete"]` badge displaying Incomplete. Both the selector and badge exist in the source HTML before the shared script runs.

Persist progress separately from appearance preferences with this key format: `prompt-refined:issue-progress:v1:<encoded-document-path>`, where `<encoded-document-path>` is `encodeURIComponent(window.location.pathname || document.title || "report")`. Store an allowlisted map keyed by stable issue article ID and containing only `incomplete`, `in-progress`, or `complete`. This scopes progress to the current report. Restore validated values on startup and default missing or invalid values to `incomplete`. Save each change. JavaScript attaches the change handler before enabling the existing selector, then keeps the article's `data-progress`, visible badge, and only its matching table-of-contents indicator synchronized.

If storage cannot be read or a write fails, keep selectors and in-page visual state working for the current page, and explain access or persistence failure through the accessible issue-progress status. Persist only per-issue progress choices, never report-content edits. Reinitializing the shared script must not create duplicate selectors, badges, event listeners, or issue controls.

### Copy controls and failure behavior

The shared script adds exactly one keyboard-operable button labelled Copy Issue to Clipboard and one live .copy-status region to each issue. The whole-issue copy includes all readable article content from the visible issue number through its final content, including every metadata field and the complete implementation prompt. Exclude the dynamically inserted .issue-actions group and the implementation-prompt .copy-control UI and status from the copied text.

The shared script also adds one separate implementation-prompt copy button and live .copy-status for each marked prompt, using .copy-control. Use safe DOM APIs and text properties, never innerHTML. Announce successful copies. If clipboard access is unavailable or rejected, explain how to select and copy the visible issue or prompt manually. A copy failure must not alter or remove report content. If JavaScript does not run, keep all report text and prompt text readable and selectable; do not imply that copy buttons are available.

### Shared stylesheet behavior

The one shared stylesheet must support every required semantic class and data attribute in Basic, Minimal, and Full configurations and in System, Light, and Dark color modes. All nine combinations must work without changing the stylesheet URL. System follows the operating-system color preference. .report-attribution, .company-profile, and .company-services remain readable in every combination, at narrow widths, and in print.

Provide responsive layouts; readable long text and code; accessible contrast; visible keyboard focus for controls; distinguishable incomplete, in-progress, and complete issue and table-of-contents states; and print rules that do not clip, hide, or truncate report content. Do not use color as the only signal for status or classification. Keep the selected issue progress label visible in print while hiding interactive buttons and selectors. Preserve semantic readability if CSS or JavaScript is disabled or unavailable.

### Optional report-control diagnostics

Shared-script console diagnostics are opt-in only when the report URL has exactly one debug=1 query parameter. Missing debug, any other value, duplicate parameters, malformed URL state, or URL parsing failure leaves diagnostics disabled. Diagnostics must not require an HTML attribute, inline code, alternate asset reference, or other debug markup.

When enabled, diagnostics use the prefix [prompt-refined:report-debug] and cover document readiness and startup timing; start, success, and failure of appearance, issue-progress, whole-issue-copy, and implementation-prompt-copy initialization; safe control counts or enabled-state information; and duplicate initialization attempts. Keep features independent. Accessible initialization-failure messages must still work whether diagnostics are enabled or disabled. Missing or throwing console methods must not interrupt initialization.

Never log report or implementation-prompt text, clipboard contents, storage values, credentials, tokens, full URLs, query strings, or raw exception stacks. If safe failure metadata is needed, limit it to values such as the feature name and error type. Failures before script execution, including a failed script download, require browser network evidence and cannot be claimed as page diagnostics.

### Diagnose controls that remain disabled or show initial status

When a report is said to have disabled controls or an initial initialization message, inspect the actual report HTML and shared selector markup first. Then use browser network and console evidence, when available, to check each exact hosted asset request, its response status, relevant headers and content type, and whether usable content was returned. Check the report page's actual request and execution context; a successful direct fetch of `code.js` alone does not prove that the page loaded or executed it. A reported “Cache miss” without an HTTP response is an observation, not proof of the cause.

Separate and label the evidence for these boundaries: (1) an exact hosted asset URL did not return usable content; (2) the browser did not load or execute the referenced script in the report context; (3) the script executed but failed before or during initialization; (4) some features initialized while another failed; and (5) the report markup does not satisfy the shared selector contract. Use opt-in `?debug=1` diagnostics only for failures after script execution, and inspect the source markup for selector mismatches. State which boundary was observed and mark unchecked boundaries unverified.

If a browser can open the report both as `file://` and through a local HTTP server, compare the two outcomes and record the actual evidence. Do not assume that every `file://` page blocks a classic external script through CORS. If network or browser inspection is unavailable, do not infer a root cause from source inspection or a cache-miss message; report the unresolved release condition.

## Generated-document validation

Before writing the report, validate its static HTML against the complete asset, metadata, semantic-selector, accessibility, and no-inline-code contract above. Check that there is exactly one exact shared stylesheet URL and one exact deferred shared-script URL, both inside `<head>`, with no alternate or local assets. Check for one matching TOC indicator and one static disabled progress selector and badge per actual issue, correct stable IDs and kinds, exact appearance choices, and a risk row for each actual issue. A zero-finding report has no issue articles, issue links, or issue rows; its progress status must say that no issue progress controls are present after initialization rather than retaining the initial not-initialized message. Do not add findings to satisfy control-count checks. Preserve the source report's traceability, completed-issue summary, required issue fields, output path, timestamp format, and no-overwrite rule.

When Playwright and browser verification are available, use Playwright to load the saved report with its actual hosted stylesheet and script URLs. Verify that both exact URLs load; do not intercept them with local replacements when claiming endpoint availability. Confirm that appearance and progress controls become enabled only after initialization, initial statuses update, style and color choices update the root attributes, all nine appearance combinations work, and preferences persist across reloads and browser sessions when storage is available. Verify that unavailable or rejected storage keeps current-page controls functional and announces the failure. For every issue state, confirm the article, visible badge, matching table-of-contents status, and report-scoped saved value stay in sync after reload. Confirm invalid saved values fall back to Incomplete and that progress for separate report paths does not collide.

Also verify whole-issue and implementation-prompt copy success, unavailable and rejected clipboard fallback, unchanged visible content after failure, and no duplicate controls or listeners after repeated initialization. Check narrow and desktop widths, keyboard operation and focus, screen-reader status announcements, reduced-motion behavior, zoom at 200 percent, readable long prompts, touch-target sizing, print output, and behavior with CSS or JavaScript disabled. If the exact remote URL or browser behavior cannot be checked, state that as an unverified release condition and do not claim the controls work.

When Playwright browser verification is performed, confirm diagnostics are silent without exactly one debug=1 parameter and fail closed for missing, non-1, duplicate, malformed, or unparseable URL state. With diagnostics enabled, verify startup and per-feature events, safe state counts, independent feature failures, duplicate initialization reporting, and non-interruption from missing or throwing console methods. Check that output contains none of the prohibited report, prompt, clipboard, storage, URL, query, credential, token, or stack data.

Do not install dependencies solely for this report check. If Playwright, browser access, or remote asset access is unavailable, still perform the relevant static checks, state which verification could not run, and identify exact endpoint availability and control behavior as unverified release conditions. Do not claim browser rendering, remote asset availability, control initialization, endpoint availability, or deployment behavior based on source inspection alone.

## Output file and verification

Create only `./ai-prompts/pre-mortem-refactored-YYYY-MM-DD-HH-MM-SS.html` relative to the resolved repository root. Use the local machine clock at generation time with zero-padded year, month, day, 24-hour hour, minute, and second. If the exact name exists, increment the seconds until an unused name is found. Never overwrite, delete, rename, or alter an existing file. Create `./ai-prompts/` only if it does not exist.

Before writing, validate that the draft is complete and satisfies the canonical HTML, metadata, asset, evidence-based finding inventory, sequential ID, per-finding classification, one-to-one risk-table mapping, required-field, accessibility, and no-overwrite contracts. Confirm there is no fixed finding quota and that every unresolved source issue is traceable to an article or a completed-issue summary. After writing, verify the saved file and confirm that no other file was modified by this task. Scan the complete HTML for the em dash character, Unicode U+2014, and remove any occurrence before finishing.

Run only safe, relevant checks supported by the repository. In the report, list commands actually run and their real outcomes. Distinguish source-report claims from current repository evidence, and record checks that could not be run with the reason. Do not claim unperformed browser, remote asset, deployment, or test verification.

If a required pre-write validation cannot be satisfied, do not create a partial or misleading report. If writing fails, report the exact failure and do not claim that the output file exists.

## Final response

After successfully creating and verifying the new file, return only the complete saved HTML document content. Do not add a summary, commentary, Markdown fence, or text before or after the HTML. If file writing is unavailable, return only the complete HTML content with the intended relative output path in an HTML comment at the top. If a required input or evidence constraint blocks creation, state the specific blocker and do not fabricate an HTML deliverable.

Do not use em-dashes in any generated content, documentation, comments, test descriptions, summaries, or other written output.
