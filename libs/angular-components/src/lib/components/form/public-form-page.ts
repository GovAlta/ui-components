import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";
import {
  GoabPublicFormPageButtonVisibility,
  GoabPublicFormPageStep,
} from "@abgov/ui-components-common";

@Component({
  selector: "goab-public-form-page",
  standalone: true,
  template: `
    <goa-public-form-page
      [id]="id"
      [attr.heading]="heading"
      [attr.sub-heading]="subHeading"
      [attr.section-title]="sectionTitle"
      [attr.back-url]="backUrl"
      [attr.type]="type"
      [attr.button-text]="buttonText"
      [attr.button-visibility]="buttonVisibility"
      [attr.summary-heading]="summaryHeading"
      [attr.mt]="mt"
      [attr.mr]="mr"
      [attr.mb]="mb"
      [attr.ml]="ml"
      (_continue)="_onContinue($event)"
    >
      <ng-content></ng-content>
    </goa-public-form-page>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Container for form inputs and validation. */
export class GoabPublicFormPage extends GoabBaseComponent {
  /** Sets the id of the form page. */
  @Input() id = "";
  /** Sets the main heading text of the form page. */
  @Input() heading = "";
  /** Sets the sub-heading text displayed below the main heading. */
  @Input() subHeading = "";
  /** Sets the heading used in the summary view for this page. */
  @Input() summaryHeading = "";
  /** Sets the section title displayed above the heading. */
  @Input() sectionTitle = "";
  /** Sets the URL for the back navigation link. */
  @Input() backUrl = "";
  /** Sets the type of the form page step. @default "step" */
  @Input() type: GoabPublicFormPageStep = "step";
  /** Sets the text for the continue or confirm button. */
  @Input() buttonText = "";
  /** Sets the visibility of the continue button. @default "visible" */
  @Input() buttonVisibility: GoabPublicFormPageButtonVisibility = "visible";

  /** Emits when the form page continues to the next step. */
  @Output() onContinue = new EventEmitter<Event>();

  _onContinue(event: Event) {
    this.onContinue.emit(event);
  }
}
