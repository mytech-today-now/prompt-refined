You are a senior software architect, deployment engineer, security engineer, and diagnostic-tool designer.

Your task is to inspect the existing application and implement a complete, reliable, and user-friendly lifecycle management system covering installation, reinstallation, upgrades, rollback, diagnostics, recovery, and uninstallation.

Do not merely describe the solution. Modify the existing project and provide the complete implementation, documentation, schemas, tests, and verification results.

## Primary Objectives

Implement the following capabilities:

1. Fresh installation using the latest compatible application version.
2. Same-version reinstallation using a retained installation or uninstall artifact.
3. Upgrade installation using the latest compatible version.
4. Rollback after a failed installation, upgrade, migration, or partial change.
5. Safe and explicit uninstallation.
6. An interactive diagnostic tool for troubleshooting installation, upgrade, rollback, and uninstallation problems.
7. Multiple safe fixes for common detected problems.
8. Clear progress reporting, error handling, recovery options, and final status reporting.
9. Secure preservation and restoration of compatible configuration, credentials, service integrations, and user data.
10. Automated tests covering normal, degraded, interrupted, and failure scenarios.

Before changing code, inspect the repository structure, existing architecture, build system, package manager, runtime, configuration model, service integrations, startup process, data locations, logging, backup mechanisms, migration logic, and current installation behavior. Reuse existing project conventions wherever practical.

Do not introduce duplicate installers, competing configuration systems, redundant diagnostic frameworks, or multiple implementations of the same feature category. Select one canonical implementation approach for each lifecycle function.

## Important Security Rule

Never store plaintext passwords, API keys, access tokens, private keys, session cookies, or other secrets in installation artifacts, logs, source code, screenshots, console output, reports, or example files.

Preserve credentials only through the safest mechanism supported by the target platform, such as an operating-system credential manager, encrypted secret store, protected environment reference, or secure external vault.

Clearly distinguish between:

- Credentials that can be restored securely.
- Credentials that can only be referenced.
- Credentials that must be entered again.
- Credentials that are missing, expired, revoked, or invalid.

If the existing implementation stores plaintext credentials, replace that behavior with secure storage or secure references and document the migration path.

## Lifecycle State Model

Define explicit, inspectable states for the application lifecycle, including at least:

- Not installed.
- Installation detected.
- Installation in progress.
- Installation completed.
- Installation partially completed.
- Installation failed.
- Upgrade available.
- Upgrade in progress.
- Rollback available.
- Rollback in progress.
- Uninstallation pending confirmation.
- Uninstallation in progress.
- Uninstallation partially completed.
- Uninstallation completed.
- Diagnostic analysis in progress.
- Repair available.
- Repair in progress.
- Recovery required.

State transitions must be deterministic, persisted when necessary, safe after process termination or system restart, and recoverable after interruption.

## Installation and Reinstallation Workflow

Implement this workflow:

1. Detect whether the application is installed.
2. Identify the installed version, architecture, runtime, configuration, services, integrations, data paths, and installation source.
3. Search documented locations for retained installation or uninstall artifacts.
4. Validate every candidate artifact before using it.
5. If a valid artifact exists, present clear interactive choices:
   - Reinstall the same version with the artifact's compatible configuration.
   - Install the latest compatible version while preserving compatible settings, credentials, and user data.
   - Start a completely new installation and ignore previous installation settings.
   - Open diagnostics.
   - Cancel.
6. If the artifact is missing, invalid, incomplete, corrupted, incompatible, or unsupported:
   - Explain the issue in plain language.
   - Preserve the artifact for diagnostics.
   - Offer to export a diagnostic report.
   - Offer installation using the latest compatible version.
   - Do not delete or overwrite the artifact without explicit confirmation.
7. Before changing an existing installation:
   - Create and verify a rollback backup.
   - Confirm sufficient disk space.
   - Confirm required permissions.
   - Check runtime and dependency compatibility.
   - Check package availability and integrity.
   - Check network access when required.
   - Check service availability.
   - Verify secure credential references.
