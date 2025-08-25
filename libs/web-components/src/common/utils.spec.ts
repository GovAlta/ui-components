import { waitFor } from "@testing-library/svelte";
import { getTimestamp, performOnce, announceToScreenReader, typeValidator, getLocalDateValues } from "./utils";
import { getTimestamp, performOnce, announceToScreenReader, typeValidator, shouldFocus, findFirstFocusableNode } from "./utils";
import { it, describe, expect, vi, beforeEach, afterEach } from "vitest";

describe("getTimestamp", () => {
  it("sets the correct postfix", () => {
    const vals = {
      1: "1st",
      2: "2nd",
      3: "3rd",
      4: "4th",
      5: "5th",
      6: "6th",
      7: "7th",
      8: "8th",
      9: "9th",
      10: "10th",
      11: "11th",
      12: "12th",
      13: "13th",
      14: "14th",
      15: "15th",
      16: "16th",
      17: "17th",
      18: "18th",
      19: "19th",
      20: "20th",
      21: "21st",
      22: "22nd",
      23: "23rd",
      24: "24th",
      25: "25th",
      26: "26th",
      27: "27th",
      28: "28th",
      29: "29th",
      30: "30th",
      31: "31st",
    }

    for (const [day, val] of Object.entries(vals)) {
      const d = new Date(2023, 2, parseInt(day, 10))
      expect(getTimestamp(d)).toContain(val)
    }
  })

  it("handles the 12th hour", () => {
    expect(getTimestamp(new Date(2023, 1, 1, 12, 23))).toContain("12:23 PM")
    expect(getTimestamp(new Date(2023, 1, 1, 0, 23))).toContain("12:23 AM")
  })
})

describe("performOnce", () => {
  it("calls the action only once", async () => {
    let count = 0;
    let timeoutId: any;

    for (let i = 0; i < 10; i++) {
      timeoutId = performOnce(timeoutId, () => count++);
    }

    await waitFor(() => {
      expect(count).toBe(1);
    });
  })
})

describe("announceToScreenReader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    if (!document.body) {
      const body = document.createElement('body');
      document.documentElement.appendChild(body);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();

    // Clean up any announcer elements
    const announcers = document.querySelectorAll('[aria-live="polite"]');
    announcers.forEach(el => el.parentNode?.removeChild(el));
  });

  it("creates an accessible announcer element with the correct attributes", () => {
    announceToScreenReader("Test announcement");

    const announcer = document.querySelector('[aria-live="polite"]');
    expect(announcer).not.toBeNull();
    expect(announcer?.getAttribute("aria-atomic")).toBe("true");
    expect(announcer?.textContent).toBe("");

    vi.advanceTimersByTime(100);
    expect(announcer?.textContent).toBe("Test announcement");
  });

  it("sets up timers to remove the announcer element", () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout');

    const customDuration = 1500;
    announceToScreenReader("Test announcement", customDuration);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(2);

    expect(setTimeoutSpy.mock.calls[1][1]).toBe(customDuration);
  });

  it("uses default duration when not specified", () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout');

    announceToScreenReader("Test announcement");

    expect(setTimeoutSpy).toHaveBeenCalledTimes(2);

    expect(setTimeoutSpy.mock.calls[1][1]).toBe(3000);
  });

  it("applies visually hidden styles to the announcer element", () => {
    announceToScreenReader("Test announcement");

    const announcer = document.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(announcer).not.toBeNull();

    // Check that the element has visually hidden styles
    expect(announcer.style.position).toBe("absolute");
    expect(announcer.style.width).toBe("1px");
    expect(announcer.style.height).toBe("1px");
    expect(announcer.style.padding).toBe("0px");
    expect(announcer.style.margin).toBe("-1px");
    expect(announcer.style.overflow).toBe("hidden");
    expect(announcer.style.clipPath).toBe("inset(50%)");
    expect(announcer.style.opacity).toBe("0");
  });
});

