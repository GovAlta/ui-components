import { DocsTableRoute } from "../../../routes/docs/table/table";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "table",
  path: "docs/table",
  title: "Table",
  component: DocsTableRoute,
} satisfies PrRouteDefinition;
