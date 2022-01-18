import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoABadge from './Badge.svelte'

describe('GoABadgeComponent', () => {
  it('should render - success', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "success", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-success");
    expect(icon).toHaveAttribute("type","checkmark-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - warning', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "warning", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-warning");
    expect(icon).toHaveAttribute("type","alert-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - information', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "information", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-information");
    expect(icon).toHaveAttribute("type","information-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - emergency', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "emergency", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-emergency");
    expect(icon).toHaveAttribute("type","warning");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - inactive', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "inactive", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-inactive");
    expect(icon).toHaveAttribute("type","information-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - dark', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "dark", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-dark");
    expect(icon).toHaveAttribute("type","information-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - midtone', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "midtone", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-midtone");
    expect(icon).toHaveAttribute("type","information-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should render - light', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "light", icon: "true", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(badge).toHaveClass("badge-light");
    expect(icon).toHaveAttribute("type","information-circle");
    expect(badge).toContainHTML("Complete")
  });

  it('should not render icon', async () => {
    const baseElement = render(GoABadge, { testId: "badge-test", type: "light", icon: "false", content: 'Complete' });
    const badge = await baseElement.findByTestId('badge-test');
    const icon = badge.firstElementChild;

    expect(badge).toBeTruthy();
    expect(icon.tagName === "goa-icon").toBeFalsy();
  });
});
