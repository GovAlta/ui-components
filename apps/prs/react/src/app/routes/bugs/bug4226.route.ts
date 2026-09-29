import { Bug4226Route } from "../../../routes/bugs/bug4226";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4226",
  path: "bugs/bug4226",
  title: "Radio accessibility and keyboard navigation",
  component: Bug4226Route,
} satisfies PrRouteDefinition;
