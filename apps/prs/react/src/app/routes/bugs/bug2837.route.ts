import { Bug2837Route } from "../../../routes/bugs/bug2837";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2837",
  path: "bugs/2837",
  title: "InputNumber Leading/Trailing Content",
  component: Bug2837Route,
} satisfies PrRouteDefinition;
