import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabTextArea,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabDatePicker,
  GoabContainer,
} from "@abgov/react-components";

export function Feat1666Route() {
  const [log, setLog] = useState<string[]>([]);

  const append = (entry: string) => {
    setLog((prev) => [entry, ...prev].slice(0, 12));
  };

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #1666: Focus and blur events
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/1666"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Text Area, Radio, Checkbox, Dropdown, and Date Picker did not support
            onFocus and onBlur events, unlike Input. This page demonstrates onFocus and
            onBlur firing for each of those components, plus Checkbox List (same
            composite shape as Radio Group, added on the same branch). For Dropdown,
            Radio, Checkbox List, and Date Picker (composite components), onFocus fires
            once when focus enters any of their internal fields, and onBlur fires once
            when focus leaves all of them.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Text Area</GoabText>
      <GoabTextArea
        name="textarea"
        testId="textarea"
        placeholder="Focus and blur me"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("TextArea: onFocus")}
        onBlur={() => append("TextArea: onBlur")}
      />

      <GoabText tag="h3" mt="l">
        Checkbox
      </GoabText>
      <GoabCheckbox
        name="checkbox"
        testId="checkbox"
        text="Focus and blur me"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("Checkbox: onFocus")}
        onBlur={() => append("Checkbox: onBlur")}
      />

      <GoabText tag="h3" mt="l">
        Checkbox List
      </GoabText>
      <GoabCheckboxList
        name="checkbox-list"
        testId="checkbox-list"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("CheckboxList: onFocus")}
        onBlur={() => append("CheckboxList: onBlur")}
      >
        <GoabCheckbox name="option1" text="Option 1" />
        <GoabCheckbox name="option2" text="Option 2" />
      </GoabCheckboxList>

      <GoabText tag="h3" mt="l">
        Dropdown
      </GoabText>
      <GoabDropdown
        name="dropdown"
        testId="dropdown"
        placeholder="Focus and blur me"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("Dropdown: onFocus")}
        onBlur={() => append("Dropdown: onBlur")}
      >
        <GoabDropdownItem label="Red" value="red" />
        <GoabDropdownItem label="Blue" value="blue" />
        <GoabDropdownItem label="Green" value="green" />
      </GoabDropdown>

      <GoabText tag="h3" mt="l">
        Radio Group
      </GoabText>
      <GoabRadioGroup
        name="radio"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("Radio: onFocus")}
        onBlur={() => append("Radio: onBlur")}
      >
        <GoabRadioItem name="radio" value="option1" label="Option 1" />
        <GoabRadioItem name="radio" value="option2" label="Option 2" />
      </GoabRadioGroup>

      <GoabText tag="h3" mt="l">
        Date Picker (calendar)
      </GoabText>
      <GoabDatePicker
        name="date-calendar"
        testId="date-calendar"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("DatePicker (calendar): onFocus")}
        onBlur={() => append("DatePicker (calendar): onBlur")}
      />

      <GoabText tag="h3" mt="l">
        Date Picker (input)
      </GoabText>
      <GoabText tag="p">
        Tab between the month/day/year fields to verify onFocus only fires once
        entering the group, and onBlur only fires once leaving all three fields.
      </GoabText>
      <GoabDatePicker
        type="input"
        name="date-input"
        testId="date-input"
        onChange={() => {
          /* noop */
        }}
        onFocus={() => append("DatePicker (input): onFocus")}
        onBlur={() => append("DatePicker (input): onBlur")}
      />

      <GoabText tag="h3" mt="l">
        Event log
      </GoabText>
      <GoabContainer>
        {log.length === 0 ? (
          <GoabText tag="p">Focus and blur the fields above to see events here.</GoabText>
        ) : (
          <ul data-testid="event-log">
            {log.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        )}
      </GoabContainer>
    </div>
  );
}

export default Feat1666Route;
