import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabModal,
  GoabText,
} from "@abgov/react-components";

const filler = Array.from({ length: 60 }, (_, i) => i + 1);

export function Bug2710Route() {
  const [open, setOpen] = useState(false);

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
            Opening the modal should lock the body scroll (as the Drawer already
            does) and restore it on close.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test: body scroll lock</GoabText>
      <GoabText tag="p" mb="m">
        Open the modal, then try to scroll the page. The background must not
        move while the modal is open. Close it and the page scrolls again, with
        the scroll position preserved.
      </GoabText>

      <GoabButton type="primary" onClick={() => setOpen(true)}>
        Open modal
      </GoabButton>

      <GoabModal
        heading="Scroll lock test"
        open={open}
        maxWidth="40ch"
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="primary" onClick={() => setOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
        onClose={() => setOpen(false)}
      >
        <GoabText tag="p">
          Try scrolling the page now. The content behind this modal should stay
          put.
        </GoabText>
      </GoabModal>

      {filler.map((n) => (
        <GoabText tag="p" key={n}>
          Filler paragraph {n} of {filler.length} so the page is tall enough to
          scroll behind the modal.
        </GoabText>
      ))}
    </div>
  );
}

export default Bug2710Route;
