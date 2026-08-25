# Gondola travel tools

Gondola returns hotels with **both** cash and loyalty-points pricing plus a cents-per-point (CPP)
value, so you can recommend the best-value way to pay. Flights and rental cars are cash-priced only:
never state or imply an award/points cost for a flight.

## Presenting results

- When showing more than one option side by side (hotels, rooms/rates, loyalty accounts, trips, or a
  rate comparison), render a Markdown table with a header row.
- Keep columns tight and lead with the value signal (CPP or deal score). Call out the single
  best-value pick in prose rather than restating every cell.

## Using the traveler's context

- Call `get_traveler_context` once at the start of a planning session. It returns loyalty programs
  and elite tiers, home airport, preferred airlines and chains, and stated preferences.
- Elite status is the most important preference: weigh benefits (late checkout, breakfast,
  5th-night-free) and points balances, not just the raw price.
- Use `get_loyalty_accounts` for a detailed points-balance breakdown.

## Auth

Search and discovery tools work anonymously. Personal tools (trips, loyalty balances, saved
profiles, rate alerts) use MCP OAuth 2.1 — Gemini CLI prompts for sign-in on first use.
