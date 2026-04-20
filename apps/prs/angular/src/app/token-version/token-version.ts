export type TokenVersion = "v1" | "v2";

const STORAGE_KEY = "goa-token-version";
const LINK_ID = "goa-tokens-v2";
const URL_PARAM = "tokens";

// Served at this path via the asset copy configured in project.json.
const V2_TOKENS_URL = "/v2-tokens/tokens.css";

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
    link.href = V2_TOKENS_URL;
    document.head.appendChild(link);
  }

  sessionStorage.setItem(STORAGE_KEY, mode);

  // Only sync URL param if already present; don't add clutter on first toggle.
  const url = new URL(window.location.href);
  if (url.searchParams.has(URL_PARAM)) {
    url.searchParams.set(URL_PARAM, mode);
    window.history.replaceState({}, "", url);
  }
}

// Eager side effect: resolve and apply at module load so V2 is in <head>
// before Angular bootstraps. Import this module once from main.ts.
applyTokenVersion(resolveTokenVersion());
