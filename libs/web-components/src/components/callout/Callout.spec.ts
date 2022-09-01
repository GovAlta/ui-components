import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoACallout from './Callout.svelte'
import GoACalloutWrapper from './CalloutWrapper.test.svelte'

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
    const baseElement = render(GoACallout, { type: "emergency", content: 'This is the content', testid: "testid" });
    const el = baseElement.queryByTestId("testid");
    const heading = el.querySelector('h3');
    expect(heading).toBeNull();
  });
});
