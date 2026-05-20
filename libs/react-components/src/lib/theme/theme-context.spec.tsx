import { act, renderHook } from "@testing-library/react";
import { type ReactNode } from "react";

import { GoabThemeProvider, useTheme } from "./theme-context";

const STORAGE_KEY = "goab-theme";
const ATTRIBUTE = "data-theme";

function mockMatchMedia(prefersDark: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? prefersDark : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function wrapper(props: { children: ReactNode }) {
  return <GoabThemeProvider>{props.children}</GoabThemeProvider>;
}

describe("GoabThemeProvider / useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(ATTRIBUTE);
    mockMatchMedia(false);
  });

  describe("initial mode resolution", () => {
    it("defaults to 'light' when localStorage, attribute, and system preference are absent", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("light");
    });

    it("reads 'dark' from localStorage when present", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("dark");
    });

    it("reads 'light' from localStorage when present", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("light");
    });

    it("ignores invalid localStorage values and falls through to next source", () => {
      localStorage.setItem(STORAGE_KEY, "purple");
      document.documentElement.setAttribute(ATTRIBUTE, "dark");

      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("dark");
    });

    it("reads 'dark' from data-theme attribute when localStorage is empty", () => {
      document.documentElement.setAttribute(ATTRIBUTE, "dark");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("dark");
    });

    it("reads 'dark' from prefers-color-scheme when localStorage and attribute are absent", () => {
      mockMatchMedia(true);
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("dark");
    });

    it("prefers localStorage over data-theme attribute", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      document.documentElement.setAttribute(ATTRIBUTE, "dark");

      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("light");
    });

    it("prefers data-theme attribute over prefers-color-scheme", () => {
      mockMatchMedia(true);
      document.documentElement.setAttribute(ATTRIBUTE, "light");

      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("light");
    });

    it("respects defaultMode prop when no other source is set", () => {
      const customWrapper = (props: { children: ReactNode }) => (
        <GoabThemeProvider defaultMode="dark">{props.children}</GoabThemeProvider>
      );
      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });
      expect(result.current.mode).toBe("dark");
    });
  });

  describe("setMode", () => {
    it("updates the mode value", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => result.current.setMode("dark"));
      expect(result.current.mode).toBe("dark");
    });

    it("syncs the data-theme attribute on <html>", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => result.current.setMode("dark"));
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("dark");

      act(() => result.current.setMode("light"));
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("light");
    });

    it("persists the mode to localStorage", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => result.current.setMode("dark"));
      expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });
  });

  describe("toggle", () => {
    it("flips light to dark", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("light");

      act(() => result.current.toggle());
      expect(result.current.mode).toBe("dark");
    });

    it("flips dark to light", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.mode).toBe("dark");

      act(() => result.current.toggle());
      expect(result.current.mode).toBe("light");
    });

    it("flips back and forth across multiple calls", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => result.current.toggle());
      expect(result.current.mode).toBe("dark");

      act(() => result.current.toggle());
      expect(result.current.mode).toBe("light");

      act(() => result.current.toggle());
      expect(result.current.mode).toBe("dark");
    });

    it("syncs attribute and localStorage on toggle", () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => result.current.toggle());
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("dark");
      expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });

    it("returns a stable toggle reference across renders", () => {
      const { result, rerender } = renderHook(() => useTheme(), { wrapper });
      const firstToggle = result.current.toggle;

      rerender();
      expect(result.current.toggle).toBe(firstToggle);
    });
  });

  describe("useTheme outside provider", () => {
    it("throws a descriptive error when used without GoabThemeProvider", () => {
      // Suppress React's expected error log for this test
      const noop = () => undefined;
      const errorSpy = vi.spyOn(console, "error").mockImplementation(noop);

      expect(() => renderHook(() => useTheme())).toThrow(
        "useTheme must be used within a GoabThemeProvider",
      );

      errorSpy.mockRestore();
    });
  });

  describe("localStorage failures", () => {
    it("does not throw when localStorage.setItem is blocked", () => {
      const setItemSpy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(() => act(() => result.current.setMode("dark"))).not.toThrow();
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("dark");

      setItemSpy.mockRestore();
    });

    it("does not throw when localStorage.getItem is blocked at construction", () => {
      const getItemSpy = vi
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("SecurityError");
        });

      expect(() => renderHook(() => useTheme(), { wrapper })).not.toThrow();

      getItemSpy.mockRestore();
    });
  });
});
