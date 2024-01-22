import { render, cleanup } from "@testing-library/react";
import GoAHeroBanner from "./hero-banner";
import { GoAHeroBannerActions } from "./hero-banner-actions";
import GoAButton from "../button/button";

afterEach(cleanup);

describe("GoAHeroBanner", () => {
  it("renders all with properties", () => {
    const { baseElement } = render(
      <GoAHeroBanner
        heading="Upgrading our bitumen"
        backgroundUrl="some-bg.png"
        backgroundColor="#000"
        textColor="#fff"
        minHeight="500px"
        maxContentWidth="500px"
      />
    );
    const el = baseElement.querySelector("goa-hero-banner");
    expect(el?.getAttribute("heading")).toEqual("Upgrading our bitumen");
    expect(el?.getAttribute("backgroundurl")).toEqual("some-bg.png");
    expect(el?.getAttribute("backgroundcolor")).toEqual("#000");
    expect(el?.getAttribute("textcolor")).toEqual("#fff");
    expect(el?.getAttribute("minheight")).toEqual("500px");
    expect(el?.getAttribute("maxcontentwidth")).toEqual("500px");

  });

  it("renders content", async () => {
    const { baseElement } = render(
      <GoAHeroBanner
        heading="Upgrading our bitumen"
        backgroundUrl="some-bg.png"
      >
        This is the hero banner content
      </GoAHeroBanner>
    );
    const el = baseElement.querySelector("goa-hero-banner");
    expect(el?.innerHTML).toContain("This is the hero banner content");
  });

  it("renders actions", async () => {
    const { baseElement } = render(
      <GoAHeroBanner
        heading="Upgrading our bitumen"
        backgroundUrl="some-bg.png"
      >
        This is the hero banner content
        <GoAHeroBannerActions>
          <GoAButton onClick={() => { }}>Submit</GoAButton>
        </GoAHeroBannerActions>
      </GoAHeroBanner>
    );
    const el = baseElement.querySelector("goa-hero-banner goa-button");
    expect(el?.textContent).toBe("Submit");
  });

  describe("Min Height", () => {
    it("uses the default min height", async () => {
      const { baseElement } = render(
        <GoAHeroBanner
          heading="Upgrading our bitumen"
          backgroundUrl="some-bg.png"
        />
      );
      const el = baseElement.querySelector("goa-hero-banner");
      expect(el?.getAttribute("minheight")).toBeNull();
    });

    it("uses the min height when supplied", async () => {
      const { baseElement } = render(
        <GoAHeroBanner
          heading="Upgrading our bitumen"
          backgroundUrl="some-bg.png"
          minHeight="700px"
        />
      );
      const el = baseElement.querySelector("goa-hero-banner");
      expect(el?.getAttribute("minheight")).toBe("700px");
    });
  });
});
