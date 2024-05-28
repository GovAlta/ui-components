import { GoABIconSize, GoABIconTheme, GoABIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-icon",
  template: `
    <goa-icon
      [type]="type"
      [size]="size"
      [theme]="theme"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

    >
    </goa-icon>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABIcon {
  @Input({ required: true }) type!: GoABIconType;
  @Input() size?: GoABIconSize = "medium";
  @Input() theme?: GoABIconTheme = "outline";
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
