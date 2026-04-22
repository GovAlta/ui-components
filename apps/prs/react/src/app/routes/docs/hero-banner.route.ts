import { DocsHeroBannerRoute } from "../../../routes/docs/hero-banner/hero-banner";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "hero-banner",
  path: "docs/hero-banner",
  title: "Hero Banner",
  component: DocsHeroBannerRoute,
} satisfies PrRouteDefinition;
