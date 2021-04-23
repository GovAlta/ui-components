import { render, screen } from '@testing-library/vue';
import GoAHeroBanner from './hero-banner.vue';

describe('GoAHeroBanner', () => {
  const title = 'Upgrading our bitumen';
  const content = 'Main content';
  const linkText = 'Learn more';
  const linkUrl = 'http://google.com';
  test('Renders all with properties', async () => {
    await render(GoAHeroBanner, {
      props: {
        title: title,
        backgroundUrl: '',
        content: content,
        linkText: linkText,
        linkUrl: linkUrl,
      },
    });

    expect(screen.getByText(title));

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.getByRole('note').textContent.trim()).toEqual('Main content');
    expect(screen.getByRole('link').textContent.trim()).toEqual('Learn more');
  });

  test('Only title with properties', async () => {
    await render(GoAHeroBanner, {
      props: { title: title, backgroundUrl: '' },
    });

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  test('Title and content with properties', async () => {
    await render(GoAHeroBanner, {
      props: { title: title, backgroundUrl: '', content: content },
    });

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );
    expect(screen.getByRole('note').textContent.trim()).toEqual('Main content');
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  test('Title and link with properties', async () => {
    await render(GoAHeroBanner, {
      props: {
        title: title,
        backgroundUrl: '',
        content: content,
        linkText: linkText,
        linkUrl: linkUrl,
      },
    });

    expect(screen.getByRole('heading').textContent).toEqual(
      'Upgrading our bitumen'
    );

    expect(screen.getByRole('link').textContent.trim()).toEqual('Learn more');
  });
});
