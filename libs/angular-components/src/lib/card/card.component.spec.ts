import { render, screen, fireEvent } from '@testing-library/angular';
import { GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent } from './card.component';

describe('GoACard', () => {
  const thumbAlt = 'thumb alt';
  const thumbUrl = 'thumb url';
  const headerContent = 'header content';
  const content = 'content';

  const thirdClassName = 'goa--tertiary';
  const halfClassName = 'goa--secondary';
  const autoClassName = 'card-auto';

  test('should render header', async () => {
    await render(GoACardComponent, {
      template: `<goa-card>
                  <goa-card-thumb-image url="${thumbUrl}" alt="${thumbAlt}"></goa-card-thumb-image>
                  <goa-card-header>${headerContent}</goa-card-header>
                  <goa-card-content>${content}</goa-card-content>
                </goa-card>`,
      declarations: [GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent]
    });

    expect(screen.getByText(headerContent)).not.toBeNull();
  });

  test('should render content', async () => {
    await render(GoACardComponent, {
      template: `<goa-card>
                  <goa-card-thumb-image url="${thumbUrl}" alt="${thumbAlt}"></goa-card-thumb-image>
                  <goa-card-header>${headerContent}</goa-card-header>
                  <goa-card-content>${content}</goa-card-content>
                </goa-card>`,
      declarations: [GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent]
    });

    expect(screen.getByText(content)).not.toBeNull();
  });

  test('should render thumb', async () => {
    await render(GoACardComponent, {
      template: `<goa-card>
                  <goa-card-thumb-image url="${thumbUrl}" alt="${thumbAlt}"></goa-card-thumb-image>
                  <goa-card-header>${headerContent}</goa-card-header>
                  <goa-card-content>${content}</goa-card-content>
                </goa-card>`,
      declarations: [GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent]
    });

    expect(screen.getAllByAltText(thumbAlt)).not.toBeNull();
  });

  test('cardSize default should size full', async () => {
    await render(GoACardComponent, {
      template: `<goa-card>
                  <goa-card-thumb-image url="${thumbUrl}" alt="${thumbAlt}"></goa-card-thumb-image>
                  <goa-card-header>${headerContent}</goa-card-header>
                  <goa-card-content>${content}</goa-card-content>
                </goa-card>`,
      declarations: [GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent]
    });

    const card = document.getElementsByClassName('goa-card')[0];
    //cant test actual widths in jsdom
    expect(card.classList).not.toContain(thirdClassName);
    expect(card.classList).not.toContain(halfClassName);
    expect(card.classList).not.toContain(autoClassName);
  });

  test('cardSize full should size full', async () => {
    await render(GoACardComponent, {
      template: `<goa-card cardSize="full">
                  <goa-card-thumb-image url="${thumbUrl}" alt="${thumbAlt}"></goa-card-thumb-image>
                  <goa-card-header>${headerContent}</goa-card-header>
                  <goa-card-content>${content}</goa-card-content>
                </goa-card>`,
      declarations: [GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent]
    });

    const card = document.getElementsByClassName('goa-card')[0];
    //cant test actual widths in jsdom
    expect(card.classList).not.toContain(thirdClassName);
    expect(card.classList).not.toContain(halfClassName);
    expect(card.classList).not.toContain(autoClassName);
  });
  
  test('cardSize auto should size auto', async () => {
    await render(GoACardComponent, {
      template: `<goa-card cardSize="auto">
                  <goa-card-thumb-image url="${thumbUrl}" alt="${thumbAlt}"></goa-card-thumb-image>
                  <goa-card-header>${headerContent}</goa-card-header>
                  <goa-card-content>${content}</goa-card-content>
                </goa-card>`,
      declarations: [GoACardComponent, GoACardHeaderComponent, GoACardContentComponent, GoACardThumbImageComponent]
    });

    const card = document.getElementsByClassName('goa-card')[0];
    //cant test actual widths in jsdom
    expect(card.classList).not.toContain(thirdClassName);
    expect(card.classList).not.toContain(halfClassName);
    expect(card.classList).toContain(autoClassName);
  });
});


