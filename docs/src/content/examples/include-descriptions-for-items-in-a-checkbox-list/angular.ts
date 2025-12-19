import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-include-descriptions-for-items",
  templateUrl: "./angular.html",
})
export class IncludeDescriptionsForItemsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectOne: ["1"],
    });
  }
}
