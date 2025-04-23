import { GoabIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-link",
  template: `
    <goa-link
      [attr.leadingicon]="leadingIcon"
      [attr.trailingicon]="trailingIcon"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-link>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabLink {
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