describe("typeValidator", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("returns values array and validator function", () => {
    const [values, validator] = typeValidator(
      "Color",
      ["red", "blue", "green"],
      true,
    );

    expect(values).toEqual(["red", "blue", "green"]);
    expect(typeof validator).toBe("function");
  });

  describe("boolean opts parameter (backward compatibility)", () => {
    it("allows null/empty values when required=false", () => {
      const [, validator] = typeValidator(
        "Color",
        ["red", "blue", "green"],
        false,
      );

      validator(null);
      validator("");
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("logs error for null value when required=true", () => {
      const [, validator] = typeValidator(
        "Color",
        ["red", "blue", "green"],
        true,
      );

      validator(null);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[null] is an invalid color",
      );
    });

    it("logs error for invalid values", () => {
      const [, validator] = typeValidator(
        "Color",
        ["red", "blue", "green"],
        false,
      );

      validator("yellow");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[yellow] is an invalid color",
      );
    });
  });

  describe("object opts parameter", () => {
    it("validates with required option as object property", () => {
      const [, validator] = typeValidator(
        "Size",
        ["small", "medium", "large"],
        { required: true },
      );

      validator(null);
      expect(consoleErrorSpy).toHaveBeenCalledWith("[null] is an invalid size");
    });

    it("handles deprecated values with warnings", () => {
      const [, validator] = typeValidator("Theme", ["light", "dark", "auto"], {
        required: false,
        deprecated: ["auto"],
      });

      validator("auto");
      expect(consoleWarnSpy).toHaveBeenCalledWith("[auto] is deprecated");
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("handles multiple deprecated values", () => {
      const [, validator] = typeValidator(
        "Theme",
        ["light", "dark", "auto", "legacy"],
        {
          required: false,
          deprecated: ["auto", "legacy"],
        },
      );

      validator("auto");
      expect(consoleWarnSpy).toHaveBeenCalledWith("[auto] is deprecated");

      validator("legacy");
      expect(consoleWarnSpy).toHaveBeenCalledWith("[legacy] is deprecated");
    });

    it("logs error for invalid values even with deprecated list", () => {
      const [, validator] = typeValidator("Theme", ["light", "dark", "auto"], {
        required: false,
        deprecated: ["auto"],
      });

      validator("invalid");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[invalid] is an invalid theme",
      );
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it("combines required validation with deprecated warnings", () => {
      const [, validator] = typeValidator(
        "Status",
        ["active", "inactive", "pending"],
        {
          required: true,
          deprecated: ["pending"],
        },
      );

      validator("pending");
      expect(consoleWarnSpy).toHaveBeenCalledWith("[pending] is deprecated");
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      validator(null);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[null] is an invalid status",
      );
    });

    it("allows deprecated parameter without required property", () => {
      const [, validator] = typeValidator("Layout", ["flex", "grid", "table"], {
        deprecated: ["table"],
      });

      validator(null);
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      validator("table");
      expect(consoleWarnSpy).toHaveBeenCalledWith("[table] is deprecated");
      expect(consoleErrorSpy).not.toHaveBeenCalled();

      validator("invalid");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[invalid] is an invalid layout",
      );
    });
  });

  it("behaves like required=false when no options provided", () => {
    const [, validator] = typeValidator(
      "Color",
      ["red", "blue", "green"],
      {},
    );

    validator(null);
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    validator("yellow");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[yellow] is an invalid color",
    );
  });
});

