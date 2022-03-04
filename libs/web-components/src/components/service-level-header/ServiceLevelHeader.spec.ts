import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoAServiceLevelHeader from './ServiceLevelHeader.svelte'

describe('GoAServiceLevelHeader', () => {

  it('should render with version', async () => {
    const { queryByTestId } = render(GoAServiceLevelHeader, { level: "alpha", version: "1.2.3" });
    const level = queryByTestId('level');
    const version = queryByTestId('version');

    expect(level).toContainHTML("alpha");
    expect(version).toContainHTML("1.2.3");
  });

  it('should render without a version', async () => {
    const { queryByTestId } = render(GoAServiceLevelHeader, { level: "alpha" });
    const level = queryByTestId('level');
    const version = queryByTestId('version');

    expect(level).toContainHTML("alpha");
    expect(version).toBeNull();
  });

  it(`should render version number`, async () => {
    const { queryByTestId } = render(GoAServiceLevelHeader, { level: 'alpha', version: "1.2.3" });
    const version = queryByTestId('version');

    expect(version).toContainHTML("1.2.3");
  });

  ['alpha', 'beta'].forEach(level => {
    it(`should show the level number for ${level}`, async () => {
      const { queryByTestId } = render(GoAServiceLevelHeader, { level: level });
      const version = queryByTestId('level');

      expect(version).toContainHTML(level);
    });
  });

  it(`should not show the level number for live`, async () => {
    const { queryByTestId } = render(GoAServiceLevelHeader, { level: 'live' });
    const version = queryByTestId('level');

    expect(version).toContainHTML('live');
  });
});
