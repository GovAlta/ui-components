import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import GoAContainerWrapper from "./ContainerWrapper.test.svelte"
import GoAContainer from "./Container.svelte"

describe("GoA Container", () => {

  it("should render", async () => {
    render(GoAContainerWrapper, {
      title: "Test Title",
      content: "Test Content",
      actions: "Test Actions",
    });

    const title = document.querySelector(".title");
    expect(title.innerHTML).toContain("Test Title");

    const content = document.querySelector(".content");
    expect(content.innerHTML).toContain("Test Content");

    const actions = document.querySelector(".actions");
    expect(actions.innerHTML).toContain("Test Actions");
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
      expect(container).toHaveStyle("margin-top:var(--goa-spacing-s)");
      expect(container).toHaveStyle("margin-right:var(--goa-spacing-m)");
      expect(container).toHaveStyle("margin-bottom:var(--goa-spacing-l)");
      expect(container).toHaveStyle("margin-left:var(--goa-spacing-xl)");
    });
  });
});