8. Install or update components in a deterministic order.
9. Validate every completed step.
10. If a step fails:
    - Record actionable diagnostic information.
    - Retry automatically only when the retry is safe and bounded.
    - Offer a manual retry.
    - Offer a documented fallback.
    - Offer rollback when possible.
    - Prevent the application from being falsely reported as fully installed.
11. After installation:
    - Validate startup.
    - Validate required processes, services, containers, scheduled tasks, ports, and integrations.
    - Validate package versions and checksums.
    - Validate configuration loading.
    - Validate credential access without displaying secret values.
    - Validate the `/ai-prompts/` directory and its extracted contents.
    - Generate or update the lifecycle artifact.
    - Display a concise success, partial-success, or failure summary.

## Upgrade and Migration Behavior

When upgrading:

- Preserve compatible configuration, credentials, user data, and supported customizations.
- Identify incompatible settings before making changes.
- Display all settings that will be retained, migrated, reset, or require manual review.
- Back up application data before migrations.
- Apply database and data migrations safely and transactionally where possible.
- Record the previous and new versions.
- Support rollback if migration, validation, or startup fails.
- Never silently overwrite user data, credentials, or custom configuration.
- Clearly identify irreversible migrations before execution.
- Prevent downgrades unless explicitly supported and validated.

## Uninstallation Workflow

Implement an explicit, idempotent uninstallation process:

1. Show what will be removed, preserved, archived, or require manual cleanup.
2. Require confirmation before destructive actions.
3. Offer separate choices for:
   - Remove application components while preserving user data.
   - Remove application components and user data.
   - Cancel.
4. Collect and validate installation metadata.
5. Create the lifecycle artifact before removing application files.
6. Package the `/ai-prompts/` directory as a ZIP archive.
7. Verify the ZIP archive and record its checksum.
8. Preserve secure credential references and service configuration according to the security rules.
9. Stop associated processes, services, scheduled tasks, containers, workers, and background jobs.
10. Remove application binaries, packages, launchers, temporary files, caches, registrations, and generated artifacts within the documented application scope.
11. Preserve user data when selected.
12. Remove user data only after a separate warning and confirmation.
13. Verify removal.
14. Retain the artifact in a documented and discoverable location.
15. Display:
    - Items removed.
    - Items preserved.
    - Items archived.
    - Artifact location.
    - Credentials preserved securely.
    - Credentials requiring reauthentication.
    - Errors.
    - Skipped items.
    - Manual cleanup instructions.
16. Ensure repeated uninstallation safely detects the current state and continues without corrupting artifacts or deleting unrelated files.

Never delete files outside the documented application scope. Protect against path traversal, unsafe archive extraction, symbolic-link attacks, and accidental deletion of user data.

## Lifecycle Artifact

Use one stable, documented, versioned format, such as JSON plus a structured artifact directory.

The artifact must be:

- Human-readable.
- Machine-readable.
- Versioned with an explicit schema version.
- Validated before restoration.
- Portable where practical.
- Protected with appropriate file permissions.
- Safe to regenerate without destroying valid recovery information.
- Capable of representing partial success, incomplete cleanup, and manual actions.
- Accompanied by a README or restoration guide when appropriate.

Include, as applicable:

- Application name.
- Unique application identifier.
- Installed version.
- Artifact schema version.
- Installation and update history.
- Operating system and architecture.
- Runtime and dependency versions.
- Package names, versions, sources, checksums, and signatures.
- Configuration required to recreate the installation.
- Environment variable names and secure references, never secret values.
- Services and integrations.
- Credential-provider references and reauthentication requirements.
- Database connection metadata without passwords or tokens.
- Migration history.
- User-selected installation options.
- Paths to application data, logs, caches, generated files, and user content.
- The `/ai-prompts/` ZIP archive.
- Archive checksums or signatures.
- Backup locations.
- Restoration instructions.
- Creation, update, and uninstallation timestamps.
- Result status.
- Items preserved, removed, skipped, archived, failed, or requiring manual action.
- Compatibility requirements and known limitations.
- Diagnostic report references.

