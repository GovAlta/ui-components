import { Bug3630Route } from "../../../routes/bugs/bug3630";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3630",
  path: "bugs/3630",
  title: "Drawer refinements",
  component: Bug3630Route,
} satisfies PrRouteDefinition;
