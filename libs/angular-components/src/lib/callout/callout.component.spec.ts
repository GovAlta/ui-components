import { render, screen, fireEvent } from '@testing-library/angular';
import { GoACalloutComponent } from './callout.component';

describe('GoA Callout', () => {
  const title = 'Test Title';
  const message = 'my message';

  const emergencyClass = 'goa--emergency';
  const eventClass = 'goa--event';
  const importantClass = 'goa--important';

  test('should render content', async () => {
    await render(GoACalloutComponent, {
      template: `<goa-callout title='${title}' type='information'>${message}</goa-callout>`,
    });

    expect(screen.getByText(message));
  });

  test('should render title', async () => {
    await render(GoACalloutComponent, {
      template: `<goa-callout title='${title}' type='information'>${message}</goa-callout>`,
    });

    expect(screen.getByText(title));
  });

  test('information styling', async () => {
    await render(GoACalloutComponent, {
      template: `<goa-callout title='${title}' type='information'>${message}</goa-callout>`,
    });

    const calloutElements = document.getElementsByClassName('goa-callout');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).not.toContain(emergencyClass);
    expect(calloutElements[0].className).not.toContain(eventClass);
    expect(calloutElements[0].className).not.toContain(importantClass);
  });

  test('event styling', async () => {
    await render(GoACalloutComponent, {
      template: `<goa-callout title='${title}' type='event'>${message}</goa-callout>`,
    });

    const calloutElements = document.getElementsByClassName('goa-callout');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).not.toContain(emergencyClass);
    expect(calloutElements[0].className).toContain(eventClass);
    expect(calloutElements[0].className).not.toContain(importantClass);
  });

  test('important styling', async () => {
    await render(GoACalloutComponent, {
      template: `<goa-callout title='${title}' type='important'>${message}</goa-callout>`,
    });

    const calloutElements = document.getElementsByClassName('goa-callout');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).not.toContain(emergencyClass);
    expect(calloutElements[0].className).not.toContain(eventClass);
    expect(calloutElements[0].className).toContain(importantClass);
  });

  test('emergency styling', async () => {
    await render(GoACalloutComponent, {
      template: `<goa-callout title='${title}' type='emergency'>${message}</goa-callout>`,
    });

    const calloutElements = document.getElementsByClassName('goa-callout');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).toContain(emergencyClass);
    expect(calloutElements[0].className).not.toContain(eventClass);
    expect(calloutElements[0].className).not.toContain(importantClass);
  });
});
