import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { GoabFormItem, GoabInput, GoabTextArea } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3964",
  templateUrl: "./bug3964.component.html",
  imports: [ReactiveFormsModule, FormsModule, GoabFormItem, GoabInput, GoabTextArea],
})
export class Bug3964Component {
  form = new FormGroup({
    lastName: new FormControl("", Validators.required),
    bio: new FormControl("", Validators.required),
  });

  // Template-driven (ngModel) values
  ngModelLastName = "";
  ngModelBio = "";

  get lastNameError() {
    const control = this.form.get("lastName");
    return control && !control.valid && control.touched && control.hasError("required")
      ? "Enter a last name."
      : undefined;
  }

  get bioError() {
    const control = this.form.get("bio");
    return control && !control.valid && control.touched && control.hasError("required")
      ? "Enter a bio."
      : undefined;
  }
}
