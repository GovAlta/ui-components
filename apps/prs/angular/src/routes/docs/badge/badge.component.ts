import { Component } from "@angular/core";
import {
  GoabAccordion, GoabBadge, GoabBlock, GoabButton, GoabContainer, GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-badge",
  templateUrl: "./badge.component.html",
  imports: [GoabAccordion, GoabBadge, GoabBlock, GoabButton, GoabContainer, GoabText],
  styles: [`
    .case-file-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--goa-space-m);
    }
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
  `],
})
export class DocsBadgeComponent {}
