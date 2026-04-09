import Bug3667Route from "../../../routes/bugs/bug3667";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3667",
  path: "bugs/3667",
  title: "Notification banner refinements",
  component: Bug3667Route,
} satisfies PrRouteDefinition;
