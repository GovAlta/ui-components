import { GoABCalloutSize, GoABCalloutType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-callout",
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
export class GoABCallout {
  @Input() type?: GoABCalloutType;
  @Input() heading?: string = "";
  @Input() size?: GoABCalloutSize;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

