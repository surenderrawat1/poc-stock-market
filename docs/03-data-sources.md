# Data Sources and Licensing

## Provider policy

A provider may be implemented only after it has a documented licensing and permitted-use position for this application.

The provider adapter contract must expose:

- Provider identity.
- Official or licensed status.
- Retrieval time.
- Provider source timestamp.
- Source frequency.
- Raw reference URL or document.
- Unit and currency.
- License or terms reference.
- Cache policy.
- Retry policy.
- Retention and redistribution status.

The UI must display provider, as-of time, observed time, and freshness. The system must never imply that a webpage or package is an authorized API.

## Sources

### NSE India

Permitted uses may include official index constituent files, authorized market data, and public filings if the applicable terms allow retrieval and local use.

Requirements:

- Confirm real-time, delayed, historical, and redistributable rights separately.
- Track constituent effective dates instead of treating today's NSE 500 as a history.
- Do not use undocumented endpoints as a dependency.
- Rate limit and cache.

Status: **adapter design only until terms and access are confirmed**.

### BSE India

BSE may be used for authorized market data and public corporate disclosures under confirmed terms.

Requirements:

- Confirm product, feed, and display rights.
- Confirm whether historical files may be stored locally.
- Preserve exchange and instrument identifiers.

Status: **adapter design only until terms and access are confirmed**.

### Official company reports

Annual reports, quarterly results, exchanges filings, and issuer publications are primary sources for financial facts.

Requirements:

- Retain source documents and publication dates.
- Keep standalone and consolidated figures separate.
- Record amendments and restatements.
- Manual parser review is required for unusual reports.

Status: **manual upload supported after implementation; bulk automation requires terms review**.

### Groww

Groww may be added as a provider only through an officially permitted integration or licensed market-data service.

Groww account/trading credentials must not be stored or used. The platform will not place, modify, or cancel orders.

The third-party `growwapi` npm package is not sufficient evidence of official authorization. Package availability, API behavior, or interface wording does not establish a right to retrieve, cache, or redistribute data.

Requirements before activation:

- Confirm the official integration and data type.
- Confirm personal/local-use entitlement.
- Confirm historical and real-time rights.
- Confirm caching and retention period.
- Document terms review and provider status.
- Implement separate non-trading authentication and rate limiting.

Status: **disabled official-adapter placeholder only**.

### Yahoo Finance

Yahoo may be used only through an integration expressly permitted by Yahoo's terms and applicable restrictions.

Requirements:

- Confirm authorization and redistribution rights.
- Do not rely on undocumented endpoints or third-party scrapers.
- Track source and delay clearly.
- Use caching to reduce requests.

Status: **disabled unless a permitted integration is documented**.

### Google Finance

There is no general official public API suitable for this platform. Google Finance must not be scraped or used through unsupported endpoints.

Status: **not supported**.

### Manual CSV

CSV import is a supported source.

Requirements:

- Download or user-created data must include source and as-of date.
- Mappings and units are validated.
- Rejected rows are preserved.
- Ambiguous values are not guessed.
- Imports require confirmation before replacing existing snapshots.

Status: **must be fully supported**.

### Manual entry

Manual entry is supported for user-verified values or unavailable exchange feeds.

Requirements:

- Mark source as manual.
- Require date, currency, unit, period/basis, and rationale.
- Do not blend manual values with official values without showing which is which.

## Freshness rules

The frontend must distinguish:

- **Fresh:** within source-specific interval.
- **Stale:** outside interval.
- **Delayed:** source is contractually delayed.
- **Unknown:** no source timestamp.
- **Unavailable:** request failed or no permitted source.
- **Superseded:** a newer verified correction exists.

The platform must not silently fall back to stale values if the requested calculation requires a fresh value.
