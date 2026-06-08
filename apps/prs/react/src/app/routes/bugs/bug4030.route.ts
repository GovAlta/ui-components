import { Bug4030Route } from "../../../routes/bugs/bug4030";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4030",
  path: "bugs/4030",
  title: "Footer copyright text",
  component: Bug4030Route,
} satisfies PrRouteDefinition;
