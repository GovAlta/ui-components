import { render, waitFor } from '@testing-library/svelte';
import GoACallout from './Callout.svelte'
import GoACalloutWrapper from './CalloutWrapper.test.svelte'
import { it, describe } from "vitest";

describe('GoACalloutComponent', () => {
  it('should render - emergency', async () => {
    const baseElement = render(GoACallout, { testid: "callout-test", type: "emergency", heading: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("emergency");
    expect(icon).toHaveAttribute("type", "warning");
    expect(callout).toContainHTML("Complete")
  });

  it('should render - important', async () => {
    const baseElement = render(GoACallout, { testid: "callout-test", type: "important", heading: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("important");
    expect(icon).toHaveAttribute("type", "alert-circle");
    expect(callout).toContainHTML("Complete")
  });

  it('should render - information', async () => {
    const baseElement = render(GoACallout, { testid: "callout-test", type: "information", heading: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("information");
    expect(icon).toHaveAttribute("type", "information-circle");
    expect(callout).toContainHTML("Complete")
  });

  it('should render - success', async () => {
    const baseElement = render(GoACallout, { testid: "callout-test", type: "success", heading: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("success");
    expect(icon).toHaveAttribute("type", "checkmark-circle");
    expect(callout).toContainHTML("Complete")
  });


  it('should render - emergency', async () => {
    const baseElement = render(GoACallout, { testid: "callout-test", type: "emergency", heading: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("emergency");
    expect(icon).toHaveAttribute("type", "warning");
    expect(callout).toContainHTML("Complete")
  });

  it('should render - the content', async () => {
    const baseElement = render(GoACalloutWrapper, { type: "emergency", heading: 'Complete', content: 'This is the content' });
    const callout = baseElement.container.querySelector('goa-callout');
    expect(callout).toContainHTML("This is the content")
  });

  it('should render - without the heading', async () => {
    const baseElement = render(GoACallout, { type: "emergency", testid: "testid" });
    const el = baseElement.queryByTestId("testid");
    const heading = el.querySelector('h3');
    expect(heading).toBeNull();
  });

  it("should render - with size medium", async () => {
    const baseElement = render(GoACallout, { type: "emergency", size: "medium", heading: "Heading", testid: "testid" });
    const el = baseElement.queryByTestId("testid");

    const heading = el.querySelector("h3.medium");
    expect(heading).toHaveClass("medium");

    await waitFor(() => {
      const icon = el.querySelector("goa-icon");
      expect(icon).toHaveAttribute("size", "small");
    });
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
});
