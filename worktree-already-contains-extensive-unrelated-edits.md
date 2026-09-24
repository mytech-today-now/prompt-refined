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


""".  The 'description' should be post-processed through a template:""https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/ai-feeder-prompt.md"" where the 'description' replaces ""Insert the user's software issue, defect, gap, feature request, or refactoring request here"" in the .md file and the template is processed through the AI, and those results are the actual new series of 'post-processed prompt(s)'.