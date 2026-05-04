import { Bug3640Route } from "../../../routes/bugs/bug3640";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3640",
  path: "bugs/3640",
  title: "Work Side Menu Badge Alignment",
  component: Bug3640Route,
} satisfies PrRouteDefinition;
