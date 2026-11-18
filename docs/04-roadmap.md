# Implementation Roadmap

Implementation occurs phase by phase. A later phase begins only after the previous phase meets its exit criteria and the product owner explicitly approves it. Provider licensing gates live retrieval, caching, retention, and display; it does not by itself block work that can use user-supplied or otherwise permitted imports.

No phase may use fake or generated financial data in production. Development-only sample data must use an unmistakable sample label and must not enter database migrations or production seed paths.

## Phase 1: Architecture and repository setup

### Objective

Create the base monorepo structure and local deployment baseline.

### Planned files

- Root workspace configuration.
- `apps/web`
- `apps/api`
- `services/quant`
- `prisma/schema.prisma`
- `docker-compose.yml`
- Environment templates.
- Initial API and calculation health endpoints.

### Deliverables

- Architecture implementation.
- Prisma baseline.
- Docker local startup.
- Test configuration.
- API documentation setup.
- Python project setup.
- Unit and integration test examples.

### Complexity

Medium.

### Exit criteria

- Services start locally.
- Database migrations run cleanly.
- Health endpoints return without external data.
- Configuration has no committed secrets.
- Existing documentation remains accurate.

## Phase 2: Database design and stock universe

### Objective

Implement reference data and NSE 500 universe ingestion/import from a user-supplied or otherwise permitted constituent file. Preserve its source, effective date, and retrieval/import time; do not infer historical membership from today's constituent list.

### Deliverables

- Prisma migrations.
- Stock, listing, sector, industry, source, and sync tables.
- Manual CSV universe import.
- Universe filtering and APIs.
- Effective-dated constituent support.
- Unit and integration tests.

### Complexity

Medium.

### Exit criteria

- Every record has source and timestamp metadata.
- NSE 500 constituents are loaded from a user-supplied or otherwise permitted source, with effective dates and provenance retained.
- Missing mandatory values are rejected.
- Exchange-symbol and ISIN duplicates are detected.
- Tests cover effective constituent dates and listing changes.

## Phase 3: Data-source integration

### Objective

Implement the provider adapter boundary, permitted imports, and synchronization. Live provider integrations are optional extensions that require documented authorization before activation.

### Deliverables

- Provider interface.
- Disabled Groww adapter placeholder; no live calls.
- Optional NSE/BSE or licensed live adapter only after authorization is documented.
- Yahoo adapter only if authorization is documented; otherwise leave disabled.
- CSV and manual imports.
- Sync logging and freshness policies.
- Retry and cache behavior.

### Complexity

High.

### Exit criteria

- No live call occurs until provider status is official or licensed.
- Manual CSV and manual-entry imports work without live-provider credentials and retain source, as-of date, currency, units, and mapping provenance.
- Failures preserve prior valid snapshots.
- Sync audit details are visible.
- Import row rejection is tested.

Provider licensing is a gate for each live adapter and its related data use. It is not an exit criterion for the permitted manual-import capability. If a later feature requires live data, that feature remains unavailable until a permitted source is approved.

## Phase 4: Fundamental screener

### Objective

Create transparent fundamental filters and saved screens.

### Deliverables

- Profitability, financial-strength, valuation, and growth filters.
- Custom condition builder.
- Missing-data behavior.
- Sortable and paginated results.
- Data-as-of output.

### Complexity

Medium–High.

### Exit criteria

- Missing critical inputs exclude or mark records explicitly.
- Ratio formulas use versioned calculation functions.
- Filters produce deterministic results.
- Screens can be reproduced from stored inputs.

## Phase 5: Company analysis

### Objective

Build detailed company research pages.

### Deliverables

- Business overview.
- 5- and 10-year normalized trends.
- Statements, ownership, dividends, and corporate actions.
- Source-document links or identifiers.
- Revisions and amendment display.

### Complexity

High.

### Exit criteria

- Reported and calculated values are visually distinct.
- Standalone/consolidated periods are distinguishable.
- Missing periods are shown as gaps.
- Statement sources and timestamps are available.

## Phase 6: Intrinsic value calculator

### Objective

Implement auditable valuation methods.

### Deliverables

- DCF.
- Earnings-based valuation.
- Owner earnings.
- PE-based valuation.
- Industry peer comparison.
- Bear/base/bull scenarios.
- Margin-of-safety results.
- Sensitivity analysis.

### Complexity

High.

### Exit criteria

- Reported values and assumptions are visually distinct.
- Every run stores inputs and method version.
- Bear/base/bull calculations are reproducible.
- Critical missing inputs block valuation with a reason.
- Formula and edge cases have tests.

## Phase 7: Stock ranking engine

### Objective

Create a weighted and explainable stock-ranking model.

### Planned weights

- Business quality: 25%
- Financial strength: 20%
- Profitability: 15%
- Growth: 15%
- Valuation: 20%
- Governance/data quality: 5%

### Complexity

Medium–High.

### Exit criteria

- Category components sum to 100%.
- Ranking does not silently include critical missing data.
- Scores and ranks have data-quality status.
- Strengths, weaknesses, risks, and valuation status are evidence-derived.

## Phase 8: Portfolio management

### Objective

Track holdings and long-term investment performance.

### Deliverables

- Multiple portfolios and watchlists.
- Transactions and charges.
- Lot matching.
- Dividend and corporate-action cash flows.
- Current value and unrealized/realized returns.
- Portfolio CAGR and XIRR.
- Sector and company allocation.
- Benchmark comparison.

### Complexity

High.

### Exit criteria

- Financial cash flows match transaction and dividend records.
- Lot matching is explicit.
- XIRR behavior is tested.
- Charges are included where applicable.
- No trade or brokerage integration is introduced.

## Phase 9: Dashboard and alerts

### Objective

Provide a monitoring dashboard and configurable alerts.

### Deliverables

- Portfolio summaries.
- Top and bottom performers.
- Undervalued and deteriorating companies.
- Upcoming results.
- Verified announcements.
- Calculated alerts.

### Complexity

Medium–High.

### Exit criteria

- Verified events are visually separated from calculated signals.
- Alert source timestamps are visible.
- Stale observations are not sent as current events.
- Dashboard can operate with partial data.

## Phase 10: Historical backtesting

### Objective

Test point-in-time investment strategies historically.

### Deliverables

- Historical screens.
- Rebalancing simulations.
- CAGR and XIRR.
- Maximum drawdown.
- Volatility and Sharpe ratio.
- Benchmark comparison.
- Cost assumptions.
- Survivorship/look-ahead controls.

### Complexity

Very high.

### Exit criteria

- Surviving and delisted listings are included according to the defined universe.
- No future period or restatement can affect an earlier simulation snapshot.
- Corporate actions and transaction costs are modeled.
- UI includes a backtest limitation disclaimer.
- Performance is never presented as guaranteed.
