# ADR 0001: Technology Stack

## Status

Accepted for proposed implementation.

## Context

The application is a personal, modular long-term research and portfolio platform requiring responsive UI, REST APIs, reliable relational storage, and robust financial calculations.

## Decision

- Use Angular and TypeScript for the frontend.
- Use NestJS for REST orchestration and domain modules.
- Use Python, Pandas, and NumPy for quantitative calculations.
- Use MySQL and Prisma.
- Use Docker Compose for local deployment.
- Use Apache ECharts or TradingView Lightweight Charts for charts.

## Consequences

- TypeScript and Python boundaries require explicit data contracts.
- Quantitative logic can be tested independently.
- Local deployment remains possible without cloud dependencies.
- Provider, API, database, and calculation responsibilities remain separated.
