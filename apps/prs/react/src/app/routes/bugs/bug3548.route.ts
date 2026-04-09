import Bug3548Route from "../../../routes/bugs/bug3548";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3548",
  path: "bugs/3548",
  title: "Work Side Menu scroll fix",
  component: Bug3548Route,
} satisfies PrRouteDefinition;
