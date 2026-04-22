import { DocsAccordionRoute } from "../../../routes/docs/accordion/accordion";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "accordion",
  path: "docs/accordion",
  title: "Accordion",
  component: DocsAccordionRoute,
} satisfies PrRouteDefinition;
