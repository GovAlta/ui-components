import {
  GoabText,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/react-components";

export function Bug4251Route() {
  return (
    <main>
      <GoabText tag="h1" mt="none" mb="m">
        Bug #4251: Notification panel dark mode
      </GoabText>
      <GoabText tag="p" mb="s">
        <a href="https://github.com/GovAlta/ui-components/issues/4251">
          View issue #4251
        </a>
      </GoabText>
      <GoabText tag="p" mb="s">
        Switch to dark mode with the theme toggle in the side menu. Unread notifications
        should sit on a dark surface, not a white card. Select the All tab to check that
        read notifications look the same as before.
      </GoabText>
      <GoabText tag="p" mb="m">
        Hover the urgent notification in both themes. Its hover colour comes from a design
        token, so it follows the theme.
      </GoabText>

      <div style={{ maxWidth: "500px" }}>
        <GoabWorkSideNotificationPanel heading="Notifications">
          <GoabWorkSideNotificationItem
            title="New case assigned"
            description="Case #12345 has been assigned to you for review."
            timestamp="2025-03-15T10:30:00Z"
            type="info"
            readStatus="unread"
            priority="normal"
            testId="bug4251-unread"
          />
          <GoabWorkSideNotificationItem
            title="Deadline approaching"
            description="Case #12345 response is due in 2 hours."
            timestamp="2025-03-15T09:00:00Z"
            type="warning"
            readStatus="unread"
            priority="urgent"
            testId="bug4251-unread-urgent"
          />
          <GoabWorkSideNotificationItem
            title="Case resolved"
            description="Case #12330 has been marked as resolved."
            timestamp="2025-03-14T16:00:00Z"
            type="success"
            readStatus="read"
            priority="normal"
            testId="bug4251-read"
          />
          <GoabWorkSideNotificationItem
            title="System maintenance"
            description="Scheduled maintenance tonight at 11 PM."
            timestamp="2025-03-14T14:00:00Z"
            type="critical"
            readStatus="read"
            priority="urgent"
            testId="bug4251-read-urgent"
          />
        </GoabWorkSideNotificationPanel>
      </div>
    </main>
  );
}

export default Bug4251Route;
