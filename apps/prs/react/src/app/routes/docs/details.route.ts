import { DocsDetailsRoute } from "../../../routes/docs/details/details";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "details",
  path: "docs/details",
  title: "Details",
  component: DocsDetailsRoute,
} satisfies PrRouteDefinition;
