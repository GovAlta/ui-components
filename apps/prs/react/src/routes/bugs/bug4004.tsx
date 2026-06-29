import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabBadge,
  GoabBlock,
  GoabText,
} from "@abgov/react-components";

export function Bug4004Route() {
  const [stringOpen, setStringOpen] = useState(false);
  const [slotOpen, setSlotOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #4004: PushDrawer heading doesn't work with slotted content
      </GoabText>
      <GoabText tag="p" mb="l">
        The PushDrawer documents support for slotted content in the heading, but only
        string headings rendered. PushDrawer.svelte forwarded heading only as a prop and
        never forwarded the heading slot to its internal drawer. Both drawers should now
        render custom slotted heading content.
      </GoabText>

      <GoabText tag="h2" mt="2xl" mb="m">
        Test 1: String heading (control)
      </GoabText>
      <GoabText tag="p" mb="l">
        A plain string heading should still render as before.
      </GoabText>
      <div style={{ display: "flex", minHeight: "320px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setStringOpen(true)}>
            Open string heading
          </GoabButton>
        </div>
        <GoabPushDrawer
          open={stringOpen}
          heading="Plain string heading"
          width="320px"
          onClose={() => setStringOpen(false)}
        >
          <GoabText tag="p">Drawer body content.</GoabText>
        </GoabPushDrawer>
      </div>

      <GoabText tag="h2" mt="2xl" mb="m">
        Test 2: Slotted heading content
      </GoabText>
      <GoabText tag="p" mb="l">
        Passing a ReactNode as the heading should render the custom content (here, text
        plus a badge). Before the fix this rendered nothing.
      </GoabText>
      <div style={{ display: "flex", minHeight: "320px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setSlotOpen(true)}>
            Open slotted heading
          </GoabButton>
        </div>
        <GoabPushDrawer
          open={slotOpen}
          width="320px"
          heading={
            <GoabBlock gap="s" alignment="center" direction="row">
              <span>Custom heading</span>
              <GoabBadge type="important" content="New" />
            </GoabBlock>
          }
          onClose={() => setSlotOpen(false)}
          actions={
            <GoabButtonGroup alignment="start">
              <GoabButton onClick={() => setSlotOpen(false)}>Close</GoabButton>
            </GoabButtonGroup>
          }
        >
          <GoabText tag="p">Drawer body content.</GoabText>
        </GoabPushDrawer>
      </div>

      <GoabText tag="h2" mt="2xl" mb="m">
        Test 3: Long slotted heading (wrapping)
      </GoabText>
      <GoabText tag="p" mb="l">
        When slotted heading content is longer than the available width, it should wrap
        onto multiple lines while the close button stays pinned to the top right.
      </GoabText>
      <div style={{ display: "flex", minHeight: "320px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setLongOpen(true)}>
            Open long heading
          </GoabButton>
        </div>
        <GoabPushDrawer
          open={longOpen}
          width="320px"
          heading={
            <span>
              A longer custom heading that should wrap onto multiple lines{" "}
              <GoabBadge type="important" content="New" />
            </span>
          }
          onClose={() => setLongOpen(false)}
        >
          <GoabText tag="p">Drawer body content.</GoabText>
        </GoabPushDrawer>
      </div>
    </div>
  );
}

export default Bug4004Route;
