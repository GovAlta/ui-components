import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-divider",
  template: `
    <goa-divider
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
    </goa-divider>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDivider extends GoabBaseComponent {}
