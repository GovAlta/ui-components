import { Bug3892Route } from "../../../routes/bugs/bug3892";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3892",
  path: "bugs/3892",
  title: "Nested close propagation",
  component: Bug3892Route,
} satisfies PrRouteDefinition;