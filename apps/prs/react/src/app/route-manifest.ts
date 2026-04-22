import type { ComponentType } from "react";

export type PrRouteType = "bug" | "feature" | "docs";

export type PrRouteDefinition = {
  type: PrRouteType;
  id: string;
  path: string;
  component: ComponentType;
  title: string;
};

type PrRouteModule = {
  default: PrRouteDefinition;
};

const routeModules = import.meta.glob<PrRouteModule>("./routes/**/*.route.{ts,tsx}", {
  eager: true,
});

export const prRouteDefinitions = Object.values(routeModules)
  .map((module) => module.default)
  .sort((left, right) => {
    const idComparison = left.id.localeCompare(right.id, undefined, { numeric: true });

    return idComparison !== 0 ? idComparison : left.path.localeCompare(right.path);
  });

export const bugRouteDefinitions = prRouteDefinitions.filter(
  (route) => route.type === "bug",
);

export const featureRouteDefinitions = prRouteDefinitions.filter(
  (route) => route.type === "feature",
);

export const docsRouteDefinitions = prRouteDefinitions.filter(
  (route) => route.type === "docs",
);
