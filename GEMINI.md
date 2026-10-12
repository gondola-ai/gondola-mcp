# Gondola travel tools

Gondola returns hotels with **both** cash and loyalty-points pricing plus a cents-per-point (CPP)
value, so you can recommend the best-value way to pay. Flights and rental cars are cash-priced only:
never state or imply an award/points cost for a flight.

## Presenting results

- When showing more than one option side by side (hotels, rooms/rates, loyalty accounts, trips, or a
  rate comparison), a table with a header row reads better than a list.
- Keep columns tight and lead with the value signal (CPP or deal score). Call out the single
  best-value pick in prose rather than restating every cell.

## Using the traveler's context

- `get_traveler_context` returns loyalty programs and elite tiers, home airport, preferred airlines
  and chains, and stated or learned preferences. It is the best source of who this traveler is, so
  it is worth reading before recommending hotels, flights, or cars.
- Elite status changes the real cost of a stay: benefits (late checkout, breakfast, 5th-night-free)
  and points balances belong in the recommendation alongside the raw price.
- `update_traveler_profile` saves a preference the traveler shares so later sessions can use it.
  Tell them when you save one; they can review, edit, or clear saved preferences at
  https://www.gondola.ai/concierge (Traveler Profile panel).
- Use `get_loyalty_accounts` for a detailed points-balance breakdown.

## Auth

Every tool uses the traveler's Gondola account through MCP OAuth 2.1. Gemini CLI prompts for the
sign-in when it connects; a Gondola account is free and there is no API key.
