import { Bug2408Route } from "../../../routes/bugs/bug2408";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2408",
  path: "bugs/2408",
  title: "Form Stepper Incomplete Rendering",
  component: Bug2408Route,
} satisfies PrRouteDefinition;
