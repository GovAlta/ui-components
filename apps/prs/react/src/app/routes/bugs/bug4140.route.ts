import { Bug4140Route } from "../../../routes/bugs/bug4140";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4140",
  path: "bugs/4140",
  title: "Radio label vertical alignment",
  component: Bug4140Route,
} satisfies PrRouteDefinition;
