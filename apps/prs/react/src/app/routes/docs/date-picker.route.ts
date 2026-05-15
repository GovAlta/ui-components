import { DocsDatePickerRoute } from "../../../routes/docs/date-picker/date-picker";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "date-picker",
  path: "docs/date-picker",
  title: "Date Picker",
  component: DocsDatePickerRoute,
} satisfies PrRouteDefinition;
