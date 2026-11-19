# Phase and Task Progress Tracker

## Status values

- **Not started:** no implementation or review has begun.
- **Ready:** dependencies are satisfied and work may begin.
- **In progress:** assigned owner is actively implementing.
- **Blocked:** work has a missing decision or dependency.
- **Review:** implementation is complete but pending review.
- **Complete:** implementation, tests, documentation, and acceptance are complete.

## Current overall status

| Item | Status | Owner | Evidence |
|---|---|---|---|
| Repository and architecture documentation | Complete | Copilot | Root README and docs |
| Git, Copilot, Codex, and Cursor ignore files | Complete | Copilot | Ignore files |
| Documentation review corrections | Complete | Codex | Roadmap, domain and calculation policies, API contract, collaboration guide, and tracker updated; source text verified as UTF-8 |
| Phase 1 implementation | In progress | Shared, Copilot lead | Approved by product owner on 2026-11-18; API, Python, and Prisma scaffolds underway |
| Phase 2 implementation | Not started | Copilot + Codex | After Phase 1 |
| Phase 3 implementation | Not started; live adapters gated on provider terms | Copilot lead | Manual/import path can proceed after Phase 2 and Phase 3 approval; each live adapter requires documented authorization |
| Phase 4 implementation | Not started | Shared | After Phase 3 |
| Phase 5 implementation | Not started | Shared | After Phase 4 |
| Phase 6 implementation | Not started | Copilot lead | After Phase 5 |
| Phase 7 implementation | Not started | Copilot lead | After Phase 6 |
| Phase 8 implementation | Not started | Shared | After Phase 7 |
| Phase 9 implementation | Not started | Shared | After Phase 8 |
| Phase 10 implementation | Not started | Copilot lead | After Phase 9 |

## Phase tracker

| Phase | Scope | Status | Primary owner | Reviewer | Approval |
|---|---|---|---|---|---|
| 1 | Architecture and repository setup | In progress | Copilot | Codex + Product owner | Approved by product owner on 2026-11-18 |
| 2 | Database and NSE 500 universe from user-supplied or otherwise permitted constituents | Not started | Copilot | Codex + Product owner | Pending |
| 3 | Import and provider adapter baseline; live integrations individually gated on terms | Not started | Copilot | Codex + Product owner | Pending |
| 4 | Fundamental screener | Not started | Codex UI, Copilot API | Both | Pending |
| 5 | Company analysis | Not started | Codex UI, Copilot API | Both | Pending |
| 6 | Intrinsic value calculator | Not started | Copilot | Codex + Product owner | Pending |
| 7 | Stock ranking engine | Not started | Copilot | Codex + Product owner | Pending |
| 8 | Portfolio management | Not started | Copilot API, Codex UI | Both | Pending |
| 9 | Dashboard and alerts | Not started | Codex UI, Copilot API | Both | Pending |
| 10 | Historical backtesting | Not started | Copilot | Codex + Product owner | Pending |

## Phase 1 task template

Copy this table and update it for each implementation phase.

