import { render } from "@testing-library/svelte";
import GoAScrollPanelWrapper from "./ScrollPanelWrapper.test.svelte";
import GoAScrollPanel from "./ScrollPanel.svelte";
import { it, describe, expect, beforeAll, afterEach, vi } from "vitest";

// The node test environment has no `CSS` global, so stub it. Tests drive the
// branch via mockReturnValue; the real validation runs against the browser's
// CSS.supports in the browser spec.
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

  // Validation defers to CSS.supports (stubbed above); the real fallback
  // behaviour is covered in the browser spec.
  it("does not log an error when CSS.supports accepts the height", () => {
    cssSupports.mockReturnValue(true);
    const errorSpy = vi.spyOn(console, "error").mockReturnValue(undefined);
    render(GoAScrollPanel, {
      testid: "panel-valid-height",
      height: "calc(100vh - 4rem)",
    });
    expect(errorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("not a valid CSS height"),
    );
    errorSpy.mockRestore();
  });

  it("logs an error when CSS.supports rejects the height", () => {
    cssSupports.mockReturnValue(false);
    const errorSpy = vi.spyOn(console, "error").mockReturnValue(undefined);
    render(GoAScrollPanel, {
      testid: "panel-invalid-height",
      height: "not-a-dimension",
    });
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("not a valid CSS height"),
    );
    errorSpy.mockRestore();
  });

  it("logs an error when CSS.supports rejects the width", () => {
    cssSupports.mockReturnValue(false);
    const errorSpy = vi.spyOn(console, "error").mockReturnValue(undefined);
    render(GoAScrollPanel, {
      testid: "panel-invalid-width",
      width: "not-a-dimension",
    });
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("not a valid CSS width"),
    );
    errorSpy.mockRestore();
  });

  it("renders with direction='horizontal'", async () => {
    render(GoAScrollPanelWrapper, {
      content: "Horizontal content",
      direction: "horizontal",
      width: "500px",
    });
    const content = document.querySelector(".body-content");
    expect(content?.textContent).toContain("Horizontal content");
  });

  it("renders with width and height props", async () => {
    const { findByTestId } = render(GoAScrollPanel, {
      testid: "panel-with-dimensions",
      width: "600px",
      height: "300px",
    });
    const el = await findByTestId("panel-with-dimensions");
    expect(el.getAttribute("role")).toBe("region");
  });
});
