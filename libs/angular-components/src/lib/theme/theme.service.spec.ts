import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { GoabThemeService } from "./theme.service";

const STORAGE_KEY = "goab-theme";
const ATTRIBUTE = "data-theme";

function mockMatchMedia(prefersDark: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? prefersDark : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

function flushEffects() {
  TestBed.inject(ApplicationRef).tick();
}

describe("GoabThemeService", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(ATTRIBUTE);
    mockMatchMedia(false);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
  });

  describe("initial mode resolution", () => {
    it("defaults to 'light' when localStorage, attribute, and system preference are absent", () => {
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("light");
    });

    it("reads 'dark' from localStorage when present", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("dark");
    });

    it("reads 'light' from localStorage when present", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("light");
    });

    it("ignores invalid localStorage values and falls through to next source", () => {
      localStorage.setItem(STORAGE_KEY, "purple");
      document.documentElement.setAttribute(ATTRIBUTE, "dark");

      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("dark");
    });

    it("reads 'dark' from data-theme attribute when localStorage is empty", () => {
      document.documentElement.setAttribute(ATTRIBUTE, "dark");
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("dark");
    });

    it("reads 'dark' from prefers-color-scheme when localStorage and attribute are absent", () => {
      mockMatchMedia(true);
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("dark");
    });

    it("prefers localStorage over data-theme attribute", () => {
      localStorage.setItem(STORAGE_KEY, "light");
      document.documentElement.setAttribute(ATTRIBUTE, "dark");

      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("light");
    });

    it("prefers data-theme attribute over prefers-color-scheme", () => {
      mockMatchMedia(true);
      document.documentElement.setAttribute(ATTRIBUTE, "light");

      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("light");
    });
  });

  describe("setMode", () => {
    it("updates the mode signal", () => {
      const service = TestBed.inject(GoabThemeService);
      service.setMode("dark");
      expect(service.mode()).toBe("dark");
    });

    it("syncs the data-theme attribute on <html>", () => {
      const service = TestBed.inject(GoabThemeService);
      service.setMode("dark");
      flushEffects();
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("dark");

      service.setMode("light");
      flushEffects();
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("light");
    });

    it("persists the mode to localStorage", () => {
      const service = TestBed.inject(GoabThemeService);
      service.setMode("dark");
      flushEffects();
      expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });
  });

  describe("toggle", () => {
    it("flips light to dark", () => {
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("light");

      service.toggle();
      expect(service.mode()).toBe("dark");
    });

    it("flips dark to light", () => {
      localStorage.setItem(STORAGE_KEY, "dark");
      const service = TestBed.inject(GoabThemeService);
      expect(service.mode()).toBe("dark");

      service.toggle();
      expect(service.mode()).toBe("light");
    });

    it("flips back and forth across multiple calls", () => {
      const service = TestBed.inject(GoabThemeService);

      service.toggle();
      expect(service.mode()).toBe("dark");

      service.toggle();
      expect(service.mode()).toBe("light");

      service.toggle();
      expect(service.mode()).toBe("dark");
    });

    it("syncs attribute and localStorage on toggle", () => {
      const service = TestBed.inject(GoabThemeService);

      service.toggle();
      flushEffects();
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("dark");
      expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });
  });

  describe("localStorage failures", () => {
    it("does not throw when localStorage.setItem is blocked", () => {
      const setItemSpy = jest
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      const service = TestBed.inject(GoabThemeService);

      expect(() => {
        service.setMode("dark");
        flushEffects();
      }).not.toThrow();

      // Attribute should still update even if storage fails
      expect(document.documentElement.getAttribute(ATTRIBUTE)).toBe("dark");

      setItemSpy.mockRestore();
    });

    it("does not throw when localStorage.getItem is blocked at construction", () => {
      const getItemSpy = jest
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("SecurityError");
        });

      expect(() => TestBed.inject(GoabThemeService)).not.toThrow();

      getItemSpy.mockRestore();
    });
  });

  describe("readonly mode signal", () => {
    it("exposes mode as a read-only signal (no .set/.update)", () => {
      const service = TestBed.inject(GoabThemeService);
      const modeSignal = service.mode as unknown as Record<string, unknown>;

      expect(typeof modeSignal["set"]).toBe("undefined");
      expect(typeof modeSignal["update"]).toBe("undefined");
    });
  });
});
