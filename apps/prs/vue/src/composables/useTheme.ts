import { computed, readonly, ref, type Ref } from "vue";

const STORAGE_KEY = "goab-theme";
const ATTRIBUTE = "data-theme";

/** Theme mode type - matches the web component's theme attribute values */
type GoabThemeMode = "light" | "dark";

/**
 * Reads the initial theme mode from localStorage, data-theme attribute, or system preference.
 */
function readInitialMode(defaultMode: GoabThemeMode): GoabThemeMode {
  if (typeof window === "undefined") return defaultMode;

  // Priority: localStorage > existing data-theme > system preference > defaultMode.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage blocked: fall through.
  }

  const fromAttribute = document.documentElement.getAttribute(ATTRIBUTE);
  if (fromAttribute === "light" || fromAttribute === "dark") return fromAttribute;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return defaultMode;
}

/**
 * Applies the theme mode to the document and localStorage.
 */
function applyTheme(mode: GoabThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(ATTRIBUTE, mode);
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // localStorage write blocked: fail silently.
  }
}

interface UseThemeReturn {
  mode: Ref<GoabThemeMode>;
  isDark: Ref<boolean>;
  setMode: (mode: GoabThemeMode) => void;
  toggle: () => void;
}

/**
 * Composable for managing theme mode (light/dark).
 * 
 * @param defaultMode - The default theme mode to use when no preference is stored.
 * @returns Object with mode ref, isDark computed ref, setMode function, and toggle function.
 */
export function useTheme(defaultMode: GoabThemeMode = "light"): UseThemeReturn {
  const mode = ref<GoabThemeMode>(readInitialMode(defaultMode));

  const isDark = computed(() => mode.value === "dark");

  const setMode = (next: GoabThemeMode): void => {
    mode.value = next;
    applyTheme(next);
  };

  const toggle = (): void => {
    setMode(mode.value === "light" ? "dark" : "light");
  };

  // Apply the initial theme
  applyTheme(mode.value);

  return {
    mode: readonly(mode),
    isDark,
    setMode,
    toggle,
  };
}


