import { GoANotification } from "@abgov/react-components";

export default function NotificationBanner() {
  function onDismiss() {
    console.log("dismissed");
  }

  return (
    <>
      <h1>Notification Banner</h1>

      <h2>Information</h2>
      <GoANotification type="information" onDismiss={() => onDismiss()}>
        Lorem ipsum dolor{" "}
        <a href="https://example.com">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </a>{" "}
        Lorem ipsum dolor
      </GoANotification>
      <h2>Important</h2>
      <GoANotification type="important" onDismiss={() => onDismiss()}>
        <a href="https://example.com">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </a>
      </GoANotification>
      <h2>Emergency</h2>
      <GoANotification type="emergency" onDismiss={() => onDismiss()}>
        <a href="https://example.com">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </a>
      </GoANotification>
      <h2>Event</h2>
      <GoANotification type="event" onDismiss={() => onDismiss()}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </GoANotification>
    </>
  );
}
