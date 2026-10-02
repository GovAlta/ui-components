export type SearchablePrRoute = {
  type: "bug" | "feature" | "docs";
  id: string;
  path: string;
  title: string;
};

export function findPrRoute<T extends SearchablePrRoute>(
  query: string,
  routes: readonly T[],
): T | undefined {
  if (/^\d+$/.test(query)) {
    const storyRoutes = routes.filter(
      (route) => route.type !== "docs" && route.id === query,
    );

    return (
      storyRoutes.find((route) => route.path.endsWith(`/${query}`)) ?? storyRoutes[0]
    );
  }

  return routes.find((route) => route.type === "docs" && route.title === query);
}
