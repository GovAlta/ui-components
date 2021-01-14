import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import GoANotification from './notification-banner.vue';

describe('Notification', () => {
  const notificationTitle = 'Test Title';
  const notificationClassName = 'goa-notification';
  const notificationCloseXClassName = 'close';
  const notificationEmergencyClassName = 'goa--emergency';
  const notificationEventClassName = 'goa--even';
  const notificationInformationClassName = 'goa--information';
  const notificationImportantClassName = 'goa--important';

  const message = 'Information to the user goes in the content';

  it('should render successfully and there should be a notification class', () => {
    const { baseElement } = render(GoANotification, {
      props: {
        type: 'information',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    expect(baseElement).toBeTruthy();

    const header = screen.getByRole('notification');
    expect(header.className).toContain(notificationClassName);
  });

  it('should render content message', () => {
    render(GoANotification, {
      props: {
        type: 'information',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    expect(screen.getByText(notificationTitle));
  });

  test('should have link if set', async () => {
    render(GoANotification, {
      props: {
        type: 'information',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    expect(screen.getByRole('url'));
    expect(screen.getByText(message));
  });

  test('there should be a close x at the top right', () => {
    render(GoANotification, {
      props: {
        type: 'information',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    const closeBox = screen.getByRole('closeBox');
    expect(closeBox.className).toContain(notificationCloseXClassName);
  });

  test('emergency is selected', () => {
    render(GoANotification, {
      props: {
        type: 'emergency',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    const notifications = document.getElementsByClassName('goa-notification');
    expect(notifications.length).toBe(1);
    expect(notifications[0].className).toContain(
      notificationEmergencyClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationEventClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationImportantClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationInformationClassName
    );
  });

  test('event is selected', () => {
    render(GoANotification, {
      props: {
        type: 'event',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    const notifications = document.getElementsByClassName('goa-notification');
    expect(notifications.length).toBe(1);
    expect(notifications[0].className).not.toContain(
      notificationEmergencyClassName
    );
    expect(notifications[0].className).toContain(notificationEventClassName);
    expect(notifications[0].className).not.toContain(
      notificationImportantClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationInformationClassName
    );
  });

  test('information is selected', () => {
    render(GoANotification, {
      props: {
        type: 'information',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    const notifications = document.getElementsByClassName('goa-notification');
    expect(notifications.length).toBe(1);
    expect(notifications[0].className).not.toContain(
      notificationEmergencyClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationEventClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationImportantClassName
    );
    expect(notifications[0].className).toContain(
      notificationInformationClassName
    );
  });

  test('important is selected', () => {
    render(GoANotification, {
      props: {
        type: 'important',
        message: message,
        isDismissable: true,
        notificationUrl: '#',
        title: notificationTitle,
      },
    });

    const notifications = document.getElementsByClassName('goa-notification');
    expect(notifications.length).toBe(1);
    expect(notifications[0].className).not.toContain(
      notificationEmergencyClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationEventClassName
    );
    expect(notifications[0].className).toContain(
      notificationImportantClassName
    );
    expect(notifications[0].className).not.toContain(
      notificationInformationClassName
    );
  });
});
