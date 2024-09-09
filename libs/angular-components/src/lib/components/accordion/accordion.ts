import { GoabAccordionHeadingSize, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

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
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <div slot="headingcontent">
        <ng-container [ngTemplateOutlet]="headingContent"></ng-container>
      </div>
      <ng-content></ng-content>
    </goa-accordion>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabAccordion {
  @Input() heading?: string;
  @Input() secondaryText?: string;
  @Input() testId?: string;
  @Input() open?: boolean;
  @Input() headingSize?: GoabAccordionHeadingSize;
  @Input() headingContent!: TemplateRef<any>;
  @Input() maxWidth?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
