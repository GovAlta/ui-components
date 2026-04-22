import { DocsTabsRoute } from "../../../routes/docs/tabs/tabs";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "tabs",
  path: "docs/tabs",
  title: "Tabs",
  component: DocsTabsRoute,
} satisfies PrRouteDefinition;
