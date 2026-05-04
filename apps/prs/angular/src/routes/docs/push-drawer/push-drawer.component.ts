import { Component } from "@angular/core";
import {
  GoabBadge, GoabButton, GoabButtonGroup, GoabCheckbox, GoabCheckboxList,
  GoabDropdown, GoabDropdownItem, GoabFormItem, GoabPushDrawer, GoabTable, GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-push-drawer",
  templateUrl: "./push-drawer.component.html",
  imports: [
    GoabBadge, GoabButton, GoabButtonGroup, GoabCheckbox, GoabCheckboxList,
    GoabDropdown, GoabDropdownItem, GoabFormItem, GoabPushDrawer, GoabTable, GoabText,
  ],
})
export class DocsPushDrawerComponent {
  basicOpen = false;
  wideOpen = false;
  actionsOpen = false;
  longOpen = false;
  filterOpen = false;
  checkboxListValues = ["updates", "deadlines"];

  openBasic(): void {
    this.basicOpen = true;
  }

  closeBasic(): void {
    this.basicOpen = false;
  }

  openWide(): void {
    this.wideOpen = true;
  }

  closeWide(): void {
    this.wideOpen = false;
  }

  openActions(): void {
    this.actionsOpen = true;
  }

  closeActions(): void {
    this.actionsOpen = false;
  }

  openLong(): void {
    this.longOpen = true;
  }

  closeLong(): void {
    this.longOpen = false;
  }

  openFilter(): void {
    this.filterOpen = true;
  }

  closeFilter(): void {
    this.filterOpen = false;
  }

  onCheckboxChange(event: any): void {
    console.log(event);
  }

  onDropdownChange(event: any): void {
    console.log(event);
  }
}
