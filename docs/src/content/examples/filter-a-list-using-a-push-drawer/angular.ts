import { Component } from "@angular/core";
import type {
  GoabCheckboxOnChangeDetail,
  GoabDropdownOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  selector: "app-filter-a-list-using-a-push-drawer",
  templateUrl: "./angular.html",
})
export class FilterAListUsingAPushDrawerComponent {
  open = false;

  openFilters(): void {
    this.open = true;
  }

  closeFilters(): void {
    this.open = false;
  }

  onCheckboxChange(event: GoabCheckboxOnChangeDetail): void {
    console.log(event);
  }

  onDropdownChange(event: GoabDropdownOnChangeDetail): void {
    console.log(event);
  }
}
