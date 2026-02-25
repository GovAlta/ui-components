import { useState } from "react";
import { GoabxButton, GoabxModal } from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

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
      <GoabxButton onClick={() => setOpen(true)}>Open</GoabxButton>
      <GoabxModal
        heading="Are you sure you want to change route?"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabxButton>
            <GoabxButton type="primary" size="compact" onClick={handleChangeRoute}>
              Change route
            </GoabxButton>
          </GoabButtonGroup>
        }
      />
    </>
  );
}
