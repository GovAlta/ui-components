import { Component } from "@angular/core";

@Component({
  selector: "goab-chip",
  templateUrl: "./chip.component.html",
})
export class ChipComponent {
  chips = ["Doritos", "Fritos", "Lays"];

  constructor() {}

  deleteChip(chip: string) {
    this.chips = this.chips.filter((c) => c !== chip);
  }

  onClick() {
    console.log("deleting clicked");
  }
}
