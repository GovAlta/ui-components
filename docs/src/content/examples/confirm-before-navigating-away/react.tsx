import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabModal,
} from "@abgov/react-components";

export function ConfirmBeforeNavigatingAway() {
  const [open, setOpen] = useState(false);

  const handleChangeRoute = () => {
    setOpen(false);
    // In a real app, you would use your router's navigate function
    // setTimeout(() => navigate("/some-path"), 300);
    console.log("Navigating to new route...");
  };

  return (
    <>
      <GoabButton onClick={() => setOpen(true)}>Open</GoabButton>
      <GoabModal
        heading="Are you sure you want to change route?"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={handleChangeRoute}>
              Change route
            </GoabButton>
          </GoabButtonGroup>
        }
      />
    </>
  );
}
