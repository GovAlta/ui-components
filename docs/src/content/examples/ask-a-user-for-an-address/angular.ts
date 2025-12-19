import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-ask-a-user-for-an-address",
  templateUrl: "./angular.html",
})
export class AskAUserForAnAddressComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: [""],
      suite: [""],
      city: [""],
      province: [""],
      postalCode: [""],
    });
  }

  onClick() {
    // Handle form submission
  }
}
