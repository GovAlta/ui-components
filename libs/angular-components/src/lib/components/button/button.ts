import { ABGovButtonSize, ABGovButtonType, ABGovButtonVariant, ABGovIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-button",
  template: `
    <goa-button
      [type]="type"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [leadingicon]="leadingIcon"
      [trailingicon]="trailingIcon"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (_click)="_onClick($event)"
    >
      <ng-content />
    </goa-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovButton {
  @Input() type?: ABGovButtonType;
  @Input() size?: ABGovButtonSize;
  @Input() variant?: ABGovButtonVariant;
  @Input() disabled?: boolean;
  @Input() leadingIcon?: ABGovIconType;
  @Input() trailingIcon?: ABGovIconType;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onClick = new EventEmitter();

  _onClick(_: any) {
    this.onClick.emit();
  }
}
