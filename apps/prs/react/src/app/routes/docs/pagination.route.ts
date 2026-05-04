import { DocsPaginationRoute } from "../../../routes/docs/pagination/pagination";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "pagination",
  path: "docs/pagination",
  title: "Pagination",
  component: DocsPaginationRoute,
} satisfies PrRouteDefinition;
