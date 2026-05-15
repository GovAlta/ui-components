import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-reveal-input-based-on-a-selection",
  templateUrl: "./angular.html",
})
export class RevealInputBasedOnASelectionComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contactMethod: [""],
      phoneNumber: [""],
      emailAddress: [""],
      emailContactMethod: [false],
      phoneContactMethod: [false],
      textContactMethod: [false],
    });
  }
}
