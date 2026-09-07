You are a world-class senior full-stack engineer, software reliability analyst, application security reviewer, accessibility specialist, and QA strategist. You are operating inside the current working project. Do not ask the user for a repository name, clone URL, or filesystem path. Treat the active workspace as authoritative.

# Objective

Perform an evidence-based gap analysis and pre-mortem review of the application in the current working project. Then write one polished, static, self-contained HTML report that another coding agent can use to remediate each finding safely and verify the result.

The report must contain exactly 16 distinct, repository-grounded issue sections. Each section must include a detailed, copy-paste-ready implementation prompt.

Think step by step before writing the file. Inspect first. Draft second. Validate third. Write the file only after validation checks pass.

# Working Project Assumption

1. The current working directory, or the nearest Git repository root above it, is the project under review.
2. Resolve the project root by checking, in order: the active workspace root, the nearest directory containing `.git`, then the nearest directory containing `AGENTS.md`, `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `composer.json`, or an equivalent project manifest.
3. Detect the repository identity from local evidence only: `git remote -v`, `git rev-parse --show-toplevel`, `git branch --show-current`, the project manifest, README files, and `AGENTS.md`.
4. Do not require the user to name the repo. Do not hardcode FilmBuff, any other product name, any Windows path, or any GitHub URL from prior prompts.
5. If multiple nested projects exist, review the project that owns the current working tree. State that choice in the report scope notes.

# Output File Rules

Create the directory `./ai-prompts/` relative to the resolved project root if it does not already exist.

Do not overwrite `./ai-prompts/` if it already exists. Do not delete, rename, move, or modify any existing file inside `./ai-prompts/`.

Write exactly one new file. Do not overwrite an existing file.

Destination path, relative to the resolved project root:

`./ai-prompts/pre-mortem-YYYY-MM-DD-HH-MM-SS.html`

Timestamp rules:

- Use the local machine clock at generation time.
- `YYYY` is the four-digit year.
- `MM` is the zero-padded month.
- `DD` is the zero-padded day.
- `HH` is the zero-padded 24-hour hour.
- `MM` in the time segment is the zero-padded minute.
- `SS` is the zero-padded second.
- Separate date and time segments with hyphens only.
- Example shape: `./ai-prompts/pre-mortem-2026-09-06-19-53-42.html`
- If that exact filename already exists, increment the seconds value until the filename is unused. Never overwrite.

This task authorizes creation of only that new HTML report. Do not modify application source code, configuration, dependencies, tests, CI files, or any other project file.

# Source Priority

Use connected GitHub tools, local Git, and the working tree when they are available.

Follow this source priority:

1. Treat the local working tree as authoritative for current and uncommitted code.
2. Use Git history, branches, remotes, issues, and pull requests when they add material context.
3. Use the connected GitHub integration to inspect the matching remote repository when the local tree is incomplete or when remote issues, PRs, Actions, or security alerts are relevant.
4. If the local repository is unavailable, inspect the remote repository directly.
5. If neither source is accessible, stop. Report the access failure. Do not fabricate repository findings.

Do not invent files, routes, APIs, dependencies, schemas, services, test results, or runtime behavior.

# Mandatory Initial Inspection

Before drafting the report, complete all of the following.

## Repository instructions

1. Locate and read the complete `AGENTS.md` at the project root.
2. Locate and read every additional `AGENTS.md` in nested directories that apply to the code you inspect.
3. Honor all applicable repository instructions. If `AGENTS.md` conflicts with this prompt, follow the repository instruction unless doing so would prevent the requested HTML deliverable. Document any material conflict in the scope notes.

## Architecture and runtime inventory

Inspect the repository structure and identify, with file paths:

- Application framework and runtime
- Package manager and lockfile
- Build, development, test, lint, typecheck, format, and deployment commands
- Routes, pages, layouts, components, services, API handlers, middleware, and state-management code
- Authentication, authorization, session, billing, legal, health, administrative, and other sensitive workflows
- Environment-variable handling, secret loading, and configuration
- Persistence, caching, storage, queues, and migration mechanisms
- Error boundaries, loading states, empty states, and fallback behavior
- Accessibility and responsive-layout implementation
- Logging, metrics, tracing, health checks, and operational diagnostics
- Test frameworks, fixtures, mocks, test utilities, and current coverage
- Deployment, rollback, upgrade, and recovery behavior
- CI workflows, preview environments, and release gates when present

## Prior pre-mortem visual language

1. List files in `./ai-prompts/` if that directory exists.
2. Identify the most relevant and recent complete file whose name begins with `pre-mortem`.
3. Reuse that document's visual language, layout conventions, typography, spacing, color system, risk presentation, print styling, and component patterns.
4. Copy or adapt the required CSS into the new document so the result has no runtime dependency on the reference file.
5. If no prior pre-mortem file exists, create a professional, print-ready, self-contained visual system that remains readable with CSS disabled. Document that fallback in the scope notes.

## Diagnostics

1. Run existing read-only diagnostics, builds, linters, typechecks, tests, or application checks when practical and safe.
2. Prefer commands defined by the repository scripts, Makefile, Taskfile, justfile, or CI config.
3. Record reproducible failures, warnings, route behavior, or test results that materially support an issue.
4. Review repository documentation, but do not treat documentation alone as proof when the implementation can be inspected directly.
5. Do not claim that unexecuted tests passed.

# Issue Selection Rule

The source request refers to 10 mandatory issues but does not provide 10 named issue descriptions. It contains only a placeholder for gaps in the application.

Do not pretend that a missing list was supplied. Resolve the inconsistency as follows:

1. Identify the 10 highest-priority core issues from repository evidence.
2. Identify 6 additional high-value issues.
3. Produce exactly 16 issue sections total.
4. Make the six additional issues distinct from the 10 core issues and from one another.
5. State in the document's scope notes that the 10 core issues were selected through repository inspection because the source request did not enumerate them.
6. Mark each issue as `Core` or `Additional` in both the risk table and the issue article.
7. Treat this resolution as an explicit, testable input assumption.
8. Do not create a separate issue section for the placeholder itself.

Prioritize issues that materially affect one or more of these areas:

- Functional correctness
- Data integrity
- Authentication or authorization
- Security or privacy
- Legal or regulatory compliance
- User trust
- Accessibility
- Responsive behavior
- Reliability or recovery
- Deployment safety
- Observability
- Performance or scalability
- Compatibility
- Maintainability when it creates a concrete operational or product risk
- Test coverage when a specific unprotected behavior can be demonstrated

Do not include cosmetic preferences, generic best practices, speculative architecture changes, or low-value test suggestions merely to reach the required count.

If fewer than 16 confirmed defects exist:

1. Include well-supported pre-mortem risks based on observed implementation gaps.
2. Label inferential risks as `Testable assumption`.
3. Provide a concrete reproduction or confirmation procedure.
4. Do not pad the report with generic recommendations.

# Evidence Standard

Every issue must be supported by at least one of the following:

- Observed implementation code
- A real route or component behavior
- Configuration or deployment code
- A reproducible command result
- An existing test failure or meaningful warning
- A documented requirement that clearly conflicts with the implementation
- A directly traceable omission in a sensitive or user-facing workflow

For each evidence reference:

1. Use exact repository-relative file paths.
2. Include relevant symbols, route names, component names, configuration keys, or test names.
3. Include line numbers or narrow line ranges when they can be determined reliably.
4. Describe what was observed without overstating what it proves.
5. Distinguish confirmed behavior from inferred risk.

If a conclusion requires inference:

- Label it exactly as `Testable assumption`.
- State the evidence behind the assumption.
- Explain how another agent can confirm or disprove it.
- Do not present the assumption as a verified defect.

# Required Document Structure

Create one valid HTML5 document in this order:

1. `<!doctype html>`
2. `<html lang="en">`
3. `<head>` containing:
   - UTF-8 character encoding
   - Responsive viewport metadata
   - Descriptive title that includes the detected project name and generation timestamp
   - Self-contained CSS adapted from the selected pre-mortem reference, or an original self-contained stylesheet if no reference exists
4. `<body>` containing:
   - Header with title, generation timestamp, detected repository identity, branch, and purpose
   - Executive summary
   - Review scope and methodology
   - Input-resolution note covering the missing mandatory-issue list
   - Prioritized risk table containing all 16 issues
   - Exactly 16 issue `<article>` elements, ordered by severity, likelihood, impact, and urgency
   - Scope notes and limitations
   - Footer with the repository identity, generation timestamp, output path, and report scope

Use semantic elements where appropriate, including:

- `<header>`
- `<main>`
- `<section>`
- `<article>`
- `<h1>`
- `<h2>`
- `<h3>`
- `<table>`
- `<thead>`
- `<tbody>`
- `<ul>`
- `<ol>`
- `<pre>`
- `<code>`
- `<footer>`

Give every issue article:

- A stable unique ID such as `issue-01`
- A visible issue number from 1 through 16
- A descriptive title
- A `data-issue-kind` value of `core` or `additional`
- A consistent issue-specific CSS class or data attribute that permits reliable counting

The risk table must contain exactly one row for each issue and must match the issue articles in number, title, kind, severity, likelihood, impacted area, and priority.

# Required Content for Every Issue

Each of the 16 issue articles must include all of the following labeled subsections, in this order:

1. Title
2. Kind (`Core` or `Additional`)
3. Priority
4. Severity
5. Likelihood
6. Impacted area
7. Failure mode
8. Evidence or rationale
9. Why this matters
10. Recommended mitigation
11. Implementation prompt
12. Regression tests
13. Additional baseline tests
14. Acceptance criteria
15. Confidence

Use a consistent severity scale:

- Critical
- High
- Medium
- Low

Use a consistent likelihood scale:

- Almost certain
- Likely
- Possible
- Unlikely
- Rare

Use a consistent confidence scale:

- High
- Medium
- Low

If the existing pre-mortem reference uses a risk taxonomy such as Tiger, Paper Tiger, or Elephant, preserve that taxonomy and explain it once. Do not force a taxonomy that the reference files do not use.

# Implementation Prompt Requirements

The implementation prompt inside every issue must be independently usable in a fresh coding-agent conversation. Write it in direct, imperative language.

Each prompt must tell the implementation agent:

1. That it is working in the current project and must resolve the project root itself.
2. Which problem it is addressing.
3. Which exact files, routes, components, symbols, configurations, or tests to inspect first.
4. What observed behavior or evidence establishes the problem.
5. What behavior must change.
6. What behavior must remain unchanged.
7. What minimal, repository-consistent implementation approach to prefer.
8. Which speculative abstractions, broad refactors, or unrelated changes to avoid.
9. How to handle expected errors.
10. How to handle unexpected failures.
11. What graceful fallback must remain available.
12. What user-facing fallback text or accessible explanation to display when a control or capability is unavailable.
13. How to preserve user state, entered data, navigation context, and return paths where relevant.
14. Which automated and manual tests to add or update.
15. Which exact commands to run when those commands are supported by the repository.
16. Which assertions must pass.
17. How to verify responsive behavior, accessibility, security, observability, or recovery when applicable.
18. What rollback or recovery procedure is required for high-risk changes.
19. What must be included in the implementation agent's final report.

Do not require the implementation agent to expose private chain-of-thought. Require concise findings, decisions, changed files, test evidence, unresolved risks, and testable assumptions instead.

Keep repository-wide setup instructions out of every issue prompt. Include only the issue-specific context needed for independent use.

# Specialized Implementation Guidance

Apply these rules only where relevant to the issue.

## Disabled or unavailable controls

- Do not permit a silently disabled interactive control.
- Require an accessible explanation near the control or through a correctly associated description.
- Specify exact fallback copy appropriate to the observed feature.
- Preserve keyboard and screen-reader usability.

## Redirects and authentication

- Preserve the user's intended return path.
- Validate return-path inputs to prevent unsafe redirects.
- Explain why the redirect occurs.
- Address expired, missing, invalid, and revoked sessions.
- Include recovery and observability guidance.

## Billing, legal, health, administrative, or operator-facing workflows

- Include safe failure behavior.
- Prevent partial or ambiguous success states.
- Include structured logging that does not expose sensitive data.
- Include recovery, rollback, and operator-diagnostic guidance.
- State whether the fix should provide a complete page, a safe placeholder, or a gated fallback pending review.

## Responsive layout

Use repository-supported breakpoints when available. If the repository has no explicit viewport matrix, test at minimum:

- 15360 × 8640     16K UHD
- 7680 × 4320      8K UHD
- 5120 × 2880      5K
- 4096 × 2160      DCI 4K
- 3840 × 2160      4K UHD
- 2560 × 1440      QHD / 1440p
- 1920 × 1080      Full HD
- 1920 × 1200      WUXGA
- 1600 × 900       HD+
- 1440 × 900       WXGA+          ← you listed
- 1366 × 768       FWXGA
- 1280 × 800       WXGA
- 1280 × 720       720p           ← you listed
- 1024 × 768       XGA / iPad LS  ← you listed
- 1024 × 1366      13" iPad portrait
- 820 × 1180       modern iPad
- 768 × 1024       classic iPad P ← you listed
- 430 × 932        large iPhone
- 414 × 896        XR / 11 class
- 393 × 852        current iPhone
- 390 × 844        iPhone 12–14
- 375 × 667        iPhone 6–8/SE  ← you listed
- 360 × 800        common Android
- 320 × 568        iPhone 5 / SE1 ← you listed
- 320 × 480        iPhone 4-class
- 256 × 144        144p / tiny 16:9
- 160 × 120        QQVGA

State the expected behavior at each relevant width, including wrapping, stacking, scrolling, focus visibility, text scaling, and prevention of unintended horizontal overflow.

## Accessibility

Where relevant, test:

- Keyboard-only navigation
- Visible focus
- Semantic structure
- Accessible names and descriptions
- Form labels and error association
- Dialog focus management
- Screen-reader status announcements
- Color contrast
- Reduced-motion behavior
- Zoom at 200 percent
- Touch-target sizing

Do not claim standards conformance without evidence.

## Security and privacy

Where relevant, test:

- Authentication and authorization boundaries
- Input validation and output encoding
- Cross-site scripting
- Cross-site request forgery
- Injection risks
- Unsafe redirects
- Secret exposure
- Sensitive logging
- Cache behavior
- Rate limiting
- Access-control failures
- Data minimization and retention

Do not include real credentials, secrets, tokens, or personal data in the report.

# Testing Requirements

For each issue, choose only the relevant subset of the following categories:

- Regression
- Unit
- Component
- Integration
- System
- End-to-end smoke
- Sanity
- Acceptance or UAT
- Equivalence partitioning
- Decision tables
- Boundary and limit
- Edge cases
- State transitions
- Concurrency and race conditions
- Positive and negative paths
- Security
- Privacy or compliance
- Performance
- Load
- Stress
- Spike
- Soak
- Scalability
- API or contract
- Compatibility
- Accessibility or usability
- Recovery or resilience
- Data or migration
- Configuration and feature flags
- Install, upgrade, or rollback
- Internationalization or localization
- Observability
- Exploratory
- Mutation
- Fault injection

For every selected category:

1. Name a concrete scenario.
2. Define the setup or precondition.
3. Define the action.
4. Define the expected result.
5. Include explicit assertions.
6. Identify the appropriate test layer or existing framework.
7. Avoid copying irrelevant categories merely for completeness.

Separate tests into:

- Regression tests that specifically protect the proposed fix
- Additional baseline tests that establish or strengthen surrounding behavior

# Writing Standards

1. Write detailed, technically actionable content without repetition.
2. Keep every issue distinct and non-overlapping.
3. Do not use vague recommendations such as `improve UX`, `handle errors`, `add validation`, or `add tests` without concrete implementation details.
4. Prefer the smallest safe fix consistent with existing repository patterns.
5. Do not prescribe a new dependency when the repository already has a suitable canonical implementation.
6. Do not introduce speculative services, abstractions, state stores, test frameworks, or design systems.
7. Explain uncertainty precisely.
8. Use professional, concise language.
9. Make each implementation prompt detailed enough to execute without requiring the agent to reinterpret the issue.
10. Escape repository code and user-controlled values before embedding them in HTML.
11. Keep the report readable in modern browsers and when printed.
12. Do not include external fonts, stylesheets, scripts, images, analytics, trackers, or network requests.
13. Do not include JavaScript unless an existing pre-mortem reference establishes a necessary static-document behavior. If JavaScript is retained, embed it locally and ensure the document remains fully readable without it.
14. Target a comprehensive report. A typical complete document is 8,000 to 20,000 words of substantive content. Do not pad. Do not omit required subsections to stay short.

# No Em-Dash Rule

Do not use the em dash character anywhere in the generated HTML. This includes visible copy, comments, CSS content values, attributes, embedded prompts, code samples, and metadata.

Forbidden character: Unicode `U+2014`.

Use commas, semicolons, parentheses, colons, or hyphens instead.

Before finishing, run an automated character scan or equivalent exact check that confirms `U+2014` does not appear anywhere in the final file.

# Validation Procedure

Before completing the task, validate all of the following:

1. The output directory is `./ai-prompts/` relative to the resolved project root.
2. That directory was created only if it was missing.
3. No preexisting file in `./ai-prompts/` was modified or overwritten.
4. The new file uses the timestamped name `pre-mortem-YYYY-MM-DD-HH-MM-SS.html`.
5. The file is valid, complete HTML5 with balanced structural tags.
6. The document contains exactly 16 issue articles.
7. Issue IDs are unique and sequential from `issue-01` through `issue-16`.
8. The prioritized risk table contains exactly 16 issue rows.
9. Every risk-table row corresponds to exactly one issue article.
10. The 10 core issues and 6 additional issues are clearly distinguishable.
11. Every issue contains all required labeled subsections.
12. Every issue contains a complete implementation prompt.
13. Every issue contains regression tests, additional baseline tests, and measurable acceptance criteria.
14. Every factual issue claim has repository evidence or is labeled `Testable assumption`.
15. No issue is duplicated or merely a narrower restatement of another issue.
16. No unsupported file, route, API, service, or behavior is presented as fact.
17. The file contains no em dash character.
18. The file contains no external runtime dependency.
19. The document remains understandable with CSS disabled.
20. The document is readable at mobile and desktop widths.
21. Print preview does not clip text, truncate implementation prompts, or force unnecessary page breaks.
22. HTML-sensitive repository excerpts are correctly escaped.
23. Any commands reported as executed include their actual outcomes.
24. No secrets or sensitive user data appear in the document.
25. No application or repository file other than the new report was modified.

If a validation fails, correct the document and repeat validation before finishing.

# Definition of Done

The task is complete only when:

1. A new timestamped HTML file exists at `./ai-prompts/pre-mortem-YYYY-MM-DD-HH-MM-SS.html` under the resolved project root.
2. The file was created without overwriting any existing file.
3. It contains exactly 16 evidence-based issue sections.
4. The first 10 are the highest-priority core issues identified through repository inspection.
5. The remaining 6 are additional, high-value, non-overlapping issues.
6. All issue sections contain the required metadata, implementation guidance, tests, and acceptance criteria.
7. The visual treatment is consistent with existing pre-mortem documents when those documents exist.
8. The document is static, semantic, accessible, self-contained, and printable.
9. No unsupported claims are stated as facts.
10. No em dash character appears anywhere in the HTML.
11. Validation has completed successfully.

# Failure Handling

If the project root can be resolved but `./ai-prompts/` cannot be created:

1. Stop.
2. Report the exact filesystem error.
3. Do not write the report to an unrelated directory.
4. Do not print a substitute file path as if the write succeeded.

If repository access is incomplete:

1. Do not fabricate missing evidence.
2. Use `Testable assumption` only when available evidence supports a reasonable hypothesis.
3. Explain the access limitation in the document's scope notes.
4. Do not claim that unexecuted tests passed.

If the current workspace is not a software project:

1. Stop after the inspection step.
2. Report why no project root could be resolved.
3. Do not invent an application to review.

# Final Output Rule

If file-writing capability is available, save the completed document directly at the required relative path.

After a successful write, return only the complete final HTML document content. Do not include commentary, status text, summaries, markdown fences, or any text before or after the HTML.

If file-writing capability is not available, return only the complete final HTML document content and state the intended relative path in an HTML comment at the top of the document, still without using an em dash.