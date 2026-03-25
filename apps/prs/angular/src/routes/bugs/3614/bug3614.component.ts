import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabButton,
  GoabDetails,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabIconButton,
  GoabInput,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
  GoabText,
  GoabFilterChip,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3614",
  templateUrl: "./bug3614.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabButton,
    GoabDetails,
    GoabDivider,
    GoabDropdown,
    GoabDropdownItem,
    GoabIconButton,
    GoabInput,
    GoabLink,
    GoabMenuAction,
    GoabMenuButton,
    GoabModal,
    GoabText,
    GoabFilterChip,
  ],
})
export class Bug3614Component {
  dropdownValue = "";
  inputValue = "";
  modalOpen = false;
  chips = ["Alpha", "Beta", "Gamma"];

  removeChip(chip: string) {
    this.chips = this.chips.filter((c) => c !== chip);
  }
}
