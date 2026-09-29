import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/react-components";

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

type RadioScenario = {
  id: string;
  title: string;
  description: string;
  initial: string;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  size?: "default" | "compact";
  options: RadioOption[];
};

const fruitOptions: RadioOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const scenarios: RadioScenario[] = [
  {
    id: "basic",
    title: "Basic, unselected group",
    description:
      "Tab will enter at Apple and not select it. Use arrow keys to select other items, it will wrap. Spacebar selects the first item. Accessibility should read x of 3.",
    initial: "",
    options: [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
      },
      {
        value: "cherry",
        label: "Cherry",
      },
    ],
  },
  {
    id: "explicit",
    title: "Explicitly enabled items",
    description:
      "The group and each item explicitly receive disabled=false. All three options should remain available to readers and selectable with Space or the mouse.",
    initial: "",
    disabled: false,
    options: [
      {
        value: "apple",
        label: "Apple",
        disabled: false,
      },
      {
        value: "banana",
        label: "Banana",
        disabled: false,
      },
      {
        value: "cherry",
        label: "Cherry",
        disabled: false,
      },
    ],
  },
  {
    id: "preset",
    title: "Preselected, horizontal and compact",
    description: "Banana starts selected. Tab will select Banana.",
    initial: "banana",
    orientation: "horizontal",
    size: "compact",
    options: [
      {
        value: "apple",
        label: "Apple",
        description: "First option",
      },
      {
        value: "banana",
        label: "Banana",
        description: "Initially selected",
      },
      {
        value: "cherry",
        label: "Cherry",
        description: "Last option",
      },
    ],
  },
  {
    id: "middle",
    title: "Disabled middle item",
    description:
      "Banana is unavailable and skipped by arrow keys. Apple and Cherry should announce 1 of 2 and 2 of 2, then wrap.",
    initial: "",
    options: [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
        disabled: true,
      },
      {
        value: "cherry",
        label: "Cherry",
      },
    ],
  },
  {
    id: "edges",
    title: "Only one enabled item",
    description:
      "Apple and Cherry are disabled. Tab enters at Banana, which announces 1 of 1. Arrow keys stay on Banana. Tab still leaves the group.",
    initial: "",
    options: [
      {
        value: "apple",
        label: "Apple",
        disabled: true,
      },
      {
        value: "banana",
        label: "Banana",
      },
      {
        value: "cherry",
        label: "Cherry",
        disabled: true,
      },
    ],
  },
  {
    id: "disabled-selection",
    title: "The selected item is disabled",
    description:
      "Banana starts selected but disabled. Tab enters at Apple without changing the selection. Space or an arrow key selects an enabled option.",
    initial: "banana",
    options: [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
        disabled: true,
      },
      {
        value: "cherry",
        label: "Cherry",
      },
    ],
  },
];

