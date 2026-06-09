import { Bug3763Route } from "../../../routes/bugs/bug3763";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3763",
  path: "bugs/3763",
  title: "Percentage width expands open state",
  component: Bug3763Route,
} satisfies PrRouteDefinition;
