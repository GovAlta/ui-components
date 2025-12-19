import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-review-and-action",
  templateUrl: "./angular.html",
  styles: [
    `
    h3.review-h3 {
      margin-bottom: var(--goa-space-m);
    }
    label.review-label {
      font: var(--goa-typography-body-s);
      color: var(--goa-color-text-secondary);
    }
    .review-content {
      font: var(--goa-typography-body-m);
    }
    p.review-content {
      margin-bottom: 0;
    }
    h5.review-h5 {
      font: var(--goa-typography-body-m);
      color: var(--goa-color-text-secondary);
      margin-top: var(--goa-space-m);
      margin-bottom: var(--goa-space-m);
    }
    h6.review-h6 {
      font: var(--goa-typography-heading-s);
      margin-top: 0;
      margin-bottom: 0;
    }
  `,
  ],
})
export class ReviewAndActionComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      case: [""],
      reason: [""],
      message: [""],
    });
  }

  onClick(): void {
    console.log("Confirm clicked!");
  }
}
