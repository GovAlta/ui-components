import { GoabButtonGroupAlignment, GoabButtonGroupGap, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-button-group",
  template: `
    <goa-button-group
      [attr.alignment]="alignment"
      [attr.gap]="gap"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-button-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabButtonGroup {
  @Input() alignment?: GoabButtonGroupAlignment;
  @Input() gap?: GoabButtonGroupGap;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
