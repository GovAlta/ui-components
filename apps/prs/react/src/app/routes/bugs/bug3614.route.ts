import { Bug3614Route } from "../../../routes/bugs/bug3614";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3614",
  path: "bugs/3614",
  title: "IconButton Hitboxes",
  component: Bug3614Route,
} satisfies PrRouteDefinition;
