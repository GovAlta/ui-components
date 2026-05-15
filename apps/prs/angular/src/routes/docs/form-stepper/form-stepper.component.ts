import { Component } from "@angular/core";
import { GoabFormStep, GoabFormStepper } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-form-stepper",
  templateUrl: "./form-stepper.component.html",
  imports: [GoabFormStep, GoabFormStepper],
})
export class DocsFormStepperComponent {}
