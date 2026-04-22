import { DocsFormItemRoute } from "../../../routes/docs/form-item/form-item";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "form-item",
  path: "docs/form-item",
  title: "Form Item",
  component: DocsFormItemRoute,
} satisfies PrRouteDefinition;
