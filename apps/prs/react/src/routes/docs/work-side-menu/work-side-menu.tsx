import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/react-components";

export function DocsWorkSideMenuRoute() {
  function navigate(path: string) {
    console.log("navigate", path);
  }

  function handleMarkAllRead() {
    console.log("mark all read");
  }

  function handleViewAll() {
    console.log("view all");
  }

  function handleClick(id: string) {
    console.log("click", id);
  }

  return (
    <div>
      <h2>Work side menu</h2>

      <h3>Basic work side menu</h3>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
            <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
            <GoabWorkSideMenuItem icon="document" label="Reports" url="/reports" />
            <GoabWorkSideMenuItem icon="settings" label="Admin" url="/admin" />
          </>
        }
      />

      <h3>With user profile</h3>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        userName="Jane Smith"
        userSecondaryText="Case Worker"
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
            <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
          </>
        }
      />

      <h3>With groups</h3>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        open={true}
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
            <GoabWorkSideMenuGroup icon="document" heading="Documents" open={true}>
              <GoabWorkSideMenuItem label="Invoices" url="/documents/invoices" />
              <GoabWorkSideMenuItem label="Contracts" url="/documents/contracts" />
              <GoabWorkSideMenuItem label="Reports" url="/documents/reports" />
            </GoabWorkSideMenuGroup>
            <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
          </>
        }
      />

      <h3>Secondary menu</h3>
      <GoabWorkSideMenu
        heading="Case Management"
        url="/cases"
        open={true}
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="arrow-back" label="All cases" url="/cases" />
            <GoabWorkSideMenuItem label="Overview" url="/cases/123/overview" />
            <GoabWorkSideMenuItem label="Documents" url="/cases/123/documents" />
            <GoabWorkSideMenuItem label="Notes" url="/cases/123/notes" />
            <GoabWorkSideMenuItem label="Activity log" url="/cases/123/activity" />
            <GoabWorkSideMenuItem label="Payments" url="/cases/123/payments" />
          </>
        }
      />

      <h3>With notifications</h3>
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
          <>
            <GoabWorkSideMenuItem
              icon="notifications"
              label="Notifications"
              badge="3"
              type="success"
              popoverContent={
                <GoabWorkSideNotificationPanel
                  heading="Notifications"
                  activeTab="unread"
                  onMarkAllRead={() => handleMarkAllRead()}
                  onViewAll={() => handleViewAll()}
                >
                  <GoabWorkSideNotificationItem
                    title="New case assigned"
                    description="Case #12345 has been assigned to you."
                    timestamp="2025-02-09T10:30:00Z"
                    type="info"
                    readStatus="unread"
                    priority="normal"
                    onClick={() => handleClick("1")}
                  />
                  <GoabWorkSideNotificationItem
                    title="System maintenance"
                    description="Scheduled maintenance tonight at 11 PM."
                    timestamp="2025-02-09T09:00:00Z"
                    type="critical"
                    readStatus="unread"
                    priority="urgent"
                    onClick={() => handleClick("2")}
                  />
                </GoabWorkSideNotificationPanel>
              }
            />
          </>
        }
      />
    </div>
  );
}
