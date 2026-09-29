# Repository Guide

## Scope and working rules

- Treat the active checkout and working tree as authoritative. Inspect `git status`, the requested files, and relevant repository guidance before editing.
- Preserve existing user changes. Keep edits limited to the requested files, avoid unrelated cleanup, and do not overwrite existing generated reports.
- Make the smallest change that satisfies the request. Reuse the repository's existing prompts and assets instead of adding dependencies or a new build system.
- Run commands yourself when validation is requested. Report only checks that actually ran, with their outcomes. Distinguish local file checks from browser behavior and published or deployed behavior.
- Do not import product-specific commands or workflows from other repositories unless this repository adopts them explicitly.

## Repository purpose

This repository maintains reusable prompts and supporting guidance for prompt refinement and report generation. The report-generation prompts are inputs, not generated reports. Do not execute them to create report artifacts unless that output is explicitly requested.

When editing a report-generation prompt, preserve its existing purpose, output naming and safety rules, evidence requirements, and issue counts and fields. In particular:

- `pre-mortem-with-prompts.md` requires 20 issues: 15 Core issues classified as Priority P1 and Severity 1, plus 5 Additional issues that do not have that combined classification.
- `worktree-already-contains-extensive-unrelated-edits.md` requires 16 issues and retains its listed issue fields and applicable test categories.

Update all dependent wording and validation instructions together when a contract changes. Do not change either issue count to make the prompts appear uniform.

## Shared report assets

The centrally maintained report assets are:

- `css/style.css` (the only stylesheet, with Basic, Minimal, and Full configurations)
- `js/code.js` (the only JavaScript source for generated reports)

Generated HTML must load these exact raw GitHub URLs:

- `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/css/style.css`
- `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/js/code.js`

Use one stylesheet link to `style.css` and one deferred script element for `code.js`. Do not add another stylesheet, use relative asset paths, or substitute different URLs. These are the sole CSS and JavaScript sources for every generated HTML document, for every style and interaction. Do not add inline CSS, inline JavaScript, local CSS or JavaScript files, alternate asset URLs, or other runtime dependencies. The three visual styles are configurations inside `style.css`, selected through `data-report-style="basic|minimal|full"` on `<html>`, not separate files.

Generated reports default to Basic styling and System color mode. Include accessible style and color-mode selectors with Basic, Minimal, and Full & complete style options, and System, Light, and Dark options. `js/code.js` wires the controls to the root data attributes. System mode follows `prefers-color-scheme`; explicit Light and Dark modes override it.

Persist the two appearance preferences in `localStorage` under the documented, versioned key `prompt-refined:report-preferences:v1`. Read and validate stored values on startup, update storage on each change, and apply safe defaults if storage is missing, invalid, or unavailable. Appearance controls must work for the current page even if storage writes fail, and an accessible status must explain when preferences could not be saved. Store only these nonsensitive display preferences. Do not imply that report content edits are persisted.

Persist issue progress separately from appearance preferences. Use the key `prompt-refined:issue-progress:v1:<encoded-document-path>`, where `<encoded-document-path>` is `encodeURIComponent(window.location.pathname || document.title || "report")`. Store an allowlisted status map keyed by each issue article's stable ID, with values `incomplete`, `in-progress`, or `complete`. This scopes progress to the current report so matching issue numbers in different reports do not share state. Restore validated values on startup, default missing or invalid values to `incomplete`, and save each change. If storage is unavailable or rejects a write, the controls and in-page visual state must still work, and an accessible status must explain that progress will not persist. Persist only these per-issue progress choices, not report content edits.

The local existence of an asset does not prove that its raw URL is available. That availability depends on the corresponding file being committed and published on the `main` branch. Report this as a release condition when it has not been verified.

Do not add external fonts, images, libraries, trackers, analytics, or other network dependencies. Do not put CSS in `<style>` blocks or `style` attributes. Do not put JavaScript in inline `<script>` blocks, event-handler attributes, or other HTML attributes. `js/code.js` is the sole JavaScript source. Its behavior must remain optional, progressive, small, and safe when clipboard access is unavailable or rejected.

## Shared semantic HTML and selector contract

Both report-generation prompts must specify compatible semantic HTML and these stable classes and data attributes:

