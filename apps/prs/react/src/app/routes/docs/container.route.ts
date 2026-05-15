import { DocsContainerRoute } from "../../../routes/docs/container/container";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "container",
  path: "docs/container",
  title: "Container",
  component: DocsContainerRoute,
} satisfies PrRouteDefinition;
