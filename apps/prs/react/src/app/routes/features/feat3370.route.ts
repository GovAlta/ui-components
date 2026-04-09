import { Feat3370Route } from "../../../routes/features/feat3370";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "feature",
  id: "3370",
  path: "features/3370",
  title: "Clear calendar day selection",
  component: Feat3370Route,
} satisfies PrRouteDefinition;
