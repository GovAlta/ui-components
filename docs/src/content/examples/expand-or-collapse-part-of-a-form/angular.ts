import { Component } from "@angular/core";

@Component({
  selector: "app-expand-collapse-form",
  templateUrl: "./angular.html",
  styles: [
    `
      dl.accordion-example {
        margin: 0 0;
      }
      .accordion-example dt {
        color: var(--goa-color-text-default);
        font: var(--goa-typography-heading-s);
        margin-bottom: var(--goa-space-xs);
      }
      .accordion-example dd {
        margin: 0 0 var(--goa-space-l);
        font: var(--goa-typography-body-m);
      }
      .accordion-example dd:last-of-type {
        margin-bottom: 0;
      }
    `,
  ],
})
export class ExpandCollapseFormComponent {
  // No logic required for this static example
}
