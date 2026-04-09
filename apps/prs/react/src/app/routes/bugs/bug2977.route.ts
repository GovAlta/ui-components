import { Bug2977Route } from "../../../routes/bugs/bug2977";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "2977",
  path: "bugs/2977",
  title: "OnChangeDetails Event Missing",
  component: Bug2977Route,
} satisfies PrRouteDefinition;
