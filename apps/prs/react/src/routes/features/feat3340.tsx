import React, { useCallback, useMemo, useState } from "react";
import { GoabButton, GoabContainer, GoabText } from "@abgov/react-components";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";

export function Feat3340Route() {
  const [itemClicks, setItemClicks] = useState(0);

  const onItemClick = function () {
    console.log("Menu item clicked");
    setItemClicks((prev) => prev + 1);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--goa-spacing-xl)",
      }}
    >
      <h1>Feature 3340: Work Side Menu Item Click Handling</h1>

      <p>
        This demonstrates handling click events on items within a
        <code>goabx-work-side-menu</code> component.
      </p>

      <GoabText as="p" size="body-m">
        Total item clicks: <strong>{itemClicks}</strong>
      </GoabText>

      <GoabxWorkSideMenu
        heading="Menu heading"
        url="#"
        open={true}
        primaryContent={
          <>
            <GoabxWorkSideMenuItem
              label="Menu item 1"
              icon="star"
              onClick={onItemClick}
            />
            <GoabxWorkSideMenuItem
              label="Menu item 2"
              icon="star"
              onClick={onItemClick}
            />
            <GoabxWorkSideMenuItem
              label="Menu item 3"
              icon="star"
              onClick={onItemClick}
            />
          </>
        }
      />
    </div>
  );
}

export default Feat3340Route;
