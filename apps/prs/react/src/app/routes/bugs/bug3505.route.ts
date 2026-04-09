import { Bug3505Route } from "../../../routes/bugs/bug3505";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3505",
  path: "bugs/3505",
  title: "Link Icon Click",
  component: Bug3505Route,
} satisfies PrRouteDefinition;
