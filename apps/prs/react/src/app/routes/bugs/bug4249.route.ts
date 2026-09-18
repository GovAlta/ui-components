import { Bug4249Route } from "../../../routes/bugs/bug4249";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4249",
  path: "bugs/4249",
  title: "Scrollable panel sizing",
  component: Bug4249Route,
} satisfies PrRouteDefinition;
