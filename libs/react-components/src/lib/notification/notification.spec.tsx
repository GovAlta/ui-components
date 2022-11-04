import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import GoANotification from "./notification";

describe.skip("Notification", () => {
  const notificationTitle = "Test Title";
  const notificationClassName = "goa-notification";
  const notificationCloseXClassName = "close";
  const notificationEmergencyClassName = "goa--emergency";
  const notificationEventClassName = "goa--even";
  const notificationInformationClassName = "goa--information";
  const notificationImportantClassName = "goa--important";

  const message = "Information to the user goes in the content";

  it("should render successfully and there should be a notification class", () => {
    const { baseElement } = render(
      <GoANotification
        type="information"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Hidden Title"
      />
    );
    expect(baseElement).toBeTruthy();

    const header = screen.getByRole("notification");
    expect(header.className).toContain(notificationClassName);
  });

  it("should render content message", () => {
    const { baseElement } = render(
      <GoANotification
        type="information"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    expect(screen.getByText(notificationTitle));
  });

  test("should have link if set", async () => {
    const { baseElement } = render(
      <GoANotification
        type="information"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    expect(screen.getByRole("url"));
    expect(screen.getByText(message));
  });

  test("there should be a close x at the top right", () => {
    render(
      <GoANotification
        type="information"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    const closeBox = screen.getByRole("closeBox");
    expect(closeBox.className).toContain(notificationCloseXClassName);
  });

  test("clicking the close x should hide everything", () => {
    const onClickStub = jest.fn();
    render(
      <GoANotification
        type="information"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
        onDismiss={onClickStub}
      />
    );

    const closeBox = screen.getByRole("closeBox");

    userEvent.click(closeBox);
    const goaNotification = document.getElementsByClassName("goa-notification");
    expect(goaNotification.length).toBe(0);
    const goaNotifications =
      document.getElementsByClassName("goa-notifications");
    expect(goaNotifications.length).toBe(0);
  });

  test("emergency is selected", () => {
    render(
      <GoANotification
        type="emergency"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    const notifications = document.getElementsByClassName("goa-notification");
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

  test("event is selected", () => {
    render(
      <GoANotification
        type="event"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    const notifications = document.getElementsByClassName("goa-notification");
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

  test("information is selected", () => {
    render(
      <GoANotification
        type="information"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    const notifications = document.getElementsByClassName("goa-notification");
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

  test("important is selected", () => {
    render(
      <GoANotification
        type="important"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
      />
    );

    const notifications = document.getElementsByClassName("goa-notification");
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

  test("onDismiss is triggered", () => {
    const onClickStub = jest.fn();
    render(
      <GoANotification
        type="important"
        message={message}
        isDismissable={true}
        notificationUrl="#"
        title="Test Title"
        onDismiss={onClickStub}
      />
    );

    const closex = screen.getByRole("closeBox");
    userEvent.click(closex);
    expect(onClickStub).toHaveBeenCalled();
  });
});
