import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabIconType } from "@abgov/ui-components-common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-side-menu-group",
  template: `
    <goa-side-menu-group
      [attr.heading]="heading"
      [attr.testid]="testId"
      [attr.icon]="icon"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-side-menu-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSideMenuGroup extends GoabBaseComponent {
  @Input({ required: true }) heading!: string;
  @Input() icon?: GoabIconType;
}
