import { DocsMenuButtonRoute } from "../../../routes/docs/menu-button/menu-button";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "menu-button",
  path: "docs/menu-button",
  title: "Menu Button",
  component: DocsMenuButtonRoute,
} satisfies PrRouteDefinition;
