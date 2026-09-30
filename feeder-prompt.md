generate a detatiled, verbose, accurate 'description' of the work necessary to refactor the application to deal with the:"""







 need to be turned into a series of individual AI prompts in a new html file './ai-prompts/pre-mortem_[YYYY]-[MM]-[DD]_[HH]-[MM]-[SS].html', with the prompts post-processed with the Template.  The html file should retain changes so that they arre persistent between session.The html header should have controls for the css theme style (from:"https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/css/style.css") and the 'status' & sytem/light/dark mode (from:"https://raw.githubusercontent.com/mytech-today-now/prompt-refined/refs/heads/main/js/code.js").  The TOC should have dynamic js update to show the 'status' of the issue, when it is updated by the user.  The issue style should change it indicate the different status of the issue, perhaps by color coding.  The 'status' changes should persist between user sessions.  Each issue should have a 'JSON' button that copies the entire Issue into a 'json' object that is copied to the clipboard.  The entire page also has a 'JSON' button at the top of the page, that copies the entire document as a structured json object to the clipboard.
 Each item/issue will have the following structure per issue container in the html file:""
Issue [#] / 20  [Status Control "Not Complete [default]" | "In-Progress" | "Completed"] [Copy control "Copy"] [JSON]
Title:
DTM: 
Kind:
Priority:
Severity:
Likelihood:
Impacted area:
Failure mode:
Evidence or rationale:
Why this matters:
Implementation prompt: [This is the main Prompt that drives the refactoring.] [Copy control "Copy"]
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