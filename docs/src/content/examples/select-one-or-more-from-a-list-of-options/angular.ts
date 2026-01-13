import { Component } from "@angular/core";

@Component({
  selector: "app-select-one-or-more-from-a-list-of-options",
  templateUrl: "./angular.html",
})
export class SelectOneOrMoreFromAListOfOptionsComponent {
  selectedOptions: string[] = [];

  onSelectionChange(event: { detail: { value: string[] } }): void {
    this.selectedOptions = event.detail.value;
  }
}
