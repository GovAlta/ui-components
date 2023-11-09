import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.css"],
})
export class TextAreaComponent {
  boundVal = "";
  reactiveFormCtrl = new FormControl();

  constructor() { }

  onChange(e: any) {
    console.log("changed", e.detail.name, e.detail.value);
  }

  onKeyPress(e: any) {
    console.log("changed", e.detail.name, e.detail.value, e.detail.key);
  }
}
