import { DocsButtonRoute } from "../../../routes/docs/button/button";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "button",
  path: "docs/button",
  title: "Button",
  component: DocsButtonRoute,
} satisfies PrRouteDefinition;
