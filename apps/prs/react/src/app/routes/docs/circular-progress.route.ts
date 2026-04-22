import { DocsCircularProgressRoute } from "../../../routes/docs/circular-progress/circular-progress";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "circular-progress",
  path: "docs/circular-progress",
  title: "Circular Progress",
  component: DocsCircularProgressRoute,
} satisfies PrRouteDefinition;
