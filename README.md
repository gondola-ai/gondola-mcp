# Gondola MCP Server

**The travel MCP that shows cash and award rates side by side.** Search hotels, flights, and
rental cars across every major loyalty program — with cents-per-point valuations, loyalty balance
tracking, rate alerts, and direct booking — from Claude, Cursor, VS Code, or any MCP client.

Built for **points and miles**: unlike award-flight-only tools, Gondola covers hotels, flights,
*and* cars, and puts the cash price and the award (points) price in one view so you can see exactly
when a redemption beats cash.

## Install

Claude Code / Claude Desktop:

```bash
claude mcp add --transport http gondola https://mcp.gondola.ai/mcp
```

Or point any MCP client at the Streamable HTTP endpoint:

```
https://mcp.gondola.ai/mcp
```

Search and discovery tools work **anonymously — no account, no API key**. Personal tools (your
loyalty balances, trips, saved profiles) and booking use standard MCP **OAuth 2.1 with Dynamic
Client Registration**; your client handles the login automatically.

## What it does

**34 tools** across five areas:

- **Hotels** — search, compare cash vs points rates, cents-per-point valuation, rate details, price
  alerts, and direct booking.
- **Flights** — award and cash search across programs, with booking links.
- **Rental cars** — search, details, credit-card insurance coverage check, and booking.
- **Loyalty & account** — loyalty point balances, upcoming and past trips, saved traveler profiles,
  free-night certificates.
- **Analytics** — price predictions, rate diagnostics, and loyalty-redemption optimization.

## Why Gondola

- **Cash and award, together.** Every search shows the cash price beside the points price with a
  cents-per-point value — the "is this redemption worth it?" question, answered inline.
- **Every major chain + program**, not a single airline or a single OTA.
- **Real bookings**, not just search — hotels and cars book straight through.

## Links

- Docs & tool reference: https://gondola.ai/mcp
- Website: https://www.gondola.ai
- Server id (Official MCP Registry): `ai.gondola/gondola`

## License

MIT — see [LICENSE](LICENSE).
