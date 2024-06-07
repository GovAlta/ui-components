import { Component } from "@angular/core";

@Component({
  selector: "goab-form-stepper",
  templateUrl: "./form-stepper.component.html",
})
export class FormStepperComponent {
  step = -1;

  // controlled by the user based on form completion
  status = ["complete", "complete", "incomplete"];

  updateStep(event: Event) {
    console.log((event as CustomEvent).detail)
    this.step = (event as CustomEvent).detail.step;
  }

  setPage(page: number) {
    console.log("setting page..", page)
    if (page < 1 || page > 4) return;
    this.step = page;
  }
}
