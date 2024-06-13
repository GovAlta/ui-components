import { GoABCheckbox } from "@abgov/angular-components";
import { GoABCheckboxOnChangeDetail } from "@abgov/ui-components-common";
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-checkbox",
  templateUrl: "./checkbox.component.html",
  imports: [
    GoABCheckbox,
    ReactiveFormsModule,
  ]
})
export class CheckboxComponent {
  checkbox1Checked = false;
  checkbox2Checked = true;
  checkbox3Checked = false;
  reactiveFormCtrl = new FormControl("foobar");
  testFormCtrl = new FormControl({
    value: null,
    disabled: true
  });
  test1FormCtrl = new FormControl();
  bindingVal = "";
  bindingNoVal = "";

  constructor() {
  }

  onChange(e: GoABCheckboxOnChangeDetail) {
    console.log(e)
    this.checkbox1Checked = !this.checkbox1Checked;
  }

  onChange2(e: GoABCheckboxOnChangeDetail) {
    console.log(e)
    this.checkbox2Checked = !this.checkbox2Checked;
  }

  onChange3(e: GoABCheckboxOnChangeDetail) {
    console.log(e)
    this.checkbox3Checked = !this.checkbox3Checked;
  }
}
