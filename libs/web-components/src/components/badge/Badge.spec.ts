import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoABadge from './Badge.svelte'

describe('GoABadgeComponent', () => {

  [
    'success', 'warning', 'error', 'information', 'emergency', 'inactive', 'dark', 'midtone', 'light'
  ].forEach(type => {
    it(`should render - ${type}`, async () => {
      const baseElement = render(GoABadge, { testid: "badge-test", type, content: 'Content' });
      const badge = await baseElement.findByTestId('badge-test');

      expect(badge).toHaveClass(`badge-${type}`);
      expect(badge).toContainHTML("Content")
    });
  });

  for (const [type, iconType] of Object.entries({
    success: "checkmark-circle",
    warning: "alert-circle",
    information: "information-circle",
    emergency: "warning",
    inactive: "information-circle",
    dark: "information-circle",
    midtone: "information-circle",
    light: "information-circle",
  })) {
    it(`should render icon - ${type}`, async () => {
      const baseElement = render(GoABadge, { testid: "badge-test", type, icon: "true", content: 'Content' });
      const badge = await baseElement.findByTestId('badge-test');

      expect(badge).toBeTruthy();
      expect(badge.childElementCount).toBe(2);
      expect(badge).toHaveClass(`badge-${type}`);
      expect(badge).toContainHTML("Content")
    });
  };

});
