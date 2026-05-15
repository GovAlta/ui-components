import { Component } from "@angular/core";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFileUploadInput,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTextArea,
  GoabFormItem,
  GoabTab,
  GoabTabs,
  GoabText,
} from "@abgov/angular-components";
import {
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxOnChangeDetail,
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabFileUploadInputOnSelectFileDetail,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabRadioGroupOnChangeDetail,
  GoabTabsOnChangeDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2977",
  templateUrl: "./bug2977.component.html",
  imports: [
    GoabCheckbox,
    GoabCheckboxList,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabFileUploadInput,
    GoabInput,
    GoabRadioGroup,
    GoabRadioItem,
    GoabTextArea,
    GoabFormItem,
    GoabTab,
    GoabTabs,
    GoabText,
  ],
})
export class Bug2977Component {
  logEvent(label: string, detail: unknown) {
    console.log(label, detail);
  }

  handleInputChange(detail: GoabInputOnChangeDetail) {
    this.logEvent("input change", detail);
  }

  handleInputFocus(detail: GoabInputOnFocusDetail) {
    this.logEvent("input focus", detail);
  }

  handleInputBlur(detail: GoabInputOnBlurDetail) {
    this.logEvent("input blur", detail);
  }

  handleInputKeyPress(detail: GoabInputOnKeyPressDetail) {
    this.logEvent("input keypress", detail);
  }

  handleCheckboxChange(detail: GoabCheckboxOnChangeDetail) {
    this.logEvent("checkbox change", detail);
  }

  handleCheckboxListChange(detail: GoabCheckboxListOnChangeDetail) {
    this.logEvent("checkbox list change", detail);
  }

  handleDatePickerChange(detail: GoabDatePickerOnChangeDetail) {
    this.logEvent("date picker change", detail);
  }

  handleDropdownChange(detail: GoabDropdownOnChangeDetail) {
    this.logEvent("dropdown change", detail);
  }

  handleFileSelect(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.logEvent("file upload select", detail);
  }

  handleRadioGroupChange(detail: GoabRadioGroupOnChangeDetail) {
    this.logEvent("radio group change", detail);
  }

  handleTextareaChange(detail: GoabTextAreaOnChangeDetail) {
    this.logEvent("textarea change", detail);
  }

  handleTextareaKeyPress(detail: GoabTextAreaOnKeyPressDetail) {
    this.logEvent("textarea keypress", detail);
  }

  handleTextareaBlur(detail: GoabTextAreaOnBlurDetail) {
    this.logEvent("textarea blur", detail);
  }

  handleTabsChange(detail: GoabTabsOnChangeDetail) {
    this.logEvent("tabs change", detail);
  }

  handleTabInputOne(detail: GoabInputOnChangeDetail) {
    detail.event?.stopPropagation();
    this.logEvent("tab 1 input change (stopPropagation)", detail);
  }

  handleTabInputTwo(detail: GoabInputOnChangeDetail) {
    this.logEvent("tab 2 input change", detail);
  }

  handleTabInputThree(detail: GoabInputOnChangeDetail) {
    this.logEvent("tab 3 input change", detail);
  }
}
