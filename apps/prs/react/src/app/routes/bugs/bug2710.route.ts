import { Bug2710Route } from "../../../routes/bugs/bug2710";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "2710",
  path: "bugs/2710",
  title: "Modal body scroll lock",
  component: Bug2710Route,
} satisfies PrRouteDefinition;
