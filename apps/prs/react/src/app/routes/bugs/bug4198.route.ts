import { Bug4198Route } from "../../../routes/bugs/bug4198";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4198",
  path: "bugs/4198",
  title: "Dropdown text colour hierarchy",
  component: Bug4198Route,
} satisfies PrRouteDefinition;
