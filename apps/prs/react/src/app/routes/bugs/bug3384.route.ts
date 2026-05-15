import { Bug3384Route } from "../../../routes/bugs/bug3384";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3384",
  path: "bugs/3384",
  title: "v2 Table Border",
  component: Bug3384Route,
} satisfies PrRouteDefinition;
