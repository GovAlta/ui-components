import { GoANotification } from "@abgov/react-components";

export default function NotificationBanner() {
  return (
    <>
      <h1>Notification Banner</h1>

      <h2>Information</h2>
      <GoANotification type="information">
        Lorem ipsum dolor{" "}
        <a href="https://example.com">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </a>{" "}
        Lorem ipsum dolor
      </GoANotification>
      <h2>Important</h2>
      <GoANotification type="important">
        <a href="https://example.com">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </a>
      </GoANotification>
      <h2>Emergency</h2>
      <GoANotification type="emergency">
        <a href="https://example.com">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </a>
      </GoANotification>
      <h2>Event</h2>
      <GoANotification type="event">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </GoANotification>
    </>
  );
}
