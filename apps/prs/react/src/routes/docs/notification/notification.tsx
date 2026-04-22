import { GoabNotification } from "@abgov/react-components";

export function DocsNotificationRoute() {
  return (
    <div>
      <h2>Notification banner</h2>

      <h3>Information notification</h3>
      <GoabNotification type="information">
        Your application has been received and is being processed.
      </GoabNotification>

      <h3>Notification types</h3>
      <div style={{ marginBottom: "var(--goa-space-m)" }}>
        <GoabNotification type="information">
          Information: General updates for the user.
        </GoabNotification>
      </div>
      <div style={{ marginBottom: "var(--goa-space-m)" }}>
        <GoabNotification type="important">
          Important: Action may be required.
        </GoabNotification>
      </div>
      <GoabNotification type="emergency">
        Emergency: Critical issue requiring attention.
      </GoabNotification>

      <h3>Emphasis levels</h3>
      <div style={{ marginBottom: "var(--goa-space-m)" }}>
        <GoabNotification type="important" emphasis="high">
          High emphasis: Full background for maximum visibility.
        </GoabNotification>
      </div>
      <GoabNotification type="important" emphasis="low">
        Low emphasis: Minimal styling for less prominent messaging.
      </GoabNotification>

      <h3>Compact</h3>
      <div style={{ marginBottom: "var(--goa-space-m)" }}>
        <GoabNotification type="information">
          Standard notification with default padding.
        </GoabNotification>
      </div>
      <GoabNotification type="information" compact>
        Compact notification with reduced padding.
      </GoabNotification>

      <h2>Examples</h2>

      <h3>Notify the user of a future service outage</h3>
      <GoabNotification type="important">
        Our system will be under maintenance from Thursday, September 15, 2025 at 10 pm
        to Friday, September 16, 2025 at 10 am. If you have questions or concerns,
        contact us at <a href="mailto:support@example.com">support@example.com</a>.
      </GoabNotification>
    </div>
  );
}
