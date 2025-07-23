import {
  GoabCalloutAriaLive,
  GoabCalloutSize,
  GoabCalloutType,
  GoabCalloutEmphasis,
  GoabCalloutIconTheme,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-callout",
  template: `
    <goa-callout
      [attr.type]="type"
      [attr.heading]="heading"
      [attr.size]="size"
      [attr.emphasis]="emphasis"
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCallout extends GoabBaseComponent {
  @Input() type?: GoabCalloutType = "information";
  @Input() heading?: string = "";
  @Input() size?: GoabCalloutSize = "large";
  @Input() emphasis?: GoabCalloutEmphasis = "medium";
  @Input() maxWidth?: string;
  @Input() ariaLive?: GoabCalloutAriaLive = "off";
  @Input() iconTheme?: GoabCalloutIconTheme = "outline";
}
