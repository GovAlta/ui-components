import { GoabIconType } from "@abgov/ui-components-common";

import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
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
  /** @required Display text for the menu action. */
  @Input({ required: true }) text!: string;
  /** @required Action identifier included in the click event. */
  @Input({ required: true }) action!: string;
  /** Icon displayed before the text. */
  @Input() icon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
}
