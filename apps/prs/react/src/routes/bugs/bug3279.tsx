import React, { useState } from "react";
import {
  GoabButton,
  GoabContainer,
  GoabDetails,
  GoabLink,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

export function Bug3279Route() {
  const [open, setOpen] = useState(true);

  function onToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div>
      <h1>Bug 3279 - Work Side Menu keyboard navigation</h1>
      <p>
        This shows that keyboard navigation works correctly with various elements in the
        Work Side Menu component.
      </p>

      <GoabWorkSideMenu
        heading="Bug 3279"
        url="#"
        userName="Jane Doe"
        userSecondaryText="jane.doe@gov.ab.ca"
        open={open}
        onToggle={onToggle}
        primaryContent={
          <>
            <GoabWorkSideMenuItem url="#primary-1" label="Primary item 1" icon="home" />
            <GoabWorkSideMenuItem
              url="#primary-2"
              label="Primary item 2"
              badge="2"
              icon="bookmark"
            />
            <GoabWorkSideMenuGroup heading="Primary group" icon="folder">
              <GoabWorkSideMenuItem
                url="#primary-group-1"
                label="Grouped item 1"
                icon="document"
              />
              <GoabWorkSideMenuItem
                url="#primary-group-2"
                label="Grouped item 2"
                icon="document-text"
              />
            </GoabWorkSideMenuGroup>
            <GoabWorkSideMenuItem url="#primary-3" label="Primary item 3" icon="list" />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <GoabContainer type="non-interactive" padding="compact">
                <GoabButton
                  type="primary"
                  width="100%"
                  onClick={() => alert("Action button in primary content clicked")}
                >
                  Action
                </GoabButton>
              </GoabContainer>
              <GoabLink>
                <a href="#testthis">Link</a>
              </GoabLink>
              <GoabDetails heading="Details">
                <p>This is some details content inside the primary content area.</p>
              </GoabDetails>
            </div>
          </>
        }
        secondaryContent={
          <>
            <GoabWorkSideMenuItem
              url="#secondary-1"
              label="Secondary item 1"
              icon="analytics"
            />
            <GoabWorkSideMenuItem
              url="#secondary-2"
              label="Secondary item 2"
              icon="settings"
            />
          </>
        }
        accountContent={
          <>
            <GoabWorkSideMenuItem url="#account" label="Account" icon="person" />
            <GoabWorkSideMenuItem
              url="#signout"
              label="Sign out"
              type="emergency"
              icon="log-out"
            />
            <GoabWorkSideMenuItem url="#item1" label="item1" icon="person" />
            <GoabWorkSideMenuItem url="#item2" label="item2" icon="person" />
            <GoabWorkSideMenuItem url="#item3" label="item3" icon="person" />
            <GoabWorkSideMenuItem url="#item4" label="item4" icon="person" />
          </>
        }
      />
    </div>
  );
}
