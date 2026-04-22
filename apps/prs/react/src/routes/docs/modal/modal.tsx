import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabModal,
  GoabTextArea,
} from "@abgov/react-components";

export function DocsModalRoute() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [dismissableOpen, setDismissableOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [importantOpen, setImportantOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);

  // Add another item
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [type, setType] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  // Destructive
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Navigate away
  const [navigateOpen, setNavigateOpen] = useState(false);
  const handleChangeRoute = () => {
    setNavigateOpen(false);
    console.log("Navigating to new route...");
  };

  // Require action
  const [requireOpen, setRequireOpen] = useState(false);

  const handleConfirm = () => setBasicOpen(false);
  const handleDelete = () => setDestructiveOpen(false);
  const handleExtend = () => setImportantOpen(false);

  return (
    <div>
      <h2>Modal</h2>

      <h3>Basic modal</h3>
      <GoabButton onClick={() => setBasicOpen(true)}>Open basic modal</GoabButton>
      <GoabModal heading="Confirm action" open={basicOpen}>
        <p>Are you sure you want to proceed with this action?</p>
        <GoabButtonGroup alignment="end" mt="l">
          <GoabButton type="secondary" size="compact" onClick={() => setBasicOpen(false)}>Cancel</GoabButton>
          <GoabButton size="compact" onClick={handleConfirm}>Confirm</GoabButton>
        </GoabButtonGroup>
      </GoabModal>

      <h3>Dismissable</h3>
      <GoabButton onClick={() => setDismissableOpen(true)}>Open dismissable modal</GoabButton>
      <GoabModal heading="Information" open={dismissableOpen} onClose={() => setDismissableOpen(false)}>
        <p>You can close this modal with the X button or by clicking the backdrop.</p>
      </GoabModal>

      <h3>Destructive action</h3>
      <GoabButton onClick={() => setDestructiveOpen(true)}>Open destructive modal</GoabButton>
      <GoabModal heading="Are you sure you want to delete this item?" open={destructiveOpen} calloutVariant="emergency">
        <p>This action cannot be undone. The item will be permanently removed.</p>
        <GoabButtonGroup alignment="end" mt="l">
          <GoabButton type="secondary" size="compact" onClick={() => setDestructiveOpen(false)}>Cancel</GoabButton>
          <GoabButton variant="destructive" size="compact" onClick={handleDelete}>Delete</GoabButton>
        </GoabButtonGroup>
      </GoabModal>

      <h3>Important callout</h3>
      <GoabButton onClick={() => setImportantOpen(true)}>Open important modal</GoabButton>
      <GoabModal heading="Your session is about to expire" open={importantOpen} calloutVariant="important">
        <p>You will be logged out in 5 minutes due to inactivity.</p>
        <GoabButtonGroup alignment="end" mt="l">
          <GoabButton size="compact" onClick={handleExtend}>Stay logged in</GoabButton>
        </GoabButtonGroup>
      </GoabModal>

      <h3>Information callout</h3>
      <GoabButton onClick={() => setInfoOpen(true)}>Open info modal</GoabButton>
      <GoabModal heading="New features available" open={infoOpen} calloutVariant="information" onClose={() => setInfoOpen(false)}>
        <p>We have updated the application with new features. Review the changes to get started.</p>
      </GoabModal>

      <h3>Success callout</h3>
      <GoabButton onClick={() => setSuccessOpen(true)}>Open success modal</GoabButton>
      <GoabModal heading="Application submitted" open={successOpen} calloutVariant="success" onClose={() => setSuccessOpen(false)}>
        <p>Your application has been successfully submitted. You will receive a confirmation email shortly.</p>
      </GoabModal>

      <h3>Event callout</h3>
      <GoabButton onClick={() => setEventOpen(true)}>Open event modal</GoabButton>
      <GoabModal heading="Scheduled maintenance" open={eventOpen} calloutVariant="event" onClose={() => setEventOpen(false)}>
        <p>The system will be unavailable on March 28 from 10:00 PM to 2:00 AM for scheduled maintenance.</p>
      </GoabModal>

      <h3>Custom width</h3>
      <GoabButton onClick={() => setWideOpen(true)}>Open wide modal</GoabButton>
      <GoabModal heading="Wide modal" open={wideOpen} maxWidth="80ch" onClose={() => setWideOpen(false)}>
        <p>This modal has a wider maximum width for more content.</p>
      </GoabModal>

      <h2>Examples</h2>

      <h3>Add another item in a modal</h3>
      <GoabButton type="tertiary" leadingIcon="add" onClick={() => setAddItemOpen(true)}>
        Add another item
      </GoabButton>
      <GoabModal
        heading="Add a new item"
        open={addItemOpen}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" size="compact" onClick={() => setAddItemOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={() => setAddItemOpen(false)}>
              Save new item
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>Fill in the information to create a new item</p>
        <GoabFormItem label="Type" mt="l">
          <GoabDropdown onChange={(e) => setType(e.value)} value={type}>
            <GoabDropdownItem value="1" label="Option 1" />
            <GoabDropdownItem value="2" label="Option 2" />
          </GoabDropdown>
        </GoabFormItem>
        <GoabFormItem label="Name" mt="l">
          <GoabInput onChange={(e) => setName(e.value)} value={name} name="name" width="100%" />
        </GoabFormItem>
        <GoabFormItem label="Description" mt="l">
          <GoabTextArea
            name="description"
            rows={3}
            width="100%"
            onChange={(e) => setDescription(e.value)}
            value={description}
          />
        </GoabFormItem>
      </GoabModal>

      <h3>Confirm a destructive action</h3>
      <GoabButton type="tertiary" leadingIcon="trash" onClick={() => setDeleteOpen(true)}>
        Delete record
      </GoabButton>
      <GoabModal
        heading="Are you sure you want to delete this record?"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" size="compact" onClick={() => setDeleteOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton
              type="primary"
              variant="destructive"
              size="compact"
              onClick={() => setDeleteOpen(false)}
            >
              Delete record
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>This action cannot be undone.</p>
      </GoabModal>

      <h3>Confirm before navigating away</h3>
      <GoabButton onClick={() => setNavigateOpen(true)}>Open</GoabButton>
      <GoabModal
        heading="Are you sure you want to change route?"
        open={navigateOpen}
        onClose={() => setNavigateOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" size="compact" onClick={() => setNavigateOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={handleChangeRoute}>
              Change route
            </GoabButton>
          </GoabButtonGroup>
        }
      />

      <h3>Require user action before continuing</h3>
      <GoabButton onClick={() => setRequireOpen(true)}>Open Basic Modal</GoabButton>
      <GoabModal
        heading="Are you sure you want to continue?"
        open={requireOpen}
        onClose={() => setRequireOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" size="compact" onClick={() => setRequireOpen(false)}>
              Back
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={() => setRequireOpen(false)}>
              Continue
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>You cannot return to this page.</p>
      </GoabModal>
    </div>
  );
}
