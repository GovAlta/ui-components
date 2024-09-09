import { GoabIconType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-side-menu-heading",
  imports: [NgTemplateOutlet],
  template: `
    <goa-side-menu-heading [attr.data-testid]="testId" [attr.icon]="icon">
      <ng-content />
      <span slot="meta">
        <ng-container [ngTemplateOutlet]="meta"></ng-container>
      </span>
    </goa-side-menu-heading>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSideMenuHeading {
  @Input() icon!: GoabIconType;
  @Input() testId?: string;
  @Input() meta!: TemplateRef<any>;
}
