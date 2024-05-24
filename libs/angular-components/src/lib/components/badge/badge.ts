import { ABGovBadgeType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { ABGovIcon } from "../icon/icon";

@Component({
  standalone: true,
  selector: "abgov-badge",
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
export class ABGovBadge {
  @Input() type?: ABGovBadgeType;
  @Input() content?: string;
  @Input() testId?: string;
  @Input() icon?: ABGovIcon;
  @Input() ariaLabel?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
