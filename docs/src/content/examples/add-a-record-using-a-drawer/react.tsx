import { useState } from "react";
import {
  GoabxButton,
  GoabxCheckbox,
  GoabxDatePicker,
  GoabxDrawer,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxInput,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabBlock, GoabButtonGroup } from "@abgov/react-components";

export function AddARecordUsingADrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabxButton leadingIcon="add" onClick={() => setOpen(true)}>
        Add Record
      </GoabxButton>
      <GoabxDrawer
        maxSize="492px"
        open={open}
        heading="Add Record"
        position="right"
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup>
            <GoabxButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Add record
            </GoabxButton>
            <GoabxButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabxButton>
          </GoabButtonGroup>
        }
      >
        <GoabxFormItem label="Level of education">
          <GoabxDropdown onChange={() => {}} name="education" value="university">
            <GoabxDropdownItem value="high-school" label="High School Diploma" />
            <GoabxDropdownItem value="college" label="College Diploma" />
            <GoabxDropdownItem value="university" label="University Degree" />
            <GoabxDropdownItem value="masters" label="Master's Degree" />
            <GoabxDropdownItem value="doctorate" label="Doctorate" />
          </GoabxDropdown>
        </GoabxFormItem>
        <GoabxFormItem label="Educational institution" mt="l">
          <GoabxInput name="education" type="text" onChange={() => {}} />
        </GoabxFormItem>
        <GoabxFormItem label="Field of study" requirement="optional" mt="l">
          <GoabxInput name="fieldOfStudy" type="text" onChange={() => {}} />
        </GoabxFormItem>
        <GoabxFormItem label="Is the person currently attending?" mt="l">
          <GoabxRadioGroup name="attendTraining" orientation="horizontal" onChange={() => {}}>
            <GoabxRadioItem value="yes" label="Yes" />
            <GoabxRadioItem value="no" label="No" />
          </GoabxRadioGroup>
        </GoabxFormItem>
        <GoabxFormItem label="Start date" mt="l">
          <GoabxDatePicker onChange={() => {}} value={new Date("2022-09-01")} />
          <GoabxCheckbox name="startDateApproximate" text="Approximate date" value="y" mt="s" />
        </GoabxFormItem>
        <GoabxFormItem label="Credential received?" mt="l">
          <GoabxRadioGroup name="credentialReceived" orientation="horizontal" onChange={() => {}}>
            <GoabxRadioItem value="yes" label="Yes" />
            <GoabxRadioItem value="no" label="No" />
          </GoabxRadioGroup>
        </GoabxFormItem>
      </GoabxDrawer>
    </>
  );
}
