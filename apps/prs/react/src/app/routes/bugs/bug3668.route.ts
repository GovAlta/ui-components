import { Bug3668Route } from "../../../routes/bugs/bug3668";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3668",
  path: "bugs/3668",
  title: "Temporary Notification Refinements",
  component: Bug3668Route,
} satisfies PrRouteDefinition;
