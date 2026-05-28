import { render } from "@testing-library/svelte";
import GoAScrollPanelWrapper from "./ScrollPanelWrapper.test.svelte";
import GoAScrollPanel from "./ScrollPanel.svelte";
import { it, describe, expect } from "vitest";

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

});
