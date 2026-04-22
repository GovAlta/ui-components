import { useState } from "react";
import { GoabButton, GoabButtonGroup, GoabModal } from "@abgov/react-components";

export function WarnAUserOfADeadline() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabButton type="secondary" onClick={() => setOpen(true)}>
        Save for later
      </GoabButton>
      <GoabModal
        heading="Complete submission prior to 1PM"
        calloutVariant="important"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="primary" onClick={() => setOpen(false)}>
              I understand
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>
          You've selected to adjourn a matter that is required to appear today. This
          Calgary court location does not accept adjournment requests past 1PM MST. Please
          submit your adjournment request as soon as possible.
        </p>
      </GoabModal>
    </>
  );
}
