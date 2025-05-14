import {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  booleanAttribute,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-accordion",
  imports: [NgTemplateOutlet],
  template: `
    <goa-accordion
      [attr.heading]="heading"
      [attr.secondarytext]="secondaryText"
      [attr.open]="open"
      [attr.headingsize]="headingSize"
      [attr.maxwidth]="maxWidth"
      [attr.testid]="testId"
      [attr.iconposition]="iconPosition"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <div slot="headingcontent">
        <ng-container [ngTemplateOutlet]="headingContent"></ng-container>
      </div>
      <ng-content></ng-content>
    </goa-accordion>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAccordion extends GoabBaseComponent {
  @Input() heading?: string;
  @Input() secondaryText?: string;
  @Input({ transform: booleanAttribute }) open?: boolean;
  @Input() headingSize?: GoabAccordionHeadingSize;
  @Input() headingContent!: TemplateRef<any>;
  @Input() maxWidth?: string;
  @Input() iconPosition?: GoabAccordionIconPosition;

  @Output() onChange = new EventEmitter<boolean>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent).detail;
    this.onChange.emit(detail.open as boolean);
  }
}
