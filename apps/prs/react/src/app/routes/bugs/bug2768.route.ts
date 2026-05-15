import { Bug2768Route } from "../../../routes/bugs/bug2768";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2768",
  path: "bugs/2768",
  title: "Enable/Disable Components",
  component: Bug2768Route,
} satisfies PrRouteDefinition;
