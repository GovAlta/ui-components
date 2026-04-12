/**
 * Bug #3643: Popover overflows right edge when trigger is near viewport boundary
 *
 * The Popover uses CSS Anchor Positioning with `inset-inline-start: anchor(left)`,
 * which always left-aligns the popover to the trigger. When the trigger is near the
 * right edge of the viewport the popover content extends off-screen.
 *
 * Fix: add `position-try-fallbacks: flip-inline` so the browser automatically
 * right-aligns the popover when the left-aligned position would overflow.
 */

import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabPopover,
  GoabButton,
  GoabMenuButton,
  GoabMenuAction,
} from "@abgov/react-components";

export function Bug3643Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3643: Popover overflows right edge when trigger is near viewport boundary
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3643" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            The Popover rewrite switched to CSS Anchor Positioning, which always left-aligns
            the popover to the trigger via <code>inset-inline-start: anchor(left)</code>.
            When the trigger is near the right edge of the viewport, the popover content
            extends off-screen. Fix uses <code>position-try-fallbacks: flip-inline</code> so
            the browser automatically right-aligns the popover when left-alignment would overflow.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Popover near right edge (position=below)</GoabText>
      <GoabText tag="p">
        The popovers below should stay within the viewport. The triggers at the far right
        should cause the popover to flip so its right edge aligns with the trigger's right
        edge rather than overflowing off-screen.
      </GoabText>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <GoabPopover
          target={<GoabButton type="secondary">Left-side trigger</GoabButton>}
          maxWidth="280px"
        >
          <GoabText mt="none" mb="none">
            This popover is triggered near the left edge. It should open normally,
            left-aligned with the trigger button.
          </GoabText>
        </GoabPopover>

        <GoabPopover
          target={<GoabButton type="secondary">Right-side trigger</GoabButton>}
          maxWidth="280px"
        >
          <GoabText mt="none" mb="none">
            This popover is triggered near the right edge. It should flip to be
            right-aligned so it stays within the viewport.
          </GoabText>
        </GoabPopover>
      </div>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: MenuButton near right edge</GoabText>
      <GoabText tag="p">
        MenuButton uses Popover internally. The right-side menu should stay within the viewport.
      </GoabText>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <GoabMenuButton leadingIcon="ellipse" size="compact" buttonType="tertiary">
          <GoabMenuAction onClick={() => {}}>View case</GoabMenuAction>
          <GoabMenuAction onClick={() => {}}>Assign to me</GoabMenuAction>
          <GoabMenuAction onClick={() => {}}>Delete</GoabMenuAction>
        </GoabMenuButton>

        <GoabMenuButton leadingIcon="ellipse" size="compact" buttonType="tertiary">
          <GoabMenuAction onClick={() => {}}>View case</GoabMenuAction>
          <GoabMenuAction onClick={() => {}}>Assign to me</GoabMenuAction>
          <GoabMenuAction onClick={() => {}}>Delete</GoabMenuAction>
        </GoabMenuButton>
      </div>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 3: Popover with position=above near right edge</GoabText>
      <GoabText tag="p">
        Popovers that open above the trigger should also flip horizontally when near the right edge.
      </GoabText>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <GoabPopover
          target={<GoabButton type="secondary">Left-side trigger (above)</GoabButton>}
          maxWidth="280px"
          position="above"
        >
          <GoabText mt="none" mb="none">
            This popover opens above, near the left edge. It should open normally.
          </GoabText>
        </GoabPopover>

        <GoabPopover
          target={<GoabButton type="secondary">Right-side trigger (above)</GoabButton>}
          maxWidth="280px"
          position="above"
        >
          <GoabText mt="none" mb="none">
            This popover opens above, near the right edge. It should flip to be
            right-aligned so it stays within the viewport.
          </GoabText>
        </GoabPopover>
      </div>
    </div>
  );
}

export default Bug3643Route;