describe("getLocalDateValues", () => {
  it("extracts year, month, and day from a valid 'YYYY-MM-DD' string format", () => {
    const result = getLocalDateValues("2023-08-29");
    expect(result).toEqual({ year: 2023, month: 8, day: 29 });
  });

  it("extracts year, month, and day from a valid ISO 8601 date string", () => {
    const result = getLocalDateValues("2023-08-29T15:20:30Z");
    expect(result).toEqual({ year: 2023, month: 8, day: 29 });
  });

  it("extracts year, month, and day from a JS toISOString string value", () => {
    const result = getLocalDateValues("2023-08-29T15:20:30.123Z");
    expect(result).toEqual({ year: 2023, month: 8, day: 29 });
  });

  it("extracts year, month, and day from a Date object", () => {
    const date = new Date(2023, 7, 29); // Months are 0-based in JS Date
    const result = getLocalDateValues(date);
    expect(result).toEqual({ year: 2023, month: 8, day: 29 });
  });

  it("returns null for an invalid string input", () => {
    const result = getLocalDateValues("invalid-date");
    expect(result).toBeNull();
  });

  it("returns null for a non-string, non-Date input", () => {
    const result = getLocalDateValues(12345 as any);
    expect(result).toBeNull();
  });

  it("returns null for a non-handled date string format", () => {
    const result = getLocalDateValues("01-01-2023");
    expect(result).toBeNull();
  });
});

