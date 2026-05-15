import { DocsBadgeRoute } from "../../../routes/docs/badge/badge";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "badge",
  path: "docs/badge",
  title: "Badge",
  component: DocsBadgeRoute,
} satisfies PrRouteDefinition;
