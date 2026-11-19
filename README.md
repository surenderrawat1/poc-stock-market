# Personal Long-Term Stock Investment Platform

This repository contains a local-first application for Indian-equity research and portfolio record-keeping. The UI is an initial scaffold: it contains no market data, financial values, provider integrations, or trading functions.

The application does not place trades, hold brokerage credentials, or send orders to exchanges or brokers. Only use data sources with documented permission.

## Project principles

- Preserve capital and emphasize business quality, valuation discipline, and long-term compounding.
- Keep the application local-first and inaccessible from public networks by default.
- Never fabricate missing financial data.
- Separate reported facts, derived ratios, and user or model assumptions.
- Preserve source, provenance, reporting basis, timestamps, and data freshness.
- Prevent look-ahead and survivorship bias in research and backtesting.
- Present backtested performance as historical simulation, never as guaranteed future returns.
- Keep modules independent and replaceable.

## Technology stack

| Area | Technology | Responsibility |
|---|---|---|
| Web UI | Angular, TypeScript | Research screens and application interface |
| API | NestJS, REST | Application modules, validation, and orchestration |
| Quantitative engine | Python, Pandas, NumPy | Financial calculations when implemented |
| Database | MySQL | Durable application and provenance data |
| ORM/migrations | Prisma | Typed database access and migration management |
| Deployment | Docker Compose | Local containers and environment configuration |

## Quick start (Windows PowerShell)

Requirements: Node.js 22.13 or later within 22.x, or 24.x (Angular and ESLint compatibility), npm 10 or newer, Python 3.10 or newer for local quant commands, and Docker Desktop with Docker Compose for the full stack.

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
npm ci
docker compose up --detach --wait mysql
npm run db:validate
npm run db:generate
npm run db:migrate:deploy
docker compose up --build --detach
```

Replace the placeholder passwords in `.env` before starting. Keep the MySQL password URL-safe because the host `DATABASE_URL` uses it directly. `.env` is ignored by Git. Never put real credentials in `.env.example` or other tracked files.

If you change `MYSQL_HOST_PORT`, update the port in `DATABASE_URL` to match so host-run Prisma commands connect to the same database.

Open <http://127.0.0.1:4200>. The API health endpoint is <http://127.0.0.1:3000/api/v1/health>. MySQL is published only on `127.0.0.1`; the quant service is reachable only on the private Compose network and has no host-published port. The browser reaches API paths through the web development proxy.

To stop the services while retaining the database volume:

```powershell
docker compose down
```

Removing the database volume deletes local database contents:

```powershell
docker compose down --volumes
```

## Local development without Docker web/API containers

If `.env` does not exist, copy `.env.example` to `.env` and replace the placeholder values. Install dependencies with `npm ci`. Start MySQL with `docker compose up --detach --wait mysql`, apply migrations with `npm run db:migrate:deploy`, then use separate PowerShell windows:

```powershell
npm run api:start:dev
```

```powershell
npm run web:start
```

The local Angular proxy sends `/api` requests to `http://127.0.0.1:3000`. To run the quant health service locally, install its development dependencies and run it from the repository root:

```powershell
python -m pip install -e "services/quant[dev]"
npm run quant:start
```

## Developer commands

| Task | Command |
|---|---|
| Install locked npm dependencies | `npm ci` |
| Build web app | `npm run web:build` |
| Start web dev server | `npm run web:start` |
| Test web app | `npm run web:test` |
| Lint web app | `npm run web:lint` |
| Build API | `npm run api:build` |
| Test API | `npm run test:api` |
| Test quant service | `npm run test:quant` |
| Validate Prisma schema | `npm run db:validate` |
| Generate Prisma client | `npm run db:generate` |
| Apply checked-in migrations | `npm run db:migrate:deploy` |
| Check Compose configuration without printing resolved environment values | `docker compose config --quiet` |
| Start full stack | `docker compose up --build --detach` |
| Stop stack and keep data | `docker compose down` |

Linting is configured for the Angular workspace. API and Python lint commands are not configured yet.

Prisma migrations are applied forward with `npm run db:migrate:deploy`. Recovery from a faulty migration uses a reviewed corrective migration or a verified database restore; this repository does not define an automatic SQL rollback command.

## Database backup and restore (Windows PowerShell)

The commands below store a plain SQL dump under the ignored `backups/` directory. Keep backups local or encrypt them before moving them off the device. Restore replaces the configured database; stop the application first and verify the selected backup path.

Create a backup:

```powershell
New-Item -ItemType Directory -Force backups | Out-Null
$containerId = (docker compose ps -q mysql).Trim()
docker compose exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysqldump --single-transaction --add-drop-database --user=root --databases "$MYSQL_DATABASE" > /tmp/stock-market-backup.sql'
$backupPath = "backups/stock-market-$(Get-Date -Format 'yyyyMMdd-HHmmss').sql"
docker cp "${containerId}:/tmp/stock-market-backup.sql" $backupPath
docker compose exec -T mysql rm -f /tmp/stock-market-backup.sql
Get-Item $backupPath
```

Restore a chosen backup after stopping the API and web services:

```powershell
$containerId = (docker compose ps -q mysql).Trim()
$backupPath = "backups/stock-market-YYYYMMDD-HHMMSS.sql"
docker cp $backupPath "${containerId}:/tmp/stock-market-restore.sql"
docker compose exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql --user=root < /tmp/stock-market-restore.sql'
docker compose exec -T mysql rm -f /tmp/stock-market-restore.sql
```

Verify the restored database with `npm run db:validate` and the project checks before resuming application use. A restore procedure should be exercised against disposable local data before relying on backups.

## Documentation index

- [Architecture](docs/01-architecture.md)
- [Database and ER diagram](docs/02-database.md)
- [Data sources and licensing](docs/03-data-sources.md)
- [Implementation roadmap](docs/04-roadmap.md)
- [Domain specification](docs/05-domain-specification.md)
- [Financial calculation policy](docs/06-calculation-policy.md)
- [Security and data integrity](docs/07-security-and-integrity.md)
- [REST API contract](docs/08-api-contract.md)
- [Development standards](docs/09-development-standards.md)
- [Architecture Decision Records](docs/adr/README.md)
- [Team roles and collaboration](docs/10-team-collaboration.md)
- [Phase and task tracker](docs/11-progress-tracker.md)

## Current implementation status

Phase 1 is in progress. The Angular app is a scaffold, and Docker Compose provides the local service topology. No financial data or provider integration is included in the web scaffold.
