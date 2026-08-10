import { Bug2819Route } from "../../../routes/bugs/bug2819";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "2819",
  path: "bugs/2819",
  title: "Accordion heading content container",
  component: Bug2819Route,
} satisfies PrRouteDefinition;