describe("shouldFocus", () => {
  describe("non-element nodes", () => {
    it("returns null for text nodes", () => {
      const textNode = document.createTextNode("test");
      expect(shouldFocus(textNode)).toBeNull();
    });

    it("returns null for comment nodes", () => {
      const commentNode = document.createComment("test comment");
      expect(shouldFocus(commentNode)).toBeNull();
    });

    it("returns null for document fragment", () => {
      const fragment = document.createDocumentFragment();
      expect(shouldFocus(fragment)).toBeNull();
    });
  });

  describe("tabindex handling", () => {
    it("returns element for positive tabindex", () => {
      const div = document.createElement("div");
      div.tabIndex = 1;
      expect(shouldFocus(div)).toBe(div);
    });

    it("returns element for tabindex=0 with explicit tabIndex attribute", () => {
      const div = document.createElement("div");
      div.setAttribute("tabindex", "0");
      expect(shouldFocus(div)).toBe(div);
    });

    it("returns null for negative tabindex", () => {
      const div = document.createElement("div");
      div.tabIndex = -1;
      expect(shouldFocus(div)).toBeNull();
    });

    it("returns null for tabindex='-1' attribute", () => {
      const div = document.createElement("div");
      div.setAttribute("tabindex", "-1");
      expect(shouldFocus(div)).toBeNull();
    });
  });

  describe("disabled elements", () => {
    it("returns null for disabled input via property", () => {
      const input = document.createElement("input");
      input.disabled = true;
      expect(shouldFocus(input)).toBeNull();
    });

    it("returns null for disabled input via attribute", () => {
      const input = document.createElement("input");
      input.setAttribute("disabled", "");
      expect(shouldFocus(input)).toBeNull();
    });

    it("returns null for disabled button via property", () => {
      const button = document.createElement("button");
      button.disabled = true;
      expect(shouldFocus(button)).toBeNull();
    });

    it("returns null for disabled button via attribute", () => {
      const button = document.createElement("button");
      button.setAttribute("disabled", "disabled");
      expect(shouldFocus(button)).toBeNull();
    });

    it("returns null for disabled select", () => {
      const select = document.createElement("select");
      select.disabled = true;
      expect(shouldFocus(select)).toBeNull();
    });

    it("returns null for disabled textarea", () => {
      const textarea = document.createElement("textarea");
      textarea.setAttribute("disabled", "");
      expect(shouldFocus(textarea)).toBeNull();
    });

    it("returns null for elements with disabled attribute (generic elements)", () => {
      const div = document.createElement("div");
      div.setAttribute("disabled", "true");
      expect(shouldFocus(div)).toBeNull();
    });
  });

  describe("anchor elements", () => {
    it("returns anchor with href", () => {
      const anchor = document.createElement("a");
      anchor.href = "https://example.com";
      expect(shouldFocus(anchor)).toBe(anchor);
    });

    it("returns null for anchor without href", () => {
      const anchor = document.createElement("a");
      expect(shouldFocus(anchor)).toBeNull();
    });

    it("returns anchor with empty href (resolves to current page)", () => {
      const anchor = document.createElement("a");
      anchor.href = "";
      // Empty href gets resolved to current page URL, so it's actually focusable
      expect(shouldFocus(anchor)).toBe(anchor);
    });

    it("returns null for anchor with rel='ignore'", () => {
      const anchor = document.createElement("a");
      anchor.href = "https://example.com";
      anchor.rel = "ignore";
      expect(shouldFocus(anchor)).toBeNull();
    });

    it("returns anchor with href and other rel values", () => {
      const anchor = document.createElement("a");
      anchor.href = "https://example.com";
      anchor.rel = "noopener";
      expect(shouldFocus(anchor)).toBe(anchor);
    });
  });

  describe("input elements", () => {
    it("returns text input", () => {
      const input = document.createElement("input");
      input.type = "text";
      expect(shouldFocus(input)).toBe(input);
    });

    it("returns email input", () => {
      const input = document.createElement("input");
      input.type = "email";
      expect(shouldFocus(input)).toBe(input);
    });

    it("returns number input", () => {
      const input = document.createElement("input");
      input.type = "number";
      expect(shouldFocus(input)).toBe(input);
    });

    it("returns checkbox input", () => {
      const input = document.createElement("input");
      input.type = "checkbox";
      expect(shouldFocus(input)).toBe(input);
    });

    it("returns radio input", () => {
      const input = document.createElement("input");
      input.type = "radio";
      expect(shouldFocus(input)).toBe(input);
    });

    it("returns null for hidden input", () => {
      const input = document.createElement("input");
      input.type = "hidden";
      expect(shouldFocus(input)).toBeNull();
    });

    it("returns null for file input", () => {
      const input = document.createElement("input");
      input.type = "file";
      expect(shouldFocus(input)).toBeNull();
    });

    it("returns null for disabled input", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.disabled = false;
      input.setAttribute("disabled", "");
      expect(shouldFocus(input)).toBeNull();
    });
  });

  describe("form elements", () => {
    it("returns button element", () => {
      const button = document.createElement("button");
      expect(shouldFocus(button)).toBe(button);
    });

    it("returns select element", () => {
      const select = document.createElement("select");
      expect(shouldFocus(select)).toBe(select);
    });

    it("returns textarea element", () => {
      const textarea = document.createElement("textarea");
      expect(shouldFocus(textarea)).toBe(textarea);
    });
  });

  describe("non-focusable elements", () => {
    it("returns null for div without tabindex", () => {
      const div = document.createElement("div");
      expect(shouldFocus(div)).toBeNull();
    });

    it("returns null for span without tabindex", () => {
      const span = document.createElement("span");
      expect(shouldFocus(span)).toBeNull();
    });

    it("returns null for p without tabindex", () => {
      const p = document.createElement("p");
      expect(shouldFocus(p)).toBeNull();
    });

    it("returns null for img without tabindex", () => {
      const img = document.createElement("img");
      expect(shouldFocus(img)).toBeNull();
    });
  });
});

