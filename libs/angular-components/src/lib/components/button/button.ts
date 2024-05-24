import { GoABButtonSize, GoABButtonType, GoABButtonVariant, GoABIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-button",
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
      (_click)="_onClick()"
    >
      <ng-content />
    </goa-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABButton {
  @Input() type?: GoABButtonType = "primary";
  @Input() size?: GoABButtonSize;
  @Input() variant?: GoABButtonVariant;
  @Input() disabled?: boolean;
  @Input() leadingIcon?: GoABIconType;
  @Input() trailingIcon?: GoABIconType;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onClick = new EventEmitter();

  _onClick() {
    console.log("button emit click")
    this.onClick.emit();
  }
}
