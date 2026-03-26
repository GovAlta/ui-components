import React, { useState } from "react";
import {
  GoabButton,
  GoabContainer,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

export function Feat3137Route() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
        <GoabWorkSideMenu
          heading="My Application"
          url="/"
          userName="John Doe"
          userSecondaryText="john.doe@example.com"
          open={isMenuOpen}
          onToggle={toggleMenu}
          primaryContent={
            <>
              {/* Dashboard Group */}
              <GoabWorkSideMenuGroup heading="Dashboard" icon="apps">
                <GoabWorkSideMenuItem
                  label="Overview"
                  url="/dashboard/overview"
                  current={true}
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Analytics"
                  url="/dashboard/analytics"
                  icon="star"
                  badge="3"
                />
                <GoabWorkSideMenuItem
                  label="Reports"
                  url="/dashboard/reports"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>

              {/* Projects Group */}
              <GoabWorkSideMenuGroup heading="Projects" icon="folder">
                <GoabWorkSideMenuItem
                  label="Active Projects"
                  url="/projects/active"
                  icon="star"
                  badge="12"
                />
                <GoabWorkSideMenuItem
                  label="Archived Projects"
                  url="/projects/archived"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Templates"
                  url="/projects/templates"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Create New Project"
                  url="/projects/new"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>

              {/* Team Group */}
              <GoabWorkSideMenuGroup heading="People" icon="people">
                <GoabWorkSideMenuItem
                  label="Team Members"
                  url="/team/members"
                  icon="person"
                  badge="24"
                />
                <GoabWorkSideMenuItem
                  label="Departments"
                  url="/team/departments"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Permissions"
                  url="/team/permissions"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Activity Log"
                  url="/team/activity"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>

              {/* Documents Group */}
              <GoabWorkSideMenuGroup heading="Documents" icon="document">
                <GoabWorkSideMenuItem
                  label="All Documents"
                  url="/documents/all"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Recent"
                  url="/documents/recent"
                  icon="star"
                  badge="5"
                />
                <GoabWorkSideMenuItem
                  label="Shared with Me"
                  url="/documents/shared"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Favorites"
                  url="/documents/favorites"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Trash"
                  url="/documents/trash"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>

              {/* Communication Group */}
              <GoabWorkSideMenuGroup heading="Communication" icon="chatbubbles">
                <GoabWorkSideMenuItem
                  label="Messages"
                  url="/communication/messages"
                  icon="star"
                  badge="8"
                />
                <GoabWorkSideMenuItem
                  label="Notifications"
                  url="/communication/notifications"
                  icon="star"
                  badge="15"
                />
                <GoabWorkSideMenuItem
                  label="Announcements"
                  url="/communication/announcements"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>
            </>
          }
          secondaryContent={
            <>
              {/* Tools Group */}
              <GoabWorkSideMenuGroup heading="Tools" icon="build">
                <GoabWorkSideMenuItem
                  label="Calendar"
                  url="/tools/calendar"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Task Manager"
                  url="/tools/tasks"
                  icon="star"
                  badge="7"
                />
                <GoabWorkSideMenuItem
                  label="Time Tracking"
                  url="/tools/time"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>

              {/* Resources Group */}
              <GoabWorkSideMenuGroup heading="Resources" icon="book">
                <GoabWorkSideMenuItem
                  label="Documentation"
                  url="/resources/docs"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Training"
                  url="/resources/training"
                  icon="star"
                />
                <GoabWorkSideMenuItem
                  label="Help Center"
                  url="/resources/help"
                  icon="star"
                />
              </GoabWorkSideMenuGroup>
            </>
          }
          accountContent={
            <>
              {/* Account Group */}
              <GoabWorkSideMenuGroup heading="Account" icon="person-circle">
                <GoabWorkSideMenuItem
                  label="Profile Settings"
                  url="/account/profile"
                  icon="person"
                />
                <GoabWorkSideMenuItem
                  label="Preferences"
                  url="/account/preferences"
                  icon="settings"
                />
                <GoabWorkSideMenuItem
                  label="Security"
                  url="/account/security"
                  icon="lock-closed"
                />
                <GoabWorkSideMenuItem
                  label="Billing"
                  url="/account/billing"
                  icon="card"
                />
                <GoabWorkSideMenuItem
                  label="Log Out"
                  url="/logout"
                  icon="log-out"
                />
              </GoabWorkSideMenuGroup>
            </>
          }
        />
      </GoabContainer>
    </div>
  );
}
