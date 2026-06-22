import { Bug4077Route } from "../../../routes/bugs/bug4077";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4077",
  path: "bugs/4077",
  title: "Text missing heading-2xl",
  component: Bug4077Route,
} satisfies PrRouteDefinition;
