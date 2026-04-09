import { Feat3102Route } from "../../../routes/features/feat3102";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "3102",
  path: "features/3102",
  title: "Allow icon to be set on MenuButton",
  component: Feat3102Route,
} satisfies PrRouteDefinition;
