import { ABGovContainerAccent, ABGovContainerPadding, ABGovContainerType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-container",
  template: `<goa-container
    [type]="type"
    [accent]="accent"
    [padding]="padding"
    [testid]="testId"
    [mt]="mt"
    [mb]="mb"
    [ml]="ml"
    [mr]="mr"

  >
    <ng-content />
  </goa-container>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovContainer {
  @Input() type?: ABGovContainerType;
  @Input() accent?: ABGovContainerAccent;
  @Input() padding?: ABGovContainerPadding;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

