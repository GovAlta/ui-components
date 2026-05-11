/**
 * Feature: DropdownMultiselect component
 *
 * New component that combines Popover + CheckboxList into a multiselect dropdown.
 * A button with a chevron icon activates the Popover. Selecting checkboxes
 * appends to a comma-separated list shown in the trigger text field.
 */

import { useState } from "react";
import {
  GoabBlock,
  GoabCheckbox,
  GoabDivider,
  GoabText,
  GoabDropdownMultiselect,
  GoabBadge,
} from "@abgov/react-components";
import { GoabDropdownMultiselectOnChangeDetail } from "@abgov/ui-components-common";

export function Feat1233Route() {
  const [basicValues, setBasicValues] = useState<string[]>([]);
  const [preselectedValues, setPreselectedValues] = useState<string[]>(["red", "blue"]);
  const [disabledValues] = useState<string[]>(["alpha"]);
  const [errorValues, setErrorValues] = useState<string[]>([]);
  const [compactValues, setCompactValues] = useState<string[]>([]);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function logEvent(msg: string) {
    setEventLog((prev) =>
      [`${new Date().toLocaleTimeString()} ${msg}`, ...prev].slice(0, 8),
    );
  }

  function handleBasicChange({ value, labels }: GoabDropdownMultiselectOnChangeDetail) {
    setBasicValues(value);
    logEvent(`onChange: values=[${value.join(", ")}] labels=[${labels.join(", ")}]`);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-l)" }}>
      <GoabText tag="h1" mt="m">
        DropdownMultiselect
      </GoabText>
      <GoabText tag="p">
        Combines a Popover trigger (with a chevron icon matching the Dropdown button
        style) and a CheckboxList. Selected items appear as a comma-separated list in the
        trigger. Exposes all CheckboxList props and Popover props prefixed with "popover".
      </GoabText>

      <GoabDivider mt="m" mb="m" />

      {/* Test 1: Basic usage */}
      <GoabText tag="h2">Test 1: Basic usage</GoabText>
      <GoabText tag="p">
        Select any combination of options. The trigger text updates after each selection.
        Verify the chevron flips between up and down as the popover opens and closes.
      </GoabText>
      <GoabBlock direction="column" gap="m">
        <GoabDropdownMultiselect
          name="fruits"
          value={basicValues}
          placeholder="Select fruits"
          onChange={handleBasicChange}
          testId="basic-multiselect"
        >
          <GoabCheckbox name="apple" text="Apple" />
          <GoabCheckbox name="banana" text="Banana" />
          <GoabCheckbox name="cherry" text="Cherry" />
          <GoabCheckbox name="date" text="Date" />
          <GoabCheckbox name="elderberry" text="Elderberry" />
        </GoabDropdownMultiselect>
        <GoabText tag="p">
          Selected:{" "}
          <strong>{basicValues.length > 0 ? basicValues.join(", ") : "(none)"}</strong>
        </GoabText>
      </GoabBlock>

      <GoabDivider mt="m" mb="m" />

      {/* Test 2: Pre-selected values */}
      <GoabText tag="h2">Test 2: Pre-selected values</GoabText>
      <GoabText tag="p">
        Opens with "Red" and "Blue" already checked. The trigger should show "Red, Blue"
        immediately without requiring user interaction.
      </GoabText>
      <GoabBlock direction="column" gap="m">
        <GoabDropdownMultiselect
          name="colors"
          value={preselectedValues}
          placeholder="Select colors"
          onChange={({ value }) => setPreselectedValues(value)}
          testId="preselected-multiselect"
        >
          <GoabCheckbox name="red" text="Red" />
          <GoabCheckbox name="green" text="Green" />
          <GoabCheckbox name="blue" text="Blue" />
          <GoabCheckbox name="yellow" text="Yellow" />
        </GoabDropdownMultiselect>
        <GoabText tag="p">
          Selected: <strong>{preselectedValues.join(", ")}</strong>
        </GoabText>
      </GoabBlock>

      <GoabDivider mt="m" mb="m" />

      {/* Test 3: Disabled state */}
      <GoabText tag="h2">Test 3: Disabled state</GoabText>
      <GoabText tag="p">
        The trigger button should appear disabled (grey background, no hover effect) and
        clicking it must not open the popover.
      </GoabText>
      <GoabDropdownMultiselect
        name="disabled-options"
        value={disabledValues}
        disabled={true}
        placeholder="Disabled"
        testId="disabled-multiselect"
      >
        <GoabCheckbox name="alpha" text="Alpha" />
        <GoabCheckbox name="beta" text="Beta" />
      </GoabDropdownMultiselect>

      <GoabDivider mt="m" mb="m" />

      {/* Test 4: Error state */}
      <GoabText tag="h2">Test 4: Error state</GoabText>
      <GoabText tag="p">
        The trigger should have a red error border. Selecting items should still work
        normally.
      </GoabText>
      <GoabDropdownMultiselect
        name="error-options"
        value={errorValues}
        error={true}
        placeholder="Select an option"
        onChange={({ value }) => setErrorValues(value)}
        testId="error-multiselect"
      >
        <GoabCheckbox name="opt1" text="Option 1" />
        <GoabCheckbox name="opt2" text="Option 2" />
        <GoabCheckbox name="opt3" text="Option 3" />
      </GoabDropdownMultiselect>

      <GoabDivider mt="m" mb="m" />

      {/* Test 5: Compact size */}
      <GoabText tag="h2">Test 5: Compact size</GoabText>
      <GoabText tag="p">
        The checkbox list inside the popover uses compact spacing between items.
      </GoabText>
      <GoabDropdownMultiselect
        name="compact-options"
        value={compactValues}
        size="compact"
        placeholder="Compact list"
        onChange={({ value }) => setCompactValues(value)}
        testId="compact-multiselect"
      >
        <GoabCheckbox name="item1" text="Item 1" />
        <GoabCheckbox name="item2" text="Item 2" />
        <GoabCheckbox name="item3" text="Item 3" />
        <GoabCheckbox name="item4" text="Item 4" />
      </GoabDropdownMultiselect>

      <GoabDivider mt="m" mb="m" />

      {/* Test 6: Popover open/close events */}
      <GoabText tag="h2">Test 6: Popover events</GoabText>
      <GoabText tag="p">
        The popover status badge updates when the popover opens or closes. The event log
        below records all onChange, onPopoverOpen, and onPopoverClose events.
      </GoabText>
      <GoabBlock direction="column" gap="m">
        <GoabBlock direction="row" gap="m" alignment="center">
          <GoabText tag="p" mt="none" mb="none">
            Popover status:
          </GoabText>
          <GoabBadge
            type={isPopoverOpen ? "success" : "information"}
            content={isPopoverOpen ? "Open" : "Closed"}
          />
        </GoabBlock>
        <GoabDropdownMultiselect
          name="events-demo"
          placeholder="Open me"
          onChange={({ value, labels }) => logEvent(`onChange: [${labels.join(", ")}]`)}
          onPopoverOpen={() => {
            setIsPopoverOpen(true);
            logEvent("onPopoverOpen");
          }}
          onPopoverClose={() => {
            setIsPopoverOpen(false);
            logEvent("onPopoverClose");
          }}
          testId="events-multiselect"
        >
          <GoabCheckbox name="x" text="Option X" />
          <GoabCheckbox name="y" text="Option Y" />
          <GoabCheckbox name="z" text="Option Z" />
        </GoabDropdownMultiselect>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.8125rem",
            background: "var(--goa-color-greyscale-100)",
            border: "1px solid var(--goa-color-greyscale-200)",
            borderRadius: "var(--goa-border-radius-m)",
            padding: "var(--goa-space-m)",
            minHeight: "6rem",
          }}
        >
          {eventLog.length === 0 ? (
            <span style={{ color: "var(--goa-color-text-secondary)" }}>
              Events will appear here...
            </span>
          ) : (
            eventLog.map((entry, i) => <div key={i}>{entry}</div>)
          )}
        </div>
      </GoabBlock>

      <GoabDivider mt="m" mb="m" />

      {/* Test 7: Custom popover position */}
      <GoabText tag="h2">Test 7: Popover positioned above</GoabText>
      <GoabText tag="p">
        The popover should open above the trigger button. Useful when the component is
        near the bottom of the page.
      </GoabText>
      <div style={{ marginTop: "8rem" }}>
        <GoabDropdownMultiselect
          name="above-demo"
          placeholder="Opens above"
          popoverPosition="above"
          testId="above-multiselect"
        >
          <GoabCheckbox name="a" text="Alpha" />
          <GoabCheckbox name="b" text="Beta" />
          <GoabCheckbox name="c" text="Gamma" />
        </GoabDropdownMultiselect>
      </div>
    </div>
  );
}

export default Feat1233Route;
