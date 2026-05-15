import { Bug3337Route } from "../../../routes/bugs/bug3337";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3337",
  path: "bugs/3337",
  title: "Input autocomplete styling",
  component: Bug3337Route,
} satisfies PrRouteDefinition;
