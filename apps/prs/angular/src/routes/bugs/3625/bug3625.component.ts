import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabAccordion,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3625",
  templateUrl: "./bug3625.component.html",
  imports: [
    CommonModule,
    GoabAccordion,
    GoabBadge,
    GoabBlock,
    GoabButton,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabText,
  ],
})
export class Bug3625Component {
  controlledOpen = false;

  onAccordionChange() {
    console.log("Accordion toggled");
  }

  onButtonClicked() {
    console.log("Button in heading clicked");
  }

  toggleControlled() {
    this.controlledOpen = !this.controlledOpen;
  }

  onControlledChange(open: boolean) {
    this.controlledOpen = open;
  }
}