- A document `<header class="report-header">`, `<main class="report-main">`, and `<footer class="report-footer">`. Mark the document title `.report-title` and related branch, identity, or timestamp metadata `.report-meta` where present. In `<head>`, include a descriptive title, `<meta name="author" content="Kyle Rode, myTech.Today">`, `<meta name="generator" content="myTech.Today prompt-refined report workflow">`, `<meta name="report-repository" content="...">`, `<meta name="report-repository-url" content="...">` when verified, and `<meta name="report-repository-author" content="...">` for the reviewed project's evidence-backed author or maintainer. Use `Not identified from available repository evidence` when project authorship cannot be established. In the visible report header, identify the reviewed repository (link to its verified URL when known), branch or revision, project author/maintainer, and the evidence used to establish authorship. Also identify the report author as Kyle Rode using myTech.Today's prompt-refined workflow. Distinguish report author, project author, repository owner, and recent committers. Do not infer project authorship from a commit alone.
- Include a visible `.company-profile` in the report header for myTech.Today, described as a Midwestern technology company. Use the approved concise service list: managed IT and remote support; computer and network support; backup and recovery; and web development and software services. Include links to `https://mytech.today` and `mailto:support@mytech.today`. Keep this company attribution distinct from the reviewed repository's authorship.
- Summary content in `.report-summary` and scope or limitation content in `.scope-notes`.
- A risk register in `.risk-register`, with a horizontally scrollable, keyboard-focusable `.risk-table-wrap` and semantic table `.risk-table` when a risk table is required.
- A group of findings in `.issue-list`. Each finding is an `<article class="issue">` with a stable unique ID, a visible heading using `.issue-title`, and a `data-issue-kind` value that matches the prompt's kind taxonomy in lowercase kebab case.
- A table of contents in `<nav class="issue-toc" aria-label="Table of contents">` with one `.issue-toc-link` to each finding. Each link contains a visible `.issue-toc-status[data-issue-progress-indicator="issue-01"][data-progress="incomplete"]` displaying `Incomplete` for its matching issue ID. Initialize article and TOC progress to `incomplete`; JavaScript keeps the shared status in sync.
- Every issue article starts with `data-progress="incomplete"`. The script adds an `.issue-actions` group with a keyboard-operable `Copy Issue to Clipboard` button and a labelled progress `<select>` with the `incomplete`, `in-progress`, and `complete` states. It also displays the current state in `.issue-progress-state[data-issue-progress-state]`. Changing one control updates the article styling and only the matching TOC status.
- Finding metadata uses `.issue-header`, `.issue-number`, and `.issue-kind` where present. Put definition-list metadata in `<dl class="issue-fields">` with `<dt>` and `<dd>`. Priority and severity use visible text with `.priority-label[data-priority]` and `.severity-label[data-severity]`. Use `p1` through `p4` for priority data values and `1` through `4` for severity. Include the written classification, so color is never its only signal.
- Implementation-prompt text is inside `<pre class="implementation-prompt" data-copy-target><code>...</code></pre>`. This content remains selectable and readable when JavaScript is disabled.
- Appearance controls use a `<fieldset class="report-preferences" data-report-preferences hidden>` with a labelled `<select data-report-style-control>` whose values are `basic`, `minimal`, and `full`, and a labelled `<select data-color-mode-control>` whose values are `system`, `light`, and `dark`. The initial selected values are Basic and System. Include `.preferences-status` and `.issue-progress-storage-status` live regions, plus a `<noscript>` explanation; the script reveals appearance controls only after it has wired them.
- The root `<html>` starts with `data-report-style="basic"` and `data-color-mode="system"`. `style.css` owns both the three style configurations and each mode's colors. Changing either select updates only the root attributes and local preferences, never the stylesheet URL.
- `js/code.js` copies the complete issue article from its visible issue number through its final content, including all issue fields and implementation prompt text. Exclude the dynamically inserted `.issue-actions` and prompt `.copy-control` UI from the clipboard text. Add one issue-copy button and live `.copy-status` to each issue. Preserve the separate implementation-prompt copy button. Build controls with safe DOM APIs and text properties, never `innerHTML`. Clipboard success is announced; unavailable or rejected clipboard access explains how to select and copy the visible content manually. Copy failure must not alter or remove report content.
- `js/code.js` synchronizes each issue's `data-progress`, its visible `.issue-progress-state`, and the matching `.issue-toc-status`. Validate restored progress values, save changes under the report-scoped key, announce storage failures accessibly, and keep controls functional for the current page if storage is unavailable. Reinitializing the script must not create duplicate controls or event listeners.

`style.css` must provide the same shared selector contract in Basic, Minimal, and Full configurations. Every configuration must support System, Light, and Dark modes, responsive layouts, readable long text and code, accessible contrast, visible keyboard focus for controls, distinguishable incomplete/in-progress/complete issue styling and TOC badges, and print rules that do not clip or truncate report content. Keep the selected issue status visible in print while hiding interactive controls. Use semantic document structure so content remains understandable if remote CSS or JavaScript fails.

## Prompt and report validation

When changing either report-generation prompt or a shared asset, inspect all related styling, script, offline, accessibility, print, output, and validation instructions for contradictions. Validate the requirements relevant to the change, including:

- Exact raw URLs, one stylesheet link to `style.css`, one deferred script reference, and no relative paths or additional theme stylesheets.
- Matching shared selectors in `style.css` for Basic, Minimal, and Full and for System, Light, and Dark; appearance controls must not change the stylesheet URL.
- `.report-attribution`, `.company-profile`, and `.company-services` remain readable in all three styles and color modes, at narrow widths, and in print.
- Default Basic/System settings, allowlisted saved preferences, persistence across reloads, and safe behavior if browser storage is unavailable.
- Exactly one TOC status indicator and one persistent progress selector per issue; article status, visible badge, TOC status, and stored value must remain synchronized for all three allowed states.
- Whole-issue copy includes its issue number, all issue content, and implementation prompt, while excluding injected action controls. Verify clipboard success, unavailable/rejected clipboard fallback, and duplicate-initialization protection.
- Report-scoped progress persistence, invalid saved values falling back to Incomplete, and accessible behavior when storage reads or writes fail.
- No generated-HTML instruction that requires embedded CSS, inline JavaScript, or inline event handlers.
- Copy success and manual-copy fallback behavior, with prompt text preserved and duplicate controls prevented.
- Repository and evidence-backed author metadata appears in both `<head>` and the visible report header; missing authorship is labeled rather than guessed. The visible myTech.Today profile includes its service list, website, and support email.
- Responsive narrow layouts, long prompt and code wrapping, visible keyboard focus, print output, and readable HTML with CSS and JavaScript disabled.
- Preserved issue counts, classifications, required fields, output paths, and safe no-overwrite rules for each prompt.
- Clean diffs and no accidental em dash characters where a prompt explicitly forbids them in generated output.

Use repository-supported checks when available. If there is no test framework or browser harness, validate the file and asset contracts directly without adding dependencies. State clearly when browser rendering, remote URL availability, or publication was not checked.
