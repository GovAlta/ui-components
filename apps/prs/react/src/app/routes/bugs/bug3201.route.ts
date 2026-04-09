import { Bug3201Route } from "../../../routes/bugs/bug3201";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3201",
  path: "bugs/3201",
  title: "Input Component Events",
  component: Bug3201Route,
} satisfies PrRouteDefinition;
