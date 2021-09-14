import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/angular';
import { GoACardGroupComponent } from './card.group.component';
import { GoAButtonComponent } from '../button/button.component';
import {
  GoACardComponent,
  GoACardFooterComponent,
  GoACardHeaderComponent,
  GoACardThumbImageComponent,
  GoACardContentComponent,
} from '../card/card.component';

describe('GoA Cards with cardItem Array', () => {
  const title = 'My Card group title';
  const layout = 'basic';

  beforeEach(async () => {
    await render(GoACardGroupComponent, {
      template: `<goa-card-group title="${title}" layout="${layout}" [cardItems]="[
        {
          title: 'Energy Diversification Act 1',
          description: 'We are encouraging.',
          titleUrl: 'http://www.google.ca',
          cardImageUrl: 'working-in-cold-hero-3_rdax_75.jpg'
        },
        {
          title: 'Energy Diversification Act 2',
          description: 'We are encouraging more Albertans.',
          titleUrl: 'http://www.facebook.com',
          cardImageUrl: 'working-in-cold-hero-3_rdax_76.jpg'
        }
      ]" ></goa-card-group>`,
      declarations: [GoACardGroupComponent, GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent, GoACardFooterComponent]
    });

  });

  it('should render title', async () => {
    expect(screen.getByText(title)).not.toBeNull();

  });

  it('should render 2 card items', async () => {
    const container = document.querySelectorAll('goa-card');
    expect(container).toHaveLength(2);
  });

  it('should render card 1 and 2 title', async () => {
    expect(screen.getByText('Energy Diversification Act 1')).not.toBeNull();
    expect(screen.getByText('Energy Diversification Act 2')).not.toBeNull();
  });

  it('should render card 1 and 2 description', async () => {
    expect(screen.getByText('We are encouraging.')).not.toBeNull();
    expect(screen.getByText("We are encouraging more Albertans.")).not.toBeNull();
  });

  it('should render card 1 and 2 url', async () => {
    const link1 = screen.getByRole('link', { name: /Energy Diversification Act 1/i });
    expect(link1.getAttribute('href')).toBe('http://www.google.ca');
    const link2 = screen.getByRole('link', { name: /Energy Diversification Act 2/i });
    expect(link2.getAttribute('href')).toBe('http://www.facebook.com');
  });
});



describe('GoA Cards with child tags', () => {
  const title = 'My Card group title';
  const layout = 'basic';

  beforeEach(async () => {
    await render(GoACardGroupComponent, {
      template: ` <goa-card-group title="${title}" layout="${layout}">
      <goa-card style="flex: 1 0 0; margin: 10px;" titleUrl="https://www.google.com">
        <goa-card-thumb-image
          url="working-in-cold-hero-3_rdax_75.jpg"
          alt="hero pic"
        ></goa-card-thumb-image>
        <goa-card-header>Energy Diversification Act 1</goa-card-header>
        <goa-card-content
          >We are encouraging companies to turn out oil and gas resources into more valuable products-creating good jobs for Albertans 1.</goa-card-content
        >
        <goa-card-footer
          ><button goa-button buttonSize="small" buttonType="tertiary">
            Action 1
          </button></goa-card-footer
        >
      </goa-card>
      <goa-card style="flex: 1 0 0; margin: 10px;" titleUrl="https://www.facebook.com">
        <goa-card-thumb-image
          url="working-in-cold-hero-3_rdax_75.jpg"
          alt="hero pic"
        ></goa-card-thumb-image>
        <goa-card-header>Energy Diversification Act 2</goa-card-header>
        <goa-card-content>We are encouraging companies to turn out oil and gas resources into more valuable products-creating good jobs for Albertans 2.</goa-card-content>
        <goa-card-footer
          ><button goa-button buttonSize="small" buttonType="tertiary">
            Action 1
          </button></goa-card-footer
        >
      </goa-card>
      <goa-card style="flex: 1 0 0; margin: 10px;" titleUrl="https://www.microsoft.com">
        <goa-card-thumb-image
          url="working-in-cold-hero-3_rdax_75.jpg"
          alt="hero pic"
        ></goa-card-thumb-image>
        <goa-card-header>Energy Diversification Act 3</goa-card-header>
        <goa-card-content>We are encouraging companies to turn out oil and gas resources into more valuable products-creating good jobs for Albertans 3.</goa-card-content>
        <goa-card-footer
          ><button goa-button buttonSize="small" buttonType="tertiary">
            Action 1
          </button></goa-card-footer
        >
      </goa-card>
    </goa-card-group>`,
      declarations: [GoACardGroupComponent, GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent, GoACardFooterComponent]
    });

  });

  it('should render title', async () => {
    expect(screen.getByText(title)).not.toBeNull();

  });

  it('should render 3 card items', async () => {
    const container = document.querySelectorAll('goa-card');
    expect(container).toHaveLength(3);
  });

  it('should render card 1, 2, 3 title', async () => {
    expect(screen.getByText('Energy Diversification Act 1')).not.toBeNull();
    expect(screen.getByText('Energy Diversification Act 2')).not.toBeNull();
    expect(screen.getByText('Energy Diversification Act 3')).not.toBeNull();
  });

  it('should render card 1,2, 3 description', async () => {
    expect(screen.getByText('We are encouraging companies to turn out oil and gas resources into more valuable products-creating good jobs for Albertans 1.')).not.toBeNull();
    expect(screen.getByText('We are encouraging companies to turn out oil and gas resources into more valuable products-creating good jobs for Albertans 2.')).not.toBeNull();
    expect(screen.getByText('We are encouraging companies to turn out oil and gas resources into more valuable products-creating good jobs for Albertans 3.')).not.toBeNull();
  });

  it('should render card 1,2 and 3 urls', async () => {
    const link1 = screen.getByRole('link', { name: /Energy Diversification Act 1/i });
    expect(link1.getAttribute('href')).toBe('https://www.google.com');
    const link2 = screen.getByRole('link', { name: /Energy Diversification Act 2/i });
    expect(link2.getAttribute('href')).toBe('https://www.facebook.com');
    const link3 = screen.getByRole('link', { name: /Energy Diversification Act 3/i });
    expect(link3.getAttribute('href')).toBe('https://www.microsoft.com');
  });
});
