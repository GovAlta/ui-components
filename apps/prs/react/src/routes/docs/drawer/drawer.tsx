import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function DocsDrawerRoute() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [narrowOpen, setNarrowOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div>
      <h2>Drawer</h2>

      <h3>Basic drawer</h3>
      <GoabButton onClick={() => setBasicOpen(true)}>Open drawer</GoabButton>
      <GoabDrawer
        heading="Application details"
        position="right"
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
      >
        <p>
          Use a drawer to display supplementary content or actions without navigating away
          from the current page.
        </p>
        <p>Drawers are useful for:</p>
        <ul>
          <li>Viewing detailed information about a selected item</li>
          <li>Editing settings or preferences</li>
          <li>Completing a quick task related to the main content</li>
        </ul>
      </GoabDrawer>
      <h3>Bottom position</h3>
      <GoabButton onClick={() => setBottomOpen(true)}>Open bottom drawer</GoabButton>
      <GoabDrawer
        heading="Bottom drawer"
        position="bottom"
        open={bottomOpen}
        onClose={() => setBottomOpen(false)}
      >
        <p>Opens from the bottom of the screen.</p>
      </GoabDrawer>

      <h3>Left position</h3>
      <GoabButton onClick={() => setLeftOpen(true)}>Open left drawer</GoabButton>
      <GoabDrawer
        heading="Navigation"
        position="left"
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
      >
        <p>Opens from the left side of the screen.</p>
      </GoabDrawer>

      <h3>With actions</h3>
      <GoabButton onClick={() => setActionsOpen(true)}>
        Open drawer with actions
      </GoabButton>
      <GoabDrawer
        heading="Edit settings"
        position="right"
        open={actionsOpen}
        onClose={() => setActionsOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton size="compact" onClick={() => setActionsOpen(false)}>
              Save
            </GoabButton>
            <GoabButton
              type="tertiary"
              size="compact"
              onClick={() => setActionsOpen(false)}
            >
              Cancel
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>Make changes to your settings here.</p>
      </GoabDrawer>

      <h3>Narrow size</h3>
      <GoabButton onClick={() => setNarrowOpen(true)}>Open narrow drawer</GoabButton>
      <GoabDrawer
        heading="Narrow drawer"
        position="right"
        maxSize="240px"
        open={narrowOpen}
        onClose={() => setNarrowOpen(false)}
      >
        <p>Narrow width for simple content.</p>
      </GoabDrawer>

      <h3>Wide size</h3>
      <GoabButton onClick={() => setWideOpen(true)}>Open wide drawer</GoabButton>
      <GoabDrawer
        heading="Wide drawer"
        position="right"
        maxSize="600px"
        open={wideOpen}
        onClose={() => setWideOpen(false)}
      >
        <p>Wide width for more complex content.</p>
      </GoabDrawer>

      <h2>Examples</h2>

      <h3>Add a record using a drawer</h3>
      <GoabButton leadingIcon="add" onClick={() => setRecordOpen(true)}>
        Add Record
      </GoabButton>
      <GoabDrawer
        maxSize="429px"
        open={recordOpen}
        heading="Add Record"
        position="right"
        onClose={() => setRecordOpen(false)}
        actions={
          <GoabButtonGroup alignment="start">
            <GoabButton
              type="primary"
              size="compact"
              onClick={() => setRecordOpen(false)}
            >
              Add record
            </GoabButton>
            <GoabButton
              type="tertiary"
              size="compact"
              onClick={() => setRecordOpen(false)}
            >
              Cancel
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabFormItem label="Level of education">
          <GoabDropdown onChange={() => { /* no-op */ }} name="education" value="university">
            <GoabDropdownItem value="high-school" label="High School Diploma" />
            <GoabDropdownItem value="college" label="College Diploma" />
            <GoabDropdownItem value="university" label="University Degree" />
            <GoabDropdownItem value="masters" label="Master's Degree" />
            <GoabDropdownItem value="doctorate" label="Doctorate" />
          </GoabDropdown>
        </GoabFormItem>
        <GoabFormItem label="Educational institution" mt="l">
          <GoabInput name="education" type="text" onChange={() => { /* no-op */ }} />
        </GoabFormItem>
        <GoabFormItem label="Field of study" requirement="optional" mt="l">
          <GoabInput name="fieldOfStudy" type="text" onChange={() => { /* no-op */ }} />
        </GoabFormItem>
        <GoabFormItem label="Is the person currently attending?" mt="l">
          <GoabRadioGroup
            name="attendTraining"
            orientation="horizontal"
            onChange={() => { /* no-op */ }}
          >
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
        <GoabFormItem label="Start date" mt="l">
          <GoabDatePicker onChange={() => { /* no-op */ }} value={new Date("2022-09-01")} />
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
            onChange={() => { /* no-op */ }}
          >
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
      </GoabDrawer>

      <h3>Add and edit lots of filters</h3>
      <GoabButton onClick={() => setFiltersOpen(true)}>Filters</GoabButton>
      <GoabDrawer
        heading="Filters"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        position="right"
        actions={
          <GoabButtonGroup alignment="start">
            <GoabButton type="primary" size="compact" onClick={() => setFiltersOpen(false)}>
              Apply filters
            </GoabButton>
            <GoabButton type="tertiary" size="compact" onClick={() => setFiltersOpen(false)}>
              Cancel
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabFormItem label="Entry status">
          <GoabCheckboxList name="entryStatus" onChange={() => { /* no-op */ }}>
            <GoabCheckbox name="draft" text="Draft" value="draft" />
            <GoabCheckbox name="published" text="Published" value="published" />
          </GoabCheckboxList>
        </GoabFormItem>
        <GoabFormItem label="Assigned to - Region" mt="l">
          <GoabCheckboxList name="region" onChange={() => { /* no-op */ }}>
            <GoabCheckbox name="calgary" text="Calgary" value="calgary" />
            <GoabCheckbox name="central" text="Central" value="central" />
            <GoabCheckbox name="edmonton" text="Edmonton" value="edmonton" />
            <GoabCheckbox name="north" text="North" value="north" />
            <GoabCheckbox name="south" text="South" value="south" />
          </GoabCheckboxList>
        </GoabFormItem>
        <GoabFormItem label="Assigned to" mt="l">
          <GoabDropdown name="assignedTo" onChange={() => { /* no-op */ }}>
            <GoabDropdownItem value="1" label="Person 1" />
            <GoabDropdownItem value="2" label="Person 2" />
          </GoabDropdown>
        </GoabFormItem>
        <GoabFormItem label="Date taken" mt="l">
          <GoabRadioGroup name="dateTaken" onChange={() => { /* no-op */ }}>
            <GoabRadioItem value="24" label="Last 24 hours" />
            <GoabRadioItem value="72" label="Last 72 hours" />
          </GoabRadioGroup>
        </GoabFormItem>
      </GoabDrawer>
    </div>
  );
}
