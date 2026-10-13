import * as matchers from "vitest-dom/matchers";
import * as moreExpect from "vitest-dom/extend-expect";

import { expect, vi } from "vitest";

expect.extend(matchers);
expect.extend(moreExpect);

// Svelte 5 uses ResizeObserver to implement element dimension bindings.
// jsdom does not provide it, so tests that use bind:clientHeight need a stub.
if (!globalThis.ResizeObserver) {
  vi.stubGlobal(
    "ResizeObserver",
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
}

// Svelte 5 implements transitions with the Web Animations API, which jsdom
// does not implement. Complete animations on the next microtask in unit tests.
if (!Element.prototype.animate) {
  vi.stubGlobal(
    "Animation",
    class Animation {
      currentTime = 0;
      effect = null;
      playState = "running";
      oncancel: ((event: Event) => void) | null = null;
      private finishHandler: ((event: Event) => void) | null = null;

      get onfinish() {
        return this.finishHandler;
      }

      set onfinish(callback: ((event: Event) => void) | null) {
        this.finishHandler = callback;
        if (callback) {
          queueMicrotask(() => {
            if (this.playState === "running" && this.finishHandler === callback) {
              this.playState = "finished";
              callback(new Event("finish"));
            }
          });
        }
      }

      cancel() {
        this.playState = "idle";
        this.finishHandler = null;
      }
    },
  );
  Element.prototype.animate = () => new Animation() as globalThis.Animation;
}

// Svelte 5's motion utilities read the reduced-motion media query at import
// time. jsdom does not implement matchMedia.
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
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

// prevent "Could not parse CSS stylesheet" errors from showing up when running tests
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// jsdom does not implement the HTML Popover API yet.
if (!HTMLElement.prototype.showPopover) {
  Object.defineProperty(HTMLElement.prototype, "showPopover", {
    configurable: true,
    writable: true,
    value() {
      this.setAttribute("data-popover-open", "true");
      this.dispatchEvent(
        Object.assign(new Event("toggle"), { newState: "open", oldState: "closed" }),
      );
    },
  });
}

if (!HTMLElement.prototype.hidePopover) {
  Object.defineProperty(HTMLElement.prototype, "hidePopover", {
    configurable: true,
    writable: true,
    value() {
      this.removeAttribute("data-popover-open");
      this.dispatchEvent(
        Object.assign(new Event("toggle"), { newState: "closed", oldState: "open" }),
      );
    },
  });
}
