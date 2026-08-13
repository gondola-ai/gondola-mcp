#!/usr/bin/env node
/**
 * Gondola MCP — local catalog server.
 *
 * Gondola is a HOSTED MCP server (https://mcp.gondola.ai/mcp). This lightweight
 * stdio server exists so registries and tools that build/introspect a server
 * locally can discover Gondola's tool catalog. It advertises the 30 self-serve
 * tools (definitions pulled verbatim from the hosted server) via `tools/list`;
 * actual execution runs on the hosted server, so `tools/call` returns a pointer
 * there.
 *
 * The four mcp:book tools (book_hotel, book_vehicle, cancel_vehicle_booking,
 * get_payment_methods) are deliberately absent. The hosted server filters them
 * out of `tools/list` for every connection without that partner-only scope, and
 * advertising them here would put the financial surface back in front of exactly
 * the registry crawlers that filtering exists to satisfy.
 *
 * To USE Gondola, connect your client directly to https://mcp.gondola.ai/mcp
 * (see the README / gondola.ai/mcp). You do not need to run this.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const HOSTED_URL = "https://mcp.gondola.ai/mcp";
const here = dirname(fileURLToPath(import.meta.url));
const tools = JSON.parse(readFileSync(join(here, "tools.json"), "utf8"));

const server = new Server(
  { name: "gondola", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => ({
  content: [
    {
      type: "text",
      text:
        `Gondola runs as a hosted MCP server. Connect your client directly to ` +
        `${HOSTED_URL} to execute "${request.params.name}" — search works ` +
        `anonymously (no API key); account and booking tools use OAuth 2.1. ` +
        `Setup for every client is at https://gondola.ai/mcp.`,
    },
  ],
  isError: true,
}));

await server.connect(new StdioServerTransport());
