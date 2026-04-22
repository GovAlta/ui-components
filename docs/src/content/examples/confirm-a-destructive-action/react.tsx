import { useState } from "react";
import { GoabButton, GoabButtonGroup, GoabModal } from "@abgov/react-components";

export function ConfirmADestructiveAction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabButton type="tertiary" leadingIcon="trash" onClick={() => setOpen(true)}>
        Delete record
      </GoabButton>
      <GoabModal
        heading="Are you sure you want to delete this record?"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton
              type="primary"
              variant="destructive"
              size="compact"
              onClick={() => setOpen(false)}
            >
              Delete record
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>This action cannot be undone.</p>
      </GoabModal>
    </>
  );
}
