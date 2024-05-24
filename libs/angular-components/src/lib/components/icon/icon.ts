import { ABGovIconSize, ABGovIconTheme, ABGovIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-icon",
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
export class ABGovIcon {
  @Input({ required: true }) type!: ABGovIconType;
  @Input() size?: ABGovIconSize = "medium";
  @Input() theme?: ABGovIconTheme = "outline";
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
