import { Bug2378Route } from "../../../routes/bugs/bug2378";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "2378",
  path: "bugs/2378",
  title: "Expanded content announcement",
  component: Bug2378Route,
} satisfies PrRouteDefinition;
