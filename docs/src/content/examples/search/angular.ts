import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./angular.html",
})
export class SearchComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [""],
    });
  }

  onClick(): void {
    console.log("search:", this.form.controls["search"].value);
  }
}
