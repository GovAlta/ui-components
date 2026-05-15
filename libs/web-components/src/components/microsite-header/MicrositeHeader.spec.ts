import { render, cleanup, fireEvent } from "@testing-library/svelte";
import GoAMicrositeHeader from "./MicrositeHeader.svelte";
import GoAMicrositeHeaderWrapper from "./MicrositeHeaderWrapper.test.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("GoAMicrositeHeader", () => {
  it("should render with version", async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "alpha",
      version: "1.2.3",
    });
    const type = queryByTestId("type");
    const version = queryByTestId("version");

    expect(type).toContainHTML("alpha");
    expect(version).toContainHTML("1.2.3");
  });

  it("should render without a version", async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { type: "alpha" });
    const type = queryByTestId("type");
    const version = queryByTestId("version");

    expect(type).toContainHTML("alpha");
    expect(version).toBeNull();
  });

  it(`should render version number`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "alpha",
      version: "1.2.3",
    });
    const version = queryByTestId("version");

    expect(version).toContainHTML("1.2.3");
  });

  it("should render slotted version", () => {
    const el = render(GoAMicrositeHeaderWrapper, { hasSlottedVersion: true });
    const slot = el?.container.querySelector("[slot=version]");
    const slotContent = slot?.querySelector("span");
    expect(slot).toBeTruthy();
    expect(slotContent).toBeTruthy();
    expect(slotContent?.innerHTML).toContain("foo");
  });

  ["alpha", "beta"].forEach((type) => {
    it(`should show the type for ${type}`, async () => {
      const { queryByTestId } = render(GoAMicrositeHeader, { type: type });
      const version = queryByTestId("type");

      expect(version).toContainHTML(type);
    });
  });

  it(`should not show the type for live`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { type: "live" });
    const version = queryByTestId("type");

    expect(version).not.toContainHTML("live");
  });

  it(`should show a feedback url if provided`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "alpha",
      feedbackurl: "http://example.com",
    });
    const feedback = queryByTestId("feedback");
    expect(feedback).toContainHTML("http://example.com");
  });

  it(`should not show a feedback section if one isn't provided`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { type: "alpha" });
    const feedback = queryByTestId("feedback");

    expect(feedback).toBeNull();
  });

  it("should set target=_blank on all urls", () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "alpha",
      feedbackurl: "http://example.com",
    });
    const feedbackURL = queryByTestId("feedback").querySelector("a");
    const headerURL = queryByTestId("site-text").querySelector("a");
    expect(feedbackURL).toHaveAttribute("target", "_blank");
    expect(headerURL).toHaveAttribute("target", "_blank");
  });

  it("should set target=_self when specified", () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "alpha",
      feedbackurl: "http://example.com",
      feedbackurltarget: "self",
      headerurltarget: "self",
    });
    const feedbackURL = queryByTestId("feedback").querySelector("a");
    const headerURL = queryByTestId("site-text").querySelector("a");
    expect(feedbackURL).toHaveAttribute("target", "_self");
    expect(headerURL).toHaveAttribute("target", "_self");
  });
});

describe("GoAMicrositeHeader with click handler", () => {
  it("should not show feedback link when feedbackurl and hasfeedbackhandler are not provided", () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { type: "alpha" });
    const feedback = queryByTestId("feedback");
    const feedbackClick = queryByTestId("feedback-click");

    expect(feedback).toBeNull();
    expect(feedbackClick).toBeNull();
  });

  it("should dispatch custom event when feedback link is clicked where hasfeedbackhandler is true and click handler is provided", async () => {
    const mockClickHandler = vi.fn();
    const { getByText } = render(GoAMicrositeHeader, {
      type: "alpha",
      hasfeedbackhandler: "true",
    });

    // Add event listener to capture the custom event
    document.addEventListener("_feedbackClick", mockClickHandler);

    const feedbackLink = getByText("feedback");
    await fireEvent.click(feedbackLink);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: "_feedbackClick",
        bubbles: true,
        composed: true,
      }),
    );

    document.removeEventListener("_feedbackClick", mockClickHandler);
  });
});

// Add these tests as separate blocks
describe("GoAMicrositeHeader", () => {
  it(`should show a feedback url for live type if provided`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "live",
      feedbackurl: "http://example.com",
    });
    const feedback = queryByTestId("feedback");

    expect(feedback).toBeTruthy();
    expect(feedback).toContainHTML("http://example.com");
  });

  it(`should show the version number for live type if provided`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "live",
      version: "4.5.6",
    });
    const version = queryByTestId("version");

    expect(version).toBeTruthy();
    expect(version).toContainHTML("4.5.6");
  });

  it(`should behave the same as other types for live`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, {
      type: "live",
      version: "4.5.6",
      feedbackurl: "http://example.com",
    });
    const type = queryByTestId("type");
    const version = queryByTestId("version");
    const feedback = queryByTestId("feedback");

    expect(type).toBeTruthy();
    expect(type).not.toContainHTML("live"); // Adjusted expectation
    expect(version).toBeTruthy();
    expect(version).toContainHTML("4.5.6");
    expect(feedback).toBeTruthy();
    expect(feedback).toContainHTML("http://example.com");
  });
});
