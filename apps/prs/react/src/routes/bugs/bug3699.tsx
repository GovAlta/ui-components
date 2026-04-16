import {
 GoabWorkSideMenu,
 GoabWorkSideMenuItem,
 GoabWorkSideNotificationPanel,
 GoabWorkSideNotificationItem
} from "@abgov/react-components";

export function Bug3699Route() {
  return (
     <div>
      <h1>3699 - Notification Popover rounded corners</h1>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
            <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
          </>
        }
        secondaryContent={
          <GoabWorkSideMenuItem
            icon="notifications"
            label="Notifications"
            badge="3"
            type="success"
            popoverContent={
              <GoabWorkSideNotificationPanel
                heading="Notifications"
                activeTab="unread"
              >
                <GoabWorkSideNotificationItem
                  title="New case assigned"
                  description="Case #12345 has been assigned to you."
                  timestamp="2025-02-09T10:30:00Z"
                  type="info"
                  readStatus="unread"
                  priority="normal"
                />
                <GoabWorkSideNotificationItem
                  title="System maintenance"
                  description="Scheduled maintenance tonight at 11 PM."
                  timestamp="2025-02-09T09:00:00Z"
                  type="critical"
                  readStatus="unread"
                  priority="urgent"
                />
              </GoabWorkSideNotificationPanel>
            }
          />
        }
      />
    </div>
  );
}
