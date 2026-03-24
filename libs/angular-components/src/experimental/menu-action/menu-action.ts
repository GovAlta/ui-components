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
  /** The button label text. */
  @Input({required: true}) text!: string;
  /** Action identifier passed in click events for event delegation patterns. */
  @Input({required: true}) action!: string;
  @Input() icon?: GoabIconType;
  @Input() testId?: string;
}
