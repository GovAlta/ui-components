import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabTextArea,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabDatePicker,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat1666",
  templateUrl: "./feat1666.component.html",
  imports: [
    GoabBlock,
    GoabTextArea,
    GoabCheckbox,
    GoabCheckboxList,
    GoabDropdown,
    GoabDropdownItem,
    GoabRadioGroup,
    GoabRadioItem,
    GoabDatePicker,
  ],
})
export class Feat1666Component {
  log: string[] = [];

  append(entry: string) {
    this.log = [entry, ...this.log].slice(0, 12);
  }
}
