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

export function AddAnotherItemInAModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  return (
    <>
      <GoabButton type="tertiary" leadingIcon="add" onClick={() => setOpen(true)}>
        Add another item
      </GoabButton>
      <GoabModal
        heading="Add a new item"
        open={open}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
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
          <GoabInput
            onChange={(e) => setName(e.value)}
            value={name}
            name="name"
            width="100%"
          />
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
    </>
  );
}