export function Bug4226Route() {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(scenarios.map((scenario) => [scenario.id, scenario.initial])),
  );
  const [disabledItems, setDisabledItems] = useState<string[]>(["banana"]);
  const [disabledValue, setDisabledValue] = useState("apple");
  const [items, setItems] = useState<RadioOption[]>([...fruitOptions]);
  const [listValue, setListValue] = useState("banana");
  const [nextOption, setNextOption] = useState(1);
  const [outerValue, setOuterValue] = useState("");
  const [innerValue, setInnerValue] = useState("");

  function toggleItem(value: string) {
    setDisabledItems((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function addItem(atStart: boolean) {
    const item = { value: `added-${nextOption}`, label: `Added option ${nextOption}` };
    setNextOption(nextOption + 1);
    setItems(atStart ? [item, ...items] : [...items, item]);
  }

  function removeItem(value: string) {
    setItems(items.filter((item) => item.value !== value));
    if (listValue === value) setListValue("");
  }

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug 4226 + 4227: Radio accessibility and keyboard navigation
      </GoabText>
      <GoabLink trailingIcon="open" mr="xl">
        <a
          href="https://github.com/GovAlta/ui-components/issues/4226"
          target="_blank"
          rel="noreferrer"
        >
          View issue 4226 on GitHub
        </a>
      </GoabLink>
      <GoabLink trailingIcon="open">
        <a
          href="https://github.com/GovAlta/ui-components/issues/4227"
          target="_blank"
          rel="noreferrer"
        >
          View issue 4227 on Github
        </a>
      </GoabLink>
      <GoabText tag="p">
        All 4 arrows keys can be used to navigate radio options. Down and Right go
        forward, Left and Up go backwards.
      </GoabText>

      {scenarios.map((scenario, index) => (
        <section key={scenario.id}>
          <GoabDivider mt="l" mb="l" />
          <GoabText tag="h2">
            {index + 1}. {scenario.title}
          </GoabText>
          <GoabText tag="p">{scenario.description}</GoabText>
          <GoabFormItem label={scenario.title}>
            <GoabRadioGroup
              name={`bug4226-${scenario.id}`}
              ariaLabel={scenario.title}
              value={values[scenario.id]}
              disabled={scenario.disabled}
              orientation={scenario.orientation}
              size={scenario.size}
              onChange={({ value }) =>
                setValues((current) => ({ ...current, [scenario.id]: value }))
              }
            >
              {scenario.options.map((option) => (
                <GoabRadioItem key={option.value} {...option} />
              ))}
            </GoabRadioGroup>
          </GoabFormItem>
        </section>
      ))}

      <section data-testid="case-item-disabled">
        <GoabDivider mt="l" mb="l" />
        <GoabText tag="h2">7. Dynamically disable individual items</GoabText>
        <GoabText tag="p">
          Toggle any item, including the selected one. Total group count and keyboard
          navigation should be updated automatically.
        </GoabText>
        <GoabButtonGroup mb="m">
          {fruitOptions.map((option) => (
            <GoabButton
              key={option.value}
              type="secondary"
              onClick={() => toggleItem(option.value)}
            >
              {disabledItems.includes(option.value) ? "Enable" : "Disable"} {option.label}
            </GoabButton>
          ))}
        </GoabButtonGroup>
        <GoabFormItem label="Individual disabled states">
          <GoabRadioGroup
            name="bug4226-item-disabled"
            ariaLabel="Individual disabled states"
            value={disabledValue}
            onChange={({ value }) => setDisabledValue(value)}
          >
            {fruitOptions.map((option) => (
              <GoabRadioItem
                key={option.value}
                {...option}
                disabled={disabledItems.includes(option.value)}
              />
            ))}
          </GoabRadioGroup>
        </GoabFormItem>
        <GoabText tag="p">Selected value: {disabledValue || "None"}</GoabText>
      </section>

      <section data-testid="case-dynamic-list">
        <GoabDivider mt="l" mb="l" />
        <GoabText tag="h2">8. Add, remove and reorder items</GoabText>
        <GoabText tag="p">
          Add or remove an item. Reverse the order. Ensure that accessible group counts
          are accurate, and keyboard navigation is accurate
        </GoabText>
        <GoabButtonGroup mb="m">
          <GoabButton type="secondary" onClick={() => addItem(true)}>
            Add at start
          </GoabButton>
          <GoabButton type="secondary" onClick={() => addItem(false)}>
            Add at end
          </GoabButton>
          <GoabButton
            type="secondary"
            disabled={items.length < 2}
            onClick={() => setItems([...items].reverse())}
          >
            Reverse order
          </GoabButton>
          <GoabButton
            type="secondary"
            disabled={!items.length}
            onClick={() => removeItem(items[0].value)}
          >
            Remove first
          </GoabButton>
          <GoabButton
            type="secondary"
            disabled={!items.length}
            onClick={() => removeItem(items[items.length - 1].value)}
          >
            Remove last
          </GoabButton>
          <GoabButton
            type="secondary"
            disabled={!listValue}
            onClick={() => removeItem(listValue)}
          >
            Remove selected
          </GoabButton>
        </GoabButtonGroup>
        <GoabFormItem label="Dynamic options">
          <GoabRadioGroup
            name="bug4226-dynamic-list"
            ariaLabel="Dynamic options"
            value={listValue}
            onChange={({ value }) => setListValue(value)}
          >
            {items.map((option) => (
              <GoabRadioItem key={option.value} {...option} />
            ))}
          </GoabRadioGroup>
        </GoabFormItem>
        <GoabText tag="p">Selected value: {listValue || "None"}</GoabText>
      </section>

      <section data-testid="case-reveal">
        <GoabDivider mt="l" mb="l" />
        <GoabText tag="h2">9. Reveal input and a nested radio group</GoabText>
        <GoabText tag="p">
          With details has a reveal property. Ensure that arrow keys only work on the
          selected group (outer or inner)
        </GoabText>
        <GoabFormItem label="Outer choice">
          <GoabRadioGroup
            name="bug4226-outer"
            ariaLabel="Outer choice"
            value={outerValue}
            onChange={({ value }) => setOuterValue(value)}
          >
            <GoabRadioItem value="none" label="No details" />
            <GoabRadioItem
              value="details"
              label="With details"
              reveal={
                <GoabFormItem label="Inner choice">
                  <GoabRadioGroup
                    name="bug4226-inner"
                    ariaLabel="Inner choice"
                    value={innerValue}
                    onChange={({ value }) => setInnerValue(value)}
                  >
                    <GoabRadioItem value="email" label="Email" />
                    <GoabRadioItem value="phone" label="Phone" />
                  </GoabRadioGroup>
                </GoabFormItem>
              }
            />
          </GoabRadioGroup>
        </GoabFormItem>
      </section>
    </div>
  );
}

export default Bug4226Route;
