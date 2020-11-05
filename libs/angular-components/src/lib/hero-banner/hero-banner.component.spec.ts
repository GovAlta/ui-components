import { render, screen } from '@testing-library/angular';
import { GoAHeroBannerComponent, GoAHeroBannerContentComponent, GoAHeroBannerLinkComponent } from './hero-banner.component';

describe('GoAHeroBannerComponent', () => {

  const title = 'Hello, World!';
  const content = 'This is the awesome content';
  const linkUrl = 'http://google.com/';
  const linkText = 'Click Me';

  it('should show just the title', async () => {
    await render(GoAHeroBannerComponent, {
      template: `<goa-hero-banner title="${title}"></goa-hero-banner>`,
      declarations: [GoAHeroBannerComponent]
    });

    expect(screen.getByRole('heading').textContent).toEqual(title);
  });

  it('should show a title and additional content', async () => {
    await render(GoAHeroBannerComponent, {
      template: `
      <goa-hero-banner title="${title}">
        <goa-hero-banner-content>${content}</goa-hero-banner-content>
      </goa-hero-banner>`,
      declarations: [GoAHeroBannerComponent, GoAHeroBannerContentComponent]
    });

    expect(screen.getByRole('heading').textContent).toEqual(title);
    expect(screen.getByRole('note').textContent).toEqual(content);
  });

  it('should show a title, additional content and a link button', async () => {
    await render(GoAHeroBannerComponent, {
      template: `
      <goa-hero-banner title="${title}">
        <goa-hero-banner-content>${content}</goa-hero-banner-content>
        <goa-hero-banner-link url="${linkUrl}">${linkText}</goa-hero-banner-link>
      </goa-hero-banner>`,
      declarations: [GoAHeroBannerComponent, GoAHeroBannerContentComponent, GoAHeroBannerLinkComponent]
    });

    expect(screen.getByRole('heading').textContent).toEqual(title);
    expect(screen.getByRole('note').textContent).toEqual(content);
    expect(screen.getByRole('link')).toHaveProperty('href', linkUrl);
  });
});
