import { Bug3495Route } from "../../../routes/bugs/bug3495";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3495",
  path: "bugs/3495",
  title: "Tooltip width issue when text changes",
  component: Bug3495Route,
} satisfies PrRouteDefinition;
