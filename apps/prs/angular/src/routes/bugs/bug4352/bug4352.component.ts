import { Component } from "@angular/core";
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
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4352",
  templateUrl: "./bug4352.component.html",
  imports: [
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
  ],
})
export class Bug4352Component {
  readonly cases: {
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
}
