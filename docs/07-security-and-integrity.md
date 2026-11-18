# Security and Data Integrity

## Deployment security

- Bind the application to localhost by default.
- Do not configure public port exposure in the base Docker Compose file.
- Use environment variables or a local secret manager.
- Never commit database credentials, API credentials, or session secrets.
- Do not store brokerage credentials.
- Do not store or expose account passwords.
- Add authentication before remote access is intentionally enabled.
- Enable HTTPS only at an intentionally configured local or private-network proxy.

## Database credentials

- Use a dedicated least-privilege database account.
- Restrict migration credentials from the application runtime.
- Encrypt database backups at rest if they leave the device.
- Document backup retention and restore testing.
- Store backups outside the database container.

## Import validation

CSV and manual imports must validate:

- Required identity.
- Date validity.
- Currency.
- Unit.
- Numeric range.
- Reporting basis.
- Period type.
- Duplicate natural keys.
- Source and timestamp.
- Mapping version.

Rejected rows must have reason codes and remain available for correction.

## Financial data integrity

- Duplicate source feeds reconcile through source precedence rules.
- Conflicting values remain visible until resolved.
- Corrections preserve previous snapshots.
- Restatements are dated and linked.
- Corporate-action adjustment status is explicit.
- Missing values remain missing.
- Estimated values remain estimated.
- Calculated values reference calculation version and inputs.

## Audit logging

Append audit events for:

- Manual record creation or correction.
- Import acceptance or rejection.
- Valuation and assumption changes.
- Ranking model changes.
- Portfolio transactions.
- Alert-rule changes.
- Backup and restore actions.
- Provider configuration changes.
- Authentication changes.

Audit events include actor, timestamp, action, before/after values, and request or import reference.

## API failure handling

- Provider timeout, rate limit, and schema change are separate failure types.
- The API does not fabricate fallback values.
- Retry policies use bounded exponential backoff.
- Syncs are idempotent.
- No failed sync replaces the last valid snapshot.
- UI states stale and unavailable data distinctly.

## Backup and recovery

The initial operations documentation must define:

- Backup frequency.
- Retention count.
- Backup command.
- Restore procedure.
- Backup verification.
- Encryption policy.
- Recovery test schedule.

Database recovery must be tested before trusting portfolio and research data.

## Disaster and privacy

- Data stays on the local machine unless the user enables a remote provider or service.
- Provider calls send only identifiers and required parameters.
- Raw documents and imports are retained according to source terms.
- Logs redact credentials and personal identifiers.
- Export and deletion behavior is explicit.
