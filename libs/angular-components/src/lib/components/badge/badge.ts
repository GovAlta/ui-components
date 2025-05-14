import { GoabBadgeType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
} from "@angular/core";
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
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class GoabBadge extends GoabBaseComponent {
  @Input() type?: GoabBadgeType;
  @Input() content?: string;
  @Input({ transform: booleanAttribute }) icon?: boolean;
  @Input() ariaLabel?: string;
}
