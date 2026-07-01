import { Bug3815Route } from "../../../routes/bugs/bug3815";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3815",
  path: "bugs/3815",
  title: "Date picker size prop",
  component: Bug3815Route,
} satisfies PrRouteDefinition;
