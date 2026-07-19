# Gondola — Travel MCP Server & Claude Code Plugin

**The travel MCP that shows cash and award rates side by side.** Search hotels, flights, and rental
cars across **every major hotel chain and loyalty program** — with cents-per-point valuations,
loyalty balance tracking, rate alerts, and direct booking — right from your AI client.

Built for **points and miles**: unlike award-flight-only tools, Gondola covers hotels, flights,
*and* cars, and puts the cash price and the award (points) price in one view so you can see exactly
when a redemption beats cash.

**Works with Claude Code, Codex, Cursor, Windsurf, VS Code, Claude Desktop, ChatGPT, Gemini CLI, and
any MCP-compatible client.** Learn more at [gondola.ai/mcp](https://gondola.ai/mcp).

- **Endpoint:** `https://mcp.gondola.ai/mcp` (Streamable HTTP)
- **Auth:** search & discovery work **anonymously — no account, no API key**. Personal tools
  (loyalty balances, trips, saved profiles) and booking use standard MCP **OAuth 2.1 with Dynamic
  Client Registration** — your client signs you in on first use, no key to copy.
- **Tools:** 34 across hotels, flights, rental cars, loyalty, and analytics.

---

## Quick Install

### Claude Code plugin (recommended)

Inside Claude Code:

```
/plugin marketplace add gondola-ai/gondola-mcp
/plugin install gondola
```

This adds the Gondola MCP server plus slash commands (`/hotel-points`, `/award-flights`,
`/worth-it`, `/optimize-points`). On first use of a personal tool, your client opens gondola.ai to
sign you in via OAuth — takes a few seconds, no API key.

### Or add the MCP server directly (any client)

Search tools work anonymously; personal/booking tools trigger an OAuth login on first call. No client
needs an `mcp-remote` bridge — every client below supports remote Streamable HTTP natively.

**Claude Code**
```bash
claude mcp add --transport http gondola https://mcp.gondola.ai/mcp
```

**Codex CLI**
```bash
codex mcp add gondola --url https://mcp.gondola.ai/mcp
```
Or in `~/.codex/config.toml`:
```toml
[mcp_servers.gondola]
url = "https://mcp.gondola.ai/mcp"
```

**Cursor** — `~/.cursor/mcp.json` (or `.cursor/mcp.json` in a project):
```json
{
  "mcpServers": {
    "gondola": { "url": "https://mcp.gondola.ai/mcp" }
  }
}
```

**Windsurf** — `~/.codeium/windsurf/mcp_config.json` (note: `serverUrl`, not `url`):
```json
{
  "mcpServers": {
    "gondola": { "serverUrl": "https://mcp.gondola.ai/mcp" }
  }
}
```

**VS Code (Copilot / Agent mode)**
```bash
code --add-mcp '{"name":"gondola","type":"http","url":"https://mcp.gondola.ai/mcp"}'
```
Or `.vscode/mcp.json` (note: top-level key is `servers`):
```json
{
  "servers": {
    "gondola": { "type": "http", "url": "https://mcp.gondola.ai/mcp" }
  }
}
```

**Gemini CLI** — `~/.gemini/settings.json` (note: `httpUrl`, not `url`):
```json
{
  "mcpServers": {
    "gondola": { "httpUrl": "https://mcp.gondola.ai/mcp" }
  }
}
```

**Claude Desktop** — Settings → Connectors → **Add custom connector** → name `gondola`, URL
`https://mcp.gondola.ai/mcp`. Leave the OAuth client fields and headers blank (DCR handles it).

**ChatGPT** — Settings → Connectors → Advanced → **Developer mode**, then **Add custom connector** →
URL `https://mcp.gondola.ai/mcp`, auth = OAuth. (Anonymous search works pre-login; personal tools
require the OAuth sign-in.)

---

## What you can do

Ask naturally, or use the slash commands the plugin installs.

### Compare cash vs. points for hotels

```
"Find hotels in Tokyo for March 3–7 and show cash vs points with cents-per-point"
"Is it worth using Bonvoy points for the Ritz in Maui that week, or pay cash?"
"Cheapest 5-night Hyatt stay in Lisbon on points in May"
```
```
/hotel-points Tokyo 2026-03-03 2026-03-07
/worth-it Ritz-Carlton Maui, 4 nights in March, Bonvoy
```

### Search award + cash flights together

```
"Business class SFO to Tokyo in November — award and cash side by side"
"Cheapest way to fly JFK→LHR in points under 60k?"
```
```
/award-flights SFO HND 2026-11-10 business
```

### Make your points work harder

```
"Where are my points worth the most right now?"
"I have 180k Amex points and 90k Bonvoy — best redemption for a beach trip in March?"
```
```
/optimize-points a beach trip in March
```

Signed-in users also get loyalty balances, upcoming/past trips, free-night certificates, saved
traveler profiles, and rate alerts.

---

## MCP tools (34)

Search & discovery tools are anonymous. Tools marked **🔒** use your account and require the
one-time OAuth sign-in; booking tools **📕** place or manage real reservations.

### Hotels
| Tool | What it does |
|------|--------------|
| `search_hotels` | Find hotels with cash and award (points) rates. |
| `compare_rates` | Cash vs points side by side, with cents-per-point value. |
| `get_hotel_details` | Full detail for one property. |
| `get_multi_night_rates` | Per-night rate breakdown across a stay. |
| `get_similar_hotels` | Comparable properties to one you like. |
| `get_hotel_stats` | Rate/availability stats for a hotel. |
| `get_hotel_reviews` | Guest reviews. |
| `predict_price` | Price prediction for a stay. |
| `get_suggested_searches` | Suggested searches / inspiration. |
| `get_booking_link` | Direct booking link. |
| `book_hotel` 🔒📕 | Book a hotel. |

### Flights
| Tool | What it does |
|------|--------------|
| `search_flights` | Award and cash flight search with booking links. |

### Rental cars
| Tool | What it does |
|------|--------------|
| `search_vehicles` | Search rental cars. |
| `get_vehicle_details` | Detail for one vehicle/offer. |
| `credit_card_coverage` | Check credit-card rental insurance coverage. |
| `get_vehicle_booking_coverage` | Coverage on a specific booking. |
| `get_vehicle_booking_link` | Direct booking link. |
| `book_vehicle` 🔒📕 | Book a rental car. |
| `get_vehicle_booking` 🔒 | Retrieve a car booking. |
| `cancel_vehicle_booking` 🔒📕 | Cancel a car booking. |

### Loyalty & analytics
| Tool | What it does |
|------|--------------|
| `get_loyalty_accounts` 🔒 | Your loyalty point balances. |
| `optimize_loyalty_portfolio` 🔒 | Where your points are worth the most. |
| `get_free_night_credits` 🔒 | Free-night certificates you hold. |
| `diagnose_rates` | Explain why a rate is what it is. |

### Trips, alerts & profile
| Tool | What it does |
|------|--------------|
| `get_upcoming_trips` 🔒 | Your upcoming trips. |
| `get_past_trips` 🔒 | Your past trips. |
| `get_booking` 🔒 | Retrieve a specific booking. |
| `get_rate_alerts` 🔒 | Your rate alerts. |
| `create_rate_alert` 🔒 | Create a rate alert. |
| `delete_rate_alert` 🔒 | Delete a rate alert. |
| `get_travel_profiles` 🔒 | Saved traveler profiles. |
| `update_traveler_profile` 🔒 | Update a traveler profile. |
| `get_traveler_context` 🔒 | Your traveler context/preferences. |
| `get_payment_methods` 🔒 | Saved payment methods. |

---

## Why Gondola

- **Cash and award, together.** Every search shows the cash price beside the points price with a
  cents-per-point value — the "is this redemption worth it?" question, answered inline.
- **Every major chain + program**, not a single airline or a single OTA.
- **Real bookings**, not just search — hotels and cars book straight through.
- **No API key.** Anonymous search out of the box; OAuth only when you reach for your own data.

## Links

- Docs & tool reference: https://gondola.ai/mcp
- Website: https://www.gondola.ai
- Server id (Official MCP Registry): `ai.gondola/gondola`
- Also listed on [PulseMCP](https://www.pulsemcp.com/servers/gondola) and
  [Glama](https://glama.ai/mcp/connectors/ai.gondola/gondola).

## License

MIT — see [LICENSE](LICENSE).
