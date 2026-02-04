import { useState } from "react";
import { GoabxButton, GoabxModal } from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

export function WarnAUserOfADeadline() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabxButton type="secondary" onClick={() => setOpen(true)}>
        Save for later
      </GoabxButton>
      <GoabxModal
        heading="Complete submission prior to 1PM"
        calloutVariant="important"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="primary" onClick={() => setOpen(false)}>
              I understand
            </GoabxButton>
          </GoabButtonGroup>
        }
      >
        <p>
          You've selected to adjourn a matter that is required to appear today. This Calgary court
          location does not accept adjournment requests past 1PM MST. Please submit your
          adjournment request as soon as possible.
        </p>
      </GoabxModal>
    </>
  );
}
