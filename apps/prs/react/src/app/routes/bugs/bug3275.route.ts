import { Bug3275Route } from "../../../routes/bugs/bug3275";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3275",
  path: "bugs/3275",
  title: "Can't unset month",
  component: Bug3275Route,
} satisfies PrRouteDefinition;
