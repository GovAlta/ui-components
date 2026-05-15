import { Bug3497Route } from "../../../routes/bugs/bug3497";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3497",
  path: "bugs/3497",
  title: "Calendar Years Empty",
  component: Bug3497Route,
} satisfies PrRouteDefinition;
