import { Bug3273Route } from "../../../routes/bugs/bug3273";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3273",
  path: "bugs/3273",
  title: "Nested Side Menu Groups",
  component: Bug3273Route,
} satisfies PrRouteDefinition;
