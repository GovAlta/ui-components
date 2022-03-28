import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import GoAMicrositeHeader from './MicrositeHeader.svelte'

describe('GoAMicrositeHeader', () => {

  it('should render with version', async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { level: "alpha", version: "1.2.3" });
    const level = queryByTestId('level');
    const version = queryByTestId('version');

    expect(level).toContainHTML("alpha");
    expect(version).toContainHTML("1.2.3");
  });

  it('should render without a version', async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { level: "alpha" });
    const level = queryByTestId('level');
    const version = queryByTestId('version');

    expect(level).toContainHTML("alpha");
    expect(version).toBeNull();
  });

  it(`should render version number`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { level: 'alpha', version: "1.2.3" });
    const version = queryByTestId('version');

    expect(version).toContainHTML("1.2.3");
  });

  ['alpha', 'beta'].forEach(level => {
    it(`should show the level for ${level}`, async () => {
      const { queryByTestId } = render(GoAMicrositeHeader, { level: level });
      const version = queryByTestId('level');

      expect(version).toContainHTML(level);
    });
  });

  it(`should not show the level for live`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { level: 'live' });
    const version = queryByTestId('level');

    expect(version).not.toContainHTML('live');
  });

  it(`should show a feedback url if provided`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { level: 'alpha', feedbackurl: 'http://example.com' });
    const feedback = queryByTestId('feedback');

    expect(feedback).toContainHTML('http://example.com');
  });

  it(`should not show a feedback section if one isn't provided`, async () => {
    const { queryByTestId } = render(GoAMicrositeHeader, { level: 'alpha' });
    const feedback = queryByTestId('feedback');

    expect(feedback).toBeNull();
  });
});
