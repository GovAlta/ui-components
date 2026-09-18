import { Bug3002Route } from "../../../routes/bugs/bug3002";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3002",
  path: "bugs/3002",
  title: "FormItem error detection",
  component: Bug3002Route,
} satisfies PrRouteDefinition;
