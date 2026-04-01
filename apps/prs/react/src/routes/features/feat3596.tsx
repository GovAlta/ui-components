/**
 * Feature: Dropdown multi-select with filter chips
 *
 * Tests for the multi-select variant of the Dropdown component. In multiselect
 * mode, selected values are always rendered as removable filter chips below
 * the input.
 */

import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabMultiSelect,
  GoabMultiSelectItem,
} from "@abgov/react-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";
import { useState } from "react";

const fruits = ["Apple", "Banana", "Cherry", "Mango", "Orange", "Pineapple", "Strawberry"];
const colours = ["Red", "Blue", "Green", "Orange", "Purple", "Yellow"];
const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
];

export function Feat3596Route() {
  const [selectedFruits, setSelectedFruits] = useState<string[]>(["apple", "banana", "cherry"]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(["Alberta", "Ontario"]);
  const [selectedFilterableProvinces, setSelectedFilterableProvinces] = useState<string[]>([]);

  // GoabMultiSelect state
  const [msColours, setMsColours] = useState<string[]>([]);
  const [msProvinces, setMsProvinces] = useState<string[]>(["Alberta", "Ontario"]);
  const [msFilterable, setMsFilterable] = useState<string[]>([]);

  function onFruitsChange(detail: GoabDropdownOnChangeDetail) {
    setSelectedFruits(detail.values ?? []);
  }

  function onColoursChange(detail: GoabDropdownOnChangeDetail) {
    setSelectedColours(detail.values ?? []);
  }

  function onProvincesChange(detail: GoabDropdownOnChangeDetail) {
    setSelectedProvinces(detail.values ?? []);
  }

  function onFilterableProvincesChange(detail: GoabDropdownOnChangeDetail) {
    setSelectedFilterableProvinces(detail.values ?? []);
  }

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feat #3596: Dropdown multi-select with filter chips
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3596"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Multi-select renders selected values as removable filter chips below the input.
            Clicking the × on a chip deselects that value.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Pre-selected values shown as chips on load</GoabText>
      <GoabText tag="p">
        Three fruits are pre-selected. Chips appear immediately on load. Click × on a chip to
        deselect that value — the input summary and menu checkboxes update accordingly. Open the
        menu and verify the "Select All" checkbox toggles all items.
      </GoabText>
      <GoabFormItem label="Select your favourite fruits">
        <GoabDropdown
          name="fruits"
          multiselect={true}
          value={selectedFruits}
          placeholder="Select fruits"
          onChange={onFruitsChange}
        >
          {fruits.map((f) => (
            <GoabDropdownItem key={f} value={f.toLowerCase()} label={f} />
          ))}
        </GoabDropdown>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: Select from empty — chips appear as items are chosen</GoabText>
      <GoabText tag="p">
        No chips visible initially. As items are selected from the menu, chips appear below.
        Remove all chips via × (or the clear button) and confirm the chip row disappears.
        Use "Select All" to select everything at once; uncheck it to clear all.
      </GoabText>
      <GoabFormItem label="Favourite colours">
        <GoabDropdown
          name="colours"
          multiselect={true}
          value={selectedColours}
          placeholder="Select colours"
          onChange={onColoursChange}
        >
          {colours.map((c) => (
            <GoabDropdownItem key={c} value={c.toLowerCase()} label={c} />
          ))}
        </GoabDropdown>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 3: Many options with pre-selected values</GoabText>
      <GoabText tag="p">
        Verify that chips correctly display long labels and that removing a chip updates the
        remaining selection and input summary.
      </GoabText>
      <GoabFormItem label="Provinces of interest">
        <GoabDropdown
          name="provinces"
          multiselect={true}
          value={selectedProvinces}
          placeholder="Select provinces"
          onChange={onProvincesChange}
        >
          {provinces.map((p) => (
            <GoabDropdownItem key={p} value={p} label={p} />
          ))}
        </GoabDropdown>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 4: Filterable multiselect</GoabText>
      <GoabText tag="p">
        Type in the input to filter options. Select items from the filtered list — chips appear
        below. The input clears after each selection so you can search for the next item.
        Remove chips via × or use the clear button to deselect all.
      </GoabText>
      <GoabFormItem label="Search and select provinces">
        <GoabDropdown
          name="filterable-provinces"
          multiselect={true}
          filterable={true}
          value={selectedFilterableProvinces}
          placeholder="Type to filter…"
          onChange={onFilterableProvincesChange}
        >
          {provinces.map((p) => (
            <GoabDropdownItem key={p} value={p} label={p} />
          ))}
        </GoabDropdown>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Option B: Standalone GoabMultiSelect Component</GoabText>
      <GoabText tag="p">
        A dedicated <code>GoabMultiSelect</code> / <code>goa-multi-select</code> component
        with the same multiselect behaviour as the Dropdown variant above. Uses
        <code>GoabMultiSelectItem</code> / <code>goa-multi-select-option</code> as child elements.
      </GoabText>

      <GoabDivider mt="m" mb="m" />

      <GoabText tag="h3">MultiSelect Test 1: Basic selection with chips</GoabText>
      <GoabText tag="p">
        No selection on load. Choose colours — chips appear below. Remove chips via ×.
        Use "Select All" to select everything; uncheck it to clear all.
      </GoabText>
      <GoabFormItem label="Favourite colours">
        <GoabMultiSelect
          name="ms-colours"
          value={msColours}
          placeholder="Select colours"
          onChange={(d) => setMsColours(d.values ?? [])}
        >
          {colours.map((c) => (
            <GoabMultiSelectItem key={c} value={c.toLowerCase()} label={c} />
          ))}
        </GoabMultiSelect>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">MultiSelect Test 2: Pre-selected values</GoabText>
      <GoabText tag="p">
        Two provinces pre-selected on load. Chips appear immediately. Add/remove selections
        and verify the input summary ("N selected") updates.
      </GoabText>
      <GoabFormItem label="Provinces of interest">
        <GoabMultiSelect
          name="ms-provinces"
          value={msProvinces}
          placeholder="Select provinces"
          onChange={(d) => setMsProvinces(d.values ?? [])}
        >
          {provinces.map((p) => (
            <GoabMultiSelectItem key={p} value={p} label={p} />
          ))}
        </GoabMultiSelect>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">MultiSelect Test 3: Filterable</GoabText>
      <GoabText tag="p">
        Type to filter the option list. Select items — the input clears after each pick
        so you can search again. Chips accumulate below.
      </GoabText>
      <GoabFormItem label="Search and select provinces">
        <GoabMultiSelect
          name="ms-filterable"
          filterable={true}
          value={msFilterable}
          placeholder="Type to filter…"
          onChange={(d) => setMsFilterable(d.values ?? [])}
        >
          {provinces.map((p) => (
            <GoabMultiSelectItem key={p} value={p} label={p} />
          ))}
        </GoabMultiSelect>
      </GoabFormItem>
    </div>
  );
}

export default Feat3596Route;
