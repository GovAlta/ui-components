import { Component } from "@angular/core";
import {
  GoabInput,
  GoabText,
  GoabTextArea,
  GoabFormItem,
  GoabButton,
  GoabButtonGroup,
} from "@abgov/angular-components";
import {
  GoabInputOnChangeDetail,
  GoabInputOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnBlurDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3201",
  templateUrl: "./bug3201.component.html",
  imports: [GoabText, GoabInput, GoabTextArea, GoabFormItem, GoabButton, GoabButtonGroup],
})
export class Bug3201Component {
  inputValue = "";
  textAreaValue = "";
  inputChange = "";
  inputBlur = "";
  areaChange = "";
  areaBlur = "";

  handleInputChange(detail: GoabInputOnChangeDetail) {
    this.inputValue = detail.value;
    this.inputChange = "Input Change event fired";
    setTimeout(() => {
      this.inputChange = "";
    }, 500);
    console.log("Input change event fired");
  }

  handleInputBlur(detail: GoabInputOnBlurDetail) {
    this.inputValue = detail.value;
    this.inputBlur = "Input Blur event fired";
    setTimeout(() => {
      this.inputBlur = "";
    }, 500);
    console.log("Input blur event fired");
  }

  handleAreaChange(detail: GoabTextAreaOnChangeDetail) {
    this.textAreaValue = detail.value;
    this.areaChange = "Text Area Change event fired";
    setTimeout(() => {
      this.areaChange = "";
    }, 500);
    console.log("Text Area change event fired");
  }

  handleAreaBlur(detail: GoabTextAreaOnBlurDetail) {
    this.textAreaValue = detail.value;
    this.areaBlur = "Text Area Blur event fired";
    setTimeout(() => {
      this.areaBlur = "";
    }, 500);
    console.log("Text area blur event fired");
  }

  addInputText() {
    this.inputValue = "Different";
  }

  addTextAreaText() {
    this.textAreaValue = "This is some new text added to the text area";
  }
}
