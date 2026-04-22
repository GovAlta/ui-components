import { DocsDrawerRoute } from "../../../routes/docs/drawer/drawer";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "drawer",
  path: "docs/drawer",
  title: "Drawer",
  component: DocsDrawerRoute,
} satisfies PrRouteDefinition;
