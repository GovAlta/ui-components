import { Bug3103Route } from "../../../routes/bugs/bug3103";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3103",
  path: "bugs/bug3103",
  title: "Pagination dropdown inside Accordion",
  component: Bug3103Route,
} satisfies PrRouteDefinition;
