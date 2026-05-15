export const BASE_URL = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (!path) return BASE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_URL}${clean}`;
}
