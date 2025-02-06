import { GoabChipTheme, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-filter-chip",
  template: `<goa-filter-chip
    [attr.error]="error"
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
  </goa-filter-chip>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFilterChip {
  @Input() error?: boolean;
  @Input() deletable?: boolean;
  @Input() content?: string = "";
  @Input() testId?: string;
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
