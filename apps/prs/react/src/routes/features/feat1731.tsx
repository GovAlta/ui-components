import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

const programOptions = [
  { value: "child-care", label: "Child care" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
];

function ProgramItems() {
  return programOptions.map((option) => (
    <GoabDropdownItem key={option.value} value={option.value} label={option.label} />
  ));
}

export function Feat1731Route() {
  return (
    <main>
      <GoabText tag="h1" mt="none">
        Feature #1731: Custom dropdown no-results text
      </GoabText>

      <GoabText tag="p">
        Filterable dropdowns can use the noResults property to provide an empty-state
        message that matches the service context.
      </GoabText>

      <GoabText tag="h2">Custom no-results text</GoabText>
      <GoabText tag="p">
        Open the dropdown and enter a value such as “xyz”. The empty state should read “No
        programs found”.
      </GoabText>
      <GoabFormItem label="Program">
        <GoabDropdown
          name="custom-no-results"
          filterable
          noResults="No programs found"
          placeholder="Select a program"
          width="20rem"
        >
          <ProgramItems />
        </GoabDropdown>
      </GoabFormItem>

      <GoabText tag="h2">Default no-results text</GoabText>
      <GoabText tag="p">
        Open the dropdown and enter a value such as “xyz”. Without noResults, the empty
        state should continue to read “No matches found”.
      </GoabText>
      <GoabFormItem label="Program">
        <GoabDropdown
          name="default-no-results"
          filterable
          placeholder="Select a program"
          width="20rem"
        >
          <ProgramItems />
        </GoabDropdown>
      </GoabFormItem>
    </main>
  );
}

export default Feat1731Route;
