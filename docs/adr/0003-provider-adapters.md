# ADR 0003: Provider Adapters

## Status

Accepted for proposed implementation.

## Decision

Every external or imported data source implements an adapter contract and reports provider identity, source timestamp, retrieval timestamp, freshness, licensing status, and raw source reference.

Groww is a provider placeholder until official permitted access is confirmed. Groww trading credentials and orders are out of scope.

Yahoo and other providers are similarly disabled unless their permitted integration is documented.

## Consequences

- Providers can be replaced.
- Live source calls can be controlled centrally.
- UI and database have consistent provenance.
- Unauthorized scraping is avoided.
