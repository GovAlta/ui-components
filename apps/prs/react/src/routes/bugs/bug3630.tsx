import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDetails,
  GoabDivider,
  GoabDrawer,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

export function Bug3630Route() {
  const [rightOpen, setRightOpen] = useState(false);
  const [rightActionsOpen, setRightActionsOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [longHeadingOpen, setLongHeadingOpen] = useState(false);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3630: Drawer refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3630"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            1. Exit animation should slide out (not just disappear). 2. Close button
            alignment with heading. 3. Actions should use start alignment with compact
            buttons. 4. Move category from content-layout to structure-navigation.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Right drawer (animation + alignment)</GoabText>
      <GoabText tag="p">
        Open and close. Check slide-in and slide-out animation. Check heading and close
        button vertical alignment.
      </GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={() => setRightOpen(true)}>Open right drawer</GoabButton>
      </GoabBlock>

      <GoabDrawer
        open={rightOpen}
        position="right"
        heading="Right drawer"
        maxSize="400px"
        onClose={() => setRightOpen(false)}
      >
        <GoabText mt="none" mb="none">
          Check the slide-out animation when closing. The close button should align well
          with the heading text.
        </GoabText>
      </GoabDrawer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: Right drawer with actions</GoabText>
      <GoabText tag="p">
        Actions should use start alignment with compact buttons.
      </GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={() => setRightActionsOpen(true)}>
          Open right drawer with actions
        </GoabButton>
      </GoabBlock>

      <GoabDrawer
        open={rightActionsOpen}
        position="right"
        heading="Edit settings"
        maxSize="400px"
        onClose={() => setRightActionsOpen(false)}
        actions={
          <GoabButtonGroup alignment="start">
            <GoabButton type="primary" size="compact">
              Save
            </GoabButton>
            <GoabButton
              type="tertiary"
              size="compact"
              onClick={() => setRightActionsOpen(false)}
            >
              Cancel
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText mt="none" mb="none">
          The action buttons below should be left-aligned and compact.
        </GoabText>
      </GoabDrawer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 3: Left drawer</GoabText>
      <GoabText tag="p">Check slide-in from left and slide-out animation.</GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={() => setLeftOpen(true)}>Open left drawer</GoabButton>
      </GoabBlock>

      <GoabDrawer
        open={leftOpen}
        position="left"
        heading="Left drawer"
        maxSize="400px"
        onClose={() => setLeftOpen(false)}
      >
        <GoabText mt="none" mb="none">
          Check the slide-out animation when closing from the left side.
        </GoabText>
      </GoabDrawer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 4: Bottom drawer</GoabText>
      <GoabText tag="p">Check slide-up from bottom and slide-down animation.</GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={() => setBottomOpen(true)}>Open bottom drawer</GoabButton>
      </GoabBlock>

      <GoabDrawer
        open={bottomOpen}
        position="bottom"
        heading="Bottom drawer"
        onClose={() => setBottomOpen(false)}
      >
        <GoabText mt="none" mb="none">
          Check the slide-down animation when closing from the bottom.
        </GoabText>
      </GoabDrawer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 5: Long heading</GoabText>
      <GoabText tag="p">Check alignment when the heading wraps to two lines.</GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={() => setLongHeadingOpen(true)}>
          Open drawer with long heading
        </GoabButton>
      </GoabBlock>

      <GoabDrawer
        open={longHeadingOpen}
        position="right"
        heading="This is a much longer heading that should wrap to two lines in the drawer"
        maxSize="400px"
        onClose={() => setLongHeadingOpen(false)}
      >
        <GoabText mt="none" mb="none">
          Check that the close button stays aligned properly when the heading wraps.
        </GoabText>
      </GoabDrawer>
    </div>
  );
}

export default Bug3630Route;
