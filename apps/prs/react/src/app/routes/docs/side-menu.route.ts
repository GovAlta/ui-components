import { DocsSideMenuRoute } from "../../../routes/docs/side-menu/side-menu";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "side-menu",
  path: "docs/side-menu",
  title: "Side Menu",
  component: DocsSideMenuRoute,
} satisfies PrRouteDefinition;
