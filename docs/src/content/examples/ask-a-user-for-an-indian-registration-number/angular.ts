import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-ask-a-user-for-an-indian-registration-number",
  templateUrl: "./angular.html",
})
export class AskAUserForAnIndianRegistrationNumberComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bandNo: [""],
      family: [""],
      position: [""],
    });
  }
}
