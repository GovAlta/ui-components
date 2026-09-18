import {
  GoabBlock,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabInput,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";

type ErrorScenario = {
  id: string;
  heading: string;
  description: string;
  formItemError: boolean;
  controlError: boolean;
};

const scenarios: ErrorScenario[] = [
  {
    id: "neither",
    heading: "Neither component has an error",
    description: "No error message, error styling, or error reference should be present.",
    formItemError: false,
    controlError: false,
  },
  {
    id: "form-item-only",
    heading: "FormItem error only",
    description:
      "The message should be rendered and referenced by aria-describedby without error styling on the control.",
    formItemError: true,
    controlError: false,
  },
  {
    id: "control-only",
    heading: "Control error only",
    description:
      "The control should have error styling and aria-invalid, but FormItem should not render or reference an error message.",
    formItemError: false,
    controlError: true,
  },
  {
    id: "both",
    heading: "FormItem and control errors",
    description:
      "The control should have error styling and aria-invalid, and the rendered message should be referenced by aria-describedby.",
    formItemError: true,
    controlError: true,
  },
];

function Scenario({ scenario }: { scenario: ErrorScenario }) {
  const error = scenario.formItemError
    ? `Error message from FormItem (${scenario.heading})`
    : undefined;
  const name = (component: string) => `bug3002-${scenario.id}-${component}`;

  return (
    <section>
      <GoabText tag="h2" mt="l" mb="xs">
        {scenario.heading}
      </GoabText>
      <GoabText mb="m">{scenario.description}</GoabText>

      <GoabBlock direction="column" gap="l">
        <GoabFormItem label="Input" error={error} helpText="Input helper text">
          <GoabInput name={name("input")} error={scenario.controlError} />
        </GoabFormItem>

        <GoabFormItem label="Textarea" error={error} helpText="Textarea helper text">
          <GoabTextArea name={name("textarea")} error={scenario.controlError} />
        </GoabFormItem>

        <GoabFormItem label="Dropdown" error={error} helpText="Dropdown helper text">
          <GoabDropdown name={name("dropdown")} error={scenario.controlError}>
            <GoabDropdownItem value="one" label="Option one" />
            <GoabDropdownItem value="two" label="Option two" />
          </GoabDropdown>
        </GoabFormItem>

        <GoabFormItem label="Checkbox" error={error} helpText="Checkbox helper text">
          <GoabCheckbox
            name={name("checkbox")}
            text="Confirm this option"
            error={scenario.controlError}
          />
        </GoabFormItem>

        <GoabFormItem
          label="Radio group"
          type="radio-group"
          error={error}
          helpText="Radio group helper text"
        >
          <GoabRadioGroup name={name("radio-group")} error={scenario.controlError}>
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>

        <GoabFormItem
          label="Checkbox list"
          type="checkbox-list"
          error={error}
          helpText="Checkbox list helper text"
        >
          <GoabCheckboxList
            name={name("checkbox-list")}
            value={[]}
            error={scenario.controlError}
          >
            <GoabCheckbox
              name={name("checkbox-list-one")}
              value="one"
              text="Option one"
            />
            <GoabCheckbox
              name={name("checkbox-list-two")}
              value="two"
              text="Option two"
            />
          </GoabCheckboxList>
        </GoabFormItem>

        <GoabFormItem
          label="Dropdown multiselect"
          error={error}
          helpText="Dropdown multiselect helper text"
        >
          <GoabDropdownMultiselect
            name={name("dropdown-multiselect")}
            error={scenario.controlError}
          >
            <GoabDropdownItem value="one" label="Option one" />
            <GoabDropdownItem value="two" label="Option two" />
          </GoabDropdownMultiselect>
        </GoabFormItem>
      </GoabBlock>

      <GoabDivider mt="xl" />
    </section>
  );
}

export function Bug3002Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3002: Fix how FormItem detects errors
      </GoabText>

      <GoabLink trailingIcon="open">
        <a
          href="https://github.com/GovAlta/ui-components/issues/3002"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </GoabLink>

      <GoabText mt="m">
        These four scenarios cover every combination of the FormItem error message and the
        nested control error state. Inspect each control&apos;s aria-invalid and
        aria-describedby attributes as well as the visible message and error styling.
      </GoabText>

      {scenarios.map((scenario) => (
        <Scenario key={scenario.id} scenario={scenario} />
      ))}
    </div>
  );
}

export default Bug3002Route;
