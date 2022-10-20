import { Component } from "@angular/core";

@Component({
  selector: "abgov-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.css"],
})
export class TextAreaComponent {
  characterCountFieldValue = "";
  characterCountWithLimitValue = "";

  boundVal = "";

  constructor() {}

  onChange(e: any) {
    console.log("changed", e.detail.name, e.detail.value);
  }

  characterCountOnChange(e: any) {
    this.characterCountFieldValue = e.detail.value;
    console.log("changed", e.detail.name, e.detail.value);
  }

  characterCountWithLimitOnChange(e: any) {
    this.characterCountWithLimitValue = e.detail.value;
    console.log("changed", e.detail.name, e.detail.value);
  }
}
