import { Bug2720Route } from "../../../routes/bugs/bug2720";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2720",
  path: "bugs/2720",
  title: "Tabs Change via Link",
  component: Bug2720Route,
} satisfies PrRouteDefinition;
