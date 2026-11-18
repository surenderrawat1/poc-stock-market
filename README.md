# Personal Long-Term Stock Investment Platform

This repository contains the design, domain specification, data model, provider policy, implementation roadmap, and operating decisions for a personal Indian-equity research and portfolio-management application.

The application is for long-term, fundamental, data-driven investment research. It does not place trades, hold brokerage credentials, or send orders to exchanges or brokers.

## Project principles

- Preserve capital and emphasize business quality, valuation discipline, and long-term compounding.
- Keep the application local-first and inaccessible from public networks by default.
- Use only permitted and documented data sources.
- Never fabricate missing financial data.
- Separate reported facts, derived ratios, and user or model assumptions.
- Preserve source, provenance, reporting basis, timestamps, and data freshness.
- Prevent look-ahead bias and survivorship bias in research and backtesting.
- Present backtested performance as historical simulation, never as guaranteed future returns.
- Keep modules independent and replaceable.

## Technology stack

| Area | Technology | Responsibility |
|---|---|---|-
| Web UI | Angular, TypeScript, Angular Material or restrained equivalent | Search, analysis, tables, charts, portfolio views |
| API | NestJS, REST | Application modules, validation, authorization, orchestration |
| Quantitative engine | Python, Pandas, NumPy | Valuation, ratios, portfolio calculations, risk metrics, backtests |
| Database | MySQL | Durable application and provenance data |
| ORM/migrations | Prisma | Typed database access and migration management |
| Charts | Apache ECharts or TradingView Lightweight Charts | Interactive financial charts |
| Deployment | Docker Compose | Local-only containers and environment configuration |
| Scheduled work | NestJS scheduler or dedicated workers | Data synchronization and recalculation |

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

## Current status

The repository is documented but has no application implementation. Code starts only after Phase 1 approval under the repository's phased-development process.
