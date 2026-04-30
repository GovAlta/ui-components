import { Bug3602Route } from "../../../routes/bugs/bug3602";
import type { PrRouteDefinition } from "../../route-manifest";
export default {
  type: "bug",
  id: "3602",
  path: "bugs/3602",
  title: "FileUploadInput and FileUploadCard Improvements",
  component: Bug3602Route,
} satisfies PrRouteDefinition;
