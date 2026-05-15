import { Bug2547Route } from "../../../routes/bugs/bug2547";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2547",
  path: "bugs/2547",
  title: "Popover Hidden Near Notification",
  component: Bug2547Route,
} satisfies PrRouteDefinition;
