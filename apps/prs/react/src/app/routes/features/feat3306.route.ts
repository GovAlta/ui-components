import { Feat3306Route } from "../../../routes/features/feat3306";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "feature",
  id: "3306",
  path: "features/3306",
  title: "Custom slug value for tabs",
  component: Feat3306Route,
} satisfies PrRouteDefinition;
