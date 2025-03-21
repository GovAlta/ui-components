import { GoabWorkSideMenuItemType, GoabWorkSideMenuItemVariation } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-work-side-menu-item",
  template: `
    <goa-work-side-menu-item
      [attr.label]="label"
      [attr.url]="url"
      [attr.badge]="badge"
      [attr.current]="current"
      [attr.divider]="divider"
      [attr.icon]="icon"
      [attr.testid]="testId"
      [attr.type]="type"
      [attr.variation]="variation"
    >
      <ng-content />
    </goa-work-side-menu-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabWorkSideMenuItem {
  @Input() label?: string;
  @Input() url?: string;
  @Input() badge?: string;
  @Input() current?: boolean;
  @Input() divider?: boolean;
  @Input() icon?: string;
  @Input() testId?: string;
  @Input() type?: GoabWorkSideMenuItemType = "normal";
  @Input() variation?: GoabWorkSideMenuItemVariation = "normal";
}
