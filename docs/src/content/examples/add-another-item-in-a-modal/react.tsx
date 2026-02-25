import { useState } from "react";
import {
  GoabxButton,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxInput,
  GoabxModal,
  GoabxTextArea,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

export function AddAnotherItemInAModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  return (
    <>
      <GoabxButton type="tertiary" leadingIcon="add" onClick={() => setOpen(true)}>
        Add another item
      </GoabxButton>
      <GoabxModal
          heading="Add a new item"
          open={open}
          actions={
            <GoabButtonGroup alignment="end">
              <GoabxButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
                Cancel
              </GoabxButton>
              <GoabxButton type="primary" size="compact" onClick={() => setOpen(false)}>
                Save new item
              </GoabxButton>
            </GoabButtonGroup>
          }
        >
          <p>Fill in the information to create a new item</p>
          <GoabxFormItem label="Type" mt="l">
            <GoabxDropdown onChange={(e) => setType(e.value)} value={type}>
              <GoabxDropdownItem value="1" label="Option 1" />
              <GoabxDropdownItem value="2" label="Option 2" />
            </GoabxDropdown>
          </GoabxFormItem>
          <GoabxFormItem label="Name" mt="l">
            <GoabxInput
              onChange={(e) => setName(e.value)}
              value={name}
              name="name"
              width="100%"
            />
          </GoabxFormItem>
          <GoabxFormItem label="Description" mt="l">
            <GoabxTextArea
              name="description"
              rows={3}
              width="100%"
              onChange={(e) => setDescription(e.value)}
              value={description}
            />
          </GoabxFormItem>
      </GoabxModal>
    </>
  );
}
