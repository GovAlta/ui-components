import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabModal,
} from "@abgov/react-components";

export function RequireUserActionBeforeContinuing() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabButton onClick={() => setOpen(true)}>Open Basic Modal</GoabButton>
      <GoabModal
        heading="Are you sure you want to continue?"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Back
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Continue
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>You cannot return to this page.</p>
      </GoabModal>
    </>
  );
}
