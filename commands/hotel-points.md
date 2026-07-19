---
description: Search hotels with side-by-side cash and points pricing and cents-per-point value
argument-hint: <city or hotel> <check-in> <check-out> [guests]
model: inherit
---

# Hotel points search

Use the Gondola MCP `search_hotels` tool to find hotels for: **$ARGUMENTS**

Then for the strongest options, call `compare_rates` to show the **cash price and the award
(points) price side by side**, with the **cents-per-point** value for each redemption. Rank by
whichever delivers the best value, and call out any night where points clearly beat cash (or vice
versa). If the user is signed in, factor in their loyalty balances (`get_loyalty_accounts`) and note
which stays they can actually afford on points today.
