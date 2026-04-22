import {
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
} from "@abgov/react-components";

export function DocsSideMenuRoute() {
  return (
    <div>
      <h2>Side menu</h2>

      <h3>Basic side menu</h3>
      <div style={{ width: "200px" }}>
        <GoabSideMenu>
          <a href="/overview">Overview</a>
          <a href="/details">Details</a>
          <a href="/settings">Settings</a>
        </GoabSideMenu>
      </div>

      <h3>With sections</h3>
      <div style={{ width: "200px" }}>
        <GoabSideMenu>
          <GoabSideMenuHeading>Main</GoabSideMenuHeading>
          <a href="/dashboard">Dashboard</a>
          <a href="/reports">Reports</a>
          <GoabSideMenuHeading>Settings</GoabSideMenuHeading>
          <a href="/profile">Profile</a>
          <a href="/preferences">Preferences</a>
        </GoabSideMenu>
      </div>

      <h3>With groups</h3>
      <div style={{ width: "200px" }}>
        <GoabSideMenu>
          <GoabSideMenuGroup heading="Applications">
            <a href="/apps/active">Active</a>
            <a href="/apps/pending">Pending</a>
            <a href="/apps/archived">Archived</a>
          </GoabSideMenuGroup>
          <GoabSideMenuGroup heading="Reports">
            <a href="/reports/monthly">Monthly</a>
            <a href="/reports/annual">Annual</a>
          </GoabSideMenuGroup>
        </GoabSideMenu>
      </div>
    </div>
  );
}
