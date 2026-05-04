import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function AddARecordUsingADrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabButton leadingIcon="add" onClick={() => setOpen(true)}>
        Add Record
      </GoabButton>
      <GoabDrawer
        maxSize="492px"
        open={open}
        heading="Add Record"
        position="right"
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="start">
            <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Add record
            </GoabButton>
            <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabFormItem label="Level of education">
          <GoabDropdown onChange={() => {}} name="education" value="university">
            <GoabDropdownItem value="high-school" label="High School Diploma" />
            <GoabDropdownItem value="college" label="College Diploma" />
            <GoabDropdownItem value="university" label="University Degree" />
            <GoabDropdownItem value="masters" label="Master's Degree" />
            <GoabDropdownItem value="doctorate" label="Doctorate" />
          </GoabDropdown>
        </GoabFormItem>
        <GoabFormItem label="Educational institution" mt="l">
          <GoabInput name="education" type="text" onChange={() => {}} />
        </GoabFormItem>
        <GoabFormItem label="Field of study" requirement="optional" mt="l">
          <GoabInput name="fieldOfStudy" type="text" onChange={() => {}} />
        </GoabFormItem>
        <GoabFormItem label="Is the person currently attending?" mt="l">
          <GoabRadioGroup
            name="attendTraining"
            orientation="horizontal"
            onChange={() => {}}
          >
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
        <GoabFormItem label="Start date" mt="l">
          <GoabDatePicker onChange={() => {}} value={new Date("2022-09-01")} />
          <GoabCheckbox
            name="startDateApproximate"
            text="Approximate date"
            value="y"
            mt="s"
          />
        </GoabFormItem>
        <GoabFormItem label="Credential received?" mt="l">
          <GoabRadioGroup
            name="credentialReceived"
            orientation="horizontal"
            onChange={() => {}}
          >
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
      </GoabDrawer>
    </>
  );
}
