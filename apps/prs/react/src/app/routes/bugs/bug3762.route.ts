import { Bug3762Route } from "../../../routes/bugs/bug3762";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3762",
  path: "bugs/3762",
  title: "AppHeader examples using slot property",
  component: Bug3762Route,
} satisfies PrRouteDefinition;
