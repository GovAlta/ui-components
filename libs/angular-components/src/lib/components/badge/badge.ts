import { GoABBadgeType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoABIcon } from "../icon/icon";

@Component({
  standalone: true,
  selector: "goab-badge",
  template: `
    <goa-badge
      [type]="type"
      [icon]="icon"
      [arialabel]="ariaLabel"
      [content]="content"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
    </goa-badge>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABBadge {
  @Input() type?: GoABBadgeType;
  @Input() content?: string;
  @Input() testId?: string;
  @Input() icon?: GoABIcon;
  @Input() ariaLabel?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
