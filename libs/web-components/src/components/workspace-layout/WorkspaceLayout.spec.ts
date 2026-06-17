import { render } from "@testing-library/svelte";
import GoAWorkspaceLayoutWrapper from "./WorkspaceLayoutWrapper.test.svelte";
import GoAWorkspaceLayout from "./WorkspaceLayout.svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

describe("GoA WorkspaceLayout", () => {
  it("renders the default slot content", () => {
    render(GoAWorkspaceLayoutWrapper, {
      content: "Body content here",
    });
    const content = document.querySelector(".body-content");
    expect(content?.textContent).toContain("Body content here");
  });

  it("renders the side-menu slot when provided", () => {
    render(GoAWorkspaceLayoutWrapper, {
      sideMenu: "Nav",
      content: "Body",
    });
    const sideMenu = document.querySelector(".side-menu-content");
    expect(sideMenu?.textContent).toContain("Nav");
  });

  it("renders the page-header slot when provided", () => {
    render(GoAWorkspaceLayoutWrapper, {
      header: "Header text",
      content: "Body",
    });
    const header = document.querySelector(".header-content");
    expect(header?.textContent).toContain("Header text");
  });

  it("renders the page-footer slot when provided", () => {
    render(GoAWorkspaceLayoutWrapper, {
      footer: "Footer text",
      content: "Body",
    });
    const footer = document.querySelector(".footer-content");
    expect(footer?.textContent).toContain("Footer text");
  });

  it("sets the testid attribute", async () => {
    const { findByTestId } = render(GoAWorkspaceLayout, {
      testid: "ws-layout",
    });
    const el = await findByTestId("ws-layout");
    expect(el).toBeTruthy();
  });

});
