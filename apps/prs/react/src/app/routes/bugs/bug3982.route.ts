import { Bug3982Route } from "../../../routes/bugs/bug3982";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3982",
  path: "bugs/3982",
  title: "Nested close propagation",
  component: Bug3982Route,
} satisfies PrRouteDefinition;