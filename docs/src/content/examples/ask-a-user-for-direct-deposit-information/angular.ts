import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-ask-a-user-for-direct-deposit-information",
  templateUrl: "./angular.html",
})
export class AskAUserForDirectDepositInformationComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bankNumber: [""],
      transitNumber: [""],
      accountNumber: [""],
    });
  }
}
