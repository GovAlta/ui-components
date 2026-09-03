import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-limit-the-width-of-helper-text",
  templateUrl: "./angular.html",
})
export class LimitTheWidthOfHelperTextComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      legalName: [""],
    });
  }
}
