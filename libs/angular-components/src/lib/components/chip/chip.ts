import { GoabChipTheme, GoabChipVariant, GoabIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-chip",
  template: `<goa-chip
    [attr.leadingicon]="leadingIcon"
    [attr.variant]="variant"
    [attr.error]="error"
    [attr.deletable]="deletable"
    [attr.icontheme]="iconTheme"
    [attr.content]="content"
    [attr.testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_click)="_onClick()"
  >
    <ng-content />
  </goa-chip>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabChip {
  @Input() leadingIcon?: GoabIconType | null;
  @Input() error?: boolean;
  @Input() deletable?: boolean;
  @Input() content?: string = "";
  @Input() testId?: string;
  @Input() variant?: GoabChipVariant;
  @Input() iconTheme?: GoabChipTheme;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
