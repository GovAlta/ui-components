import { Bug2529Route } from "../../../routes/bugs/bug2529";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2529",
  path: "bugs/2529",
  title: "Input Width Generation",
  component: Bug2529Route,
} satisfies PrRouteDefinition;
