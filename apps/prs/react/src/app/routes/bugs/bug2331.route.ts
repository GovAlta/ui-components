import { Bug2331Route } from "../../../routes/bugs/bug2331";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2331",
  path: "bugs/2331",
  title: "Block and Tab Dynamic Data",
  component: Bug2331Route,
} satisfies PrRouteDefinition;
