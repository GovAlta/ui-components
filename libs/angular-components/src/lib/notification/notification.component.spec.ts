import { render, screen, fireEvent } from '@testing-library/angular';
import { GoANotificationComponent } from './notification.component';

describe('GoA Callout', () => {
  const message = 'my message';

  const emergencyClass = 'goa--emergency';
  const eventClass = 'goa--event';
  const importantClass = 'goa--important';

  test('should render content', async () => {
    await render(GoANotificationComponent, {
      template: `<goa-notification message='${message}' type='information'>${message}</goa-notification>`,
    });

    expect(screen.getByText(message));
  });

  test('should have link if set', async () => {
    await render(GoANotificationComponent, {
      template: `<goa-notification message='${message}' notificationUrl='#' type='information'>${message}</goa-notification>`,
    });

    expect(screen.getByRole('link'));
    expect(screen.getByText(message));
  });

  test('information styling', async () => {
    await render(GoANotificationComponent, {
      template: `<goa-notification message='${message}' type='information'>${message}</goa-notification>`,
    });

    const calloutElements = document.getElementsByClassName('goa-notification');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).not.toContain(emergencyClass);
    expect(calloutElements[0].className).not.toContain(eventClass);
    expect(calloutElements[0].className).not.toContain(importantClass);
  });

  test('event styling', async () => {
    await render(GoANotificationComponent, {
      template: `<goa-notification message='${message}' type='event'>${message}</goa-notification>`,
    });

    const calloutElements = document.getElementsByClassName('goa-notification');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).not.toContain(emergencyClass);
    expect(calloutElements[0].className).toContain(eventClass);
    expect(calloutElements[0].className).not.toContain(importantClass);
  });

  test('important styling', async () => {
    await render(GoANotificationComponent, {
      template: `<goa-notification message='${message}' type='important'>${message}</goa-notification>`,
    });

    const calloutElements = document.getElementsByClassName('goa-notification');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).not.toContain(emergencyClass);
    expect(calloutElements[0].className).not.toContain(eventClass);
    expect(calloutElements[0].className).toContain(importantClass);
  });

  test('emergency styling', async () => {
    await render(GoANotificationComponent, {
      template: `<goa-notification message='${message}' type='emergency'>${message}</goa-notification>`,
    });

    const calloutElements = document.getElementsByClassName('goa-notification');
    expect(calloutElements.length).toBe(1);
    expect(calloutElements[0].className).toContain(emergencyClass);
    expect(calloutElements[0].className).not.toContain(eventClass);
    expect(calloutElements[0].className).not.toContain(importantClass);
  });
});
