import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBlock,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

const ISSUE_NUMBER = "3860";
const ISSUE_TITLE = "App Header Menu aligned to the left instead of the right";

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

      {/* Room for the dropdown to open into view */}
      <div style={{ height: "24rem" }} />
    </div>
  );
}

export default Bug3860Route;
