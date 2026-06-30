import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCircularProgress,
  GoabDetails,
  GoabDivider,
  GoabDrawer,
  GoabLink,
  GoabModal,
  GoabText,
} from "@abgov/react-components";

const filler = Array.from({ length: 60 }, (_, i) => i + 1);

export function Bug2710Route() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #2710: Screen behind modal should not scroll when modal is open
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/2710"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            When the Modal is open the page behind it could still be scrolled.
            Opening the modal should lock the background scroll and restore it
            on close. Circular Progress (fullscreen) and Drawer shared the same
            underlying issue and are covered here too.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test 1: Modal scroll lock</GoabText>
      <GoabText tag="p" mb="m">
        Open the modal, then try to scroll the page. The background must not
        move while the modal is open. Close it and the page scrolls again, with
        the scroll position preserved.
      </GoabText>

      <GoabButton type="primary" onClick={() => setModalOpen(true)}>
        Open modal
      </GoabButton>

      <GoabModal
        heading="Scroll lock test"
        open={modalOpen}
        maxWidth="40ch"
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="primary" onClick={() => setModalOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
        onClose={() => setModalOpen(false)}
      >
        <GoabText tag="p">
          Try scrolling the page now. The content behind this modal should stay
          put.
        </GoabText>
      </GoabModal>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test 2: Drawer scroll lock</GoabText>
      <GoabText tag="p" mb="m">
        Open the drawer, then try to scroll the page behind it. The background
        must not move while the drawer is open.
      </GoabText>

      <GoabButton type="primary" onClick={() => setDrawerOpen(true)}>
        Open drawer
      </GoabButton>

      <GoabDrawer
        position="right"
        open={drawerOpen}
        heading="Scroll lock test"
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="primary" onClick={() => setDrawerOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
        onClose={() => setDrawerOpen(false)}
      >
        <GoabText tag="p">
          Try scrolling the page now. The content behind this drawer should
          stay put.
        </GoabText>
      </GoabDrawer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test 3: Circular Progress (fullscreen) scroll lock</GoabText>
      <GoabText tag="p" mb="m">
        Show the fullscreen loader, then try to scroll the page behind it. The
        background must not move while it is visible. The loader has no close
        affordance of its own, so it auto-hides after 3 seconds.
      </GoabText>

      <GoabButton
        type="primary"
        onClick={() => {
          setProgressVisible(true);
          setTimeout(() => setProgressVisible(false), 3000);
        }}
      >
        Show fullscreen loader for 3s
      </GoabButton>

      <GoabCircularProgress
        variant="fullscreen"
        message="Loading..."
        visible={progressVisible}
      />

      {filler.map((n) => (
        <GoabText tag="p" key={n}>
          Filler paragraph {n} of {filler.length} so the page is tall enough to
          scroll behind the overlay.
        </GoabText>
      ))}
    </div>
  );
}

export default Bug2710Route;
