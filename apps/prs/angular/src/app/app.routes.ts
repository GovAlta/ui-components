import { Route } from "@angular/router";

import { EverythingComponent } from "./everything.component";
import { prRouteDefinitions } from "./generated/pr-route-manifest.generated";

export const appRoutes: Route[] = [
  { path: "everything", component: EverythingComponent },
  ...prRouteDefinitions.map((route) => ({
    path: route.path,
    loadComponent: route.loadComponent,
  })),
];
