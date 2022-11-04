import { Component } from "@angular/core";

@Component({
  selector: "abgov-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.css"],
})
export class TextAreaComponent {
  boundVal = "";

  constructor() {}

  onChange(e: any) {
    console.log("changed", e.detail.name, e.detail.value);
  }
}
