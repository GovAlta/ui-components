import { render } from "@testing-library/svelte";
import GoAStickyContainerWrapper from "./StickyContainerWrapper.test.svelte";
import GoAStickyContainer from "./StickyContainer.svelte";
import { it, describe, expect } from "vitest";

describe("GoA StickyContainer", () => {
  it("renders the default slot content", async () => {
    render(GoAStickyContainerWrapper, {
      content: "Body content here",
    });
    const content = document.querySelector(".body-content");
    expect(content?.textContent).toContain("Body content here");
  });

  it("renders header slot content when provided", async () => {
    render(GoAStickyContainerWrapper, {
      header: "Sticky header",
      content: "Body content",
    });
    const header = document.querySelector(".header-content");
    expect(header?.textContent).toContain("Sticky header");
  });

  it("renders footer slot content when provided", async () => {
    render(GoAStickyContainerWrapper, {
      footer: "Sticky footer",
      content: "Body content",
    });
    const footer = document.querySelector(".footer-content");
    expect(footer?.textContent).toContain("Sticky footer");
  });

  it("sets the testid attribute", async () => {
    const { findByTestId } = render(GoAStickyContainer, {
      testid: "sticky-test",
    });
    const el = await findByTestId("sticky-test");
    expect(el).toBeTruthy();
  });

  it("sets a custom height via the height prop", async () => {
    const { container } = render(GoAStickyContainer, {
      testid: "sticky-height-test",
      height: "500px",
    });
    const el = container.querySelector(".sticky-container");
    expect(el?.getAttribute("style")).toContain("height: 500px");
  });

  it("defaults to height 100%", async () => {
    const { container } = render(GoAStickyContainer, {
      testid: "sticky-default-height",
    });
    const el = container.querySelector(".sticky-container");
    expect(el?.getAttribute("style")).toContain("height: 100%");
  });
});
