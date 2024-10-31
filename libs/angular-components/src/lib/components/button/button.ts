import { GoabButtonSize, GoabButtonType, GoabButtonVariant, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-button",
  template: `
    <goa-button
      [attr.type]="type"
      [attr.size]="size"
      [attr.variant]="variant"
      [disabled]="disabled"
      [attr.leadingicon]="leadingIcon"
      [attr.trailingicon]="trailingIcon"
      [attr.width]="width"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_click)="_onClick()"
    >
      <ng-content />
    </goa-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabButton {
  @Input() type?: GoabButtonType = "primary";
  @Input() size?: GoabButtonSize;
  @Input() variant?: GoabButtonVariant;
  @Input() disabled?: boolean;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() width?: string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
