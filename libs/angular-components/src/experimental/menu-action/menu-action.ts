import { GoabIconType } from "@abgov/ui-components-common";

import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goabx-menu-action",
  template: `
    <goa-menu-action
      [attr.text]="text"
      [attr.action]="action"
      [attr.icon]="icon"
      [attr.testid]="testId"
    >
    </goa-menu-action>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxMenuAction {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) action!: string;
  @Input() icon?: GoabIconType;
  @Input() testId?: string;
}
