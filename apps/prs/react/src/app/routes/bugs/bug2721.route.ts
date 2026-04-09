import { Bug2721Route } from "../../../routes/bugs/bug2721";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2721",
  path: "bugs/2721",
  title: "Text Tag Margin",
  component: Bug2721Route,
} satisfies PrRouteDefinition;
