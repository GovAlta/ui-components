import { render, screen } from '@testing-library/vue';
import GoACardGroup from './card.group.vue';

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
  it('should render title', async () => {
    await render(GoACardGroup, {
      props: { title: title, layout: layout },
    });

    expect(screen.getByText(title));
    const container = document.querySelector('.card-group-basic-vue');

    expect(container).not.toBeNull();
  });
  it('should render card items', async () => {
    await render(GoACardGroup, {
      props: { title: title, layout: layout, cardItems: cardItem },
    });

    const container = document.querySelectorAll('.goa-card');
    expect(container).toHaveLength(2);
  });
});
