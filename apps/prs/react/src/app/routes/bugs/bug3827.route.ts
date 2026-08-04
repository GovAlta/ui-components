import { Bug3827Route } from "../../../routes/bugs/bug3827";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3827",
  path: "bugs/3827",
  title: "Page selection dropdown length",
  component: Bug3827Route,
} satisfies PrRouteDefinition;
