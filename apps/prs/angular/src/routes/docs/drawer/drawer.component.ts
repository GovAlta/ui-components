import { Component } from "@angular/core";
import {
  GoabButton, GoabButtonGroup, GoabCheckbox, GoabCheckboxList, GoabDatePicker, GoabDrawer,
  GoabDropdown, GoabDropdownItem, GoabFormItem, GoabInput, GoabRadioGroup, GoabRadioItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-drawer",
  templateUrl: "./drawer.component.html",
  imports: [
    GoabButton, GoabButtonGroup, GoabCheckbox, GoabCheckboxList, GoabDatePicker, GoabDrawer,
    GoabDropdown, GoabDropdownItem, GoabFormItem, GoabInput, GoabRadioGroup, GoabRadioItem,
  ],
})
export class DocsDrawerComponent {
  basicOpen = false;
  bottomOpen = false;
  leftOpen = false;
  actionsOpen = false;
  narrowOpen = false;
  wideOpen = false;
  recordOpen = false;
  filtersOpen = false;
  assignedTo = "";

  openBasic(): void {
    this.basicOpen = true;
  }

  closeBasic(): void {
    this.basicOpen = false;
  }

  openBottom(): void {
    this.bottomOpen = true;
  }

  closeBottom(): void {
    this.bottomOpen = false;
  }

  openLeft(): void {
    this.leftOpen = true;
  }

  closeLeft(): void {
    this.leftOpen = false;
  }

  openActions(): void {
    this.actionsOpen = true;
  }

  closeActions(): void {
    this.actionsOpen = false;
  }

  openNarrow(): void {
    this.narrowOpen = true;
  }

  closeNarrow(): void {
    this.narrowOpen = false;
  }

  openWide(): void {
    this.wideOpen = true;
  }

  closeWide(): void {
    this.wideOpen = false;
  }

  openRecord(): void {
    this.recordOpen = true;
  }

  closeRecord(): void {
    this.recordOpen = false;
  }

  dropdownOnChange(event: any): void {
    console.log(event);
  }

  inputOnChange(event: any): void {
    console.log(event);
  }

  radioOnChange(event: any): void {
    console.log(event);
  }

  dateOnChange(event: any): void {
    console.log(event);
  }

  openFilters(): void {
    this.filtersOpen = true;
  }

  closeFilters(): void {
    this.filtersOpen = false;
  }

  onCheckboxChange(event: any): void {
    console.log(event);
  }

  onChangeAssignedTo(e: any): void {
    this.assignedTo = e.value as string;
  }
}
