import { render, screen } from '@testing-library/vue';
import GoACard from './card.vue';

describe('GoA Card', () => {
  const title = 'My Card title';
  const description = 'My card text desciption available here, this field can be empty';
  const cardImageUrl = 'working-in-cold-hero-3_rdax_75.jpg';
  const titleUrl = 'http://www.google.ca/';

  it('should render title and description', async () => {
    await render(GoACard, {
      props: { title: title, description: description },
    });

    expect(screen.getByText(title));
    expect(screen.getByText(description));
  });

  it('title has href, should render title and href', async () => {
    await render(GoACard, {
      props: { title: title, description: description, titleUrl: titleUrl },
    });

    expect(screen.getByText(title));
    const url = screen.getByRole('link', { name: title }) as HTMLAnchorElement;

    expect(url.href).toEqual(titleUrl);
  });

  it('if cardImageUrl exist, should render cardImage', async () => {
    await render(GoACard, {
      props: { title: title, cardImageUrl: cardImageUrl },
    });
    const cardImageImg = document.getElementsByClassName('goa-poster');
    expect(cardImageImg).not.toBeNull();
  });

  it('if use auto layout, should render as auto selected', async () => {
    await render(GoACard, {
      props: { title: title, cardImageUrl: cardImageUrl, cardWidth: 'auto' },
    });

    const container = document.querySelector('.goa-card ');
    expect(container).not.toBeNull();

    expect(container.classList).toHaveLength(1);
    const style = window.getComputedStyle(container);
    expect(style.width).toBe('auto');
  });

  it('if use full layout, should render as full width', async () => {
    await render(GoACard, {
      props: { title: title, cardImageUrl: cardImageUrl, cardWidth: 'full' },
    });

    const container = document.querySelector('.goa-card ');
    expect(container).not.toBeNull();

    expect(container.classList).toHaveLength(1);
    const style = window.getComputedStyle(container);

    expect(style.width).toBe('');
  });

  it('if use customer input layout, should render as fixed width', async () => {
    await render(GoACard, {
      props: { title: title, cardImageUrl: cardImageUrl, cardWidth: 200 },
    });

    const container = document.querySelector('.goa-card ');
    expect(container).not.toBeNull();

    expect(container.classList).toHaveLength(1);
    const style = window.getComputedStyle(container);

    expect(style.width).toBe('200px');
  });
});
