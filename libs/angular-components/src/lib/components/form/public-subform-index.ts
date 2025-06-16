import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  selector: "goab-public-subform-index",
  standalone: true,
  host: {
    'slot': 'subform-index'
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
export class GoabPublicSubformIndex extends GoabBaseComponent {
  @Input() heading?: string = "";
  @Input() sectionTitle?: string = "";
  @Input() actionButtonText?: string = "";
  @Input() buttonVisibility?: "visible" | "hidden" = "hidden";
}
