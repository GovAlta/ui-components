import { GoabChip } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-chip",
  templateUrl: "./chip.component.html",
  imports: [
    GoabChip
  ]
})
export class ChipComponent {
  chips = ["Doritos", "Fritos", "Lays"];

  constructor() { }

  deleteChip(chip: string) {
    this.chips = this.chips.filter((c) => c !== chip);
  }

  onClick() {
    console.log("deleting clicked");
  }
}
