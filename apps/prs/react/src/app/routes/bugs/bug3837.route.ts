import { Bug3837Route } from "../../../routes/bugs/bug3837";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3837",
  path: "bugs/3837",
  title: "Tabs label shift on selection",
  component: Bug3837Route,
} satisfies PrRouteDefinition;
