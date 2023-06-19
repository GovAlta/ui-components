import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.css"],
})
export class CheckboxComponent {
  checkbox1Checked = false;
  checkbox2Checked = true;
  checkbox3Checked = false;
  reactiveFormCtrl = new FormControl();
  testFormCtrl = new FormControl("checked");
  test1FormCtrl = new FormControl();
  bindingVal = "";
  bindingNoVal = "";

  constructor() {}

  onChange() {
    this.checkbox1Checked = !this.checkbox1Checked;
  }

  onChange2() {
    this.checkbox2Checked = !this.checkbox2Checked;
  }

  onChange3() {
    this.checkbox3Checked = !this.checkbox3Checked;
  }
}