Define and document:

- Required fields.
- Optional fields.
- Data types.
- Validation rules.
- Compatibility rules.
- Default locations.
- File naming conventions.
- Retention behavior.
- Backup behavior.
- Integrity verification.
- Migration rules between artifact schema versions.

## Interactive Diagnostic Tool

Create an interactive diagnostic tool integrated into the application lifecycle workflow.

The diagnostic tool must support:

1. Read-only analysis mode.
2. Guided repair mode.
3. Safe automatic repair mode.
4. Dry-run mode that previews changes without applying them.
5. Exportable diagnostic reports in human-readable and machine-readable formats.

Analyze, when relevant:

- Installation detection.
- Version and architecture compatibility.
- Artifact presence, readability, schema, identity, completeness, and integrity.
- Package availability, version conflicts, checksums, and signatures.
- Runtime and dependency installation.
- File and directory permissions.
- Disk space.
- Network connectivity.
- DNS and certificate failures.
- Required ports.
- Running processes.
- Services, containers, scheduled tasks, and background workers.
- Configuration files and environment variables.
- Database connectivity and migration state.
- Secure credential references and authentication state.
- Missing, expired, revoked, or inaccessible credentials.
- `/ai-prompts/` archive presence, checksum, extraction safety, and contents.
- Startup and health checks.
- Orphaned files and stale registrations.
- Partial installations and incomplete uninstallations.
- Recent lifecycle logs and error records.

For every finding, display:

- Severity: critical, high, medium, low, warning, or informational.
- A concise title.
- Plain-language explanation.
- Evidence supporting the finding.
- Affected component or path.
- Whether the finding blocks installation or uninstallation.
- Recommended solution.
- Risk level of the solution.
- Whether the solution is reversible.
- Required permissions.
- Whether user confirmation is required.
- Expected result after repair.

The interface must provide clickable or choosable actions where the platform supports them, including:

- Fix this issue.
- Fix all safe issues.
- Preview changes.
- Retry check.
- Re-run diagnostics.
- Skip this issue.
- Open the affected location or log.
- Request missing credentials.
- Restore from backup.
- Roll back changes.
- Continue installation.
- Continue uninstallation.
- Cancel.
- Export report.
- Copy a redacted report.

Each repair action must:

- Be narrowly scoped.
- Validate prerequisites.
- Show a preview when practical.
- Require confirmation for destructive or elevated actions.
- Create a backup when appropriate.
- Produce structured audit information.
- Be idempotent.
- Verify the result.
- Offer rollback when feasible.
- Clearly report success, partial success, or failure.
- Avoid exposing secrets.

Implement multiple safe fixes for common issues, such as:

- Repairing missing directories.
- Correcting safe file permissions.
- Recreating missing configuration from a validated template.
- Repairing invalid artifact metadata.
- Rebuilding a damaged cache.
- Reinstalling a missing compatible package.
- Restarting a stopped application service.
- Re-registering a valid service or scheduled task.
- Repairing a missing archive.
- Re-extracting the `/ai-prompts/` archive safely.
- Refreshing an expired authentication session through the supported credential flow.
- Rechecking or repairing compatible dependencies.
- Cleaning only verified orphaned application files.
- Resuming an interrupted lifecycle operation.

Do not automatically perform irreversible actions, remove user data, delete unknown files, revoke credentials, or modify unrelated services.

## User Experience Requirements

Provide clear progress reporting with:

- Current operation.
- Completed operations.
- Remaining operations when known.
- Estimated impact.
- Warnings.
- Required user decisions.
- Retry, cancel, repair, rollback, and recovery controls.
- A final status of success, partial success, or failure.

Use plain language and actionable messages. Do not require users to understand internal implementation details.

The interface must remain usable after errors, support keyboard navigation where applicable, provide accessible labels, and avoid reporting false success.

## Reliability and Security Requirements

The implementation must:

