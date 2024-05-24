import { ABGovButtonGroupAlignment, ABGovButtonGroupGap, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-button-group",
  template: `
    <goa-button-group
      [alignment]="alignment"
      [gap]="gap"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <ng-content />
    </goa-button-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovButtonGroup {
  @Input() alignment?: ABGovButtonGroupAlignment;
  @Input() gap?: ABGovButtonGroupGap;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
