import { Bug3447Route } from "../../../routes/bugs/bug3447";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3447",
  path: "bugs/3447",
  title: "Browser styling for p tags",
  component: Bug3447Route,
} satisfies PrRouteDefinition;
