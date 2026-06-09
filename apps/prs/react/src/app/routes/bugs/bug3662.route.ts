import Bug3662Route from "../../../routes/bugs/bug3662";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "bug",
  id: "3662",
  path: "bugs/3662",
  title: "Menu button: closing the menu swallows the next click event",
  component: Bug3662Route,
} satisfies PrRouteDefinition;
