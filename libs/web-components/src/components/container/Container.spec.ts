import { render } from "@testing-library/svelte";
import GoAContainerWrapper from "./ContainerWrapper.test.svelte";
import GoAContainer from "./Container.svelte";
import { it, describe } from "vitest";

describe("GoA Container", () => {
  it("should render", async () => {
    render(GoAContainerWrapper, {
      title: "Test Title",
      content: "Test Content",
      actions: "Test Actions",
    });

    const title = document.querySelector(".title");
    expect(title?.innerHTML).toContain("Test Title");

    const content = document.querySelector(".content");
    expect(content?.innerHTML).toContain("Test Content");

    const actions = document.querySelector(".actions");
    expect(actions?.innerHTML).toContain("Test Actions");
  });

  describe("Widths", () => {
    it(`should set the width`, async () => {
      const baseElement = render(GoAContainer, {
        testid: "container-test",
        width: "content",
      });
      const container = await baseElement.findByTestId("container-test");

      expect(container).toBeTruthy();
      expect(container?.classList).toContain("width--content");
    });

    it("should set a max width", async () => {
      const baseElement = render(GoAContainer, {
        testid: "container-test",
        maxWidth: "480px",
      });
      const container = await baseElement.findByTestId("container-test");
      expect(container?.getAttribute("style")).toContain("max-width: 480px;");
    });
  });

  describe("Heights", () => {
    it("should set min and max heights when provided", async () => {
      const baseElement = render(GoAContainer, {
        testid: "container-test",
        minHeight: "120px",
        maxHeight: "360px",
      });
      const container = await baseElement.findByTestId("container-test");
      const computedStyle = window.getComputedStyle(container);
      expect(container?.getAttribute("style")).toContain("min-height: 120px;");
      expect(container?.getAttribute("style")).toContain("max-height: 360px;");
      expect(computedStyle.alignSelf).toBe("flex-start");
      const content = container?.querySelector(".content");
      expect(content).not.toBeNull();
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAContainer, {
        testid: "container-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const container = await baseElement.findByTestId("container-test");

      expect(container).toBeTruthy();
      expect(container).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(container).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(container).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(container).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
