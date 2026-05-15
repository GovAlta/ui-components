import { Bug3232Route } from "../../../routes/bugs/bug3232";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3232",
  path: "bugs/3232",
  title: "GoabText Tag Size",
  component: Bug3232Route,
} satisfies PrRouteDefinition;
