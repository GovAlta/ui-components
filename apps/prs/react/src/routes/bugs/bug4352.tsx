import type { GoabFormItemRequirement } from "@abgov/ui-components-common";
import {
  GoabBlock,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";

const cases: {
  id: string;
  requirement?: GoabFormItemRequirement;
  title: string;
  expected: string;
}[] = [
  {
    id: "required",
    requirement: "required",
    title: "Required",
    expected:
      'Input, Text Area, Dropdown and Radio Group should expose their label and a required state. Checkbox List should be named "Contact channels (required)" without a required state. Each option should keep its own name.',
  },
  {
    id: "optional",
    requirement: "optional",
    title: "Optional",
    expected:
      'Every field and group should include "(optional)" in its name, such as "Middle name (optional)", without a required state.',
  },
  {
    id: "unmarked",
    title: "No requirement",
    expected:
      "Every field and group should expose its label alone, without a required state or extra words.",
  },
];

export function Bug4352Route() {
  return (
    <>
      <GoabText tag="h1" mt="none" mb="m">
        Bug #4352: Form Item requirements for screen readers
      </GoabText>
      <GoabText tag="p" mb="s">
        <a href="https://github.com/GovAlta/ui-components/issues/4352">
          View issue #4352
        </a>
      </GoabText>
      <GoabText tag="p" mb="m">
        Tab through the required, optional and unmarked fields with a screen reader. Check
        that each field announces its label and requirement as described below.
      </GoabText>

      {cases.map(({ id, requirement, title, expected }) => (
        <section key={id}>
          <GoabDivider mt="l" mb="l" />
          <GoabText tag="h2">{title}</GoabText>
          <GoabText tag="p">{expected}</GoabText>
          <GoabBlock direction="column">
            <GoabFormItem label="Middle name" requirement={requirement}>
              <GoabInput name={`${id}-name`} />
            </GoabFormItem>
            <GoabFormItem label="Notes" requirement={requirement}>
              <GoabTextArea name={`${id}-notes`} />
            </GoabFormItem>
            <GoabFormItem label="Province" requirement={requirement}>
              <GoabDropdown name={`${id}-province`}>
                <GoabDropdownItem value="ab" label="Alberta" />
                <GoabDropdownItem value="bc" label="British Columbia" />
              </GoabDropdown>
            </GoabFormItem>
            <GoabFormItem label="Province, native dropdown" requirement={requirement}>
              <GoabDropdown name={`${id}-native-province`} native>
                <GoabDropdownItem value="ab" label="Alberta" />
                <GoabDropdownItem value="bc" label="British Columbia" />
              </GoabDropdown>
            </GoabFormItem>
            <GoabFormItem
              label="Contact method"
              requirement={requirement}
              type="radio-group"
            >
              <GoabRadioGroup name={`${id}-contact-method`}>
                <GoabRadioItem value="email" label="Email" />
                <GoabRadioItem value="phone" label="Phone" />
              </GoabRadioGroup>
            </GoabFormItem>
            <GoabFormItem
              label="Contact channels"
              requirement={requirement}
              type="checkbox-list"
            >
              <GoabCheckboxList name={`${id}-contact-channels`}>
                <GoabCheckbox name={`${id}-email`} value="email" text="Email" />
                <GoabCheckbox name={`${id}-phone`} value="phone" text="Phone" />
              </GoabCheckboxList>
            </GoabFormItem>
            <GoabFormItem label="Consent" requirement={requirement}>
              <GoabCheckbox name={`${id}-consent`} text="I agree" />
            </GoabFormItem>
          </GoabBlock>
        </section>
      ))}

      <GoabDivider mt="l" mb="l" />
      <GoabText tag="h2">Slotted label</GoabText>
      <GoabText tag="p">
        This field should be named "Preferred name (optional)" with no required state.
      </GoabText>
      <GoabFormItem label={<strong>Preferred name</strong>} requirement="optional">
        <GoabInput name="slotted-name" />
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />
      <GoabText tag="h2">Plain HTML reference</GoabText>
      <label htmlFor="plain-required-name">First name (required)</label>
      <input id="plain-required-name" aria-label="First name" required />
      <label htmlFor="plain-optional-name">Middle name (optional)</label>
      <input id="plain-optional-name" />
    </>
  );
}

export default Bug4352Route;
