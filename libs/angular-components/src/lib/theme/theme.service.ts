import { Injectable, effect, signal, type Signal } from "@angular/core";

export type GoabThemeMode = "light" | "dark";

const STORAGE_KEY = "goab-theme";
const ATTRIBUTE = "data-theme";

@Injectable({ providedIn: "root" })
export class GoabThemeService {
  private readonly _mode = signal<GoabThemeMode>(this.readInitialMode());

  /** Read-only signal for consumers. Use in templates: theme.mode() === 'dark'. */
  readonly mode: Signal<GoabThemeMode> = this._mode.asReadonly();

  constructor() {
    effect(() => {
      const current = this._mode();
      if (typeof document === "undefined") return;
      document.documentElement.setAttribute(ATTRIBUTE, current);
      try {
        window.localStorage.setItem(STORAGE_KEY, current);
      } catch {
        // localStorage blocked: fail silently.
      }
    });
  }

  setMode(next: GoabThemeMode): void {
    this._mode.set(next);
  }

  toggle(): void {
    this._mode.update((prev) => (prev === "light" ? "dark" : "light"));
  }

  private readInitialMode(): GoabThemeMode {
    if (typeof window === "undefined") return "light";

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      // fall through
    }

    const fromAttribute = document.documentElement.getAttribute(ATTRIBUTE);
    if (fromAttribute === "light" || fromAttribute === "dark") return fromAttribute;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

    return "light";
  }
}
