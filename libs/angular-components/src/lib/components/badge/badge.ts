import { GoabBadgeType, Spacing } from "@abgov/ui-components-common";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-badge",
  template: `
    <goa-badge
      [attr.type]="type"
      [attr.icon]="icon"
      [attr.arialabel]="ariaLabel"
      [attr.content]="content"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
    </goa-badge>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`:host { display: contents; }`],
})
export class GoabBadge {
  @Input() type?: GoabBadgeType;
  @Input() content?: string;
  @Input() testId?: string;
  @Input() icon?: boolean;
  @Input() ariaLabel?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
