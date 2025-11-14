import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabCheckbox,
  GoabDatePicker,
  GoabDropdown,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2768",
  templateUrl: "./bug2768.component.html",
  imports: [
    CommonModule,
    GoabButton,
    GoabCheckbox,
    GoabDatePicker,
    GoabDropdown,
    GoabFormItem,
    GoabInput,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
    GoabTextArea,
  ],
})
export class Bug2768Component {
  checkboxDisabled = true;
  datePickerDisabled = true;
  dropdownDisabled = true;
  inputDisabled = true;
  radioDisabled = true;
  textAreaDisabled = true;

  toggleCheckbox(): void {
    this.checkboxDisabled = !this.checkboxDisabled;
  }

  toggleDatePicker(): void {
    this.datePickerDisabled = !this.datePickerDisabled;
  }

  toggleDropdown(): void {
    this.dropdownDisabled = !this.dropdownDisabled;
  }

  toggleInput(): void {
    this.inputDisabled = !this.inputDisabled;
  }

  toggleRadio(): void {
    this.radioDisabled = !this.radioDisabled;
  }

  toggleTextArea(): void {
    this.textAreaDisabled = !this.textAreaDisabled;
  }
}
