import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabContainer,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabMenuAction,
  GoabMenuButton,
  GoabMenuButtonOnActionDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3450",
  templateUrl: "./bug3450.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabContainer,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabMenuAction,
    GoabMenuButton,
  ],
})
export class Bug3450Component {
  onMenuAction(detail: GoabMenuButtonOnActionDetail) {
    console.log("Menu action:", detail.action);
  }
}
