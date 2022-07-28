import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/svelte";
import GoAHeroBanner from "./HeroBanner.svelte"
import GoAHeroBannerWrapper from "./HeroBannerWrapper.test.svelte"

describe("GoAHeroBanner", () => {

  it("renders all properties", async () => {
    const title = "Test Title";
    const el = render(GoAHeroBanner, { heading: title, backgroundurl: "somepic.png" });

    const heading = await el.findByRole("heading")
    const background = await el.findByTestId("background");

    waitFor(() => {
      expect(heading.innerHTML).toEqual(title);
      expect(background.style.backgroundImage).toContain("somepic.png");
    })
  });

  it("renders actions", async () => {
    const el = render(GoAHeroBannerWrapper, {
      heading: "Title",
      backgroundurl: "somepic.png",
      content: "The content",
      actionContent: "<goa-button>Action</goa-button>",
    });

    waitFor(() => {
      expect(el.container.innerHTML).toContain("The content");
      expect(el.container.innerHTML).toContain("<goa-button>Action</goa-button>");
    })
  })

});
