import { render } from "@testing-library/svelte";
import GoAScrollPanelWrapper from "./ScrollPanelWrapper.test.svelte";
import GoAScrollPanel from "./ScrollPanel.svelte";
import { it, describe, expect, vi } from "vitest";

describe("GoA ScrollPanel", () => {
  it("renders the default slot content", async () => {
    render(GoAScrollPanelWrapper, {
      content: "Body content here",
    });
    const content = document.querySelector(".body-content");
    expect(content?.textContent).toContain("Body content here");
  });

  it("renders header slot content when provided", async () => {
    render(GoAScrollPanelWrapper, {
      header: "Panel header",
      content: "Body content",
    });
    const header = document.querySelector(".header-content");
    expect(header?.textContent).toContain("Panel header");
  });

  it("renders footer slot content when provided", async () => {
    render(GoAScrollPanelWrapper, {
      footer: "Panel footer",
      content: "Body content",
    });
    const footer = document.querySelector(".footer-content");
    expect(footer?.textContent).toContain("Panel footer");
  });

  it("sets the testid attribute on the scrollable content area", async () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "panel-test",
    });
    const el = await findByTestId("panel-test");
    expect(el).toBeTruthy();
  });

  it("accepts a custom height prop and renders without errors", () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "panel-height-test",
      height: "500px",
    });
    expect(findByTestId("panel-height-test")).toBeTruthy();
  });

  it("renders with the default height prop without errors", () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "panel-default-height",
    });
    expect(findByTestId("panel-default-height")).toBeTruthy();
  });

  it("passes horizontal direction to the custom element", async () => {
    render(GoAScrollPanelWrapper, {
      direction: "horizontal",
      content: "Body content",
    });

    const el = document.querySelector("goa-scroll-panel") as HTMLElement & {
      direction?: "vertical" | "horizontal";
    };
    expect(el?.direction).toBe("horizontal");
  });

  it("shows only right shadow in horizontal mode when at start", async () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "horizontal-start",
      direction: "horizontal",
    });

    const scrollable = await findByTestId("horizontal-start");

    Object.defineProperty(scrollable, "scrollWidth", {
      value: 600,
      configurable: true,
    });
    Object.defineProperty(scrollable, "clientWidth", {
      value: 300,
      configurable: true,
    });
    Object.defineProperty(scrollable, "scrollLeft", {
      value: 0,
      configurable: true,
    });

    scrollable.dispatchEvent(new Event("scroll"));

    await vi.waitFor(() => {
      expect(scrollable.classList.contains("scroll-panel-content--shadow-left")).toBe(false);
      expect(scrollable.classList.contains("scroll-panel-content--shadow-right")).toBe(true);
    });
  });

  it("shows left and right shadows in horizontal mode when in middle", async () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "horizontal-middle",
      direction: "horizontal",
    });

    const scrollable = await findByTestId("horizontal-middle");

    Object.defineProperty(scrollable, "scrollWidth", {
      value: 600,
      configurable: true,
    });
    Object.defineProperty(scrollable, "clientWidth", {
      value: 300,
      configurable: true,
    });
    Object.defineProperty(scrollable, "scrollLeft", {
      value: 150,
      configurable: true,
    });

    scrollable.dispatchEvent(new Event("scroll"));

    await vi.waitFor(() => {
      expect(scrollable.classList.contains("scroll-panel-content--shadow-left")).toBe(true);
      expect(scrollable.classList.contains("scroll-panel-content--shadow-right")).toBe(true);
    });
  });

  it("shows only left shadow in horizontal mode when at end", async () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "horizontal-end",
      direction: "horizontal",
    });

    const scrollable = await findByTestId("horizontal-end");

    Object.defineProperty(scrollable, "scrollWidth", {
      value: 600,
      configurable: true,
    });
    Object.defineProperty(scrollable, "clientWidth", {
      value: 300,
      configurable: true,
    });
    Object.defineProperty(scrollable, "scrollLeft", {
      value: 300,
      configurable: true,
    });

    scrollable.dispatchEvent(new Event("scroll"));

    await vi.waitFor(() => {
      expect(scrollable.classList.contains("scroll-panel-content--shadow-left")).toBe(true);
      expect(scrollable.classList.contains("scroll-panel-content--shadow-right")).toBe(false);
    });
  });

});
