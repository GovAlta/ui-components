import { GoabCalloutAriaLive, GoabCalloutSize, GoabCalloutType, Spacing, GoabCalloutIconTheme} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-callout",
  template: `
    <goa-callout
      [attr.type]="type"
      [attr.heading]="heading"
      [attr.size]="size"
      [attr.maxwidth]="maxWidth"
      [attr.arialive]="ariaLive"
      [attr.icontheme]="iconTheme"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-callout>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCallout {
  @Input() type?: GoabCalloutType = "information";
  @Input() heading?: string = "";
  @Input() size?: GoabCalloutSize = "large";
  @Input() maxWidth?: string;
  @Input() ariaLive?: GoabCalloutAriaLive = "off";
  @Input() iconTheme?: GoabCalloutIconTheme = "outline";
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

