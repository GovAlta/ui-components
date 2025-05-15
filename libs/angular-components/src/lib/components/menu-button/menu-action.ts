import { GoabIconType } from "@abgov/ui-components-common";

import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "goab-menu-action",
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
export class GoabMenuAction {
  @Input({required: true}) text!: string;
  @Input({required: true}) action!: string;
  @Input() icon?: GoabIconType;
  @Input() testId?: string;
}
