# Domain Specification

## Stock universe

Each company has a canonical identity and may have one or more listings. The platform distinguishes a company from an exchange-specific stock.

Required fields:

- Canonical name.
- ISIN.
- Sector.
- Industry.
- Primary exchange and symbol.
- Listing status.
- Market capitalization.
- Current price.
- 52-week high and low.
- Financial year end.
- Data source and timestamps.

Filters:

- Sector.
- Industry.
- Market capitalization range.
- Listing exchange.
- Valuation range.
- Constituency effective date.

## Fundamental screener

### Profitability

- ROE.
- ROCE.
- Net profit margin.
- Operating margin.
- EPS growth.

### Financial strength

- Debt-to-equity.
- Interest coverage.
- Current ratio.
- Free cash flow.
- Operating cash flow.

### Valuation

- PE.
- PB.
- PEG.
- EV/EBITDA.
- Price-to-sales.
- Dividend yield.

### Growth

- Revenue CAGR at 3, 5, and 10 years.
- Profit CAGR at 3, 5, and 10 years.
- EPS CAGR.
- Free-cash-flow growth.

Custom conditions:

- AND/OR groups.
- Numeric, percentage, date, and enum operators.
- Multiple observation periods.
- Explicit missing-value behavior.
- Versioned condition definitions.

Records missing critical inputs must not receive a false passing or failing result.

## Company analysis

The company page includes:

- Business overview.
- Revenue segments.
- Sector and industry history.
- Management information if obtained from a permitted source.
- Historical financial statements.
- Balance sheet.
- Profit and loss statement.
- Cash flow statement.
- Shareholding history.
- Promoter holding.
- Institutional holding.
- Dividend history.
- Corporate actions.
- 5-year and 10-year charts where available.

The source and reporting basis must remain visible. Corporate-action adjustments must be shown without rewriting original reported figures.

## Intrinsic value calculator

Supported methods:

1. Discounted cash flow.
2. Earnings-based valuation.
3. Owner earnings.
4. PE-based relative valuation.
5. Industry peer comparison.

DCF inputs:

- Current free cash flow.
- Revenue growth assumptions.
- Operating margin.
- Tax rate.
- Discount rate.
- Terminal growth rate.
- Net debt.
- Outstanding shares.
- Explicit forecast period.

Bear/base/bull runs must use independent assumptions and produce:

- Intrinsic value per share.
- Current market price.
- Upside/downside.
- Margin of safety.
- Discounted terminal and enterprise-value components.

No reported value may be merged with an assumption without lineage.

## Stock ranking

Default weights:

- Business quality: 25%.
- Financial strength: 20%.
- Profitability: 15%.
- Growth: 15%.
- Valuation: 20%.
- Corporate governance/data quality: 5%.

Scores are from 0 to 100. A ranking is suppressed or marked incomplete when critical data is unavailable.

Every score output contains:

- Overall score.
- Component scores.
- Weighted values.
- Rank and rank population.
- As-of date.
- Missing critical factors.
- Strengths.
- Weaknesses.
- Risk factors.
- Valuation status.
- Scoring model version.

## Portfolio

Supported:

- Multiple portfolios.
- Multiple watchlists.
- Buy/sell and dividend transactions.
- Brokerage, taxes, and other transaction charges.
- Purchase date and quantity.
- Realized and unrealized profit/loss.
- Portfolio allocation and sector allocation.
- Portfolio CAGR.
- XIRR.
- Benchmark comparison.

No transactions are sent to an exchange or broker.

Lot matching must be one of:

- FIFO.
- Specific identification.
- Average cost, only if selected and explicitly disclosed.

## Dashboard

Required panels:

- Invested capital.
- Current market value.
- Total return.
- XIRR.
- Dividend income.
- Portfolio allocation.
- Top and bottom performers.
- Undervalued companies.
- Deteriorating fundamentals.
- Upcoming results.
- Verified corporate announcements.

All values must have data freshness and source metadata.

## Alerts

Rules:

- Price drop percentage.
- Target valuation.
- ROE/ROCE deterioration.
- Debt increase.
- Revenue or profit growth decline.
- Promoter holding change.
- Dividend announcement.
- Quarterly results.
- Corporate action.

The UI marks each event as:

- Verified event.
- Calculated signal.

Both include source, observed time, trigger time, and rule version.
