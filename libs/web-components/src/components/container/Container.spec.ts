import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import GoAContainerWrapper from "./ContainerWrapper.test.svelte"

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

});
