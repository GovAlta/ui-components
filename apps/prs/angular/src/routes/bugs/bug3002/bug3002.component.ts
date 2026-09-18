import { Component } from "@angular/core";
import {
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
} from "@abgov/angular-components";

type ErrorScenario = {
  id: string;
  heading: string;
  description: string;
  formItemError: boolean;
  controlError: boolean;
};

@Component({
  standalone: true,
  selector: "abgov-bug3002",
  templateUrl: "./bug3002.component.html",
  imports: [
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
  ],
})
export class Bug3002Component {
  readonly emptyValues: string[] = [];
  readonly scenarios: ErrorScenario[] = [
    {
      id: "neither",
      heading: "Neither component has an error",
      description:
        "No error message, error styling, or error reference should be present.",
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

  errorMessage(scenario: ErrorScenario): string | undefined {
    return scenario.formItemError
      ? `Error message from FormItem (${scenario.heading})`
      : undefined;
  }

  controlName(scenario: ErrorScenario, component: string): string {
    return `bug3002-${scenario.id}-${component}`;
  }
}
