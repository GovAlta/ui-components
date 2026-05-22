import { Bug3679Route } from "../../../routes/bugs/bug3679";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3679",
  path: "bugs/3679",
  title: "Table: 1px horizontal overflow from v2 border",
  component: Bug3679Route,
} satisfies PrRouteDefinition;
