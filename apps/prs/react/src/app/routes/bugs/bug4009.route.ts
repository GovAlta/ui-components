import Bug4009Route from "../../../routes/bugs/bug4009";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "4009",
  path: "bugs/4009",
  title: "Checkbox and radio label consistency",
  component: Bug4009Route,
} satisfies PrRouteDefinition;
