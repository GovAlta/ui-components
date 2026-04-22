import { DocsRadioGroupRoute } from "../../../routes/docs/radio-group/radio-group";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "radio-group",
  path: "docs/radio-group",
  title: "Radio Group",
  component: DocsRadioGroupRoute,
} satisfies PrRouteDefinition;
