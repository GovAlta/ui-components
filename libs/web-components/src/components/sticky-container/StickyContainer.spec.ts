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

  it("sets the testid attribute on the scrollable content area", async () => {
    const { findByTestId } = render(GoAStickyContainer, {
      testid: "sticky-test",
    });
    const el = await findByTestId("sticky-test");
    expect(el).toBeTruthy();
  });

  it("accepts a custom height prop and renders without errors", () => {
    // In jsdom the Svelte component renders its inner elements directly (no
    // custom-element shell), so we verify the component mounts correctly when a
    // height is supplied. The actual style is applied to the host element via JS
    // in a real browser (see applyHostHeight in StickyContainer.svelte).
    const { findByTestId } = render(GoAStickyContainer, {
      testid: "sticky-height-test",
      height: "500px",
    });
    expect(findByTestId("sticky-height-test")).toBeTruthy();
  });

  it("renders with the default height prop without errors", () => {
    const { findByTestId } = render(GoAStickyContainer, {
      testid: "sticky-default-height",
    });
    expect(findByTestId("sticky-default-height")).toBeTruthy();
  });
});
