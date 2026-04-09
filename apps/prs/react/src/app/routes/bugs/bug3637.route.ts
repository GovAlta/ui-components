import { Bug3637Route } from "../../../routes/bugs/bug3637";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3637",
  path: "bugs/3637",
  title: "Checkbox Table Header Row Height Bug",
  component: Bug3637Route,
} satisfies PrRouteDefinition;
