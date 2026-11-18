# Development Standards

## Repository structure

The repository is expected to use the following top-level structure:

```text
apps/
  web/
  api/
services/
  quant/
prisma/
docs/
docker/
test/
```

Exact structure may be refined during Phase 1, but domain boundaries must remain explicit.

## TypeScript

- Strict mode is enabled.
- Avoid `any`.
- Validate external API and CSV input with schemas.
- Use DTOs and service/domain types.
- Do not expose Prisma entities directly as public API objects.
- Keep provider clients behind interfaces.

## Python

- Type hints are required for public functions.
- Pandas and NumPy operations must preserve missing values.
- Decimal financial inputs are converted deliberately at explicit boundaries.
- Calculation functions are pure unless persistence is intentionally separate.
- Public functions return a value and validation warnings or a reasoned unavailable result.
- Calculation method versions are constants or part of model metadata.

## Testing

Every calculation module includes unit tests for:

- Normal case.
- Missing input.
- Divide-by-zero or invalid denominator.
- Negative or unusual values.
- Boundary assumptions.
- Currency/unit mismatch.
- Rounding behavior.
- Result lineage.

API integration tests cover:

- Validation.
- Provenance.
- Pagination.
- Missing-data behavior.
- Import rejection.
- Sync failure without snapshot replacement.

Database tests cover:

- Uniqueness constraints.
- Foreign keys.
- Effective-dated listings.
- Correction and restatement behavior.

## Test data

Tests may use small, synthetic fixtures. Every fixture must be clearly marked as test data. It must never be presented to the UI as real market or financial data.

The production seed path must not contain fictional financial values or sample securities.

## Commands

Commands should be documented in root-level scripts or package documentation. At minimum, define commands for:

- Installation.
- Database migration.
- Migration rollback or recovery.
- Development startup.
- Test execution.
- Lint and formatting.
- Docker startup and shutdown.
- Backup.
- Restore.

## Documentation maintenance

A code change that affects one of the following requires documentation updates:

- API endpoint.
- Database table or constraint.
- Financial formula.
- Ranking weight or threshold.
- Alert behavior.
- Data source licensing or status.
- Backtest bias control.
- Security or deployment behavior.

The implementation must not remain ahead of the architecture documentation.
