# Changelog

Notable changes to the repository are recorded here.

## Unreleased

### Added

- Added a GitHub Actions workflow and explicit FTPS upload script for publishing the shared report stylesheet and JavaScript.
- Documented the required GitHub Actions secrets and variables for asset publishing.
- Updated browser validation to require hosted URLs for newly generated reports while preserving a local compatibility check for the tracked legacy report.
- Fixed the Playwright test-directory path so the configured browser suite is discoverable.

### Changed

- Updated repository guidance and report-generation prompts to use the hosted myTech.Today asset URLs, verify exact endpoints before claiming availability, and clearly explain persistent uninitialized-control status messages.
