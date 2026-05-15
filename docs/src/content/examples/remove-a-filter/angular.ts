import { Component } from "@angular/core";

@Component({
  selector: "app-remove-a-filter",
  templateUrl: "./angular.html",
})
export class RemoveAFilterComponent {
  chips: string[] = ["Chip 1", "Chip 2", "Chip 3"];

  deleteChip(chip: string): void {
    this.chips = this.chips.filter((c) => c !== chip);
  }
}
