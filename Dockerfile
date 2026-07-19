# ⚠️ This is NOT the Gondola MCP server.
#
# The real Gondola server is HOSTED at https://mcp.gondola.ai/mcp (remote,
# Streamable HTTP). This image is a thin stdio proxy that bridges to it via
# `mcp-remote`, so MCP registries that introspect stdio servers (e.g. Glama)
# can discover and score Gondola's tools from this repository.
#
# You almost certainly do NOT need to run this. To use Gondola, connect your
# client directly to https://mcp.gondola.ai/mcp — see the README. This proxy
# exists for registry indexing only.

FROM node:22-alpine

# Bridge stdio <-> the hosted Gondola MCP server.
RUN npm install -g mcp-remote@latest

# On start, proxy stdio to the hosted endpoint. Search/discovery tools respond
# anonymously (no key), so registry introspection (initialize + tools/list)
# succeeds without credentials.
ENTRYPOINT ["mcp-remote", "https://mcp.gondola.ai/mcp"]
