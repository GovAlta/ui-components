import { DocsTooltipRoute } from "../../../routes/docs/tooltip/tooltip";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "tooltip",
  path: "docs/tooltip",
  title: "Tooltip",
  component: DocsTooltipRoute,
} satisfies PrRouteDefinition;
