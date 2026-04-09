import { Bug3281Route } from "../../../routes/bugs/bug3281";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3281",
  path: "bugs/3281",
  title: "GoabText p tag margin issues",
  component: Bug3281Route,
} satisfies PrRouteDefinition;
