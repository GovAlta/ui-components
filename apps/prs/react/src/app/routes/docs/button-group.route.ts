import { DocsButtonGroupRoute } from "../../../routes/docs/button-group/button-group";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "button-group",
  path: "docs/button-group",
  title: "Button Group",
  component: DocsButtonGroupRoute,
} satisfies PrRouteDefinition;
