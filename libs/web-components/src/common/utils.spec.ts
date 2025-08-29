import { waitFor } from "@testing-library/svelte";
import { getTimestamp, performOnce, announceToScreenReader, typeValidator, getLocalDateValues } from "./utils";
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
