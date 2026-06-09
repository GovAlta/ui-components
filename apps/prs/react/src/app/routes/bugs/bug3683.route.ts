import Bug3683Route from "../../../routes/bugs/bug3683";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3683",
  path: "bugs/3683",
  title: "Input date/time vertical alignment",
  component: Bug3683Route,
} satisfies PrRouteDefinition;
