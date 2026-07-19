---
description: Decide whether to pay cash or redeem points for a specific hotel or flight
argument-hint: <describe the hotel/flight and dates>
model: inherit
---

# Cash or points?

The user is deciding whether to pay cash or redeem points for: **$ARGUMENTS**

Use the Gondola MCP tools (`compare_rates` for hotels, `search_flights` for flights) to pull both the
cash price and the award price, compute the **cents-per-point** you'd get from redeeming, and give a
clear recommendation. Compare that redemption value against a sensible baseline for the program, and
say plainly whether points or cash is the better use here — and why.
