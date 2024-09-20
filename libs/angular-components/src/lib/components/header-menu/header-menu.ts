import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabIconType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-app-header-menu",
  template: `
    <goa-app-header-menu
      [attr.leadingicon]="leadingIcon"
      [attr.heading]="heading"
      [attr.data-testid]="testId"
    >
      <ng-content />
    </goa-app-header-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabAppHeaderMenu {
  @Input() leadingIcon?: GoabIconType;
  @Input() heading?: string;
  @Input() testId?: string;
}
