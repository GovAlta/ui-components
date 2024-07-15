import { GoABIconType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-side-menu-heading",
  template: `
    <goa-side-menu-heading [attr.data-testid]="testId" [attr.icon]="icon">
      <ng-content />
    </goa-side-menu-heading>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABSideMenuHeading {
  @Input() icon!: GoABIconType;
  @Input() testId?: string;
}
