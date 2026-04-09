import { Bug3699Route } from "../../../routes/bugs/bug3699";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3699",
  path: "bugs/3699",
  title: "Notification Popover rounded corners",
  component: Bug3699Route,
} satisfies PrRouteDefinition;
