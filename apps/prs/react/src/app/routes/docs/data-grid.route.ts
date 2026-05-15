import { DocsDataGridRoute } from "../../../routes/docs/data-grid/data-grid";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "data-grid",
  path: "docs/data-grid",
  title: "DataGrid",
  component: DocsDataGridRoute,
} satisfies PrRouteDefinition;
