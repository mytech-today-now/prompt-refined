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
7. Do not pad the report with generic advice or cosmetic preferences. If evidence cannot support the required issue count or classifications, stop before writing the file and report the specific limitation instead of fabricating findings.

## Required report content

Follow the complete issue fields, evidence rules, writing standards, and validation instructions in `pre-mortem-with-prompts.md`. The report must contain exactly 20 distinct, current actionable issue articles, with sequential IDs `issue-01` through `issue-20`: 15 `Core` issues classified Priority P1 and Severity 1, and 5 `Additional` issues that do not have that combined classification. Assess priority and severity independently. Do not inflate ratings to meet the allocation. If repository evidence and clearly labeled testable assumptions cannot support this required allocation, do not misclassify or invent issues; stop and explain why no report was written.

Every unresolved source issue must map to an actionable article. Use additional repository-grounded gaps or well-supported, explicitly labeled testable assumptions to fill the required 20 only when warranted by evidence. Keep all findings distinct and non-overlapping. Each risk-table row must correspond to exactly one article and match its ID, title, kind, priority, severity, likelihood, and impacted area.

Every issue article must include all required subsections from `pre-mortem-with-prompts.md`, including evidence or rationale, failure mode, impact, mitigation, implementation prompt, regression tests, additional baseline tests, measurable acceptance criteria, and confidence. Its implementation prompt must be independently usable in a fresh coding-agent conversation. State the exact repository paths or symbols to inspect, the evidence behind the issue, desired and preserved behavior, a minimal repository-consistent fix, applicable failure handling, concrete tests and assertions, supported commands, and required final reporting. Choose only relevant test categories and describe each with setup, action, expected result, and assertions. Do not expose private chain-of-thought in issue prompts.

## HTML and shared assets

Use the full semantic structure and selector contract in `pre-mortem-with-prompts.md` and repository guidance. In particular:

- Use the shared stylesheet URL `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/css/style.css` exactly once, and the shared script URL `https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/js/code.js` exactly once as a deferred external script inside `<head>`. Do not use other CSS, JavaScript, runtime dependencies, external assets, inline styles, inline scripts, event-handler attributes, or local asset paths.
- Include semantic report landmarks, summary and scope sections, the 20-issue table of contents, risk register, issue list, completed-source-issues summary, and footer. Use the required report metadata, visible repository attribution, evidence-backed project authorship, and distinct myTech.Today profile and report authorship. Do not infer project authorship from commit authorship.
- Follow the canonical requirement for Basic and System defaults, appearance controls, progress controls, accessible status text, no-script explanation, issue copy behavior, and issue-progress synchronization. Static controls must start disabled and remain understandable if JavaScript is unavailable. Keep issue text and implementation prompts readable and selectable without JavaScript.
- Use the exact documented, versioned localStorage keys and behavior specified in the repository guidance. Do not imply that report content edits persist.
- Do not claim that the raw script or stylesheet URLs are published, available, or working based only on local files. Verify exact remote availability and browser behavior only when those checks are accessible. Otherwise state this as an unverified release condition in the report.
- Preserve the canonical report fields, counts, risk-table mapping, status behavior, source evidence, output naming, and safe no-overwrite rules. Use the shared stylesheet's supported configurations rather than adding styling or changing asset URLs.

## Output file and verification

Create only `./ai-prompts/pre-mortem-refactored-YYYY-MM-DD-HH-MM-SS.html` relative to the resolved repository root. Use the local machine clock at generation time with zero-padded year, month, day, 24-hour hour, minute, and second. If the exact name exists, increment the seconds until an unused name is found. Never overwrite, delete, rename, or alter an existing file. Create `./ai-prompts/` only if it does not exist.

Before writing, validate that the draft is complete and satisfies the canonical HTML, metadata, asset, issue-count, ID, classification, risk-table, required-field, evidence, accessibility, and no-overwrite contracts. After writing, verify the saved file and confirm that no other file was modified by this task. Scan the complete HTML for the em dash character, Unicode U+2014, and remove any occurrence before finishing.

Run only safe, relevant checks supported by the repository. In the report, list commands actually run and their real outcomes. Distinguish source-report claims from current repository evidence, and record checks that could not be run with the reason. Do not claim unperformed browser, remote asset, deployment, or test verification.

If a required pre-write validation cannot be satisfied, do not create a partial or misleading report. If writing fails, report the exact failure and do not claim that the output file exists.

## Final response

After successfully creating and verifying the new file, return only the complete saved HTML document content. Do not add a summary, commentary, Markdown fence, or text before or after the HTML. If file writing is unavailable, return only the complete HTML content with the intended relative output path in an HTML comment at the top. If a required input or evidence constraint blocks creation, state the specific blocker and do not fabricate an HTML deliverable.

Do not use em-dashes in any generated content, documentation, comments, test descriptions, summaries, or other written output.