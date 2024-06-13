import { GoABAccordionHeadingSize, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-accordion",
  template: `
    <goa-accordion
      [attr.heading]="heading"
      [attr.secondarytext]="secondaryText"
      [attr.open]="open"
      [attr.headingsize]="headingSize"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-accordion>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABAccordion {
  @Input() heading?: string;
  @Input() secondaryText?: string;
  @Input() testId?: string;
  @Input() open?: boolean;
  @Input() headingSize?: GoABAccordionHeadingSize;

  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
