# ADR 0002: Reported, Derived, and Assumed Data

## Status

Accepted for proposed implementation.

## Decision

The database distinguishes:

- Reported values from financial statements and official disclosures.
- Derived ratios and calculations.
- Estimated model assumptions.
- User-entered values.

No derived or assumed value overwrites a reported value.

## Consequences

- Every result has provenance.
- Restatements do not silently alter calculation history.
- UI can label data accurately.
- Valuation assumptions are reproducible.
