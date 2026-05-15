import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-slotted-helper-text-in-a-form-item",
  templateUrl: "./angular.html",
})
export class SlottedHelperTextInAFormItemComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      item: [""],
    });
  }
}
