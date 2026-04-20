// ?url tells Vite to resolve the asset path without injecting the CSS.
import v2TokensUrl from "@abgov/design-tokens-v2/dist/tokens.css?url";

export type TokenVersion = "v1" | "v2";

const STORAGE_KEY = "goa-token-version";
const LINK_ID = "goa-tokens-v2";
const URL_PARAM = "tokens";

export function resolveTokenVersion(): TokenVersion {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get(URL_PARAM);
  if (fromUrl === "v1" || fromUrl === "v2") return fromUrl;

  const fromSession = sessionStorage.getItem(STORAGE_KEY);
  if (fromSession === "v1" || fromSession === "v2") return fromSession;

  return "v2";
}

export function applyTokenVersion(mode: TokenVersion): void {
  // Link-ordering invariant: V2 stylesheet must be the LAST stylesheet in
  // <head> so cascade resolves V2 over V1 unambiguously. Remove any existing
  // node first, then append so the fresh node lands last.
  document.getElementById(LINK_ID)?.remove();

  if (mode === "v2") {
    const link = document.createElement("link");
    link.id = LINK_ID;
    link.rel = "stylesheet";
    link.href = v2TokensUrl;
    document.head.appendChild(link);
  }

  sessionStorage.setItem(STORAGE_KEY, mode);

  // Only sync URL param if it's already in the URL; don't add clutter on first toggle.
  const url = new URL(window.location.href);
  if (url.searchParams.has(URL_PARAM)) {
    url.searchParams.set(URL_PARAM, mode);
    window.history.replaceState({}, "", url);
  }
}

// Eager side effect: resolve and apply at module load so V2 is in <head>
// before React's first paint. Importing this module once from app.tsx runs this.
applyTokenVersion(resolveTokenVersion());
