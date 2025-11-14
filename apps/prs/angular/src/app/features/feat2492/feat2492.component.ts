import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabFormItem,
  GoabGrid,
  GoabInput,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";
import { GoabTextAreaOnBlurDetail, GoabTextAreaOnChangeDetail, GoabTextAreaOnKeyPressDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat2492",
  templateUrl: "./feat2492.component.html",
  styleUrls: ["./feat2492.component.css"],
  imports: [
    CommonModule,
    GoabBlock,
    GoabFormItem,
    GoabGrid,
    GoabInput,
    GoabText,
    GoabTextArea,
  ],
})
export class Feat2492Component {
  lastBlurValue = "";
  blurCount = 0;
  textareaValue = "";
  changeLog: GoabTextAreaOnChangeDetail[] = [];
  keyPressLog: GoabTextAreaOnKeyPressDetail[] = [];

  handleBlur(event: GoabTextAreaOnBlurDetail) {
    this.lastBlurValue = event.value ?? "";
    this.blurCount += 1;
  }

  handleChange(event: GoabTextAreaOnChangeDetail) {
    this.textareaValue = event.value ?? "";
    this.changeLog = [...this.changeLog, event].slice(-5);
  }

  handleKeyPress(event: GoabTextAreaOnKeyPressDetail) {
    this.keyPressLog = [...this.keyPressLog, event].slice(-8);
  }
}
