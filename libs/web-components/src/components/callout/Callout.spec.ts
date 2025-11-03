import { render, waitFor } from "@testing-library/svelte";
import GoACallout from "./Callout.svelte";
import GoACalloutWrapper from "./CalloutWrapper.test.svelte";
import { it, describe, vi } from "vitest";

describe("GoACalloutComponent", () => {
  it("should render - emergency", async () => {
    const baseElement = render(GoACallout, {
      testid: "callout-test",
      type: "emergency",
      heading: "Complete",
    });
    const callout = await baseElement.findByTestId("callout-test");
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("emergency");
    expect(icon).toHaveAttribute("type", "warning");
    expect(callout).toContainHTML("Complete");
  });

  it("should render - important", async () => {
    const baseElement = render(GoACallout, {
      testid: "callout-test",
      type: "important",
      heading: "Complete",
    });
    const callout = await baseElement.findByTestId("callout-test");
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("important");
    expect(icon).toHaveAttribute("type", "alert-circle");
    expect(callout).toContainHTML("Complete");
  });

  it("should render - information", async () => {
    const baseElement = render(GoACallout, {
      testid: "callout-test",
      type: "information",
      heading: "Complete",
    });
    const callout = await baseElement.findByTestId("callout-test");
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("information");
    expect(icon).toHaveAttribute("type", "information-circle");
    expect(callout).toContainHTML("Complete");
  });

  it("should render - success", async () => {
    const baseElement = render(GoACallout, {
      testid: "callout-test",
      type: "success",
      heading: "Complete",
    });
    const callout = await baseElement.findByTestId("callout-test");
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("success");
    expect(icon).toHaveAttribute("type", "checkmark-circle");
    expect(callout).toContainHTML("Complete");
  });

  it("should render - emergency", async () => {
    const baseElement = render(GoACallout, {
      testid: "callout-test",
      type: "emergency",
      heading: "Complete",
    });
    const callout = await baseElement.findByTestId("callout-test");
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("emergency");
    expect(icon).toHaveAttribute("type", "warning");
    expect(callout).toContainHTML("Complete");
  });

  it("should render - the content", async () => {
    const baseElement = render(GoACalloutWrapper, {
      type: "emergency",
      heading: "Complete",
      content: "This is the content",
    });
    const callout = baseElement.container.querySelector("goa-callout");
    expect(callout).toContainHTML("This is the content");
  });

  it("should render - without the heading", async () => {
    const baseElement = render(GoACallout, {
      type: "emergency",
      testid: "testid",
    });
    const el = baseElement.queryByTestId("testid");
    const heading = el.querySelector("h3");
    expect(heading).toBeNull();
  });

  it("should render - with size medium", async () => {
    const baseElement = render(GoACallout, {
      type: "emergency",
      size: "medium",
      heading: "Heading",
      testid: "testid",
    });
    const el = baseElement.queryByTestId("testid");

    const heading = el.querySelector("h3.medium");
    expect(heading).toHaveClass("medium");

    await waitFor(() => {
      const icon = el.querySelector("goa-icon");
      expect(icon).toHaveAttribute("size", "small");
    });
  });

  it("should render - with max width", async () => {
    const baseElement = render(GoACallout, {
      type: "emergency",
      maxwidth: "480px",
      testid: "testid",
    });
    const el = baseElement.queryByTestId("testid");
    expect(el?.getAttribute("style")).toContain("max-width: 480px;");
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "important",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toBeTruthy();
      expect(callout).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(callout).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(callout).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(callout).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });

  describe("live region", () => {
    it("should have aria-live attribute set to off by default", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "information",
      });
      const callout = await baseElement.findByTestId("callout-test");

      //expect(callout).not.toHaveAttribute("aria-live");
      expect(callout).toHaveAttribute("aria-live", "off");
    });

    it("should set aria-live to off", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "important",
        arialive: "off",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveAttribute("aria-live", "off");
    });

    it("should set aria-live to polite", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "information",
        arialive: "polite",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveAttribute("aria-live", "polite");
    });

    it("should set aria-live to assertive", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "emergency",
        arialive: "assertive",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveAttribute("aria-live", "assertive");
    });

    it("should set aria-live attribute to empty when an empty string is provided", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "success",
        arialive: "",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveAttribute("aria-live", "");
    });
  });

  describe("emphasis levels", () => {
    it("should have default emphasis of medium", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "information",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveClass("emphasis-medium");
    });

    it("should render with high emphasis", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "emergency",
        emphasis: "high",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveClass("emphasis-high");
      expect(callout).toHaveClass("emergency");
    });

    it("should render with medium emphasis", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "important",
        emphasis: "medium",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveClass("emphasis-medium");
      expect(callout).toHaveClass("important");
    });

    it("should render with low emphasis", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "success",
        emphasis: "low",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveClass("emphasis-low");
      expect(callout).toHaveClass("success");
    });

    it("should add no-heading class when heading is not provided", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "information",
        emphasis: "low",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).toHaveClass("no-heading");
    });

    it("should not add no-heading class when heading is provided", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "information",
        emphasis: "low",
        heading: "Test Heading",
      });
      const callout = await baseElement.findByTestId("callout-test");

      expect(callout).not.toHaveClass("no-heading");
    });

    it("should apply emphasis classes to icon and content", async () => {
      const baseElement = render(GoACallout, {
        testid: "callout-test",
        type: "important", 
        emphasis: "high",
        heading: "Test",
      });
      const callout = await baseElement.findByTestId("callout-test");
      const icon = callout.querySelector(".icon");
      const content = callout.querySelector(".content");
      const heading = content.querySelector("h3");

      expect(icon).toHaveClass("emphasis-high");
      expect(content).toHaveClass("emphasis-high");
      expect(heading).toHaveClass("emphasis-high");
    });
  });

  describe("deprecation warnings", () => {
    it("should warn when event type is used", async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(GoACallout, {
        testid: "callout-test",
        type: "event",
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Callout type 'event' is deprecated and will be removed in a future version. Please use a different type."
        );
      });

      consoleSpy.mockRestore();
    });
  });
});
