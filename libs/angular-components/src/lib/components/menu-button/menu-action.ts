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
  /**
   * The button label text.
   * @required
   */
  @Input({ required: true }) text!: string;
  /**
   * Action identifier passed in click events for event delegation patterns.
   * @required
   */
  @Input({ required: true }) action!: string;
  /** Icon displayed before the text. */
  @Input() icon?: GoabIconType;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;
}
