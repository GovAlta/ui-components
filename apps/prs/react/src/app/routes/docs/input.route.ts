import { DocsInputRoute } from "../../../routes/docs/input/input";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "input",
  path: "docs/input",
  title: "Input",
  component: DocsInputRoute,
} satisfies PrRouteDefinition;