| ID | Task | Owner | Status | Files | Acceptance criteria | Test expectations | Dependency | Reviewer |
|---|---|---|---|---|---|---|---|---|
| P1-01 | Create workspace structure | Copilot | Review | Root `package.json`; `apps/`, `services/`, `prisma/`, `docs/`; tests are colocated with their modules | npm workspace exists and module boundaries are documented | `npm install`; verify workspace scripts | Phase 1 approval | Codex |
| P1-02 | Scaffold NestJS API | Copilot | Review | `apps/api/**` | API starts locally and exposes `/api/v1/health` without external data | `npm run api:build`; `npm run test:api`; HTTP health check | P1-01 | Codex |
| P1-03 | Scaffold Angular application | Codex | Review | `apps/web/**` | Strict Angular scaffold builds, displays no financial data, checks the API health endpoint, and has a documented local start command | `npm run web:build`; `npm run web:test`; `npm run web:lint`; start dev server and request its local page | P1-01 | Copilot |
| P1-04 | Scaffold Python service | Copilot | Review | `services/quant/**` | Python service environment and calculation test setup are documented | `npm run test:quant` | P1-01 | Codex |
| P1-05 | Add Prisma baseline | Copilot | In progress | `prisma/schema.prisma`, `prisma/migrations/**` | Baseline schema migrates against the local database | `npm run db:validate`; apply migration to local MySQL | P1-01 | Codex |
| P1-06 | Add Docker Compose | Codex | Blocked | `docker-compose.yml`, `docker/**`, `.dockerignore`, `.env.example` | Services start healthy with host ports loopback-only and quant private | `docker compose config --quiet`; build/start stack and verify MySQL, API, web, and quant health | P1-02 to P1-05 | Copilot |
| P1-07 | Document setup commands | Codex | In progress | `README.md`, `docs/09-development-standards.md` | Install, migration, startup, test, lint, backup, and restore commands are documented and consistent with the repo | Verify links and available commands; backup/restore and migration runtime remain unverified until Docker/MySQL is available | P1-01 to P1-06 | Product owner |

P1 tasks may be marked ready after product-owner approval; Phase 1 was approved on 2026-11-18.

### Phase 1 implementation evidence

- `npm install` completed; `npm audit` reported zero vulnerabilities.
- `npm run api:build` passed; `npm run test:api` passed (1 test).
- `GET http://127.0.0.1:3000/api/v1/health` returned `{"status":"ok"}`.
- `python -m pip install -e "services/quant[dev]"` completed; `npm run test:quant` passed (1 test), and `GET http://127.0.0.1:8000/health` returned `{"status":"ok"}`.
- `npm run db:validate` and `npm run db:generate` passed. The baseline migration is checked in but has not yet been applied because the local Docker engine is unavailable.
- The product owner selected synchronous private HTTP for NestJS-to-Python communication; see ADR 0007. Calculation endpoints are not implemented yet.
- 2026-11-19: Angular scaffold build and lint passed; its Vitest suite passed (1 test), and the local dev server page returned HTTP 200. The UI displays no financial values.
- 2026-11-19: Built API started successfully with `npm run api:start`; the Angular dev proxy returned `{"status":"ok"}` from `/api/v1/health`. `npm run api:start:dev` could not start in this environment because Node.js `os.userInfo()` returned `uv_os_get_passwd` / `ENOMEM` under `tsx watch`.
- 2026-11-19: `npm run test:api` passed (1 test); `npm run test:quant -- -p no:cacheprovider` passed (1 test); `npm run db:validate` and `npm run db:generate` passed.
- 2026-11-19: `docker compose config` passed and all published ports resolve to `127.0.0.1`; quant has no published port. Runtime startup and `db:migrate:deploy` are blocked because Docker Desktop's Linux engine returns HTTP 500 for `/info` and image inspection, and no local MySQL is reachable.
- 2026-11-19: `npm audit --omit=dev` reported zero vulnerabilities. Full audit reports 19 moderate transitive development-tool advisories in the Angular CLI toolchain; the suggested automatic fix forces Angular CLI 22 and a major upgrade. No broad or breaking upgrade was applied.

## Phase dependencies

```mermaid
flowchart LR
    P1[Phase 1 Architecture] --> P2[Phase 2 Database and Universe]
    P2 --> P3[Phase 3 Data Adapters]
    P3 --> P4[Phase 4 Screener]
    P4 --> P5[Phase 5 Company Analysis]
    P5 --> P6[Phase 6 Valuation]
    P6 --> P7[Phase 7 Ranking]
    P7 --> P8[Phase 8 Portfolio]
    P8 --> P9[Phase 9 Dashboard and Alerts]
    P9 --> P10[Phase 10 Backtesting]
```

## Blockers and decisions

