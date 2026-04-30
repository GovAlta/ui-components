import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

export function Bug3548Route() {
  const [open, setOpen] = useState(true);

  function onToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div style={{ display: "flex" }}>
      <GoabWorkSideMenu
        heading="Bug 3548"
        url="#"
        userName="Jane Doe"
        userSecondaryText="jane.doe@gov.ab.ca"
        open={open}
        onToggle={onToggle}
        primaryContent={
          <>
            <GoabWorkSideMenuItem url="#dashboard" label="Dashboard" icon="home" />
            <GoabWorkSideMenuItem url="#inbox" label="Inbox" icon="mail" badge="12" />
            <GoabWorkSideMenuGroup heading="Applications" icon="folder">
              <GoabWorkSideMenuItem
                url="#app-1"
                label="New applications"
                icon="document"
              />
              <GoabWorkSideMenuItem url="#app-2" label="In progress" icon="time" />
              <GoabWorkSideMenuItem url="#app-3" label="Under review" icon="eye" />
              <GoabWorkSideMenuItem
                url="#app-4"
                label="Approved"
                icon="checkmark-circle"
              />
              <GoabWorkSideMenuItem url="#app-5" label="Denied" icon="close-circle" />
            </GoabWorkSideMenuGroup>
            <GoabWorkSideMenuGroup heading="Reports" icon="bar-chart">
              <GoabWorkSideMenuItem
                url="#report-1"
                label="Monthly summary"
                icon="document-text"
              />
              <GoabWorkSideMenuItem
                url="#report-2"
                label="Quarterly audit"
                icon="document-text"
              />
              <GoabWorkSideMenuItem
                url="#report-3"
                label="Annual review"
                icon="document-text"
              />
            </GoabWorkSideMenuGroup>
            <GoabWorkSideMenuItem url="#users" label="User management" icon="people" />
            <GoabWorkSideMenuItem
              url="#permissions"
              label="Permissions"
              icon="lock-closed"
            />
            <GoabWorkSideMenuItem
              url="#notifications"
              label="Notifications"
              icon="notifications"
            />
            <GoabWorkSideMenuItem url="#calendar" label="Calendar" icon="calendar" />
            <GoabWorkSideMenuItem url="#tasks" label="Tasks" icon="list" />
            <GoabWorkSideMenuItem url="#bookmarks" label="Bookmarks" icon="bookmark" />
            <GoabWorkSideMenuItem url="#history" label="History" icon="time" />
            <GoabWorkSideMenuItem url="#archive" label="Archive" icon="archive" />
            <GoabWorkSideMenuItem url="#settings" label="Settings" icon="settings" />
          </>
        }
        secondaryContent={
          <>
            <GoabWorkSideMenuItem url="#search" label="Search" icon="search" />
            <GoabWorkSideMenuItem url="#support" label="Get support" icon="help-circle" />
            <GoabWorkSideMenuItem
              url="#releases"
              label="Release notes"
              icon="information-circle"
            />
          </>
        }
        accountContent={
          <>
            <GoabWorkSideMenuItem url="#profile" label="My profile" icon="person" />
            <GoabWorkSideMenuItem
              url="#signout"
              label="Sign out"
              type="emergency"
              icon="log-out"
            />
          </>
        }
      />
      <div style={{ flex: 1, padding: "2rem" }}>
        <GoabText tag="h1" mt="m">
          Bug #3548: Work Side Menu scroll fix
        </GoabText>

        <GoabBlock>
          <GoabLink trailingIcon="open">
            <a
              href="https://github.com/GovAlta/ui-components/issues/3548"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </GoabLink>

          <GoabDetails heading="Issue Description">
            <GoabText tag="p">
              The secondary menu (Search, Get support, Release notes, Collapse menu)
              should stay pinned at the bottom while only the primary nav area scrolls.
              Currently the entire area below the logo scrolls, including the secondary
              menu items.
            </GoabText>
          </GoabDetails>
        </GoabBlock>

        <GoabDivider mt="l" mb="l" />

        <GoabText tag="h2">Test Cases</GoabText>

        <GoabText tag="h3">Test 1: Primary nav scrolls independently</GoabText>
        <GoabText tag="p">
          The primary nav on the left has enough items to overflow. Scroll the primary nav
          area and verify the secondary menu items (Search, Get support, Release notes)
          and the collapse toggle stay pinned at the bottom.
        </GoabText>

        <GoabText tag="h3">Test 2: Header stays fixed at top</GoabText>
        <GoabText tag="p">
          While scrolling the primary nav, the logo and heading should remain fixed at the
          top. Primary nav items should not scroll behind the header.
        </GoabText>

        <GoabText tag="h3">Test 3: Collapsed menu</GoabText>
        <GoabText tag="p">
          Click the collapse toggle. The menu should collapse to icon-only mode. The
          bottom section should still be visible and pinned.
        </GoabText>

        <GoabText tag="h3">Test 4: Resize viewport</GoabText>
        <GoabText tag="p">
          Resize the browser window height. The scroll area should adapt, and the bottom
          section should always stay visible.
        </GoabText>
      </div>
    </div>
  );
}

export default Bug3548Route;
