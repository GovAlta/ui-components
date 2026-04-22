import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  GoabDetails, GoabText, GoabFormItem, GoabInput, GoabButton,
  GoabLink, GoabTextArea, GoabButtonGroup, GoabRadioGroup, GoabRadioItem, GoabBlock,
} from "@abgov/angular-components";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-details",
  templateUrl: "./details.component.html",
  imports: [GoabDetails, GoabText, GoabFormItem, GoabInput, GoabButton, GoabLink, GoabTextArea, GoabButtonGroup, GoabRadioGroup, GoabRadioItem, GoabBlock, ReactiveFormsModule],
})
export class DocsDetailsComponent {
  form = new FormGroup({
    bankNumber: new FormControl(""),
    transitNumber: new FormControl(""),
    accountNumber: new FormControl(""),
  });

  contextForm = new FormGroup({
    program: new FormControl(""),
  });

  onSubmit(): void {
    console.log("Submitted:", this.form.value);
  }

  onContinue(): void {
    console.log("Submitted:", this.contextForm.get("program")?.value);
  }

  onRadioChange(event: GoabRadioGroupOnChangeDetail): void {
    console.log("value is", event.value);
  }
}
