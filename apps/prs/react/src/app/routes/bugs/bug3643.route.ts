import { Bug3643Route } from "../../../routes/bugs/bug3643";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3643",
  path: "bugs/3643",
  title: "Popover right alignment at viewport edge",
  component: Bug3643Route,
} satisfies PrRouteDefinition;
