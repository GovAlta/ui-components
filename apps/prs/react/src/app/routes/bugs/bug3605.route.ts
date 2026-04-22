import { Bug3605Route } from "../../../routes/bugs/bug3605";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3605",
  path: "bugs/3605",
  title: "Focus visible across interactive components",
  component: Bug3605Route,
} satisfies PrRouteDefinition;
