import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "goab-form-item",
  templateUrl: "./form-item.component.html",
})
export class FormItemComponent {
  formGroup = new FormGroup({
    txtRequesterName: new FormControl(),
  })

  form: FormGroup;
  colors: string[] = ["red", "green", "blue"];
  colorFormCtrl = new FormControl("");
  descriptionFormCtrl = new FormControl("");


  constructor() {
    this.form = new FormGroup({
      colorFormContrl: this.colorFormCtrl,
      descriptionFormCtrl: this.descriptionFormCtrl,
    });
  }
  searchRequesterClickIcon () {
    console.log("Current value ", this.formGroup.get("txtRequesterName")?.value);
    this.formGroup.get("txtRequesterName")?.patchValue("");
    console.log("New value ", this.formGroup.get("txtRequesterName")?.value);
  }

  onSubmit() {
    this.colorFormCtrl.setValidators([Validators.required]);
    this.colorFormCtrl.updateValueAndValidity();

    this.descriptionFormCtrl.setValidators([Validators.required]);
    this.descriptionFormCtrl.updateValueAndValidity();

    this.form.markAllAsTouched();

    if (this.form.valid) {
    }
  }

  onCancel() {

  }
}
