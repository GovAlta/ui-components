import { useState } from "react";
import { GoabxButton, GoabxModal } from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

export function ConfirmADestructiveAction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabxButton type="tertiary" leadingIcon="trash" onClick={() => setOpen(true)}>
        Delete record
      </GoabxButton>
      <GoabxModal
        heading="Are you sure you want to delete this record?"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabxButton>
            <GoabxButton
              type="primary"
              variant="destructive"
              size="compact"
              onClick={() => setOpen(false)}
            >
              Delete record
            </GoabxButton>
          </GoabButtonGroup>
        }
      >
        <p>This action cannot be undone.</p>
      </GoabxModal>
    </>
  );
}
