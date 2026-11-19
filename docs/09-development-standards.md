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

Commands should be documented in the root README and package scripts. The root npm workspace preserves the existing API and quant commands and provides web commands:

| Task | Command |
|---|---|
| Install locked JavaScript dependencies | `npm ci` |
| Start web development server | `npm run web:start` |
| Build web application | `npm run web:build` |
| Test web application | `npm run web:test` |
| Lint web application | `npm run web:lint` |
| Build API | `npm run api:build` |
| Test API | `npm run test:api` |
| Test quant service | `npm run test:quant` |
| Validate Prisma schema | `npm run db:validate` |
| Generate Prisma client | `npm run db:generate` |
| Apply checked-in migrations | `npm run db:migrate:deploy` |
| Validate Docker Compose configuration without printing resolved environment values | `docker compose config --quiet` |
| Start local containers | `docker compose up --build --detach` |
| Stop containers and preserve database volume | `docker compose down` |

API and Python lint commands are not configured. Do not document them as available until a linter is selected and wired into the workspace.

On Windows, copy `.env.example` to the ignored `.env` file only when `.env` does not already exist. For Ubuntu on WSL2, keep the repository in the Linux filesystem, use Linux Node.js selected by the repository's `.nvmrc` rather than Windows Node from `/mnt/c`, install `python3-venv` for local quant development, and enable Docker Desktop integration for Ubuntu. Keep credentials in `.env` or a secret manager. The Compose file binds MySQL, API, and web host ports to `127.0.0.1`; the quant service has no host-published port. Use the platform-appropriate backup and restore procedures in the root README. Keep backups outside the database container and encrypt backups before moving them off-device.

Migrations are applied explicitly with `npm run db:migrate:deploy` after the database is healthy. The API container must not perform schema migrations during startup.

Prisma migrations are forward-only in this workflow. Recover from a faulty migration with a reviewed corrective migration or restore a verified backup; do not treat migration metadata commands as SQL rollback.

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
