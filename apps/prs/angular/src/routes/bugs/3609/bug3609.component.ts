import { Component } from "@angular/core";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabModal,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3609",
  templateUrl: "./bug3609.component.html",
  imports: [
    GoabButton,
    GoabButtonGroup,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabInput,
    GoabModal,
    GoabText,
    GoabTextArea,
  ],
})
export class Bug3609Component {
  open = false;

  openModal(): void {
    this.open = true;
  }

  closeModal(): void {
    this.open = false;
  }
}
