import Bug3932Route from "../../../routes/bugs/bug3932";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3932",
  path: "bugs/3932",
  title: "Work Side Menu tooltips",
  component: Bug3932Route,
} satisfies PrRouteDefinition;