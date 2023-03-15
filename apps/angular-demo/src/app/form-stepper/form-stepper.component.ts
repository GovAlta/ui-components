import { Component } from "@angular/core";

@Component({
  selector: "abgov-form-stepper",
  templateUrl: "./form-stepper.component.html",
})
export class FormStepperComponent {
  step = -1;
  // controlled by the user based on form completion
  status = ["complete", "complete", "incomplete"];
  updateStep(event: Event) {
    this.step = (event as CustomEvent).detail.step;
  }
  setPage(page: number) {
    if (page < 1 || page > 4) return;
    this.step = page;
  }
}