| ID | Topic | Blocker or decision | Owner | Status | Resolution |
|---|---|---|---|---|---|
| B-001 | Groww official integration | Confirm official permitted data access and terms before any live integration | Product owner | Open | No live Groww integration; manual/import work is independent |
| B-002 | NSE/BSE access | Confirm data feed, history, retention, and display terms before live ingestion | Product owner | Open | Use user-supplied or otherwise permitted constituent/import files until resolved |
| B-003 | Yahoo access | Confirm whether an expressly permitted integration exists | Product owner | Open | Adapter disabled |
| B-004 | Local Docker engine | Docker Desktop Linux engine returns HTTP 500 to info/image inspection requests; runtime Compose and database migration checks cannot proceed | Product owner | Blocked | Re-run Compose startup and migration checks when the Docker engine is healthy |
| D-001 | Phase 1 approval | Begin repository implementation | Product owner | Resolved | Product owner approved Phase 1 on 2026-11-18 |
| D-002 | Python/TypeScript API boundary | Confirm synchronous HTTP or task queue before service integration | Product owner with Copilot | Resolved | Product owner selected synchronous private HTTP; see ADR 0007 |
| D-003 | Portfolio cost basis policy | Choose initial lot-matching policy before portfolio implementation | Product owner | Pending | FIFO is documented as an option, not selected by this tracker |
| D-004 | Risk metric conventions | Define return type, observation frequency/window, annualization, missing-observation handling, and risk-free rate source before exposing volatility or Sharpe results | Product owner with Copilot | Pending | See calculation policy; no conventions are inferred here |
| D-005 | Angular development-tool advisories | Decide remediation for 19 moderate transitive dev-tool advisories before a major Angular CLI upgrade | Product owner with Codex | Pending | Production-only audit is clean; npm's suggested forced fix upgrades Angular CLI to 22. No forced upgrade applied |

## Decision log

Record decisions here for quick visibility and link to the corresponding ADR.

| Date | Decision | Owner | Linked ADR | Effect |
|---|---|---|---|---|
| 2026-11-18 | Angular, NestJS, Python, MySQL, and Docker | Product team | ADR 0001 | Approved proposed stack |
| 2026-11-18 | Reported, derived, and assumed values remain separate | Product team | ADR 0002 | Required for all analysis |
| 2026-11-18 | Groww adapter disabled until official terms are confirmed | Product team | ADR 0003 | No live Groww integration |
| 2026-11-18 | Decimal and explicit calculation boundary | Product team | ADR 0004 | Required for financial values |
| 2026-11-18 | Local-only deployment baseline | Product team | ADR 0005 | No public exposure by default |
| 2026-11-18 | Point-in-time backtesting | Product team | ADR 0006 | Bias controls required |
| 2026-11-18 | Documentation review updates | Codex | This tracker and linked docs | Manual/import work is separated from live-provider licensing gates; formula, ownership, and Phase 1 task details clarified |
| 2026-11-18 | Phase 1 implementation started | Product owner | This tracker | Product owner approved foundation work; provider integrations remain out of scope |
| 2026-11-18 | Python service boundary | Product owner | ADR 0007 | NestJS calls Python over private synchronous HTTP; no public quant endpoint or broker |
| 2026-11-19 | Phase 1 tasks P1-03, P1-06, and P1-07 | Codex | This tracker | Frontend scaffold is ready for review; Compose runtime blocked by Docker engine; setup and developer docs are in progress pending runtime verification |

## Work-session handoff template

```text
Date:
Phase:
Completed:
In progress:
Blocked:
Next task:
Files changed:
Tests run:
Documentation updated:
Reviewer:
Product-owner approval needed:
```

## Progress update rules

- Update status the same day work changes.
- Link each task to the branch or change where practical.
- Record test evidence, not only “tests pass.”
- Mention missing data or licensing blockers.
- Do not mark tasks complete on implementation alone.
- Documentation and test updates are part of task completion.