describe("findFirstFocusableNode", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("basic functionality", () => {
    it("returns null for empty NodeList", () => {
      const emptyNodeList = document.querySelectorAll("nonexistent");
      expect(findFirstFocusableNode(emptyNodeList)).toBeNull();
    });

    it("returns null for empty array", () => {
      expect(findFirstFocusableNode([])).toBeNull();
    });

    it("returns null when no focusable elements exist", () => {
      const div = document.createElement("div");
      const span = document.createElement("span");
      div.appendChild(span);

      expect(findFirstFocusableNode([div])).toBeNull();
    });

    it("finds first focusable element", () => {
      const button = document.createElement("button");
      button.textContent = "Click me";

      expect(findFirstFocusableNode([button])).toBe(button);
    });
  });

  describe("element types", () => {
    it("finds focusable button", () => {
      const button = document.createElement("button");
      expect(findFirstFocusableNode([button])).toBe(button);
    });

    it("finds focusable input", () => {
      const input = document.createElement("input");
      input.type = "text";
      expect(findFirstFocusableNode([input])).toBe(input);
    });

    it("finds focusable select", () => {
      const select = document.createElement("select");
      expect(findFirstFocusableNode([select])).toBe(select);
    });

    it("finds focusable textarea", () => {
      const textarea = document.createElement("textarea");
      expect(findFirstFocusableNode([textarea])).toBe(textarea);
    });

    it("finds focusable anchor with href", () => {
      const anchor = document.createElement("a");
      anchor.href = "https://example.com";
      expect(findFirstFocusableNode([anchor])).toBe(anchor);
    });

    it("finds element with positive tabindex", () => {
      const div = document.createElement("div");
      div.tabIndex = 1;
      expect(findFirstFocusableNode([div])).toBe(div);
    });

    it("finds element with tabindex=0", () => {
      const div = document.createElement("div");
      div.setAttribute("tabindex", "0");
      expect(findFirstFocusableNode([div])).toBe(div);
    });
  });

  describe("skips non-focusable elements", () => {
    it("skips disabled elements", () => {
      const button1 = document.createElement("button");
      button1.disabled = true;

      const button2 = document.createElement("button");
      button2.textContent = "Focusable";

      expect(findFirstFocusableNode([button1, button2])).toBe(button2);
    });

    it("skips hidden inputs", () => {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";

      const textInput = document.createElement("input");
      textInput.type = "text";

      expect(findFirstFocusableNode([hiddenInput, textInput])).toBe(textInput);
    });

    it("skips file inputs", () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";

      const textInput = document.createElement("input");
      textInput.type = "text";

      expect(findFirstFocusableNode([fileInput, textInput])).toBe(textInput);
    });

    it("skips anchors without href", () => {
      const anchorNoHref = document.createElement("a");

      const button = document.createElement("button");

      expect(findFirstFocusableNode([anchorNoHref, button])).toBe(button);
    });

    it("skips elements with negative tabindex", () => {
      const div = document.createElement("div");
      div.tabIndex = -1;

      const button = document.createElement("button");

      expect(findFirstFocusableNode([div, button])).toBe(button);
    });

    it("skips elements with data-ignore-focus attribute", () => {
      const button1 = document.createElement("button");
      button1.setAttribute("data-ignore-focus", "true");

      const button2 = document.createElement("button");

      expect(findFirstFocusableNode([button1, button2])).toBe(button2);
    });
  });

  describe("child node traversal", () => {
    it("finds focusable element in child nodes", () => {
      const container = document.createElement("div");
      const button = document.createElement("button");
      container.appendChild(button);

      expect(findFirstFocusableNode([container])).toBe(button);
    });

    it("finds first focusable element in deeply nested structure", () => {
      const container = document.createElement("div");
      const section = document.createElement("section");
      const article = document.createElement("article");
      const button = document.createElement("button");

      container.appendChild(section);
      section.appendChild(article);
      article.appendChild(button);

      expect(findFirstFocusableNode([container])).toBe(button);
    });

    it("finds first focusable element among multiple nested elements", () => {
      const container = document.createElement("div");

      // First nested structure
      const div1 = document.createElement("div");
      const span1 = document.createElement("span"); // not focusable
      div1.appendChild(span1);

      // Second nested structure
      const div2 = document.createElement("div");
      const button = document.createElement("button"); // first focusable
      const input = document.createElement("input"); // also focusable but comes after
      div2.appendChild(button);
      div2.appendChild(input);

      container.appendChild(div1);
      container.appendChild(div2);

      expect(findFirstFocusableNode([container])).toBe(button);
    });
  });

  describe("shadow DOM support", () => {
    it("finds focusable element in shadow DOM", () => {
      // Skip if Shadow DOM is not supported
      if (!HTMLElement.prototype.attachShadow) {
        return;
      }

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const button = document.createElement("button");
      shadowRoot.appendChild(button);

      expect(findFirstFocusableNode([host])).toBe(button);
    });
  });

  describe("slot support", () => {
    it("finds focusable element in slot assigned nodes", () => {
      const slot = document.createElement("slot");
      const button = document.createElement("button");

      // Mock assignedNodes for testing
      vi.spyOn(slot, 'assignedNodes').mockReturnValue([button]);

      expect(findFirstFocusableNode([slot])).toBe(button);
    });

    it("handles empty slot", () => {
      const slot = document.createElement("slot");

      // Mock assignedNodes returning empty array
      vi.spyOn(slot, 'assignedNodes').mockReturnValue([]);

      expect(findFirstFocusableNode([slot])).toBeNull();
    });
  });

  describe("reversed parameter", () => {
    it("searches in reverse order when reversed=true", () => {
      const button1 = document.createElement("button");
      button1.id = "first";

      const button2 = document.createElement("button");
      button2.id = "second";

      const button3 = document.createElement("button");
      button3.id = "third";

      // Normal order should find first button
      expect(findFirstFocusableNode([button1, button2, button3], false)).toBe(button1);

      // Reversed order should find last button
      expect(findFirstFocusableNode([button1, button2, button3], true)).toBe(button3);
    });

    it("finds last focusable element in nested structure when reversed", () => {
      const container1 = document.createElement("div");
      const button1 = document.createElement("button");
      button1.id = "first";
      container1.appendChild(button1);

      const container2 = document.createElement("div");
      const button2 = document.createElement("button");
      button2.id = "second";
      container2.appendChild(button2);

      // Reversed should find the last focusable element
      expect(findFirstFocusableNode([container1, container2], true)).toBe(button2);
    });
  });

  describe("complex scenarios", () => {
    it("handles mixed focusable and non-focusable elements", () => {
      const span = document.createElement("span"); // not focusable
      const div = document.createElement("div"); // not focusable
      const disabledButton = document.createElement("button");
      disabledButton.disabled = true; // not focusable
      const enabledButton = document.createElement("button"); // focusable!
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden"; // not focusable

      expect(findFirstFocusableNode([span, div, disabledButton, enabledButton, hiddenInput])).toBe(enabledButton);
    });

    it("handles deeply nested structure with mixed content", () => {
      const root = document.createElement("div");

      // Level 1
      const section1 = document.createElement("section");
      const disabledInput = document.createElement("input");
      disabledInput.disabled = true;
      section1.appendChild(disabledInput);

      // Level 2
      const section2 = document.createElement("section");
      const article = document.createElement("article");
      const focusableButton = document.createElement("button");
      article.appendChild(focusableButton);
      section2.appendChild(article);

      root.appendChild(section1);
      root.appendChild(section2);

      expect(findFirstFocusableNode([root])).toBe(focusableButton);
    });
  });

  describe("edge cases", () => {
    it("handles single text node", () => {
      const textNode = document.createTextNode("text");
      expect(findFirstFocusableNode([textNode])).toBeNull();
    });

    it("handles mixed node types", () => {
      const textNode = document.createTextNode("text");
      const commentNode = document.createComment("comment");
      const button = document.createElement("button");

      expect(findFirstFocusableNode([textNode, commentNode, button])).toBe(button);
    });

    it("handles elements with conflicting attributes", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.disabled = false; // property says enabled
      input.setAttribute("disabled", ""); // attribute says disabled

      // Based on shouldFocus logic, this should be non-focusable due to attribute
      const button = document.createElement("button");

      expect(findFirstFocusableNode([input, button])).toBe(button);
    });
  });
});
