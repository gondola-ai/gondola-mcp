# Gondola — Travel MCP Server & Claude Code Plugin

[![gondola-mcp MCP server](https://glama.ai/mcp/servers/gondola-ai/gondola-mcp/badges/score.svg)](https://glama.ai/mcp/servers/gondola-ai/gondola-mcp)

**The travel MCP that shows cash and award rates side by side.** Search hotels, flights, and rental
cars across **every major hotel chain and loyalty program**, with cents-per-point valuations, price
prediction, your own loyalty balances and free-night certificates, rate alerts, and a checkout link
for the rate you pick, right from your AI client.

Built for **points and miles**: unlike award-flight-only tools, Gondola covers hotels, flights,
*and* cars, and puts the cash price and the award (points) price in one view so you can see exactly
when a redemption beats cash.

**Works with Claude, Claude Code, Codex, Cursor, Windsurf, VS Code, ChatGPT, Gemini CLI, and any
MCP-compatible client.** Learn more at [gondola.ai/mcp](https://gondola.ai/mcp).

- **Endpoint:** `https://mcp.gondola.ai/mcp/auth` (Streamable HTTP)
- **Auth:** every tool uses your Gondola account. Your client signs you in with standard MCP
  **OAuth 2.1 and Dynamic Client Registration** when you connect. A Gondola account is free, and
  there is no API key to copy.
- **Tools:** 36 across hotels, flights, rental cars, events, loyalty, and analytics.

---

## Quick Install

### Claude (directory)

In Claude, open **Settings > Connectors**, find **Gondola**, and choose **Connect**. Sign in to
Gondola when prompted. Guide: [Using Gondola in Claude](https://www.gondola.ai/help/using-gondola-with-claude).

### Claude Code plugin

Inside Claude Code:

```
/plugin marketplace add gondola-ai/gondola-mcp
/plugin install gondola
```

This adds the Gondola MCP server plus slash commands (`/hotel-points`, `/award-flights`,
`/worth-it`, `/optimize-points`). Your client opens gondola.ai to sign you in via OAuth the first
time it connects.

### Or add the MCP server directly (any client)

Every client below supports remote Streamable HTTP natively, so no `mcp-remote` bridge is needed.
Each one prompts for the Gondola sign-in when it connects.

**Claude Code**
```bash
claude mcp add --transport http gondola https://mcp.gondola.ai/mcp/auth
```

**Codex CLI**
```bash
codex mcp add gondola --url https://mcp.gondola.ai/mcp/auth
```
Or in `~/.codex/config.toml`:
```toml
[mcp_servers.gondola]
url = "https://mcp.gondola.ai/mcp/auth"
```

**Cursor** — `~/.cursor/mcp.json` (or `.cursor/mcp.json` in a project):
```json
{
  "mcpServers": {
    "gondola": { "url": "https://mcp.gondola.ai/mcp/auth" }
  }
}
```

**Windsurf** — `~/.codeium/windsurf/mcp_config.json` (note: `serverUrl`, not `url`):
```json
{
  "mcpServers": {
    "gondola": { "serverUrl": "https://mcp.gondola.ai/mcp/auth" }
  }
}
```

**VS Code (Copilot / Agent mode)**
```bash
code --add-mcp '{"name":"gondola","type":"http","url":"https://mcp.gondola.ai/mcp/auth"}'
```
Or `.vscode/mcp.json` (note: top-level key is `servers`):
```json
{
  "servers": {
    "gondola": { "type": "http", "url": "https://mcp.gondola.ai/mcp/auth" }
  }
}
```

**Gemini CLI** — install as an extension (bundles the server plus usage context):
```bash
gemini extensions install https://github.com/gondola-ai/gondola-mcp
```
Or wire it up by hand in `~/.gemini/settings.json` (note: `httpUrl`, not `url`):
```json
{
  "mcpServers": {
    "gondola": { "httpUrl": "https://mcp.gondola.ai/mcp/auth" }
  }
}
```

**Claude Desktop (custom connector)** — Settings → Connectors → **Add custom connector** → name
`gondola`, URL `https://mcp.gondola.ai/mcp/auth`. Leave the OAuth client fields and headers blank
(DCR handles it).

**ChatGPT** — Settings → Connectors → Advanced → **Developer mode**, then **Add custom connector** →
URL `https://mcp.gondola.ai/mcp/auth`, auth = OAuth.

---

## What you can do

Ask naturally, or use the slash commands the plugin installs.

### Compare cash vs. points for hotels

```
"Compare cash vs points rates for Hyatt hotels in Tokyo, April 15 to 20"
"Is it worth using Bonvoy points for the Ritz in Maui that week, or pay cash?"
"Cheapest 5-night Hyatt stay in Lisbon on points in May"
```
```
/hotel-points Tokyo 2026-04-15 2026-04-20
/worth-it Ritz-Carlton Maui, 4 nights in March, Bonvoy
```

### Search award + cash flights together

```
"Business class SFO to Tokyo in November, award and cash side by side"
"Cheapest way to fly JFK to LHR in points under 60k?"
```
```
/award-flights SFO HND 2026-11-10 business
```

### Make your points work harder

```
"Which of my loyalty points expire in the next three months?"
"I have 180k Amex points and 90k Bonvoy. Best redemption for a beach trip in March?"
```
```
/optimize-points a beach trip in March
```

### Watch a price

```
"Is the Park Hyatt Sydney likely to get cheaper for May 2 to 5, or should I book now?"
"Set a rate alert for the Andaz Maui, December 20 to 27"
```

---

## MCP tools (36)

Every tool runs against your Gondola account after the one-time OAuth sign-in.

Booking is handled through Gondola's checkout: `get_booking_link` and `get_vehicle_booking_link`
hand your client a link to the exact rate, and you finish the reservation on the web. Flight search
is discovery-only; flights cannot be booked through Gondola yet.

### Search

| Tool | What it does |
|------|--------------|
| `search_hotels` | Find hotels by location and dates, with cash and points rates and deal scores. |
| `get_hotel_details` | Stored property facts for one hotel: address, brand, ratings, amenities, room types, policies, and fees. |
| `get_similar_hotels` | Find hotels similar to a given hotel. |
| `search_flights` | Search for flights by route and date. |
| `search_events` | Search for live events by artist, team, show, or event name. |
| `search_vehicles` | Search for rental vehicles at an airport or city. |
| `get_vehicle_details` | Get detailed information about a specific rental vehicle option. |
| `get_hotel_reviews` | Get guest reviews for a specific hotel. |
| `get_suggested_searches` | Get personalized travel suggestions and trip inspiration for the current user. |

### Rates and value

| Tool | What it does |
|------|--------------|
| `get_hotel_rates` | Live room rates for one hotel and stay window, cash and points side by side. |
| `compare_rates` | Compare current canonical cash vs points rates side-by-side for one or more hotels. |
| `predict_price` | Predict whether the current rate at a hotel is a good deal based on historical price trends. |
| `get_hotel_stats` | Get pricing percentile context for a specific hotel. |
| `get_multi_night_rates` | Get cached, partial rate observations for a hotel over a flexible date range. |
| `diagnose_rates` | Diagnose rate availability and per-supplier statuses for a specific hotel. |
| `get_flight_points` | Award (miles) pricing for a flight search that reported pending award sources. |

### Checkout and bookings

| Tool | What it does |
|------|--------------|
| `get_booking_link` | Checkout link for a hotel rate, with dates and guests pre-filled. |
| `prepare_flight_booking` | Re-shop an eligible flight selection and report how it can be booked. |
| `get_flight_booking` | Current state of a Gondola flight booking: payment, ticketing, cancellation, and refund status. |
| `get_vehicle_booking` | Get details for a specific vehicle booking by its Gondola booking ID. |
| `get_vehicle_booking_link` | Get a Gondola.ai checkout link for a specific vehicle from search results. |
| `get_vehicle_booking_coverage` | Get the rental car CDW/LDW coverage that was stored at booking time for a specific vehicle booking. |
| `get_booking` | Get details for a hotel booking made through Gondola, using the Gondola booking ID shown as "Gondola booking" by get_upcoming_trips and get_past_trips. |

### Rate alerts

| Tool | What it does |
|------|--------------|
| `get_rate_alerts` | Get all active rate alerts for the current user. |
| `create_rate_alert` | Create a rate alert to monitor a hotel for price drops. |
| `delete_rate_alert` | Delete a rate alert to stop monitoring a hotel for price drops. |

### Trips, loyalty, and profile

| Tool | What it does |
|------|--------------|
| `get_upcoming_trips` | Get the user's upcoming hotel, flight, and rental car reservations. |
| `get_past_trips` | Get the user's past hotel stays and flights. |
| `get_loyalty_accounts` | Get the user's loyalty program memberships and current point balances. |
| `get_flight_credits` | Get the user's active airline flight credits, eCredits, travel funds, vouchers, and travel-bank balances. |
| `get_free_night_credits` | Free-night certificates you hold, such as Marriott Free Night Awards or Hyatt free nights. |
| `get_suite_upgrade_credits` | Get the user's active suite upgrade awards and certificates across loyalty programs. |
| `optimize_loyalty_portfolio` | Points expiring soon, best transfer opportunities from card currencies, and largest balances. |
| `credit_card_coverage` | Look up rental car CDW/LDW (collision damage waiver / loss damage waiver) coverage provided by a credit card. |
| `get_traveler_context` | Your saved travel context: loyalty tiers, home airport, preferred airlines and chains, trip patterns, and saved preferences. |
| `get_favorite_hotels` | Get the hotels the user has saved as favorites in Gondola, newest first. |

### Partner booking tools

A small set of tools places charges against a saved payment method or lists the cards that can be
charged. They require the `mcp:book` scope, which is granted only to onboarded booking partners.
A client that registers dynamically does not receive the scope, so these tools are neither listed
nor callable on a normal connection.

| Tool | What it does |
|------|--------------|
| `book_hotel` | Book a hotel room using a rate from get_hotel_rates. |
| `get_payment_methods` | List the user's saved payment methods for booking. |
| `book_flight` | Book a prepared flight after the traveler confirms the exact quote. |
| `cancel_flight_booking` | Preview, then confirm, cancellation of a Gondola flight booking. |
| `book_vehicle` | Book a rental vehicle from a search result. |
| `cancel_vehicle_booking` | Cancel an existing vehicle booking by its Gondola booking ID. |
| `get_travel_profiles` | Saved travel profiles: guest name, email, and phone presets. |

Interested in partner access? Email [support@gondola.ai](mailto:support@gondola.ai).

---

## Your traveler profile

`get_traveler_context` reads the traveler profile saved on your Gondola account: loyalty tiers,
home airport, preferred airlines and chains, trip patterns, and the travel preferences stored
there. Preferences are saved by Gondola Concierge or written by hand; connected assistants read
the profile but do not write to it. Review, edit, or clear saved preferences at any time in the
Traveler Profile panel at [gondola.ai/concierge](https://www.gondola.ai/concierge). Details:
[Data privacy](https://www.gondola.ai/help/data-privacy).

## Why Gondola

- **Cash and award, together.** Every search shows the cash price beside the points price with a
  cents-per-point value, so the "is this redemption worth it?" question is answered inline.
- **Every major chain + program**, not a single airline or a single OTA.
- **Straight to checkout.** Hotels and cars hand off a link to the exact rate, so you finish on
  Gondola rather than retyping the search somewhere else.
- **No API key.** Standard OAuth sign-in through your client, nothing to copy or rotate.

## Links

- Docs & tool reference: https://gondola.ai/mcp
- Using Gondola in Claude: https://www.gondola.ai/help/using-gondola-with-claude
- Building your own client: https://www.gondola.ai/help/mcp-oauth-integration
- Website: https://www.gondola.ai
- Server id (Official MCP Registry): `ai.gondola/gondola`
- Also listed on [PulseMCP](https://www.pulsemcp.com/servers/gondola) and
  [Glama](https://glama.ai/mcp/connectors/ai.gondola/gondola).

## License

MIT — see [LICENSE](LICENSE).
