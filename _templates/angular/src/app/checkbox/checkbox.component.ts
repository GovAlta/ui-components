import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "goab-checkbox",
  templateUrl: "./checkbox.component.html",
})
export class CheckboxComponent {
  checkbox1Checked = false;
  checkbox2Checked = true;
  checkbox3Checked = false;
  reactiveFormCtrl = new FormControl();
  testFormCtrl = new FormControl({
    value: null,
    disabled: true
  });
  test1FormCtrl = new FormControl();
  bindingVal = "";
  bindingNoVal = "";

  constructor() {
   // this.testFormCtrl.disable();
  }

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
