import { Bug2873Route } from "../../../routes/bugs/bug2873";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2873",
  path: "bugs/2873",
  title: "Drawer Scrolling Focus",
  component: Bug2873Route,
} satisfies PrRouteDefinition;
