import type { CSSProperties } from "react";
import {
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

const noop = () => undefined;

const menuShellStyle: CSSProperties = {
  "--goa-work-side-menu-height": "26rem",
  display: "inline-block",
} as CSSProperties;

const demoGridStyle: CSSProperties = {
  display: "grid",
  gap: "2rem",
};

const checklistStyle: CSSProperties = {
  margin: 0,
  paddingLeft: "1.5rem",
};

function renderPrimaryContent(prefix: string) {
  return (
    <>
      <GoabWorkSideMenuItem
        key={`${prefix}-get-started`}
        icon="document-text"
        label="Get started"
        url="/bugs/3735"
      />
      <GoabWorkSideMenuItem
        key={`${prefix}-bugs`}
        icon="list"
        label="Bug list"
        url="/bugs/3735"
      />
      <GoabWorkSideMenuItem
        key={`${prefix}-settings`}
        icon="settings"
        label="Admin settings"
        url="/bugs/3735"
      />
    </>
  );
}

export function Bug3735Route() {
  return (
    <div style={demoGridStyle}>
      <div>
        <GoabText tag="h1" mb="m">
          Bug 3735 - Work Side Menu tooltip fixes
        </GoabText>
        <GoabText mb="xl">Hover the collapsed menu items and confirm that:</GoabText>
        <ul style={checklistStyle}>
          <li>The items are aligned horizontally and vertically.</li>
          <li>A tooltip appears for the "Expand menu" item.</li>
        </ul>
      </div>

      <div style={menuShellStyle}>
        <GoabWorkSideMenu
          heading="Offset tooltip demo"
          url="/bugs/3735"
          open={false}
          onNavigate={noop}
          primaryContent={renderPrimaryContent("offset")}
        />
      </div>
    </div>
  );
}