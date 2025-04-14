import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import {
  GoabTextColor,
  GoabTextHeadingElement,
  GoabTextMaxWidth,
  GoabTextSize,
  GoabTextTextElement, Spacing,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: 'goab-text',
  template: `
    <goa-text
      [attr.as]="tag"
      [attr.size]="size"
      [attr.maxwidth]="maxWidth"
      [attr.color]="color"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr">
      <ng-content />
    </goa-text>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabText {
  @Input() tag?: GoabTextTextElement | GoabTextHeadingElement;
  @Input() size?: GoabTextSize;
  @Input() maxWidth?: GoabTextMaxWidth;
  @Input() color?: GoabTextColor;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
