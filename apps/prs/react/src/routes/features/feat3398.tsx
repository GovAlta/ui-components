import React, { useState } from "react";
import { GoabButton, GoabText } from "@abgov/react-components";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";

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
        <GoabxWorkSideMenu
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
              <GoabxWorkSideMenuGroup
                heading="Get Started"
                icon="school"
                open={groupOpen}
              >
                <GoabxWorkSideMenuItem
                  label="Early Adopters"
                  url="/get-started/early-adopters"
                />
                <GoabxWorkSideMenuItem label="Designers" url="/get-started/designers" />
                <GoabxWorkSideMenuItem label="Developers" url="/get-started/developers" />
              </GoabxWorkSideMenuGroup>
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
        <GoabxWorkSideMenu
          heading="UI Components Playground"
          url="/"
          userName="John Doe"
          userSecondaryText="john.doe@example.com"
          open={true}
          primaryContent={
            <>
              <GoabxWorkSideMenuGroup heading="Enhancements" icon="rocket">
                <GoabxWorkSideMenuItem label="Item 1" url="/items/1" />
                <GoabxWorkSideMenuGroup heading="Features" icon="star">
                  <GoabxWorkSideMenuItem label="1908" url="/features/1908" />
                  <GoabxWorkSideMenuItem label="3398" url="/features/3398" />
                </GoabxWorkSideMenuGroup>
              </GoabxWorkSideMenuGroup>
              <GoabxWorkSideMenuGroup heading="Bugs" icon="bug">
                <GoabxWorkSideMenuItem label="2152" url="/bugs/2152" />
                <GoabxWorkSideMenuItem label="2331" url="/bugs/2331" />
              </GoabxWorkSideMenuGroup>
            </>
          }
        />
      </div>
    </div>
  );
}
