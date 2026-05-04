import { DocsGridRoute } from "../../../routes/docs/grid/grid";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "grid",
  path: "docs/grid",
  title: "Grid",
  component: DocsGridRoute,
} satisfies PrRouteDefinition;
