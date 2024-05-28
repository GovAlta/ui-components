import { GoABIconButtonVariant, GoABIconSize, GoABIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-icon-button",
  template: `
    <goa-icon-button
      [icon]="icon"
      [size]="size"
      [variant]="variant"
      [title]="title"
      [disabled]="disabled"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (onClick)="_onClick($event)"
    >
    </goa-icon-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABIconButton {
  @Input() icon?: GoABIconType;
  @Input() size?: GoABIconSize = "medium";
  @Input() variant?: GoABIconButtonVariant;
  @Input() title?: string;
  @Input() disabled?: boolean;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onClick = new EventEmitter();

  _onClick(_: any) {
    this.onClick.emit()
  }
}
