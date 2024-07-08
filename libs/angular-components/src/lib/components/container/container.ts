import { GoABContainerAccent, GoABContainerPadding, GoABContainerType, GoABContainerWidth, GoABIconSize, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-container",
  template: `<goa-container
    [attr.type]="type"
    [attr.accent]="accent"
    [attr.padding]="padding"
    [attr.width]="width"
    [attr.data-testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
  >
    <ng-content select="[slot=title]" />
    <ng-content />
    <ng-content select="[slot=actions]" />
  </goa-container>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABContainer {
  @Input() type?: GoABContainerType = "interactive";
  @Input() accent?: GoABContainerAccent = "filled";
  @Input() padding?: GoABContainerPadding = "relaxed";
  @Input() width?: GoABContainerWidth = "full";
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

