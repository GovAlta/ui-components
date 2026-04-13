import { Bug3681Route } from "../../../routes/bugs/bug3681";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3681",
  path: "bugs/3681",
  title: "Dropdown selected item highlight",
  component: Bug3681Route,
} satisfies PrRouteDefinition;
