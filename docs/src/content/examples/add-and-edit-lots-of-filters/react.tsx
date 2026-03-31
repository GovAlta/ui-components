import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function AddAndEditLotsOfFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GoabButton onClick={() => setOpen(true)}>Filters</GoabButton>
      <GoabDrawer
          heading="Filters"
          open={open}
          onClose={() => setOpen(false)}
          position="right"
          actions={
            <GoabButtonGroup>
              <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
                Apply filters
              </GoabButton>
              <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
                Cancel
              </GoabButton>
            </GoabButtonGroup>
          }
        >
          <GoabFormItem label="Entry status">
            <GoabCheckboxList name="entryStatus" onChange={() => {}}>
              <GoabCheckbox name="draft" text="Draft" value="draft" />
              <GoabCheckbox name="published" text="Published" value="published" />
            </GoabCheckboxList>
          </GoabFormItem>
          <GoabFormItem label="Assigned to - Region" mt="l">
            <GoabCheckboxList name="region" onChange={() => {}}>
              <GoabCheckbox name="calgary" text="Calgary" value="calgary" />
              <GoabCheckbox name="central" text="Central" value="central" />
              <GoabCheckbox name="edmonton" text="Edmonton" value="edmonton" />
              <GoabCheckbox name="north" text="North" value="north" />
              <GoabCheckbox name="south" text="South" value="south" />
            </GoabCheckboxList>
          </GoabFormItem>
          <GoabFormItem label="Assigned to" mt="l">
            <GoabDropdown name="assignedTo" onChange={() => {}}>
              <GoabDropdownItem value="1" label="Person 1" />
              <GoabDropdownItem value="2" label="Person 2" />
            </GoabDropdown>
          </GoabFormItem>
          <GoabFormItem label="Date taken" mt="l">
            <GoabRadioGroup name="dateTaken" onChange={() => {}}>
              <GoabRadioItem value="24" label="Last 24 hours" />
              <GoabRadioItem value="72" label="Last 72 hours" />
            </GoabRadioGroup>
          </GoabFormItem>
      </GoabDrawer>
    </>
  );
}
