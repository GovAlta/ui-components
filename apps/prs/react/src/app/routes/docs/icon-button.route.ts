import { DocsIconButtonRoute } from "../../../routes/docs/icon-button/icon-button";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "icon-button",
  path: "docs/icon-button",
  title: "Icon Button",
  component: DocsIconButtonRoute,
} satisfies PrRouteDefinition;
