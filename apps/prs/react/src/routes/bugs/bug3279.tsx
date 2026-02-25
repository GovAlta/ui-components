import React, { useState } from "react";
import {
  GoabButton,
  GoabContainer,
  GoabDetails,
  GoabLink,
} from "@abgov/react-components";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";

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

      <GoabxWorkSideMenu
        heading="Bug 3279"
        url="#"
        userName="Jane Doe"
        userSecondaryText="jane.doe@gov.ab.ca"
        open={open}
        onToggle={onToggle}
        primaryContent={
          <>
            <GoabxWorkSideMenuItem url="#primary-1" label="Primary item 1" icon="home" />
            <GoabxWorkSideMenuItem
              url="#primary-2"
              label="Primary item 2"
              badge="2"
              icon="bookmark"
            />
            <GoabxWorkSideMenuGroup heading="Primary group" icon="folder">
              <GoabxWorkSideMenuItem
                url="#primary-group-1"
                label="Grouped item 1"
                icon="document"
              />
              <GoabxWorkSideMenuItem
                url="#primary-group-2"
                label="Grouped item 2"
                icon="document-text"
              />
            </GoabxWorkSideMenuGroup>
            <GoabxWorkSideMenuItem url="#primary-3" label="Primary item 3" icon="list" />
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
            <GoabxWorkSideMenuItem
              url="#secondary-1"
              label="Secondary item 1"
              icon="analytics"
            />
            <GoabxWorkSideMenuItem
              url="#secondary-2"
              label="Secondary item 2"
              icon="settings"
            />
          </>
        }
        accountContent={
          <>
            <GoabxWorkSideMenuItem url="#account" label="Account" icon="person" />
            <GoabxWorkSideMenuItem
              url="#signout"
              label="Sign out"
              type="emergency"
              icon="log-out"
            />
            <GoabxWorkSideMenuItem url="#item1" label="item1" icon="person" />
            <GoabxWorkSideMenuItem url="#item2" label="item2" icon="person" />
            <GoabxWorkSideMenuItem url="#item3" label="item3" icon="person" />
            <GoabxWorkSideMenuItem url="#item4" label="item4" icon="person" />
          </>
        }
      />
    </div>
  );
}
