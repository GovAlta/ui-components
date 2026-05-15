import { Bug2821Route } from "../../../routes/bugs/bug2821";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2821",
  path: "bugs/2821",
  title: "Table Header Sorting Toggle",
  component: Bug2821Route,
} satisfies PrRouteDefinition;
