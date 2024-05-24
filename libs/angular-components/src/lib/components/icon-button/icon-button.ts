import { ABGovIconButtonVariant, ABGovIconSize, ABGovIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-icon-button",
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
export class ABGovIconButton {
  @Input() icon?: ABGovIconType;
  @Input() size?: ABGovIconSize = "medium";
  @Input() variant?: ABGovIconButtonVariant;
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
