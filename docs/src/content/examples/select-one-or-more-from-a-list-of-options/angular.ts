import { Component } from "@angular/core";
import type { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-select-one-or-more-from-a-list-of-options",
  templateUrl: "./angular.html",
})
export class SelectOneOrMoreFromAListOfOptionsComponent {
  selectedOptions: string[] = [];

  onSelectionChange(event: GoabCheckboxListOnChangeDetail): void {
    this.selectedOptions = event.value;
  }
}
