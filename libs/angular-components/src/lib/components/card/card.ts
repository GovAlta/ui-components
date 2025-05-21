import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, numberAttribute } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-card",
  template: `
    <goa-card
      [attr.elevation]="elevation"
      [attr.width]="width"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-card>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCard extends GoabBaseComponent {
  @Input({ transform: numberAttribute }) elevation?: number;
  @Input() width?: string;
}
