import { waitFor } from "@testing-library/svelte";
import { getTimestamp, performOnce, announceToScreenReader } from "./utils";
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
