import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabInput,
  GoabPopover,
  GoabFormItem,
  GoabDatePicker,
  GoabMenuButton,
  GoabMenuAction,
  GoabText,
} from "@abgov/angular-components";
import {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat1328",
  templateUrl: "./feat1328.component.html",
  imports: [
    CommonModule,
    GoabInput,
    GoabDropdown,
    GoabDropdownItem,
    GoabPopover,
    GoabButton,
    GoabFormItem,
    GoabDatePicker,
    GoabMenuButton,
    GoabMenuAction,
    GoabText,
  ],
})
export class Feat1328Component {
  inputValue = "";
  dropdownValue = "";
  selectedAction = "";
  readonly popoverMessage = "This popover just displays a simple message.";

  handleInputChange(detail: GoabInputOnChangeDetail) {
    this.inputValue = detail.value || "";
    console.log("Input changed:", this.inputValue);
  }

  handleInputBlur(detail: GoabInputOnBlurDetail) {
    console.log("Input blurred:", detail.value || "");
  }

  handleDropdownChange(detail: GoabDropdownOnChangeDetail) {
    const normalizedValue =
      typeof detail.value === "number" ? `${detail.value}` : detail.value || "";
    this.dropdownValue = normalizedValue;
    console.log("Dropdown changed:", detail.value);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const submission = Object.fromEntries(new FormData(form).entries());
    console.log("Form submitted:", submission);
  }

  handleDateChange(detail: GoabDatePickerOnChangeDetail) {
    console.log(detail);
    console.log(typeof detail.value);
  }

  handleAction(detail: GoabMenuButtonOnActionDetail) {
    this.selectedAction = detail.action;
  }
}
