import { ABGovCalloutSize, ABGovCalloutType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-callout",
  template: `
    <goa-callout
      [type]="type"
      [heading]="heading"
      [size]="size"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <ng-content />
    </goa-callout>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovCallout {
  @Input() type?: ABGovCalloutType;
  @Input() heading?: string = "";
  @Input() size?: ABGovCalloutSize;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

