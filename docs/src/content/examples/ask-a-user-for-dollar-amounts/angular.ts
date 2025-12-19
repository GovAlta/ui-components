import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-ask-a-user-for-dollar-amounts",
  templateUrl: "./angular.html",
})
export class AskAUserForDollarAmountsComponent {
  costFormGroup = new FormGroup({
    tuitionFeeAmount: new FormControl(""),
    suppliesAmount: new FormControl(""),
    othersAmount: new FormControl(""),
  });
}
