# ADR 0004: Decimal Storage and Calculation Boundary

## Status

Accepted for proposed implementation.

## Decision

MySQL and API financial values use `DECIMAL` or exact value representations. Python converts exact inputs using an explicit decimal policy and does not perform implicit financial float arithmetic.

## Consequences

- Currency values do not accumulate binary floating-point drift.
- XIRR, CAGR, and risk ratios still use documented numerical methods.
- Presentation rounding is separated from computation.
