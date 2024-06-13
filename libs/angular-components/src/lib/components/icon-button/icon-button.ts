import { GoABIconButtonVariant, GoABIconSize, GoABIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-icon-button",
  template: `
    <goa-icon-button
      [attr.icon]="icon"
      [attr.disabled]="disabled"
      [attr.size]="size"
      [attr.variant]="variant"
      [title]="title"
      [attr.arialabel]="ariaLabel"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_click)="_onClick()"
    >
      <ng-content></ng-content>
    </goa-icon-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABIconButton {
  @Input({ required: true }) icon!: GoABIconType;
  @Input() size?: GoABIconSize = "medium";
  @Input() variant?: GoABIconButtonVariant;
  @Input() title?: string;
  @Input() disabled?: boolean;
  @Input() ariaLabel?: string;
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
