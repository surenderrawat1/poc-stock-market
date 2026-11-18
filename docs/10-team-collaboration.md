# Team Roles and Collaboration

## Team

The project team consists of:

- **Product owner and reviewer:** validates scope, financial assumptions, provider usage, and acceptance criteria.
- **Copilot:** system architecture, backend, database, Python calculations, provider contracts, and cross-module integration.
- **Codex:** Angular UI, reusable components, API integration, tooling, test automation, and isolated frontend/module implementation.

No contributor owns all phases. Ownership is assigned per phase, module, and file before implementation begins.

## Responsibility matrix

| Area | Primary owner | Supporting reviewer | Final approver |
|---|---|---|---|
| Product scope | Product owner | Copilot and Codex | Product owner |
| Architecture | Copilot | Codex | Product owner |
| Database schema and migrations | Copilot | Codex | Product owner |
| NestJS API | Copilot | Codex | Product owner |
| Python calculations | Copilot | Product owner | Product owner |
| Angular UI | Codex | Copilot | Product owner |
| Docker and developer tooling | Codex | Copilot | Product owner |
| Provider adapters | Copilot | Codex | Product owner |
| Provider licensing activation | Product owner | Copilot | Product owner |
| Tests | Assigned implementer | Other coding agent | Product owner |
| Documentation | Assigned implementer | Other coding agent | Product owner |
| Backtesting controls | Copilot | Product owner | Product owner |

Codex and Copilot may change the implementation together only after agreeing on file ownership and boundaries.

## Default ownership

### Product owner

- Decides which provider may be activated.
- Approves financial assumptions and ranking policy.
- Supplies and verifies real-source expectations.
- Reviews UI and financial output for correctness.
- Approves beginning the next implementation phase.
- Performs acceptance and release review.

### Copilot

- Owns architecture and ADR documents by default; coordinates with the implementer when a change affects those decisions.
- Designs database schemas and migrations.
- Implements NestJS domain boundaries.
- Implements Python valuation and quantitative functions.
- Implements provider adapter contracts.
- Adds financial validation and calculation tests.
- Reviews backend/API effects of Codex changes.

### Codex

- Implements Angular pages and reusable components.
- Integrates with versioned REST endpoints.
- Implements responsive layouts and chart components.
- Maintains frontend test coverage.
- Implements Docker tooling and local developer scripts.
- Reviews frontend/API contract compatibility.

### Documentation ownership

- The implementer updates documentation affected by their work in the same change, including UI, tooling, API, data, or calculation documentation as applicable.
- Copilot is the default owner of architecture and ADR files. Other contributors propose changes to those files and coordinate with Copilot before finalizing cross-cutting decisions.
- The owner of each affected file is responsible for consistency and links; the other coding agent reviews cross-boundary changes. Product-owner decisions remain with the product owner.

## Phase workflow

1. Product owner approves the next phase.
2. The phase owner creates or updates the phase task list.
3. Work is divided into independent, named work items.
4. One owner is assigned to each file or domain.
5. Implementation proceeds on the assigned branch.
6. The other coding agent reviews cross-boundary changes.
7. Tests and documentation are updated in the same change.
8. Product owner completes acceptance review.
9. Phase status is moved to complete, and the next phase is approved explicitly.

No contributor starts the next phase while the current phase is incomplete or unapproved.

## Task allocation

Every task must record:

- Owner.
- Phase.
- Module.
- Scope.
- Files expected to change.
- Dependencies.
- Acceptance criteria.
- Test requirements.
- Status.
- Reviewer.

Use the task table in [Progress Tracker](11-progress-tracker.md).

## Branch and file policy

- Keep a separate implementation branch for independent work items.
- One implementation branch must not modify another owner's domain unexpectedly.
- Database and API contract changes require Copilot coordination.
- Frontend data shape changes require the frontend and backend owners to agree.
- Documentation-only changes may be shared and require no code merge.
- Unrelated fixes are split into separate commits or changes.

## Review boundaries

### Copilot reviews

- API contract correctness.
- Database migration safety.
- Decimal and missing-data behavior.
- Valuation formula correctness.
- Data provenance and source metadata.
- Provider licensing controls.

### Codex reviews

- Angular component reuse.
- Loading, stale, missing, and error states.
- Form validation and API state handling.
- Responsive behavior.
- Chart and table accessibility.
- Frontend test coverage.

### Product-owner reviews

- Financial meaning and assumptions.
- UI disclosure of source and freshness.
- Provider activation decision.
- Backtest limitation disclosure.
- Acceptance criteria.
- Whether work is safe to move to the next phase.

## Handoff format

Before handing off work, leave:

- Completed task IDs.
- Summary of behavior changed.
- Files changed.
- Tests run and results.
- Known limitations.
- Remaining work.
- Provider or data dependencies.
- Migration or environment requirements.
- Reviewer requested.

Use this format:

```text
Task:
Owner:
Status:
Summary:
Files:
Tests:
Limitations:
Follow-up:
Reviewer:
```

## Decision recording

Record durable implementation decisions as ADRs. ADRs are required for:

- Technology additions.
- Provider activation.
- Database model changes that affect other modules.
- Financial formula or rounding changes.
- Ranking model changes.
- Portfolio lot-matching changes.
- Backtest bias policy changes.
- Security or deployment changes.

The ADR status values are proposed, accepted, superseded, or rejected.

## Progress disclosure

Update the progress tracker at least once per work session and whenever:

- A task changes status.
- A blocker appears.
- A dependency is resolved.
- A phase is ready for review.
- A provider, formula, or scope decision is made.

Do not mark a task complete until tests and documentation are updated.
