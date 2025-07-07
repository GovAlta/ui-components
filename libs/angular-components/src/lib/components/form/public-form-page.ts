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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicFormPage extends GoabBaseComponent {
  @Input() id = "";
  @Input() heading = "";
  @Input() subHeading = "";
  @Input() summaryHeading = "";
  @Input() sectionTitle = "";
  @Input() backUrl = "";
  @Input() type: GoabPublicFormPageStep = "step";
  @Input() buttonText = "";
  @Input() buttonVisibility : GoabPublicFormPageButtonVisibility = "visible";

  /**
   * triggers when the form page continues to the next step
   */
  @Output() onContinue = new EventEmitter<Event>();

  _onContinue(event: Event) {
    this.onContinue.emit(event);
  }
}
