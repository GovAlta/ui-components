import { Bug2782Route } from "../../../routes/bugs/bug2782";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2782",
  path: "bugs/2782",
  title: "Disabled Inputs Hidden",
  component: Bug2782Route,
} satisfies PrRouteDefinition;
