import { Bug3860Route } from "../../../routes/bugs/bug3860";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3860",
  path: "bugs/3860",
  title: "App Header Menu aligned left instead of right",
  component: Bug3860Route,
} satisfies PrRouteDefinition;
