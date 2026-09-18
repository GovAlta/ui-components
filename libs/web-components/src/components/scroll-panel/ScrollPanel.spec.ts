import { render, waitFor } from "@testing-library/svelte";
import GoAScrollPanelWrapper from "./ScrollPanelWrapper.test.svelte";
import GoAScrollPanel from "./ScrollPanel.svelte";
import { it, describe, expect, beforeAll, afterEach, vi } from "vitest";

// The node test environment has no `CSS` global, so stub it for sizing fallback.
const cssSupports = vi.fn().mockReturnValue(true);

beforeAll(() => {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
  vi.stubGlobal("CSS", { supports: cssSupports });
});

afterEach(() => {
  cssSupports.mockReturnValue(true);
});

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
    expect(el.getAttribute("role")).toBe("region");
  });

  it("uses content-driven height when an internal maximum height is provided", async () => {
    render(GoAScrollPanelWrapper, {
      height: "100%",
      maxheight: "20rem",
    });
    const host = document.querySelector("goa-scroll-panel") as HTMLElement;

    await waitFor(() => {
      expect(host.style.height).toBe("auto");
      expect(host.style.maxHeight).toBe("20rem");
    });
  });

  it("logs invalid heights and falls back to 100%", async () => {
    cssSupports.mockReturnValue(false);
    const errorSpy = vi.spyOn(console, "error").mockReturnValue(undefined);

    render(GoAScrollPanelWrapper, {
      height: "not-a-valid-height",
    });
    const host = document.querySelector("goa-scroll-panel") as HTMLElement;

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        'ScrollPanel: "not-a-valid-height" is not a valid CSS height. Falling back to "100%".',
      );
      expect(host.style.height).toBe("100%");
    });

    errorSpy.mockRestore();
  });
});
