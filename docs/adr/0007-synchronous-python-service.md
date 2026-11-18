# ADR 0007: Synchronous HTTP Boundary for Python Quant Service

## Status

Accepted by the product owner on 2026-11-18.

## Context

NestJS owns the public REST API and application orchestration. Python owns quantitative calculations. Phase 1 needs a clear service boundary without adding a broker or exposing the quant service to the browser.

## Decision

NestJS communicates with the Python quant service over private synchronous HTTP using JSON. The Python service is not exposed as a public or host-published API. The service provides an unversioned `/health` endpoint for liveness; calculation operations will use a versioned internal path and be specified when the first calculation use case is implemented.

Financial decimal inputs and outputs cross the JSON boundary as decimal strings, not binary floating-point JSON numbers. Calculation results retain method version, input lineage, and explicit unavailable reasons as required by the calculation policy.

## Consequences

- The initial deployment needs no message broker.
- The browser calls NestJS only; NestJS validates and orchestrates requests to Python.
- Synchronous endpoints must remain bounded. Introducing queued long-running work requires a separate decision and contract.
- The Python service listens on loopback by default. Container deployments may listen on the Compose network, but must not publish the quant service port to the host.
