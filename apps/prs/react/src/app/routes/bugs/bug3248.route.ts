import { Bug3248Route } from "../../../routes/bugs/bug3248";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3248",
  path: "bugs/3248",
  title: "Dropdown Dynamic Children Sync",
  component: Bug3248Route,
} satisfies PrRouteDefinition;
