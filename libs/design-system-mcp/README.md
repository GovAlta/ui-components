# GoA Design System MCP server

An MCP server that gives AI tools accurate knowledge of the Government of Alberta Design System: components, usage guidance, examples, foundations, and setup instructions. It runs locally over stdio and ships with its data built in, generated from the same content that powers the design system documentation site. Nothing is fetched at runtime, so it works offline.

## Setup

Requires Node 20 or newer. Pin the version that matches your design system release; `2.5.1` below is an example, and the next section says how to choose.

Claude Code:

```sh
claude mcp add goa-design-system -- npx -y @abgov/design-system-mcp@2.5.1
```

Any other MCP client (Cursor, VS Code, and similar):

```json
{
  "mcpServers": {
    "goa-design-system": {
      "command": "npx",
      "args": ["-y", "@abgov/design-system-mcp@2.5.1"]
    }
  }
}
```

## Which version to install

The version follows `@abgov/web-components`: the major and minor are the design system release the answers describe, and the patch counts content updates within that release. Match the major and minor to the `@abgov/web-components` version in your project (React and Angular projects have it installed too) and pin the newest patch on that line, for example `@abgov/design-system-mcp@2.5.1`. To see what is published:

```sh
npm view @abgov/design-system-mcp versions
```

Every published version keeps its data forever, so the pin freezes the knowledge your tools see. Updating within your release is a deliberate step: run the command again and move the pin to the newest patch.

A range such as `@abgov/design-system-mcp@~2.5` keeps you on your release and picks up newer content on its own, but only on npm 11 (Node 24). On npm 10 (Node 20 and 22), npx keeps the first version it installed for a range and never looks for a newer one, so pin instead. With no version at all, npx takes the newest release, which is right only while your components are current.

Content updates within a release are close to your components, not exact: a change to a component that has not shipped yet can appear in the answers before it appears in your project, and a component release that fails partway can leave the answers ahead of npm until the next one.

Prereleases publish under the `dev` tag (`@abgov/design-system-mcp@dev`), matching the `dev` tag of the component packages. Install them by that tag, not by number: their version numbers can sort below stable patches on the same line, which is expected and harmless.

## Tools

- `search`: find components, guidance, examples, and foundations by keyword
- `get`: fetch one item in full by id

## Data

The data is generated from the design system documentation content when the package is released, so each version answers for the design system as it was at that release. For local development, set `GOA_MCP_DATA_DIR` to point the server at a different data folder.
