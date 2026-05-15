import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabDatePicker,
  GoabDetails,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
  GoabNotification,
  GoabPopover,
  GoabText,
  GoabAppHeaderMenu,
} from "@abgov/angular-components";
import {
  GoabCheckboxOnChangeDetail,
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat3478",
  templateUrl: "./feat3478.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    GoabBlock,
    GoabButton,
    GoabCheckbox,
    GoabDatePicker,
    GoabDetails,
    GoabDivider,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabInput,
    GoabMenuAction,
    GoabMenuButton,
    GoabModal,
    GoabNotification,
    GoabPopover,
    GoabText,
    GoabAppHeaderMenu,
  ],
})
export class Feat3478Component {
  modalOpen = false;
  modalDropdownValue = "";
  modalDateValue: string | Date = "";

  popoverMaxWidth = "320px";
  popoverMinWidth = "";
  popoverPosition: "above" | "below" | "auto" = "auto";
  popoverPadded = true;
  showBanner = true;

  onDateChange(detail: GoabDatePickerOnChangeDetail) {
    console.log("DatePicker changed:", detail);
  }

  onModalDropdownChange(detail: GoabDropdownOnChangeDetail) {
    this.modalDropdownValue = detail.value ?? "";
  }

  onModalDateChange(detail: GoabDatePickerOnChangeDetail) {
    this.modalDateValue = detail.valueStr;
  }

  onMenuAction(detail: GoabMenuButtonOnActionDetail) {
    console.log("Action:", detail);
  }

  onFilterableChange(detail: GoabDropdownOnChangeDetail) {
    console.log("Filterable selected:", detail.value);
  }

  onMaxWidthChange(detail: GoabInputOnChangeDetail) {
    this.popoverMaxWidth = detail.value;
  }

  onMinWidthChange(detail: GoabInputOnChangeDetail) {
    this.popoverMinWidth = detail.value;
  }

  onPositionChange(detail: GoabDropdownOnChangeDetail) {
    this.popoverPosition = detail.value as "above" | "below" | "auto";
  }

  onPaddedChange(detail: GoabCheckboxOnChangeDetail) {
    this.popoverPadded = detail.checked;
  }

  dismissNotification() {
    this.showBanner = false;
  }

  resetNotification() {
    this.showBanner = true;
  }
}
