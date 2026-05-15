import { Bug3450Route } from "../../../routes/bugs/bug3450";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3450",
  path: "bugs/3450",
  title: "Dropdown expanding inside Container",
  component: Bug3450Route,
} satisfies PrRouteDefinition;
