import {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-button-group",
  template: `
    <goa-button-group
      [attr.alignment]="alignment"
      [attr.gap]="gap"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-button-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabButtonGroup extends GoabBaseComponent {
  @Input() alignment?: GoabButtonGroupAlignment;
  @Input() gap?: GoabButtonGroupGap;
}
