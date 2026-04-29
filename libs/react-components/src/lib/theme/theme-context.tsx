import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type GoabThemeMode = "light" | "dark";

interface GoabThemeContextValue {
  mode: GoabThemeMode;
  setMode: (mode: GoabThemeMode) => void;
  toggle: () => void;
}

const STORAGE_KEY = "goab-theme";
const ATTRIBUTE = "data-theme";

const GoabThemeContext = createContext<GoabThemeContextValue | null>(null);

function readInitialMode(defaultMode: GoabThemeMode): GoabThemeMode {
  if (typeof window === "undefined") return defaultMode;

  // Priority: localStorage > existing data-theme > system preference > defaultMode.
  // Reading the attribute allows a blocking <script> in index.html to pre-set
  // theme before paint (FOUC prevention) and have the Provider respect it.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage blocked (private mode, sandboxed iframe): fall through.
  }

  const fromAttribute = document.documentElement.getAttribute(ATTRIBUTE);
  if (fromAttribute === "light" || fromAttribute === "dark") return fromAttribute;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return defaultMode;
}

export interface GoabThemeProviderProps {
  children: ReactNode;
  defaultMode?: GoabThemeMode;
}

export function GoabThemeProvider({
  children,
  defaultMode = "light",
}: GoabThemeProviderProps) {
  const [mode, setModeState] = useState<GoabThemeMode>(() =>
    readInitialMode(defaultMode),
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute(ATTRIBUTE, mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage write blocked: fail silently.
    }
  }, [mode]);

  const setMode = useCallback((next: GoabThemeMode) => {
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <GoabThemeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </GoabThemeContext.Provider>
  );
}

export function useTheme(): GoabThemeContextValue {
  const ctx = useContext(GoabThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a GoabThemeProvider");
  }
  return ctx;
}
