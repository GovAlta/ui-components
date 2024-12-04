import { GoabIconButtonVariant, GoabIconSize, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-icon-button",
  template: `
    <goa-icon-button
      [attr.icon]="icon"
      [disabled]="disabled"
      [attr.size]="size"
      [attr.variant]="variant"
      [title]="title"
      [attr.arialabel]="ariaLabel"
      [attr.testid]="testId"
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
export class GoabIconButton {
  @Input({ required: true }) icon!: GoabIconType;
  @Input() size?: GoabIconSize = "medium";
  @Input() variant?: GoabIconButtonVariant;
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
