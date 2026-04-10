import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabButton,
  GoabButtonGroup,
  GoabModal,
} from "@abgov/react-components";

export function Bug3654Route() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [importantOpen, setImportantOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3654: Modal refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3654"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            1. Remove border from modal surface. 2. For status type modals, the close icon
            button hover color should reuse the same per-status hover colors used by
            notification banner close buttons. 3. Silently undocument the Event variant
            (docs only).
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Basic modal (border check)</GoabText>
      <GoabText tag="p">
        Inspect the modal surface. There should be no visible border.
      </GoabText>
      <GoabButton onClick={() => setBasicOpen(true)}>Open basic modal</GoabButton>
      <GoabModal
        heading="Basic Modal"
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" onClick={() => setBasicOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText tag="p">
          Inspect this modal surface for a visible border (shadow, outline, or border
          property).
        </GoabText>
      </GoabModal>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: Status modals (close button hover colors)</GoabText>
      <GoabText tag="p">
        Hover over the close X button on each status modal. The hover color should match
        the notification banner close button hover colors.
      </GoabText>
      <GoabButtonGroup alignment="start">
        <GoabButton type="secondary" onClick={() => setInfoOpen(true)}>
          Information
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setSuccessOpen(true)}>
          Success
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setImportantOpen(true)}>
          Important
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setEmergencyOpen(true)}>
          Emergency
        </GoabButton>
      </GoabButtonGroup>

      <GoabModal
        heading="Information Modal"
        calloutVariant="information"
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" onClick={() => setInfoOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText tag="p">Hover the close button. Check hover color.</GoabText>
      </GoabModal>

      <GoabModal
        heading="Success Modal"
        calloutVariant="success"
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" onClick={() => setSuccessOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText tag="p">Hover the close button. Check hover color.</GoabText>
      </GoabModal>

      <GoabModal
        heading="Important Modal"
        calloutVariant="important"
        open={importantOpen}
        onClose={() => setImportantOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" onClick={() => setImportantOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText tag="p">Hover the close button. Check hover color.</GoabText>
      </GoabModal>

      <GoabModal
        heading="Emergency Modal"
        calloutVariant="emergency"
        open={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" onClick={() => setEmergencyOpen(false)}>
              Close
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText tag="p">Hover the close button. Check hover color.</GoabText>
      </GoabModal>
    </div>
  );
}

export default Bug3654Route;
