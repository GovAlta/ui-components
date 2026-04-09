"use strict";

const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..");
const routesRoot = path.join(workspaceRoot, "apps", "prs", "angular", "src", "routes");
const outputFile = path.join(
  workspaceRoot,
  "apps",
  "prs",
  "angular",
  "src",
  "app",
  "generated",
  "pr-route-manifest.generated.ts",
);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".route.json") ? [fullPath] : [];
  });
}

function readRoute(routeFile) {
  return {
    ...JSON.parse(fs.readFileSync(routeFile, "utf8")),
    routeFile,
  };
}

function getComponentFilePath(route) {
  return route.routeFile.replace(/\.route\.json$/, ".component.ts");
}

function getComponentImportPath(route) {
  const componentFilePath = getComponentFilePath(route);

  return path
    .relative(path.dirname(outputFile), componentFilePath)
    .replace(/\\/g, "/")
    .replace(/\.ts$/, "");
}

function getComponentClassName(route) {
  const componentSource = fs.readFileSync(getComponentFilePath(route), "utf8");
  const match = componentSource.match(/export class (\w+)/);

  if (!match?.[1]) {
    throw new Error(`Could not find component class in ${route.routeFile}`);
  }

  return match[1];
}

function renderRoute(route) {
  return `  {
    type: "${route.type}",
    id: "${route.id}",
    path: "${route.path}",
    title: "${route.title}",
    loadComponent: () =>
      import("${getComponentImportPath(route)}").then((m) => m.${getComponentClassName(route)}),
  }`;
}

const routes = walk(routesRoot)
  .map(readRoute)
  .sort((left, right) => {
    const idComparison = left.id.localeCompare(right.id, undefined, { numeric: true });

    return idComparison !== 0 ? idComparison : left.path.localeCompare(right.path);
  });

const source = `import type { Route } from "@angular/router";

export type PrRouteType = "bug" | "feature";

export type PrRouteDefinition = {
  type: PrRouteType;
  id: string;
  path: string;
  title: string;
  loadComponent: NonNullable<Route["loadComponent"]>;
};

export const prRouteDefinitions: PrRouteDefinition[] = [
${routes.map(renderRoute).join(",\n")}
];

export const bugRouteDefinitions = prRouteDefinitions.filter(
  (route) => route.type === "bug",
);

export const featureRouteDefinitions = prRouteDefinitions.filter(
  (route) => route.type === "feature",
);
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
const existingSource = fs.existsSync(outputFile)
  ? fs.readFileSync(outputFile, "utf8")
  : null;

if (existingSource === source) {
  console.log(`Route manifest unchanged: ${path.relative(workspaceRoot, outputFile)}`);
} else {
  fs.writeFileSync(outputFile, source);
  console.log(`Generated ${path.relative(workspaceRoot, outputFile)}`);
}
