import { Bug3322Route } from "../../../routes/bugs/bug3322";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3322",
  path: "bugs/3322",
  title: "App Header Menu Hover",
  component: Bug3322Route,
} satisfies PrRouteDefinition;
