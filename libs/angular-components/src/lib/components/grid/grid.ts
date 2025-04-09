import { Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-grid",
  template: `
    <goa-grid
      [attr.gap]="gap"
      [attr.minchildwidth]="minChildWidth"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-grid>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabGrid extends GoabBaseComponent {
  @Input({ required: true }) minChildWidth!: string;
  @Input() gap?: Spacing;
}
