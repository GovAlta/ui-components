import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";
import {
  GoabPublicFormPageButtonVisibility, GoabPublicFormPageOnFieldsetChangeDetail, GoabPublicFormPageOnCompleteDetail,
  GoabPublicFormPageOnContinueDetail,
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
     [attr.first]="first"
     [attr.last]="last"
     [attr.summary-heading]="summaryHeading"
     [attr.mt]="mt"
     [attr.mr]="mr"
     [attr.mb]="mb"
     [attr.ml]="ml"
     (_continue)="_onContinue($event)"
     (_back)="_onBack()"
     (_fieldsetChange)="_onFieldsetChange($event)"
     (_complete)="_onComplete($event)"
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
  @Input() first = false;
  @Input() last = false;

  /**
   * triggers when the form page continues to the next step
   */
  @Output() onContinue = new EventEmitter<GoabPublicFormPageOnContinueDetail>();

  /**
   * triggers when the user clicks the back link
   */
  @Output() onBack = new EventEmitter<void>();

  /**
   * triggers when the form fieldset content changes
   */
  @Output() onFieldsetChange = new EventEmitter<GoabPublicFormPageOnFieldsetChangeDetail>();

  /**
   * triggers when the form is completed
   */
  @Output() onComplete = new EventEmitter<GoabPublicFormPageOnCompleteDetail>();

  _onContinue(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.onContinue.emit(detail);
  }

  _onBack() {
    this.onBack.emit();
  }

  _onFieldsetChange(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.onFieldsetChange.emit(detail);
  }

  _onComplete(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.onComplete.emit(detail);
  }
}
