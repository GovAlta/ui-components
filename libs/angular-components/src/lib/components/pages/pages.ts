import { Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, numberAttribute } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-pages",
  template: `
    <goa-pages
      [attr.current]="current"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-pages>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPages extends GoabBaseComponent {
  @Input({ transform: numberAttribute }) current?: number;
}
