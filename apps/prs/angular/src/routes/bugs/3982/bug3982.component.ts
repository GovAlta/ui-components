import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabButton,
  GoabContainer,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
  GoabPopover,
  GoabPushDrawer,
} from "@abgov/angular-components";
import type {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3982",
  templateUrl: "./bug3982.component.html",
  imports: [
    CommonModule,
    GoabButton,
    GoabContainer,
    GoabDatePicker,
    GoabDrawer,
    GoabDropdown,
    GoabDropdownItem,
    GoabMenuAction,
    GoabMenuButton,
    GoabModal,
    GoabPopover,
    GoabPushDrawer,
  ],
})
export class Bug3982Component {
  popoverDate = "";
  popoverProvince = "";

  drawerOpen = false;
  drawerDate = "";
  drawerProvince = "";

  pushDrawerOpen = false;
  pushDrawerDate = "";
  pushDrawerProvince = "";

  modalOpen = false;
  modalDate = "";
  modalProvince = "";

  handlePopoverDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.popoverDate = detail.valueStr || "";
  }

  handlePopoverProvinceChange(detail: GoabDropdownOnChangeDetail): void {
    this.popoverProvince = detail.value || "";
  }

  openDrawer(): void {
    this.drawerOpen = true;
  }

  handleDrawerClose(): void {
    this.drawerOpen = false;
  }

  handleDrawerDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.drawerDate = detail.valueStr || "";
  }

  handleDrawerProvinceChange(detail: GoabDropdownOnChangeDetail): void {
    this.drawerProvince = detail.value || "";
  }

  openPushDrawer(): void {
    this.pushDrawerOpen = true;
  }

  handlePushDrawerClose(): void {
    this.pushDrawerOpen = false;
  }

  handlePushDrawerDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.pushDrawerDate = detail.valueStr || "";
  }

  handlePushDrawerProvinceChange(detail: GoabDropdownOnChangeDetail): void {
    this.pushDrawerProvince = detail.value || "";
  }

  openModal(): void {
    this.modalOpen = true;
  }

  handleModalClose(): void {
    this.modalOpen = false;
  }

  handleModalDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.modalDate = detail.valueStr || "";
  }

  handleModalProvinceChange(detail: GoabDropdownOnChangeDetail): void {
    this.modalProvince = detail.value || "";
  }
}