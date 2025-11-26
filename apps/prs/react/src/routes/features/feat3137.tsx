import React, { useState } from "react";
import {
  GoabButton,
  GoabText,
  GoabContainer,
} from "@abgov/react-components";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";

export function Feat3137Route() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--goa-spacing-xl)",
      }}
    >
      <h1>Feature 3137: Work Side Menu Group</h1>

      <GoabText as="p" size="body-m">
        This demonstrates the Work Side Menu Group component with some child items.
      </GoabText>

      <GoabButton type="primary" onClick={toggleMenu}>
        {isMenuOpen ? "Close Side Menu" : "Open Side Menu"}
      </GoabButton>

      <br />

      <GoabContainer>
        <GoabxWorkSideMenu
          heading="My Application"
          url="/"
          userName="John Doe"
          userSecondaryText="john.doe@example.com"
          open={isMenuOpen}
          onToggle={toggleMenu}
          primaryContent={
            <>
              {/* Dashboard Group */}
              <GoabxWorkSideMenuGroup heading="Dashboard" icon="apps">
                <GoabxWorkSideMenuItem
                  label="Overview"
                  url="/dashboard/overview"
                  current={true}
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Analytics"
                  url="/dashboard/analytics"
                  icon="star"
                  badge="3"
                />
                <GoabxWorkSideMenuItem
                  label="Reports"
                  url="/dashboard/reports"
                  icon="star"
                />
              </GoabxWorkSideMenuGroup>

              {/* Projects Group */}
              <GoabxWorkSideMenuGroup heading="Projects" icon="folder">
                <GoabxWorkSideMenuItem
                  label="Active Projects"
                  url="/projects/active"
                  icon="star"
                  badge="12"
                />
                <GoabxWorkSideMenuItem
                  label="Archived Projects"
                  url="/projects/archived"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Templates"
                  url="/projects/templates"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Create New Project"
                  url="/projects/new"
                  icon="star"
                  divider={true}
                />
              </GoabxWorkSideMenuGroup>

              {/* Team Group */}
              <GoabxWorkSideMenuGroup heading="People" icon="people">
                <GoabxWorkSideMenuItem
                  label="Team Members"
                  url="/team/members"
                  icon="person"
                  badge="24"
                />
                <GoabxWorkSideMenuItem
                  label="Departments"
                  url="/team/departments"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Permissions"
                  url="/team/permissions"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Activity Log"
                  url="/team/activity"
                  icon="star"
                />
              </GoabxWorkSideMenuGroup>

              {/* Documents Group */}
              <GoabxWorkSideMenuGroup heading="Documents" icon="document">
                <GoabxWorkSideMenuItem
                  label="All Documents"
                  url="/documents/all"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Recent"
                  url="/documents/recent"
                  icon="star"
                  badge="5"
                />
                <GoabxWorkSideMenuItem
                  label="Shared with Me"
                  url="/documents/shared"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Favorites"
                  url="/documents/favorites"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Trash"
                  url="/documents/trash"
                  icon="star"
                  divider={true}
                />
              </GoabxWorkSideMenuGroup>

              {/* Communication Group */}
              <GoabxWorkSideMenuGroup heading="Communication" icon="chatbubbles">
                <GoabxWorkSideMenuItem
                  label="Messages"
                  url="/communication/messages"
                  icon="star"
                  badge="8"
                />
                <GoabxWorkSideMenuItem
                  label="Notifications"
                  url="/communication/notifications"
                  icon="star"
                  badge="15"
                />
                <GoabxWorkSideMenuItem
                  label="Announcements"
                  url="/communication/announcements"
                  icon="star"
                />
              </GoabxWorkSideMenuGroup>
            </>
          }
          secondaryContent={
            <>
              {/* Tools Group */}
              <GoabxWorkSideMenuGroup heading="Tools" icon="build">
                <GoabxWorkSideMenuItem
                  label="Calendar"
                  url="/tools/calendar"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Task Manager"
                  url="/tools/tasks"
                  icon="star"
                  badge="7"
                />
                <GoabxWorkSideMenuItem
                  label="Time Tracking"
                  url="/tools/time"
                  icon="star"
                />
              </GoabxWorkSideMenuGroup>

              {/* Resources Group */}
              <GoabxWorkSideMenuGroup heading="Resources" icon="book">
                <GoabxWorkSideMenuItem
                  label="Documentation"
                  url="/resources/docs"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Training"
                  url="/resources/training"
                  icon="star"
                />
                <GoabxWorkSideMenuItem
                  label="Help Center"
                  url="/resources/help"
                  icon="star"
                />
              </GoabxWorkSideMenuGroup>
            </>
          }
          accountContent={
            <>
              {/* Account Group */}
              <GoabxWorkSideMenuGroup heading="Account" icon="person-circle">
                <GoabxWorkSideMenuItem
                  label="Profile Settings"
                  url="/account/profile"
                  icon="person"
                />
                <GoabxWorkSideMenuItem
                  label="Preferences"
                  url="/account/preferences"
                  icon="settings"
                />
                <GoabxWorkSideMenuItem
                  label="Security"
                  url="/account/security"
                  icon="lock-closed"
                />
                <GoabxWorkSideMenuItem
                  label="Billing"
                  url="/account/billing"
                  icon="card"
                  divider={true}
                />
                <GoabxWorkSideMenuItem
                  label="Log Out"
                  url="/logout"
                  icon="log-out"
                />
              </GoabxWorkSideMenuGroup>
            </>
          }
        />
      </GoabContainer>
    </div>
  );
}
