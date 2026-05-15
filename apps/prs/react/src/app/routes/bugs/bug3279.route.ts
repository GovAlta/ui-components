import { Bug3279Route } from "../../../routes/bugs/bug3279";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3279",
  path: "bugs/3279",
  title: "Work Side Menu Key Nav",
  component: Bug3279Route,
} satisfies PrRouteDefinition;
