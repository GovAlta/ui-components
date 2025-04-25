import { GoabBadgeType, Spacing } from "@abgov/ui-components-common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

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
export class GoabBadge extends GoabBaseComponent {
  @Input() type?: GoabBadgeType;
  @Input() content?: string;
  @Input() icon?: boolean;
  @Input() ariaLabel?: string;
}
