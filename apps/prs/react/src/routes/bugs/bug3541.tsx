import { useState } from 'react';
import {
  GoabButton,
  GoabCheckboxList,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabInput,
  GoabModal,
  GoabTextArea,
  GoabCheckbox,
  GoabButtonGroup,
} from "@abgov/react-components";
import {
  GoabxButton,
  GoabxCheckboxList,
  GoabxFormItem,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxInput,
  GoabxModal,
  GoabxTextArea,
  GoabxCheckbox
} from "@abgov/react-components/experimental";

export function Bug3541Route() {
  const [openTwo, setOpenTwo] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  return (
     <div>
      <h1>3541 - Checkbox cut off on the left side in modal</h1>
      <h2>Version 1</h2>
      <GoabButton type="tertiary" leadingIcon="add" onClick={() => setOpen(true)}>
        Add another item
      </GoabButton>
      <GoabModal
          heading="Add a new item"
          open={open}
          actions={
            <GoabButtonGroup alignment="end">
              <GoabButton type="secondary" size="compact">
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
          <GoabFormItem label="Contact preference" mt="l">
            <GoabRadioGroup name="contact" value="">
              <GoabRadioItem value="email" label="Email" />
              <GoabRadioItem value="phone" label="Phone" />
              <GoabRadioItem value="mail" label="Mail" />
            </GoabRadioGroup>
          </GoabFormItem>
          <GoabFormItem helpText="Choose all that apply" error="Please select one" label="Contact preference 2" mt="l">
            <GoabCheckboxList name="entryStatus">
              <GoabCheckbox error={true} name="sports" text="Sports" />
              <GoabCheckbox name="music" text="Music" />
              <GoabCheckbox name="travel" text="Travel" />
              <GoabCheckbox
                name="other"
                text="Other"
                reveal={
                  <GoabFormItem label="Please specify">
                    <GoabInput name="other" value="" />
                  </GoabFormItem>
                }
              />
            </GoabCheckboxList>
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

      <h2>Version 2</h2>
      <GoabxButton type="tertiary" leadingIcon="add" onClick={() => setOpenTwo(true)}>
        Add another item
      </GoabxButton>
      <GoabxModal
          version="2"
          heading="Add a new item"
          open={openTwo}
          actions={
            <GoabButtonGroup alignment="end">
              <GoabxButton version="2" type="secondary" size="compact">
                Cancel
              </GoabxButton>
              <GoabxButton version="2" type="primary" size="compact" onClick={() => setOpenTwo(false)}>
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
          <GoabxFormItem label="Contact preference" mt="l">
            <GoabxRadioGroup name="contact" value="">
              <GoabxRadioItem value="email" label="Email" />
              <GoabxRadioItem value="phone" label="Phone" />
              <GoabxRadioItem value="mail" label="Mail" />
            </GoabxRadioGroup>
          </GoabxFormItem>
          <GoabxFormItem helpText="Choose all that apply" error="Please select one" label="Contact preference 2" mt="l">
            <GoabxCheckboxList name="entryStatus">
              <GoabxCheckbox error={true} name="sports" text="Sports" />
              <GoabxCheckbox name="music" text="Music" />
              <GoabxCheckbox name="travel" text="Travel" />
              <GoabxCheckbox
                name="other"
                text="Other"
                reveal={
                  <GoabxFormItem label="Please specify">
                    <GoabxInput name="other" value="" />
                  </GoabxFormItem>
                }
              />
            </GoabxCheckboxList>
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
    </div>

  );
}
