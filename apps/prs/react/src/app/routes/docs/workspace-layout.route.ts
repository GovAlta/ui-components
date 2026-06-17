import { DocsWorkspaceLayoutRoute } from "../../../routes/docs/workspace-layout/workspace-layout";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "workspace-layout",
  path: "docs/workspace-layout",
  title: "Workspace Layout",
  component: DocsWorkspaceLayoutRoute,
} satisfies PrRouteDefinition;
