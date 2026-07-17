import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabModal,
  GoabTextarea,
  GoabText,
} from "@abgov/react-components";

export function Bug3609Route() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #3609: Modal scroll area clipping and footer actions padding
      </GoabText>
      <GoabText tag="p" mb="l">
        Open the modal. The scrollable content should not be clipped at the top or
        bottom, and the Cancel / Save action buttons should have adequate padding
        between them and the bottom edge of the pinned footer.
      </GoabText>

      <GoabButton onClick={() => setOpen(true)}>Add another item</GoabButton>

      <GoabModal
        heading="Add a new item"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" onClick={() => setOpen(false)}>
              Save new item
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText tag="p" mt="none">
          Fill in the information to create a new item
        </GoabText>

        <GoabFormItem label="Type" mb="l">
          <GoabDropdown name="type">
            <GoabDropdownItem value="a" label="Type A" />
            <GoabDropdownItem value="b" label="Type B" />
            <GoabDropdownItem value="c" label="Type C" />
          </GoabDropdown>
        </GoabFormItem>

        <GoabFormItem label="Name" mb="l">
          <GoabInput name="name" />
        </GoabFormItem>

        <GoabFormItem label="Description" mb="l">
          <GoabTextarea name="description" />
        </GoabFormItem>

        <GoabFormItem label="Notes" mb="l">
          <GoabTextarea name="notes" />
        </GoabFormItem>

        <GoabFormItem label="Additional details" mb="none">
          <GoabTextarea name="details" />
        </GoabFormItem>
      </GoabModal>
    </div>
  );
}

export default Bug3609Route;
