# Financial Calculation Policy

## General rules

- Use decimal arithmetic for financial inputs and reported outputs.
- Use floating-point only for explicitly mathematical non-currency operations, after decimal-to-float conversion.
- Rounding happens only at presentation unless a method specification requires a different policy.
- Currency is never converted unless a documented FX rate and timestamp exist.
- Units are normalized to one currency and one unit per calculation snapshot.
- Missing values produce missing outputs and reason codes.
- Divide-by-zero is never coerced into infinity or zero.
- Negative or nonsensical denominator values require explicit handling.

## CAGR

For values \(V_0\) and \(V_n\) over \(n\) years:

\[
CAGR=(V_n/V_0)^{1/n}-1
\]

Rules:

- V0 and Vn must be positive or use period-specific handling for negative starting values.
- n must be greater than zero.
- Missing periods invalidate CAGR.
- Financial year and fiscal year are explicit.
- Report the exact periods used.

## DCF

The enterprise or firm value calculation follows:

\[
PV = \sum_{t=1}^{N} FCF_t/(1+r)^t + TerminalValue/(1+r)^N
\]

Terminal value:

\[
TerminalValue = FCF_N(1+g)/(r-g)
\]

Where r is the discount rate and g is terminal growth.

Rules:

- r must be greater than g.
- Negative or implausible FCF forecast values require warning or rejection.
- Terminal value weight must be visible.
- Net debt is subtracted and minority interests or preferred claims are handled only when sourced.
- Equity value is divided by diluted or weighted outstanding shares according to the documented convention.

Every DCF run stores:

- Forecast period.
- FCF.
- Revenue growth.
- Margins.
- Tax.
- Discount rate.
- Terminal growth.
- Net debt.
- Share count.
- Reported-input snapshot.
- Method version.

## Earnings valuation

Supported methods may derive per-share value from:

- Normalized earnings.
- A justified PE multiple.
- Growth-adjusted PE.
- A peer median or weighted peer method.

The method must store:

- Earnings period.
- Multiple.
- Peer set.
- Peer outliers and exclusions.
- Normalization adjustments.

## Owner earnings

Owner earnings may be represented as:

\[
OwnerEarnings = NetIncome + DepreciationAndAmortization -
CapitalExpenditure - ChangeInWorkingCapital
\]

The exact signs and statement line mappings must come from the normalized chart of accounts and method version.

## PE-based valuation

\[
PerShareValue = EPS \times justifiedPE
\]

For peer valuation, record the peer set and whether median, mean, or weighted median is used.

## Margin of safety

\[
MarginOfSafety = (intrinsicValue - marketPrice)/intrinsicValue
\]

Upside/downside:

\[
UpsideDownside = (marketPrice - intrinsicValue)/intrinsicValue
\]

Results must identify the basis and market-price timestamp.

## Ratios

Each ratio uses a named formula and method version.

Examples:

- ROE: net income / average shareholders' equity.
- ROCE: EBIT / (capital employed).
- Debt-to-equity: total debt / shareholders' equity.
- Current ratio: current assets / current liabilities.
- Interest coverage: EBIT / interest expense.
- Net margin: net income / revenue.

Ratios must store:

- Numerator and denominator.
- Periods.
- Currency/unit normalization.
- Calculated or reported status.
- Missing or invalid factors.

## Portfolio CAGR

Only a portfolio snapshot, external cash flow, and transaction history can support portfolio CAGR. The formula depends on transfer and dividend timing.

The initial implementation must document its cash-flow convention. TWR and MWR/XIRR must be clearly labeled.

## XIRR

XIRR solves:

\[
\sum_i CF_i/(1+r)^{(d_i-d_0)/365}=0
\]

Rules:

- External contribution and withdrawal cash flows have signs.
- Closing market value is added as a final positive flow.
- Buy, sell, dividend, tax, and brokerage treatment is explicit.
- The solution uses a controlled interval and reports convergence status.
- Unconverged XIRR is shown as unavailable.

## Maximum drawdown

Maximum drawdown is the largest peak-to-trough decline in the selected NAV or portfolio market-value series.

The result stores:

- Peak date.
- Trough date.
- Recovery date or not recovered.
- Series frequency.
- Benchmark or portfolio definition.

## Volatility

The initial policy must define:

- Return type.
- Period frequency.
- Observation window.
- Annualization factor.
- Exclusion or handling of missing observations.
- Whether TWR or price return is used.

## Sharpe ratio

\[
Sharpe=(Rp-Rf)/sigma_p
\]

The risk-free return source, date range, annualization, and units are mandatory.

The UI may suppress Sharpe when:

- The observation period is too short.
- The volatility is zero or unavailable.
- The risk-free data is missing.

## Backtest conventions

- Universe membership is effective on each historical date.
- Financial figures use point-in-time snapshots.
- Subsequent restatements do not rewrite earlier observations.
- A period-end filing becomes usable on a user-configurable “information available date,” never before publication.
- Corporate actions are reflected correctly.
- Transaction costs are configurable.
- Trade at next feasible period, according to the documented convention.
- Surviving and delisted stocks are included according to universe rules.
- Benchmark data follows the same delayed-information policy only where applicable.

Every backtest result carries a no-guarantee disclaimer.
