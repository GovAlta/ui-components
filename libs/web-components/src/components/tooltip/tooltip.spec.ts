import Tooltip from "./Tooltip.svelte";
import { tick } from "svelte";
import { render, fireEvent, waitFor } from "@testing-library/svelte";
import { it, expect, vi } from "vitest";

it("should render tooltip with provided properties", () => {
  const { container } = render(Tooltip, {
    content: "Hello, Tooltip!",
    position: "top",
  });
  const tooltipEl = container.querySelector(".tooltip-text");

  expect(tooltipEl).toBeTruthy();
  expect(tooltipEl?.innerHTML).toContain("Hello, Tooltip!");
  expect(tooltipEl?.classList).toContain("top");
});

it("shows and hides tooltip on mouseenter/mouseleave", async () => {
  const { container } = render(Tooltip, { content: "Hello, Tooltip!" });
  const tooltipContainer = container.querySelector(".tooltip");
  const tooltipEl = container.querySelector(".tooltip-text") as HTMLElement;

  // Initially, tooltip should be hidden (no show class)
  expect(tooltipEl.classList.contains("show")).toBe(false);
  expect(tooltipEl.getAttribute("aria-hidden")).toBe("true");

  // Simulate mouse enter
  expect(tooltipContainer).toBeTruthy();
  if (!tooltipContainer) return;

  vi.useFakeTimers();
  try {
    await fireEvent.mouseEnter(tooltipContainer);
    vi.advanceTimersByTime(350);

    await waitFor(() =>
      expect(tooltipEl.classList.contains("show")).toBe(true),
    );
    expect(tooltipEl.getAttribute("aria-hidden")).toBe("false");

    // Simulate mouse leave
    await fireEvent.mouseLeave(tooltipContainer);
    vi.advanceTimersByTime(550);

    await waitFor(() =>
      expect(tooltipEl.classList.contains("show")).toBe(false),
    );
    expect(tooltipEl.getAttribute("aria-hidden")).toBe("true");
  } finally {
    vi.useRealTimers();
  }
});

it("validates the props", async () => {
  const mock = vi.spyOn(console, "error").mockImplementation(() => {
    /* do nothing */
  });
  render(Tooltip, { position: "left", halign: "left" });
  render(Tooltip, { position: "left", halign: "right" });
  render(Tooltip, { position: "right", halign: "left" });
  render(Tooltip, { position: "right", halign: "right" });
  render(Tooltip, { position: "random", halign: "test" });
  // 4 errors for each mismatch and 2 for random props
  await waitFor(() => {
    expect(console.error["mock"].calls.length).toEqual(6);
  });
  mock.mockRestore();
});

it("aligns tooltip according to provided alignment", () => {
  const { container } = render(Tooltip, {
    content: "Hello, Tooltip!",
    halign: "left",
  });
  const tooltipEl = container.querySelector(".tooltip-text");
  expect(tooltipEl).toBeTruthy();
  expect(tooltipEl?.classList).toContain("align-left");
});

it.skip("should try and change tooltip position on window resize", async () => {
  const { container } = render(Tooltip, {
    content: "Hello, Tooltip!",
    position: "bottom",
  });

  const tooltipEl = container.querySelector(".tooltip-text");
  expect(tooltipEl).toBeTruthy();
  if (!tooltipEl) return;

  expect(tooltipEl.classList).toContain("bottom");
  tooltipEl.getBoundingClientRect = () => ({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  global.innerHeight = 75; // make it less than tooltip height + target element height
  global.dispatchEvent(new Event("resize"));
  await tick();
  expect(tooltipEl.classList).toContain("top");
});

it("does not exceed 80% of the screen size or 400px", async () => {
  const { container } = render(Tooltip, {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });
  const tooltipContainer = container.querySelector(".tooltip");
  const tooltipEl = container.querySelector(".tooltip-text") as HTMLElement;

  expect(tooltipContainer).toBeTruthy();
  if (!tooltipContainer) return;

  vi.useFakeTimers();
  try {
    // Simulate mouse enter
    await fireEvent.mouseEnter(tooltipContainer);
    vi.advanceTimersByTime(350);

    await waitFor(() =>
      // Verify that the tooltip"s width has been adjusted
      expect(parseInt(tooltipEl.style.width, 10)).toBeLessThanOrEqual(400),
    );
  } finally {
    vi.useRealTimers();
  }
});

it("cursor style remains same on hover", async () => {
  const { container } = render(Tooltip, { content: "Alberta DDD Tooltip" });
  const tooltipContainer = container.querySelector(".tooltip");

  expect(tooltipContainer).toBeTruthy();
  if (!tooltipContainer) return;

  vi.useFakeTimers();
  try {
    const initialCursorStyle = window.getComputedStyle(tooltipContainer).cursor;
    await fireEvent.mouseEnter(tooltipContainer);
    vi.advanceTimersByTime(350);

    await waitFor(() => {
      const cursorStyleOnHover =
        window.getComputedStyle(tooltipContainer).cursor;
      expect(cursorStyleOnHover).toBe(initialCursorStyle);
    });

    await fireEvent.mouseLeave(tooltipContainer);
    vi.advanceTimersByTime(350);

    await waitFor(() => {
      const cursorStyleOnLeave =
        window.getComputedStyle(tooltipContainer).cursor;
      expect(cursorStyleOnLeave).toBe(initialCursorStyle);
    });
  } finally {
    vi.useRealTimers();
  }
});

it("should render tooltip with maxwidth property", async () => {
  const { container } = render(Tooltip, {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    maxwidth: "300px",
  });
    const tooltipContainer = container.querySelector(".tooltip");
  const tooltipEl = container.querySelector(".tooltip-text") as HTMLElement;

  expect(tooltipContainer).toBeTruthy();
  if (!tooltipContainer) return;

  vi.useFakeTimers();
  try {
    // Simulate mouse enter
    await fireEvent.mouseEnter(tooltipContainer);
    vi.advanceTimersByTime(350);

    await waitFor(() =>
      // The width should be constrained by maxwidth (300px - 32px padding = 268px)
      expect(parseInt(tooltipEl.style.width, 10)).toBeLessThanOrEqual(268),
    );
  } finally {
    vi.useRealTimers();
  }
});
