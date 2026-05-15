import * as matchers from "vitest-dom/matchers";
import * as moreExpect from "vitest-dom/extend-expect";

import { expect } from "vitest";

expect.extend(matchers);
expect.extend(moreExpect);

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
