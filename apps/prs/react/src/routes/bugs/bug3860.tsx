import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBlock,
  GoabButton,
  GoabDatePicker,
  GoabDetails,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabPopover,
  GoabText,
} from "@abgov/react-components";
import type { ReactNode } from "react";

const ISSUE_NUMBER = "3860";
const ISSUE_TITLE = "App Header Menu aligned to the left instead of the right";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

// A draggable spacer sits before the component. Small spacer = room on the
// right (normal alignment). Drag its corner wider (or narrow the window) to
// push the component toward the screen edge and see its popover flip.
function PushRow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          resize: "horizontal",
          overflow: "auto",
          width: "320px",
          minWidth: "48px",
          maxWidth: "75vw",
          flexShrink: 0,
          border: "1px dashed #999",
          borderRadius: "4px",
          padding: "0.5rem",
          color: "#666",
          whiteSpace: "nowrap",
          fontSize: "0.875rem",
        }}
      >
        spacer: drag my corner to push →
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

export function Bug3860Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #{ISSUE_NUMBER}: {ISSUE_TITLE}
      </GoabText>

      <GoabBlock gap="m" direction="column">
        <GoabLink trailingIcon="open">
          <a
            href={`https://github.com/GovAlta/ui-components/issues/${ISSUE_NUMBER}`}
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue description">
          <GoabText tag="p" mb="s">
            When the App Header collapses to mobile size, overflowing navigation is
            collected into a "More" menu (an AppHeaderMenu). Its popover anchors to the
            LEFT of the button, so when the button sits near the right edge of the
            screen the menu is squeezed into the remaining right-hand space and appears
            too narrow.
          </GoabText>
          <GoabText tag="p" mb="none">
            Acceptance criteria: (1) the popover created by AppHeaderMenu can align to
            the RIGHT of the button so it uses its full width; (2) right alignment only
            happens when there isn't room to align left.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2" mb="s">
        The fix
      </GoabText>
      <GoabText tag="p" mb="m">
        The Popover's automatic right-align compared the space on the trigger's right
        against the popover's already-squeezed width, so a menu clipped by the screen
        edge never flipped. It now compares against the width the popover would take
        with room (its max width), so it right-aligns whenever a left-aligned menu
        would otherwise be squeezed.
      </GoabText>

      <GoabText tag="h2" mb="s">
        How to reproduce
      </GoabText>
      <GoabText tag="p" mb="xs">
        Narrow the browser (around 700px, or use responsive/device mode) until several
        nav items collapse into a <b>More</b> button near the right edge. Open it and
        watch where the dropdown anchors.
      </GoabText>
      <ul style={{ marginTop: 0 }}>
        <li>
          <GoabText tag="span">
            <b>Fixed (expected):</b> the menu right-aligns to the button and stays fully
            on screen.
          </GoabText>
        </li>
        <li>
          <GoabText tag="span">
            <b>Bug:</b> the menu left-aligns and is squeezed or clipped at the right
            edge.
          </GoabText>
        </li>
      </ul>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3" mb="s">
        Scenario: V2 App Header with overflowing navigation
      </GoabText>
      <GoabText tag="p" mb="m">
        Seven navigation items plus an "Account" menu. At desktop width they sit inline;
        as the window narrows they overflow into the "More" menu on the right.
      </GoabText>

      <GoabAppHeader heading="Service Portal" url="/">
        <a slot="navigation" href="#">
          Dashboard
        </a>
        <a slot="navigation" href="#">
          Applications
        </a>
        <a slot="navigation" href="#">
          Reports
        </a>
        <a slot="navigation" href="#">
          Notifications
        </a>
        <a slot="navigation" href="#">
          Billing
        </a>
        <a slot="navigation" href="#">
          Support
        </a>
        <GoabAppHeaderMenu slotName="navigation" heading="Account">
          <a href="#">Profile</a>
          <a href="#">Organization settings</a>
          <a href="#">Sign out</a>
        </GoabAppHeaderMenu>
      </GoabAppHeader>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3" mb="s">
        Scenario: other Popover consumers, with room and against the edge
      </GoabText>
      <GoabText tag="p" mb="m">
        The change lives in the shared Popover, which MenuButton, DatePicker, and
        Dropdown also use. Each row starts with room on the right, so you can see the
        normal alignment first. Drag the dashed spacer's corner (or narrow the
        window) to push a component toward the screen edge and open it again to see
        its popover flip. Shrink the spacer to get the normal alignment back.
      </GoabText>

      <GoabText tag="h4" mb="xs">
        MenuButton
      </GoabText>
      <GoabText tag="p" mb="xs">
        With room: the menu opens at the button's left edge. Against the edge: it
        opens leftward (right-aligned to the button) at its full width.
      </GoabText>
      <PushRow>
        <GoabMenuButton text="More">
          <GoabMenuAction text="Organization settings and preferences" action="a1" />
          <GoabMenuAction text="Notification preferences" action="a2" />
          <GoabMenuAction text="Sign out" action="a3" />
        </GoabMenuButton>
      </PushRow>

      <GoabText tag="h4" mb="xs">
        DatePicker
      </GoabText>
      <GoabText tag="p" mb="xs">
        With room: the calendar opens at the input's left edge. Against the edge: it
        opens leftward at its full width.
      </GoabText>
      <PushRow>
        <GoabDatePicker name="edge-date" />
      </PushRow>

      <GoabText tag="h4" mb="xs">
        Dropdown
      </GoabText>
      <GoabText tag="p" mb="xs">
        Either way: the option list matches the input's width and stays anchored to
        it (a fixed-width list is never squeezed).
      </GoabText>
      <PushRow>
        <GoabDropdown name="edge-color" width="200px" onChange={noop}>
          <GoabDropdownItem label="Red" value="red" />
          <GoabDropdownItem label="Blue" value="blue" />
          <GoabDropdownItem label="Green" value="green" />
        </GoabDropdown>
      </PushRow>

      <GoabText tag="h4" mb="xs">
        Popover
      </GoabText>
      <GoabText tag="p" mb="xs">
        With room: the popover stays left-aligned. Against the edge: it opens
        leftward at its full width.
      </GoabText>
      <PushRow>
        <GoabPopover target={<GoabButton type="secondary">Open popover</GoabButton>}>
          <p style={{ width: "260px", margin: 0 }}>
            This popover keeps its full width by opening toward the available space.
          </p>
        </GoabPopover>
      </PushRow>

      {/* Room for the dropdown to open into view */}
      <div style={{ height: "24rem" }} />
    </div>
  );
}

export default Bug3860Route;
