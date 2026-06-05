import { Feat3346Route } from "../../../routes/features/feat3346";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "3346",
  path: "features/3346",
  title: "Horizontal scroll panel",
  component: Feat3346Route,
} satisfies PrRouteDefinition;
