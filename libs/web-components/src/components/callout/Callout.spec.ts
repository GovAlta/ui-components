import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoACallout from './Callout.svelte'

describe('GoACalloutComponent', () => {
  it('should render - emergency', async () => {
    const baseElement = render(GoACallout, { testId: "callout-test", type: "emergency", title: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("emergency");
    expect(icon).toHaveAttribute("type", "warning");
    expect(callout).toContainHTML("Complete")
  });

  it('should render - caution', async () => {
    const baseElement = render(GoACallout, { testId: "callout-test", type: "caution", title: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("caution");
    expect(icon).toHaveAttribute("type", "alert-circle");
    expect(callout).toContainHTML("Complete")
  });

  it('should render - information', async () => {
    const baseElement = render(GoACallout, { testId: "callout-test", type: "information", title: 'Complete' });
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
    const baseElement = render(GoACallout, { testId: "callout-test", type: "success", title: 'Complete' });
    const callout = await baseElement.findByTestId('callout-test');
    const span = callout.firstElementChild;
    const icon = span.firstElementChild;

    expect(callout).toBeTruthy();
    expect(span).toBeTruthy();
    expect(span).toHaveClass("success");
    expect(icon).toHaveAttribute("type", "checkmark-circle");
    expect(callout).toContainHTML("Complete")
  });
});
