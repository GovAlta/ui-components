import { DocsModalRoute } from "../../../routes/docs/modal/modal";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "modal",
  path: "docs/modal",
  title: "Modal",
  component: DocsModalRoute,
} satisfies PrRouteDefinition;
