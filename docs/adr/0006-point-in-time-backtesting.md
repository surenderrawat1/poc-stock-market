# ADR 0006: Point-in-Time Backtesting

## Status

Accepted for proposed implementation.

## Decision

Backtests use dated snapshot data and an information-availability date. Today's constituent membership and later restatements cannot affect earlier historical observations.

## Consequences

- Backtests require more storage and more source provenance.
- Survivorship and look-ahead bias controls are explicit.
- Performance remains a historical simulation, not a return guarantee.
