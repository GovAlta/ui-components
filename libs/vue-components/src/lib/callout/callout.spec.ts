import { render, screen } from '@testing-library/vue';
import GoACallout from './callout.vue';

describe('Callout', () => {
  const title = 'Callout Title';
  const calloutType = 'information';
  const content = 'Information to the user goes in the content.';

  test('should render the callout title and content', async () => {
    await render(GoACallout, {
      props: { title: title, calloutType: calloutType, content: content },
    });

    expect(screen.getByText(title));
    expect(screen.getByText(content));
  });

  test('should render the callout information style', async () => {
    await render(GoACallout, {
      props: { title: title, calloutType: calloutType, content: content },
    });

    const calloutStyle = document.getElementsByClassName('goa-callout');
    expect(calloutStyle).not.toBeNull();

    const calloutTypeClass = `goa-callout goa--${calloutType}`;
    expect(document.getElementsByClassName(calloutTypeClass)).not.toBeNull();
  });
});
