generate a detatiled, verbose, accurate 'description' of the work necessary to refactor the application to deal with the:"""

Refactor the application to fix this issue:"The worktree already contains extensive unrelated edits"
The extensive unrelated edits need to be turned into a series of individual AI prompts in a new html file 'pre-mortem-[YYYY]-[MM]-[DD]-[HH]-[MM]-[SS]-unrelated-cleanup.html', with the prompts post-processed with the Template.  Each item/issue will have the following structure per container in the html file:""
Issue [#] / 16
Title:
Kind:
Priority:
Severity:
Likelihood:
Impacted area:
Failure mode:
Evidence or rationale:
Why this matters:
Implementation prompt: [This is the main Prompt that drives the refactoring.]
Tests (where applicable):
- Unit Testing:
- Integration Testing:
- System Testing:
- Acceptance Testing:
- End-to-End Testing:
- Smoke Testing:
- Sanity Testing:
- Regression Testing:
- Functional Testing:
- Non-Functional Testing:
- Performance Testing:
- Load Testing:
- Stress Testing:
- Spike Testing:
- Soak Testing:
- Scalability Testing:
- Security Testing:
- Penetration Testing:
- Usability Testing:
- Accessibility Testing:
- Compatibility Testing:
- Cross-Browser Testing:
- Mobile Testing:
- API Testing:
- UI Testing:
- Database Testing:
- Black Box Testing:
- White Box Testing:
- Grey Box Testing:
- Manual Testing:
- Automated Testing:
- Exploratory Testing:
- Ad-hoc Testing:
- Mutation Testing:
- Static Testing:
- Dynamic Testing:
- Alpha Testing:
- Beta Testing:
- Recovery Testing:
- Localization Testing:
- Additional baseline tests:
Acceptance criteria:
Confidence:
""


The generated HTML must use the repository's shared report assets and semantic markup contract as its only CSS and JavaScript sources for every style and interaction. Use only these exact raw GitHub URLs:

- `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/css/style.css`
- `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/js/code.js`

Include exactly one `<link rel="stylesheet">` to `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/css/style.css` and exactly one deferred external `<script>` to `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/js/code.js`, both inside `<head>`. The script element must have `defer`. There is only one stylesheet file. Do not use relative asset paths or add alternate stylesheet links. Do not put CSS in `<style>` blocks or `style` attributes. Do not put JavaScript in inline script blocks, event handlers, or other attributes. Do not add local or alternate CSS/JavaScript files, other asset URLs, external fonts, images, libraries, trackers, analytics, or any other network dependencies. Do not claim these raw URLs are available until the matching files are committed and published on `main`.

Every generated report must identify the report author and the reviewed repository and its author or maintainer in document metadata and the visible report header. In `<head>`, include `<meta name="author" content="Kyle Rode, myTech.Today">`, `<meta name="generator" content="myTech.Today prompt-refined report workflow">`, `<meta name="report-repository" content="...">`, `<meta name="report-repository-url" content="...">` when a repository URL is verified, and `<meta name="report-repository-author" content="...">` with the evidence-backed author or maintainer of the reviewed project. Escape metadata values correctly. In `<header class="report-header">`, identify the reviewed repository and verified URL when known, branch or revision, project author or maintainer, and the evidence source for that attribution. Separately identify the report author as Kyle Rode using myTech.Today's prompt-refined workflow. Distinguish report author, project author, repository owner, and recent committers. A commit author alone is not proof of project authorship. If no reliable project authorship evidence is available, use `Not identified from available repository evidence` in `report-repository-author` and the visible project-author field; do not guess.

Include this concise company profile in the visible report header, separate from the reviewed project's authorship: `myTech.Today is a Midwestern technology company.` List these services: managed IT and remote support; computer and network support; backup and recovery; web development and software services. Include working links to `https://mytech.today` and `mailto:support@mytech.today`. Do not add other business claims or contact details.

Set `<html lang="en" data-report-style="basic" data-color-mode="system">`. The single `style.css` file contains Basic, Minimal, and Full configurations, plus System, Light, and Dark color modes. Include a static, visible, initially disabled appearance fieldset in the report header with labelled style and color-mode selects. Do not put `hidden` on the fieldset. The style selector uses values `basic`, `minimal`, and `full`, displayed as `Basic`, `Minimal`, and `Full & complete style`. The mode selector uses `system`, `light`, and `dark`, displayed as `System`, `Light`, and `Dark`. Select Basic and System by default. Include a `.preferences-status` live region whose initial message says JavaScript has not initialized the controls and that a persistent message means the shared script did not complete. Include a `<noscript>` explanation. `js/code.js` waits for `DOMContentLoaded` when needed, wires the static selectors, and enables them after initialization; it initializes appearance, progress, and copy features independently and announces initialization failures in their status regions. It may repair missing controls as a fallback but must not duplicate them.

Persist both appearance selections across reloads and browser sessions in `localStorage` using the exact key `prompt-refined:report-preferences:v1`. Validate saved values against the three allowed styles and modes. Missing or invalid values fall back to Basic and System. Control changes update the root data attributes and save immediately. System mode follows `prefers-color-scheme`; Light and Dark override it. If storage cannot be read or written, keep current-page selection working and report the persistence limitation in `.preferences-status`. Store only these nonsensitive appearance choices. Do not imply that report content edits are persisted.

Persist issue progress separately for this report. Use the key `prompt-refined:issue-progress:v1:<encoded-document-path>`, where `<encoded-document-path>` is `encodeURIComponent(window.location.pathname || document.title || "report")`. Store an allowlisted map from each issue article ID to `incomplete`, `in-progress`, or `complete`, so identical IDs in other report files do not share progress. Restore valid values on load, default missing or invalid values to `incomplete`, and save each change. If storage cannot be read or written, keep the controls and in-page changes working and explain the limitation in an accessible live region. Persist these progress choices only, not report content edits.

Use this shared semantic structure and selectors in the generated report:

- `<header class="report-header">`, `<main class="report-main">`, and `<footer class="report-footer">` for the document landmarks. Use `.report-title` for the document title and `.report-meta` for report author, repository identity, branch or revision, evidence-backed project author/maintainer, attribution evidence, and timestamp metadata. Include a `.report-attribution` section that identifies the reviewed repository and its author/maintainer, and a separate byline identifying report author Kyle Rode and the myTech.Today prompt-refined workflow. Include the `.company-profile` section with the required myTech.Today description, services, website, and support email. Keep report author, company information, and reviewed-project authorship distinct. Put the appearance fieldset in this header.
- Initialize the `<html>` data attributes to Basic/System. The visible, initially disabled `<fieldset class="report-preferences" data-report-preferences>` contains labelled `<select data-report-style-control>` and `<select data-color-mode-control>` controls, plus `<p class="preferences-status" data-preferences-status role="status" aria-live="polite">JavaScript has not initialized appearance controls. If this message remains, check that the shared script loaded and completed initialization.</p>`. Do not add `hidden` to the fieldset. Include `<p class="issue-progress-storage-status" data-issue-progress-status role="status" aria-live="polite">JavaScript has not initialized issue progress controls. If this message remains, check that the shared script loaded and completed initialization.</p>`. Add a `<noscript>` explanation that styling defaults to Basic and follows the system color preference; clipboard and issue-progress controls require JavaScript, while report text remains available.
- `.report-summary` for an executive summary and `.scope-notes` for scope and limitations.
- A `<nav class="issue-toc" aria-label="Table of contents">` with exactly one link to each issue. Each `.issue-toc-link` has a matching `.issue-toc-status[data-issue-progress-indicator="issue-01"][data-progress="incomplete"]` that displays `Incomplete` initially.
- `.risk-register` containing a keyboard-focusable `.risk-table-wrap` with `role="region"`, `aria-label="Risk register"`, and `tabindex="0"`, and a semantic `<table class="risk-table">` with exactly 16 data rows, one for each issue. Include issue number, title, Kind, priority, severity, likelihood, and impacted area, and keep each row consistent with its matching article.
- `.issue-list` containing exactly 16 `<article class="issue" data-progress="incomplete">` elements. Give each a stable unique ID from `issue-01` through `issue-16`, a visible sequential issue number, an `.issue-title` heading, an `.issue-kind` label, and a `data-issue-kind` value matching that issue's visible Kind after normalization to lowercase kebab case. Preserve the existing Kind field and do not change the 16-issue count. Match each article to exactly one TOC link and progress indicator by ID.
- Put issue metadata in `<dl class="issue-fields">` with semantic `<dt>` and `<dd>` elements. Mark visible priority and severity text with `.priority-label[data-priority]` and `.severity-label[data-severity]`. Keep the written labels so color is never the only classification signal.
- Put each complete Implementation prompt in `<pre class="implementation-prompt" data-copy-target><code>...</code></pre>`. Keep it visible and selectable when JavaScript is disabled.
- Each issue article starts with `data-progress="incomplete"` and contains exactly one static `.issue-actions` group with a visibly labelled, initially disabled `<select data-issue-progress-control>` using the exact values `incomplete`, `in-progress`, and `complete`, displayed as `Incomplete`, `In progress`, and `Complete`, plus one `.issue-progress-state[data-issue-progress-state][data-progress="incomplete"]` badge displaying `Incomplete`. The controls and badge exist in the HTML before the shared script runs. The script wires and enables each existing selector, persists allowlisted states using the report-scoped progress key above, and synchronizes each article's `data-progress`, visible progress badge, and matching TOC indicator. It may repair missing markup as a fallback without duplicating controls. Invalid values start as `Incomplete`. If storage fails, changes still update the current page and an accessible live region explains that progress will not persist.
- Add one button labelled `Copy Issue to Clipboard` for every issue. It copies the entire readable issue article from the visible number to the final content, including all issue fields, the complete Implementation prompt, tests, and acceptance criteria. Exclude injected controls and their status messages from copied text. Announce success or explain how to select and copy the visible issue if clipboard access is unavailable or rejected.
- Keep the separate implementation-prompt copy button and status after each marked prompt. Use safe DOM APIs and text properties, never `innerHTML`. Storage or clipboard failure must not change or remove report content, and repeated script initialization must not add duplicate controls or event listeners.

All three style configurations and all three color modes must use the same selectors and data attributes, readable long text and code, responsive layouts, accessible contrast, visible keyboard focus, visually distinguishable issue progress states and TOC badges, and print rules that do not clip or truncate content. Keep progress labels visible in print while hiding interactive buttons and selectors. Keep the report meaningful if remote CSS or JavaScript fails. A report's controls are active only if the exact published script URL loads and initializes; verify it before claiming success, or report that release condition as unverified. Include no other runtime assets.

Before saving the new report, verify that it has exactly 16 issue articles, 16 matching risk-table rows, 16 matching TOC links and progress indicators, and 16 static per-issue progress selectors and state badges. Verify that the static appearance fieldset is visible, disabled before initialization, and contains the expected controls; verify that every static issue progress selector is visible and disabled before initialization with the three exact states. The stylesheet link and deferred script must both be inside `<head>`. When browser verification is available, confirm the exact published script URL loads, the appearance fieldset and selects become enabled, and the initialization messages change. If the URL or browser behavior is unverified, report that release condition and do not claim the controls work. Preserve every required issue field and applicable test category above, use only the permitted raw URLs as the sole CSS and JavaScript sources, include no inline or alternate CSS or JavaScript, and retain full issue and prompt text if JavaScript or clipboard access is unavailable. Verify the document head and visible header identify the reviewed repository and evidence-backed project author/maintainer, label unknown authorship instead of guessing, and include the complete myTech.Today service and contact profile. Verify all nine appearance combinations, Basic/System defaults, persistence after reload, invalid saved values, and unavailable or rejected local storage. Change each issue through all three progress states and confirm the article styling, visible status, matching TOC indicator, and report-scoped persistence stay synchronized. Confirm that whole-issue copy includes the number through the end of the issue, excludes control UI, and gives a manual-copy fallback when clipboard access is unavailable or rejected. Confirm style and color selections do not change the stylesheet URL.

""".  The 'description' should be post-processed through a template:""https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/ai-feeder-prompt.md"" where the 'description' replaces ""Insert the user's software issue, defect, gap, feature request, or refactoring request here"" in the .md file and the template is processed through the AI, and those results are the actual new series of 'post-processed prompt(s)'.
