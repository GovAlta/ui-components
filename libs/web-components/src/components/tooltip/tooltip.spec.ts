import Tooltip from "./Tooltip.svelte";
import { tick } from "svelte";
import { render, fireEvent, waitFor } from "@testing-library/svelte";
import { it, expect, vi } from "vitest";

it("should render tooltip with provided properties", () => {
  const { container } = render(Tooltip, { content: "Hello, Tooltip!", position: "top" });
  const tooltipEl = container.querySelector(".tooltip-text");

  expect(tooltipEl).toBeTruthy();
  expect(tooltipEl?.innerHTML).toContain("Hello, Tooltip!");
  expect(tooltipEl?.classList).toContain("top");
});

it("shows and hides tooltip on mouseenter/mouseleave", async () => {
  const { container } = render(Tooltip, { content: "Hello, Tooltip!" });
  const tooltipContainer = container.querySelector(".tooltip");
  const tooltipEl = container.querySelector(".tooltip-text") as HTMLElement;

  // Initially, tooltip should be hidden
  expect(tooltipEl.style.visibility).toBe("hidden");

  // Simulate mouse enter
  expect(tooltipContainer).toBeTruthy();
  if (!tooltipContainer) return;

  await fireEvent.mouseEnter(tooltipContainer);

  await waitFor(() => expect(tooltipEl.style.visibility).toBe("visible"), { timeout: 350 });

  // Simulate mouse leave
  await fireEvent.mouseLeave(tooltipContainer);

  await waitFor(() => expect(tooltipEl.style.visibility).toBe("hidden"), { timeout: 600 });
});


it("validates the props", async () => {
  const mock = vi.spyOn(console, "error").mockImplementation(() => { });
  render(Tooltip, { position: "left", halign: "left" })
  render(Tooltip, { position: "left", halign: "right" })
  render(Tooltip, { position: "right", halign: "left" })
  render(Tooltip, { position: "right", halign: "right" })
  render(Tooltip, { position: "random", halign: "test" })
  // 4 errors for each mismatch and 2 for random props
  await waitFor(() => {
    expect(console.error["mock"].calls.length).toEqual(6);
  })
  mock.mockRestore();
})

it("aligns tooltip according to provided alignment", () => {
  const { container } = render(Tooltip, { content: "Hello, Tooltip!", halign: "left" });
  const tooltipEl = container.querySelector(".tooltip-text");
  expect(tooltipEl).toBeTruthy();
  expect(tooltipEl?.classList).toContain("align-left");
});

it("should try and change tooltip position on window resize", async () => {
  const { container } = render(Tooltip, { content: "Hello, Tooltip!", position: "bottom" });

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
  global.innerHeight = 75;  // make it less than tooltip height + target element height
  global.dispatchEvent(new Event("resize"));
  await tick();
  expect(tooltipEl.classList).toContain("top");
});

it("does not exceed 80% of the screen size or 400px", async () => {
  const { container } = render(Tooltip, { content: "Hello, Tooltip!" });
  const tooltipEl = container.querySelector(".tooltip-text") as HTMLElement;

  // Mock getBoundingClientRect to return a large width
  tooltipEl.getBoundingClientRect = () => ({
    width: 500,
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  // Simulate window resize to trigger the tooltip"s responsive behavior
  global.dispatchEvent(new Event("resize"));

  await tick();  // to wait for Svelte"s reactive updates

  // Verify that the tooltip"s width has been adjusted
  expect(parseInt(tooltipEl.style.width, 10)).toBeLessThanOrEqual(400);
});