- Use atomic file operations where practical.
- Avoid destructive actions until backups and artifacts are verified.
- Handle interruptions and system restarts.
- Support safe retry and recovery.
- Avoid hardcoded paths, credentials, package versions, and operating-system assumptions.
- Validate all user-controlled paths.
- Prevent path traversal and unsafe ZIP extraction.
- Verify package and archive integrity.
- Redact secrets from logs, reports, exceptions, and user-facing messages.
- Protect artifacts and backups with appropriate permissions.
- Never silently ignore failures.
- Maintain an audit trail without sensitive values.
- Use bounded retries and timeouts.
- Avoid leaving ambiguous partial state.
- Preserve unrelated files and services.
- Fail safely when required permissions or dependencies are unavailable.

## Implementation Process

Follow this sequence:

1. Inspect the existing project and identify relevant files.
2. Document the current lifecycle behavior and gaps.
3. Define the lifecycle state model and artifact schema.
4. Identify the canonical implementation points.
5. Implement the lifecycle manager.
6. Implement artifact creation, validation, migration, retention, and restoration.
7. Implement backup and rollback behavior.
8. Implement the interactive diagnostic engine.
9. Implement the interactive diagnostic interface using the application's existing UI conventions.
10. Implement safe repair actions.
11. Integrate diagnostics into installation, upgrade, rollback, and uninstallation flows.
12. Add secure credential handling.
13. Add structured logging and redaction.
14. Add automated tests.
15. Run the test suite and relevant build, lint, type-check, security, and integration checks.
16. Review for data loss, security defects, incomplete cleanup, inconsistent version handling, race conditions, and unhandled failure paths.
17. Correct all defects discovered during the review.
18. Re-run verification after corrections.

Do not reveal private chain-of-thought reasoning. Provide concise conclusions, implementation decisions, evidence, and verification results.

## Required Tests

Add tests for at least:

- Fresh installation with no artifact.
- Valid same-version reinstallation.
- Upgrade from an older valid artifact.
- Fresh installation while ignoring previous settings.
- Missing artifact.
- Corrupted artifact.
- Unsupported artifact schema.
- Wrong application identity.
- Missing package.
- Package checksum or signature failure.
- Missing, expired, revoked, or inaccessible credential.
- Insufficient permissions.
- Insufficient disk space.
- Network failure.
- Interrupted installation.
- Failed migration.
- Failed startup validation.
- Rollback after partial installation.
- Fresh uninstallation.
- Uninstallation with running services.
- Uninstallation with preserved user data.
- Uninstallation with user data removal.
- Interrupted uninstallation.
- Repeated uninstallation.
- Successful restoration from an artifact.
- Safe ZIP extraction of `/ai-prompts/`.
- Path traversal and symbolic-link protection.
- Secret redaction in logs and reports.
- Diagnostic severity classification.
- Diagnostic dry-run mode.
- Individual repair actions.
- Fix-all-safe behavior.
- Failed repair rollback.
- Repeated repair execution.
- Recovery after process termination or system restart.
- Accessibility and keyboard interaction for the diagnostic interface where applicable.

## Required Deliverables

Provide:

1. The complete implementation.
2. The lifecycle artifact schema.
3. An example artifact with placeholders and no real secrets.
4. Documentation for installation, reinstallation, upgrades, rollback, diagnostics, repair, recovery, and uninstallation.
5. Migration and compatibility behavior.
6. Secure credential-storage and reauthentication behavior.
7. Automated tests and test results.
8. Diagnostic report examples with sensitive data redacted.
9. A list of changed files.
10. Assumptions, limitations, manual steps, unresolved risks, and unsupported scenarios.
11. A concise verification summary identifying which workflows passed, partially passed, or remain blocked.
12. Any required configuration, environment variables, permissions, or deployment instructions.

If a requested capability cannot be implemented because of the existing architecture, platform limitations, missing dependencies, or unavailable credentials, identify the exact limitation, implement the safest supported fallback, and document the remaining manual procedure.

Do not use the em dash character anywhere in source code, documentation, comments, logs, user-facing messages, generated artifacts, test fixtures, or the final response. Use commas, colons, parentheses, or semicolons instead.