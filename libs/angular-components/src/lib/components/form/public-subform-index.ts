import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  selector: "goab-public-subform-index",
  standalone: true,
  host: {
    slot: "subform-index",
  },
  template: `
    <goa-public-subform-index
      [attr.heading]="heading"
      [attr.section-title]="sectionTitle"
      [attr.action-button-text]="actionButtonText"
      [attr.button-visibility]="buttonVisibility"
      [attr.mt]="mt"
      [attr.mr]="mr"
      [attr.mb]="mb"
      [attr.ml]="ml"
    >
      <ng-content />
    </goa-public-subform-index>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Container for form inputs and validation. */
export class GoabPublicSubformIndex extends GoabBaseComponent {
  /** Sets the heading text of the subform index page. */
  @Input() heading?: string = "";
  /** Sets the section title displayed above the heading. */
  @Input() sectionTitle?: string = "";
  /** Sets the text for the action button that navigates to the subform. */
  @Input() actionButtonText?: string = "";
  /** Sets the visibility of the continue button. @default "hidden" */
  @Input() buttonVisibility?: "visible" | "hidden" = "hidden";
}
