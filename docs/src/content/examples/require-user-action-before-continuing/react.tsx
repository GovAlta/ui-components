import { useState } from "react";
import { GoabxButton, GoabxModal } from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

export function RequireUserActionBeforeContinuing() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabxButton onClick={() => setOpen(true)}>Open Basic Modal</GoabxButton>
      <GoabxModal
        heading="Are you sure you want to continue?"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Back
            </GoabxButton>
            <GoabxButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Continue
            </GoabxButton>
          </GoabButtonGroup>
        }
      >
        <p>You cannot return to this page.</p>
      </GoabxModal>
    </>
  );
}
