import { useState, JSX } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabDrawer,
  GoabFormItem,
  GoabGrid,
  GoabInput,
  GoabText,
} from "@abgov/react-components";

export function Bug2943Route(): JSX.Element {
  const [bottomOpen, setBottomOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">bug2943 - Drawer sizing and content interactions</GoabText>
      <GoabText tag="p">
        Use the buttons below to open drawers anchored to the bottom and side. Each drawer
        contains enough content to highlight overflow, inputs, and nested actions.
      </GoabText>

      <GoabGrid minChildWidth="260px" gap="l">
        <GoabBlock direction="column" gap="m">
          <GoabText tag="h2">Bottom drawer scenario</GoabText>
          <GoabText tag="p">
            Opens a medium-height drawer from the bottom with form content so it reaches
            roughly half the viewport.
          </GoabText>
          <GoabButton onClick={() => setBottomOpen(true)}>Open bottom drawer</GoabButton>

          <GoabDrawer
            position="bottom"
            heading="Bottom drawer with form content"
            open={bottomOpen}
            maxSize="60vh"
            onClose={() => setBottomOpen(false)}
          >
            <GoabBlock direction="column" gap="m">
              <GoabFormItem label="Contact email">
                <GoabInput name="bottom-email" placeholder="name@example.com" />
              </GoabFormItem>
              <GoabText tag="p">
                Add steps, notes, or instructions here. The block content encourages
                scrolling if the screen height is short.
              </GoabText>
              <GoabFormItem label="Description">
                <GoabInput
                  name="bottom-description"
                  placeholder="Summarize the request"
                />
              </GoabFormItem>
              <GoabText tag="p">
                Use this area to capture any additional details needed to reproduce the
                experience. The drawer height should adjust while leaving the backdrop
                visible.
              </GoabText>
              <GoabText tag="p">
                Provide checklist items, validation notes, or follow-up actions to
                exercise the space and confirm scroll behaviour when content grows.
              </GoabText>
              <GoabButton onClick={() => setBottomOpen(false)}>
                Finish and close
              </GoabButton>
            </GoabBlock>
          </GoabDrawer>
        </GoabBlock>

        <GoabBlock direction="column" gap="m">
          <GoabText tag="h2">Side drawer scenario</GoabText>
          <GoabText tag="p">
            Opens from the right and contains multiple sections to force vertical
            scrolling.
          </GoabText>
          <GoabButton onClick={() => setSideOpen(true)}>Open side drawer</GoabButton>

          <GoabDrawer
            position="right"
            heading="Side drawer with scrollable content"
            open={sideOpen}
            maxSize="520px"
            onClose={() => setSideOpen(false)}
          >
            <GoabBlock direction="column" gap="m">
              <GoabFormItem label="Search term">
                <GoabInput name="side-search" placeholder="What are you looking for?" />
              </GoabFormItem>
              <GoabText tag="p">
                Provide a longer description to ensure the drawer needs to scroll. Each
                paragraph adds context for the tester.
              </GoabText>
              <GoabText tag="p">
                Additional paragraph to stretch the layout and highlight scroll shadows.
                Repeat content with slight variations to mimic real instructions.
              </GoabText>
              <GoabFormItem label="Notes">
                <GoabInput name="side-notes" placeholder="Add follow-up notes" />
              </GoabFormItem>
              <GoabText tag="p">
                Checklist: confirm header, close button, and backdrop interactions behave
                correctly when scrolling through dense content within the drawer.
              </GoabText>
              <GoabFormItem label="Assigned to">
                <GoabInput name="side-assignee" placeholder="Case owner" />
              </GoabFormItem>
              <GoabText tag="p">
                Final copy block to ensure the drawer consumes the available height and
                requires scroll.
              </GoabText>
              <GoabButton type="secondary">Save changes</GoabButton>
            </GoabBlock>
          </GoabDrawer>
        </GoabBlock>
      </GoabGrid>
    </GoabBlock>
  );
}
