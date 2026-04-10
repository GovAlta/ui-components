import { Bug3654Route } from "../../../routes/bugs/bug3654";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3654",
  path: "bugs/3654",
  title: "Modal refinements",
  component: Bug3654Route,
} satisfies PrRouteDefinition;
