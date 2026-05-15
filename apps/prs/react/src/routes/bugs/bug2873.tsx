import {
  GoabAccordion,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDetails,
  GoabDrawer,
  GoabInput,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";
import { useState } from "react";

export function Bug2873Route() {
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  const drawerContent = (
    <>
      <GoabInput name="first-input" placeholder="First Input" />
      <GoabText tag="h3" maxWidth="400px">
        Review notes and long-form content
      </GoabText>
      <GoabText tag="p" maxWidth="400px">
        This drawer includes extended content to force scrolling beyond two screen
        heights, with interactive elements placed throughout for testing.
      </GoabText>

      <GoabText tag="p" maxWidth="400px">
        Paragraph 1: Review the drawer scroll behavior while reading this extended
        narrative that stretches across multiple lines and keeps the content dense enough
        to require more scrolling.
      </GoabText>
      <GoabText tag="p" maxWidth="400px">
        Paragraph 2: Confirm focus handling and keyboard navigation as you move through
        long text blocks in the drawer.
      </GoabText>
      <GoabText tag="p" maxWidth="400px">
        Paragraph 3: Continue scanning through the content to ensure the drawer retains
        scroll position and keeps focus within the panel.
      </GoabText>
      <GoabText tag="p" maxWidth="400px">
        Paragraph 4: Validate that the drawer content continues to flow naturally while
        maintaining readable spacing and consistent focus order.
      </GoabText>

      <GoabDetails heading="Supporting context" open>
        <GoabBlock direction="column" gap="s">
          <GoabText tag="p" maxWidth="400px">
            Use this details panel to verify expandable content within a long drawer.
          </GoabText>
          <GoabText tag="p" maxWidth="400px">
            The panel remains interactive while scrolling, and can be toggled while other
            content remains visible.
          </GoabText>
        </GoabBlock>
      </GoabDetails>

      <GoabText tag="p" maxWidth="400px">
        Paragraph 5: Final confirmation text to keep the drawer scrolling beyond two full
        screens, ensuring the bottom content is reachable and usable.
      </GoabText>

      <GoabAccordion heading="Verification checklist" open>
        <GoabBlock direction="column" gap="s">
          <GoabText tag="p" maxWidth="400px">
            Expand and collapse this accordion to confirm that layout changes do not jump
            the scroll position unexpectedly.
          </GoabText>
          <GoabText tag="p" maxWidth="400px">
            Keep the content long enough to require scrolling before and after the
            accordion section.
          </GoabText>
        </GoabBlock>
      </GoabAccordion>

      <GoabText tag="h4" maxWidth="400px">
        Follow-up inputs
      </GoabText>
      <GoabInput name="drawer-first-name" placeholder="First name" mr="l" />
      <GoabInput name="drawer-last-name" placeholder="Last name" />

      <GoabText tag="h4" maxWidth="400px">
        Additional notes
      </GoabText>
      <GoabTextArea
        name="drawer-notes"
        rows={6}
        placeholder="Add any extra details here"
      />
    </>
  );

  return (
    <main>
      <GoabBlock direction="column" gap="l">
        <GoabText tag="h2">Bug 2873 - Drawer scroll and interactive content</GoabText>
        <GoabText tag="p">
          Use the buttons below to open the right and bottom drawers. Each drawer shares
          the same long content so scrolling, focus, and interactive elements can be
          tested consistently.
        </GoabText>
        <GoabText tag="p">
          Expected: When scrolling, keep the Details component and Accordion component
          near the bottom or the top. Attempt to click them, they should focus and
          activate. The bug is currently that it auto scrolls to them but doesn't activate
          them.
        </GoabText>
        <GoabText tag="p">
          Expected: When using tab navigation, tabbing to the next interactive element in
          the Drawer should move the scrolling to that element.
        </GoabText>

        <GoabButtonGroup alignment="start" gap="relaxed">
          <GoabButton type="primary" onClick={() => setRightDrawerOpen(true)}>
            Open Drawer (Right)
          </GoabButton>
          <GoabButton type="secondary" onClick={() => setBottomDrawerOpen(true)}>
            Open Drawer (Bottom)
          </GoabButton>
        </GoabButtonGroup>
      </GoabBlock>

      <GoabDrawer
        open={rightDrawerOpen}
        position="right"
        heading="Bug 2873 - Right Drawer"
        maxSize="500px"
        onClose={() => setRightDrawerOpen(false)}
      >
        {drawerContent}
      </GoabDrawer>

      <GoabDrawer
        open={bottomDrawerOpen}
        position="bottom"
        heading="Bug 2873 - Bottom Drawer"
        onClose={() => setBottomDrawerOpen(false)}
      >
        {drawerContent}
      </GoabDrawer>
    </main>
  );
}
