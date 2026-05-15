import { DocsFilterChipRoute } from "../../../routes/docs/filter-chip/filter-chip";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "filter-chip",
  path: "docs/filter-chip",
  title: "Filter Chip",
  component: DocsFilterChipRoute,
} satisfies PrRouteDefinition;
