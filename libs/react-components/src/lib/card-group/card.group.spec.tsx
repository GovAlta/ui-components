import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import GoACardGroup from './card.group.component';

describe('GoA Cards', () => {
  const title = 'My Card group title';
  const layout = 'basic';
  const cardItem = [
    {
      title: 'Energy Diversification Act 1',
      description: 'We are encouraging  vor Albertans.',
      titleUrl: 'http://www.google.ca',
      cardWidth: 400,
      cardImageUrl: 'working-in-cold-hero-3_rdax_75.jpg',
    },
    {
      title: 'Energy Diversification Act 2',
      description: 'We are encouraging  vor Albertans.',
      titleUrl: 'http://www.google.ca',
      cardWidth: 400,
      cardImageUrl: 'working-in-cold-hero-3_rdax_75.jpg',
    },
  ];
  it('should render title', () => {
    const { baseElement } = render(
      <GoACardGroup title={title} layout={layout} cardItems={cardItem} />
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(title));
    const container = document.querySelector('.card-group-basic');

    expect(container).not.toBeNull();
  });

  it('should render card items', () => {
    const { baseElement } = render(
      <GoACardGroup title={title} layout={layout} cardItems={cardItem} />
    );
    expect(baseElement).toBeTruthy();
    const container = document.querySelectorAll('.goa-card');
    expect(container).toHaveLength(2);
    const style = window.getComputedStyle(container[0]);
    expect(style.width).toBe(`${cardItem[0].cardWidth}px`);
  });
});
