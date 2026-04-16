import React, { useState } from "react";
import {
  GoabButton,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

export function Feat3398Route() {
  const [groupOpen, setGroupOpen] = useState(false);

  return (
    <div>
      <GoabText tag="h1">Feature 3398: Work Side Menu Group open prop</GoabText>
      <GoabText>
        Use the button below to toggle the side menu group open and closed.
      </GoabText>

      <GoabText tag="h2">Scenario 1: Open and close a group</GoabText>
      <GoabText>The button should toggle the group open and closed.</GoabText>

      <div style={{ display: "flex", height: "310px", overflow: "hidden" }}>
        <GoabWorkSideMenu
          heading="Design System"
          url="/"
          userName="John Doe"
          userSecondaryText="john.doe@example.com"
          open={true}
          primaryContent={
            <>
              <GoabButton
                size="compact"
                type="secondary"
                width="100%"
                onClick={() => setGroupOpen(!groupOpen)}
              >
                {groupOpen ? "Close group" : "Open group"}
              </GoabButton>
              <GoabWorkSideMenuGroup
                heading="Get Started"
                icon="school"
                open={groupOpen}
              >
                <GoabWorkSideMenuItem
                  label="Early Adopters"
                  url="/get-started/early-adopters"
                />
                <GoabWorkSideMenuItem label="Designers" url="/get-started/designers" />
                <GoabWorkSideMenuItem label="Developers" url="/get-started/developers" />
              </GoabWorkSideMenuGroup>
            </>
          }
        />
      </div>

      <GoabText tag="h2">Scenario 2: Open a group with a current item</GoabText>
      <GoabText>
        The <b>Features</b> group should be open because it has a current menu item. The{" "}
        <b>Bugs</b> group should remain closed.
      </GoabText>

      <div style={{ display: "flex", height: "500px", overflow: "hidden" }}>
        <GoabWorkSideMenu
          heading="UI Components Playground"
          url="/"
          userName="John Doe"
          userSecondaryText="john.doe@example.com"
          open={true}
          primaryContent={
            <>
              <GoabWorkSideMenuGroup heading="Enhancements" icon="rocket">
                <GoabWorkSideMenuItem label="Item 1" url="/items/1" />
                <GoabWorkSideMenuGroup heading="Features" icon="star">
                  <GoabWorkSideMenuItem label="1908" url="/features/1908" />
                  <GoabWorkSideMenuItem label="3398" url="/features/3398" />
                </GoabWorkSideMenuGroup>
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuGroup heading="Bugs" icon="bug">
                <GoabWorkSideMenuItem label="2152" url="/bugs/2152" />
                <GoabWorkSideMenuItem label="2331" url="/bugs/2331" />
              </GoabWorkSideMenuGroup>
            </>
          }
        />
      </div>
    </div>
  );
}
