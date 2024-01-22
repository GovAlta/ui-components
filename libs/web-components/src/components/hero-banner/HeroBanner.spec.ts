import { render, waitFor } from "@testing-library/svelte";
import GoAHeroBanner from "./HeroBanner.svelte"
import GoAHeroBannerWrapper from "./HeroBannerWrapper.test.svelte"
import { it, describe } from "vitest";

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

  describe("Min Height", () => {
    it("uses the default min height", async () => {
      const result = render(GoAHeroBanner, { heading: "Jeading", backgroundurl: "somepic.png" });
      const heroBanner = result.queryByTestId("background");
      await waitFor(() => {
        expect(heroBanner).toHaveStyle("min-height: 600px");  // 600px is default value
      })
    });

    it("uses the min height when supplied", async () => {
      const result = render(GoAHeroBanner, { heading: "Jeading", backgroundurl: "somepic.png", minheight: "700px" });
      const heroBanner = result.queryByTestId("background");
      await waitFor(() => {
        expect(heroBanner).toHaveStyle("min-height: 700px");
      })
    });
  })

});
