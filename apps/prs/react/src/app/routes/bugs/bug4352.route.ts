import { Bug4352Route } from "../../../routes/bugs/bug4352";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4352",
  path: "bugs/4352",
  title: "Form Item screen reader requirements",
  component: Bug4352Route,
} satisfies PrRouteDefinition;
