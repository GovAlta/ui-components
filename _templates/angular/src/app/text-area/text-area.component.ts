import { Component } from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: "goab-text-area",
  templateUrl: "./text-area.component.html",
})
export class TextAreaComponent {
  boundVal = "";
  reactiveFormCtrl = new FormControl();
  form = new FormGroup({
    textarea: new FormControl(),
    input: new FormControl(),
  })

  constructor() { }

  onChange(e: any) {
    console.log("changed", e.detail.name, e.detail.value);
  }

  onKeyPress(e: any) {
    console.log("changed", e.detail.name, e.detail.value, e.detail.key);
  }
}
