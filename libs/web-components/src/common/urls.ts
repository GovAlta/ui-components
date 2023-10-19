export function isUrlMatch(
  windowUrl: URL | Location,
  testUrl: string,
): boolean {
  if (!testUrl) return false;

  // path match
  const pathParts = windowUrl.pathname.split("/");
  testUrl = testUrl.replace(/^\//, "");
  for (const part of pathParts) {
    if (part === testUrl) return true;
  }

  // hash
  if (windowUrl.hash === testUrl) {
    return true;
  }

  return false;
}
