# ADR 0005: Local-First Deployment

## Status

Accepted for proposed implementation.

## Decision

The base deployment is loopback-only and local to the user. No brokerage account, credentials, or automatic trading functionality is included.

## Consequences

- Public network exposure is opt-in and not default.
- Secrets remain local environment values.
- Database and provider access can be audited locally.
