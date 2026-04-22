import { DocsLinearProgressRoute } from "../../../routes/docs/linear-progress/linear-progress";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "linear-progress",
  path: "docs/linear-progress",
  title: "Linear Progress",
  component: DocsLinearProgressRoute,
} satisfies PrRouteDefinition;
