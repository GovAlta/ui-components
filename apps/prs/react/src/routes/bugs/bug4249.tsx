import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabDrawer,
  GoabLink,
  GoabModal,
  GoabScrollPanel,
  GoabText,
} from "@abgov/react-components";

type DrawerExample =
  | "content-left"
  | "content-right"
  | "content-bottom"
  | "overflow-left"
  | "overflow-right"
  | "overflow-bottom"
  | "fixed-left"
  | "fixed-right"
  | "fixed-bottom";

type ModalExample = "content" | "overflow" | "fixed" | "missing-slots";

const overflowRows = Array.from({ length: 30 }, (_, index) => index + 1);

function panelSlot(region: "Header" | "Footer", label: string) {
  return (
    <div
      style={{
        padding: "var(--goa-space-m)",
        backgroundColor:
          region === "Header"
            ? "var(--goa-color-greyscale-100)"
            : "var(--goa-color-greyscale-200)",
      }}
    >
      <strong>{region}:</strong> {label}
    </div>
  );
}

export function Bug4249Route() {
  const [drawerExample, setDrawerExample] = useState<DrawerExample | null>(null);
  const [modalExample, setModalExample] = useState<ModalExample | null>(null);

  const drawerPosition = drawerExample?.endsWith("left")
    ? "left"
    : drawerExample?.endsWith("bottom")
      ? "bottom"
      : "right";
  const drawerHasHeading = drawerExample !== "content-right";
  const drawerHasActions = drawerExample !== "content-bottom";
  const drawerHasOverflow = drawerExample?.startsWith("overflow");
  const drawerHasFixedContent = drawerExample?.startsWith("fixed");

  const closeDrawer = () => setDrawerExample(null);
  const closeModal = () => setModalExample(null);

  const actions = (close: () => void) => (
    <GoabButtonGroup alignment="end">
      <GoabButton type="primary" onClick={close}>
        Done
      </GoabButton>
    </GoabButtonGroup>
  );

  return (
    <>
      <GoabText tag="h1" mt="m" mb="s">
        Bug 4249 - Drawer, Modal, and ScrollPanel sizing
      </GoabText>
      <GoabLink trailingIcon="open">
        <a
          href="https://github.com/GovAlta/ui-components/issues/4249"
          target="_blank"
          rel="noreferrer"
        >
          View issue 4249 on GitHub
        </a>
      </GoabLink>
      <GoabText tag="p">
        Verify content-sized, overflowing, and fixed-height layouts. In scrolling
        examples, the final numbered row must be reachable while the heading and actions
        remain visible.
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Drawer examples</GoabText>

      <GoabText tag="h3">Content-sized Drawers</GoabText>
      <GoabText tag="p">
        These should be only as tall as their content. The right Drawer omits its heading,
        and the bottom Drawer omits its actions.
      </GoabText>
      <GoabBlock direction="row" gap="s">
        <GoabButton type="secondary" onClick={() => setDrawerExample("content-left")}>
          Open left
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setDrawerExample("content-right")}>
          Open right, no heading
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setDrawerExample("content-bottom")}>
          Open bottom, no actions
        </GoabButton>
      </GoabBlock>

      <GoabText tag="h3" mt="l">
        Drawers requiring scrolling
      </GoabText>
      <GoabText tag="p">
        Each Drawer contains 30 rows. Scroll to row 30 and confirm the page behind the
        Drawer remains stationary.
      </GoabText>
      <GoabBlock direction="row" gap="s">
        <GoabButton type="secondary" onClick={() => setDrawerExample("overflow-left")}>
          Scroll left
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setDrawerExample("overflow-right")}>
          Scroll right
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setDrawerExample("overflow-bottom")}>
          Scroll bottom
        </GoabButton>
      </GoabBlock>

      <GoabText tag="h3" mt="l">
        Drawers with fixed-height content
      </GoabText>
      <GoabText tag="p">
        Each Drawer contains an explicitly 18rem-tall body and should size around it.
      </GoabText>
      <GoabBlock direction="row" gap="s">
        <GoabButton type="secondary" onClick={() => setDrawerExample("fixed-left")}>
          Fixed left
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setDrawerExample("fixed-right")}>
          Fixed right
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setDrawerExample("fixed-bottom")}>
          Fixed bottom
        </GoabButton>
      </GoabBlock>

      {drawerExample && (
        <GoabDrawer
          open={true}
          position={drawerPosition}
          heading={drawerHasHeading ? `${drawerPosition} Drawer` : undefined}
          actions={drawerHasActions ? actions(closeDrawer) : undefined}
          onClose={closeDrawer}
        >
          {drawerHasOverflow ? (
            overflowRows.map((row) => (
              <p key={row}>Drawer row {row} - row 30 must be reachable by scrolling.</p>
            ))
          ) : drawerHasFixedContent ? (
            <div style={{ height: "18rem" }}>
              <p>This body has a fixed height of 18rem.</p>
              <p>The Drawer should include the complete body, heading, and actions.</p>
            </div>
          ) : (
            <>
              <p>This Drawer should remain content-sized.</p>
              <p>There should be no unnecessary empty space or scrollbar.</p>
            </>
          )}
        </GoabDrawer>
      )}

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Modal examples</GoabText>
      <GoabBlock direction="row" gap="s">
        <GoabButton type="secondary" onClick={() => setModalExample("content")}>
          Content-sized Modal
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setModalExample("overflow")}>
          Scrolling Modal
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setModalExample("fixed")}>
          Fixed-height content
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setModalExample("missing-slots")}>
          No heading or actions
        </GoabButton>
      </GoabBlock>

      {modalExample && (
        <GoabModal
          open={true}
          heading={modalExample === "missing-slots" ? undefined : "Modal sizing test"}
          actions={modalExample === "missing-slots" ? undefined : actions(closeModal)}
          onClose={closeModal}
        >
          {modalExample === "overflow" ? (
            overflowRows.map((row) => (
              <p key={row}>Modal row {row} - row 30 must be reachable by scrolling.</p>
            ))
          ) : modalExample === "fixed" ? (
            <div style={{ height: "18rem" }}>
              <p>This Modal body has a fixed height of 18rem.</p>
            </div>
          ) : (
            <>
              <p>This Modal should remain content-sized.</p>
              <p>There should be no unnecessary empty space or scrollbar.</p>
            </>
          )}
        </GoabModal>
      )}

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Standalone ScrollPanel examples</GoabText>

      <GoabText tag="h3">Content-sized</GoabText>
      <GoabScrollPanel
        height="auto"
        header={panelSlot("Header", "content-sized panel")}
        footer={panelSlot("Footer", "content-sized panel")}
      >
        <p>This panel uses height=&quot;auto&quot; and should fit its short content.</p>
      </GoabScrollPanel>

      <GoabText tag="h3" mt="l">
        Fixed height
      </GoabText>
      <GoabScrollPanel
        height="18rem"
        header={panelSlot("Header", "fixed-height panel")}
        footer={panelSlot("Footer", "fixed-height panel")}
      >
        {overflowRows.map((row) => (
          <p key={row}>Fixed panel row {row}</p>
        ))}
      </GoabScrollPanel>

      <GoabText tag="h3" mt="l">
        Missing header and footer
      </GoabText>
      <GoabScrollPanel height="12rem">
        {overflowRows.slice(0, 12).map((row) => (
          <p key={row}>No-slots row {row}</p>
        ))}
      </GoabScrollPanel>

      <GoabText tag="h3" mt="l">
        Horizontal scrolling
      </GoabText>
      <GoabScrollPanel height="10rem" direction="horizontal">
        <div
          style={{
            width: "calc(100% + 40rem)",
            display: "flex",
            justifyContent: "space-between",
            whiteSpace: "nowrap",
          }}
        >
          <strong>Start of horizontal content</strong>
          <span>Middle marker</span>
          <strong>End of horizontal content</strong>
        </div>
      </GoabScrollPanel>
    </>
  );
}

export default Bug4249Route;
