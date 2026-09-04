# GoA Design System MCP server

An MCP server that gives AI tools accurate knowledge of the Government of Alberta Design System: components, usage guidance, examples, foundations, and setup instructions. It runs locally over stdio and ships with its data built in, generated from the same content that powers the design system documentation site. Nothing is fetched at runtime, so it works offline.

## Setup

Requires Node 20 or newer.

Claude Code:

```sh
claude mcp add goa-design-system -- npx -y @abgov/design-system-mcp
```

Any other MCP client (Cursor, VS Code, and similar):

```json
{
  "mcpServers": {
    "goa-design-system": {
      "command": "npx",
      "args": ["-y", "@abgov/design-system-mcp"]
    }
  }
}
```

Every published version keeps its data forever. To freeze the knowledge your tools see, pin an exact version (for example `@abgov/design-system-mcp@x.y.z`) instead of letting npx take the latest.

## Tools

- `search`: find components, guidance, examples, and foundations by keyword
- `get`: fetch one item in full by id

## Data

The data is generated from the design system documentation content when the package is released, so each version answers for the design system as it was at that release. For local development, set `GOA_MCP_DATA_DIR` to point the server at a different data folder.
