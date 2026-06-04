import Bug3610Route from "../../../routes/bugs/bug3610";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3610",
  path: "bugs/3610",
  title: "DatePicker month placeholder",
  component: Bug3610Route,
} satisfies PrRouteDefinition;
