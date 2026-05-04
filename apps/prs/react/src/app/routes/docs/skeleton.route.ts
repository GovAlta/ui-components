import { DocsSkeletonRoute } from "../../../routes/docs/skeleton/skeleton";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "skeleton",
  path: "docs/skeleton",
  title: "Skeleton",
  component: DocsSkeletonRoute,
} satisfies PrRouteDefinition;
