# REST API Contract

The API contract is versioned under `/api/v1`.

## Common conventions

### Identifiers

IDs are UUID strings unless an exchange natural key is required for a provider operation.

### Dates

- JSON dates use ISO 8601.
- Dates with no time use `YYYY-MM-DD`.
- Times use UTC where possible and timezone offsets where timezone is meaningful.

### Pagination

Paginated endpoints use:

```json
{
  "page": 1,
  "pageSize": 50,
  "sort": "symbol",
  "direction": "asc"
}
```

Response metadata includes total count and next-page availability.

### Provenance

Data responses include:

- Source ID.
- Source name.
- Source timestamp.
- Ingested timestamp.
- Currency.
- Unit.
- Freshness status.
- Corporate-action adjustment status where relevant.

### Errors

Errors use stable codes and human-readable details:

```json
{
  "code": "FINANCIAL_INPUT_MISSING",
  "message": "Free cash flow is unavailable for the selected period.",
  "details": {
    "field": "freeCashFlow",
    "periodEnd": "2026-03-31"
  }
}
```

## Universe

### Search/list

- `GET /api/v1/stocks`
- `GET /api/v1/stocks/{stockId}`
- `GET /api/v1/companies/{companyId}`
- `GET /api/v1/universe/nse500`

The universe endpoint requires effective date and status.

## Screener

- `POST /api/v1/screens/preview`
- `POST /api/v1/screens`
- `GET /api/v1/screens`
- `GET /api/v1/screens/{screenId}`
- `PUT /api/v1/screens/{screenId}`
- `DELETE /api/v1/screens/{screenId}`
- `POST /api/v1/screens/{screenId}/run`

Screen conditions include period, operator, value, currency, unit, and missing-value behavior.

## Company analysis

- `GET /api/v1/companies/{companyId}/overview`
- `GET /api/v1/companies/{companyId}/statements`
- `GET /api/v1/companies/{companyId}/ratios`
- `GET /api/v1/companies/{companyId}/shareholding`
- `GET /api/v1/companies/{companyId}/dividends`
- `GET /api/v1/companies/{companyId}/corporate-actions`
- `GET /api/v1/companies/{companyId}/documents`

Statements require period type and basis filters.

## Valuation

- `POST /api/v1/valuations/models`
- `GET /api/v1/valuations/models/{modelId}`
- `PUT /api/v1/valuations/models/{modelId}`
- `POST /api/v1/valuations/models/{modelId}/runs`
- `GET /api/v1/valuations/runs/{runId}`
- `POST /api/v1/valuations/runs/{runId}/sensitivity`

Valuation results include assumptions, input snapshot IDs, market-price timestamp, and method version.

## Ranking

- `POST /api/v1/ranking/runs`
- `GET /api/v1/ranking/runs/{runId}`
- `GET /api/v1/stocks/{stockId}/scores`
- `GET /api/v1/ranking/models`

## Portfolio

- `POST /api/v1/portfolios`
- `GET /api/v1/portfolios`
- `GET /api/v1/portfolios/{portfolioId}`
- `PUT /api/v1/portfolios/{portfolioId}`
- `POST /api/v1/portfolios/{portfolioId}/transactions`
- `GET /api/v1/portfolios/{portfolioId}/holdings`
- `GET /api/v1/portfolios/{portfolioId}/transactions`
- `GET /api/v1/portfolios/{portfolioId}/returns`
- `GET /api/v1/portfolios/{portfolioId}/allocation`
- `GET /api/v1/portfolios/{portfolioId}/benchmark`

Transactions cannot initiate a trade. All endpoints are reporting and record-keeping operations.

## Watchlists

- `POST /api/v1/watchlists`
- `GET /api/v1/watchlists`
- `POST /api/v1/watchlists/{watchlistId}/items`
- `DELETE /api/v1/watchlists/{watchlistId}/items/{stockId}`

## Dashboard

- `GET /api/v1/dashboard/summary`
- `GET /api/v1/dashboard/undervalued`
- `GET /api/v1/dashboard/deteriorating`
- `GET /api/v1/dashboard/results-calendar`
- `GET /api/v1/dashboard/corporate-actions`

## Alerts

- `POST /api/v1/alerts/rules`
- `GET /api/v1/alerts/rules`
- `PUT /api/v1/alerts/rules/{ruleId}`
- `DELETE /api/v1/alerts/rules/{ruleId}`
- `GET /api/v1/alerts/events`
- `POST /api/v1/alerts/events/{eventId}/acknowledge`

## Imports and synchronization

- `POST /api/v1/imports/csv`
- `POST /api/v1/imports/manual`
- `GET /api/v1/imports/{importId}`
- `GET /api/v1/sync/logs`
- `POST /api/v1/sync/jobs/{jobName}/run`

Manual and CSV imports require a source, currency, units, as-of date, and mapping.

## Backtests

- `POST /api/v1/backtests/definitions`
- `GET /api/v1/backtests/definitions`
- `POST /api/v1/backtests/definitions/{definitionId}/runs`
- `GET /api/v1/backtests/runs/{runId}`
- `GET /api/v1/backtests/runs/{runId}/snapshots`
- `GET /api/v1/backtests/runs/{runId}/transactions`

The response requires missing-data handling, bias controls, cost assumptions, and the no-guarantee disclaimer.
