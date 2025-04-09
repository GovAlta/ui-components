import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Spacing,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-block",
  template: `
    <goa-block
      [attr.gap]="gap"
      [attr.direction]="direction"
      [attr.alignment]="alignment"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-block>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabBlock extends GoabBaseComponent {
  @Input() gap?: Spacing;
  @Input() direction?: GoabBlockDirection;
  @Input() alignment?: GoabBlockAlignment;
}
