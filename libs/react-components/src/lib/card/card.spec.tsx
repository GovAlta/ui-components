import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import GoACard from './card.component';

describe('GoA Card', () => {
  const title = 'My Card title';
  const description =
    'My card text desciption available here, this field can be empty';
  const cardImageUrl = 'working-in-cold-hero-3_rdax_75.jpg';
  const titleUrl = 'http://www.google.ca/';

  it('should render title and description', () => {
    const { baseElement } = render(
      <GoACard title={title} description={description} />
    );

    expect(baseElement).toBeTruthy();

    expect(screen.getByText(title));
    expect(screen.getByText(description));
  });

  it('title has href, should render title and href', () => {
    render(
      <GoACard title={title} titleUrl={titleUrl} description={description} />
    );
    expect(screen.getByText(title));
    const url = screen.getByRole('link', { name: title }) as HTMLAnchorElement;

    expect(url.href).toEqual(titleUrl);
  });

  it('if cardImageUrl exist, should render cardImage', () => {
    render(<GoACard title={title} cardImageUrl={cardImageUrl} />);
    const cardImageImg = document.getElementsByClassName('goa-poster');
    expect(cardImageImg).not.toBeNull();
  });

  it('if use customer input layout, should render as fixed width', () => {
    render(
      <GoACard title={title} cardImageUrl={cardImageUrl} maxWidth={200} />
    );
    const container = document.querySelector('.goa-card ');
    expect(container).not.toBeNull();

    expect(container.classList).toHaveLength(1);
    const style = window.getComputedStyle(container);

    expect(style['max-width']).toBe('200px');
  });
});
