import { Feat1731Route } from "../../../routes/features/feat1731";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "feature",
  id: "1731",
  path: "features/1731",
  title: "Dropdown custom no-results text",
  component: Feat1731Route,
} satisfies PrRouteDefinition;
