import { useState } from "react";
import {
  GoabxButton,
  GoabxCheckbox,
  GoabxDrawer,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabCheckboxList } from "@abgov/react-components";

export function AddAndEditLotsOfFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabxButton onClick={() => setOpen(true)}>Filters</GoabxButton>
      <GoabxDrawer
          heading="Filters"
          open={open}
          onClose={() => setOpen(false)}
          position="right"
          actions={
            <GoabButtonGroup>
              <GoabxButton type="primary" size="compact" onClick={() => setOpen(false)}>
                Apply filters
              </GoabxButton>
              <GoabxButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
                Cancel
              </GoabxButton>
            </GoabButtonGroup>
          }
        >
          <GoabxFormItem label="Entry status">
            <GoabCheckboxList name="entryStatus" onChange={() => {}}>
              <GoabxCheckbox name="draft" text="Draft" value="draft" />
              <GoabxCheckbox name="published" text="Published" value="published" />
            </GoabCheckboxList>
          </GoabxFormItem>
          <GoabxFormItem label="Assigned to - Region" mt="l">
            <GoabCheckboxList name="region" onChange={() => {}}>
              <GoabxCheckbox name="calgary" text="Calgary" value="calgary" />
              <GoabxCheckbox name="central" text="Central" value="central" />
              <GoabxCheckbox name="edmonton" text="Edmonton" value="edmonton" />
              <GoabxCheckbox name="north" text="North" value="north" />
              <GoabxCheckbox name="south" text="South" value="south" />
            </GoabCheckboxList>
          </GoabxFormItem>
          <GoabxFormItem label="Assigned to" mt="l">
            <GoabxDropdown name="assignedTo" onChange={() => {}}>
              <GoabxDropdownItem value="1" label="Person 1" />
              <GoabxDropdownItem value="2" label="Person 2" />
            </GoabxDropdown>
          </GoabxFormItem>
          <GoabxFormItem label="Date taken" mt="l">
            <GoabxRadioGroup name="dateTaken" onChange={() => {}}>
              <GoabxRadioItem value="24" label="Last 24 hours" />
              <GoabxRadioItem value="72" label="Last 72 hours" />
            </GoabxRadioGroup>
          </GoabxFormItem>
      </GoabxDrawer>
    </>
  );
}
