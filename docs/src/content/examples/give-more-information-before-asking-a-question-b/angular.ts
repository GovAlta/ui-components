import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-give-context-long-answer",
  templateUrl: "./angular.html",
})
export class GiveContextLongAnswerComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      program: [""],
    });
  }

  onContinue(): void {
    console.log("Submitted:", this.form.get("program")?.value);
  }
}
