import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDatePicker,
  GoabDatePickerOnChangeDetail,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabMenuButtonOnActionDetail,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3662",
  templateUrl: "./bug3662.component.html",
  imports: [
    GoabBlock,
    GoabDatePicker,
    GoabDetails,
    GoabDivider,
    GoabLink,
    GoabMenuAction,
    GoabMenuButton,
    GoabText,
  ],
})
export class Bug3662Component {
  handleAction(detail: GoabMenuButtonOnActionDetail) {
    console.log("Menu Action:", detail);
  }

  handleChange(detail: GoabDatePickerOnChangeDetail) {
    console.log("Date Picker Change:", detail);
  }
}
