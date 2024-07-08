import { GoABIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-chip",
  template: `<goa-chip
    [attr.leadingicon]="leadingIcon"
    [attr.error]="error"
    [attr.deletable]="deletable"
    [attr.content]="content"
    [attr.data-testid]="testId"
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
export class GoABChip {
  @Input() leadingIcon?: GoABIconType | null;
  @Input() error?: boolean;
  @Input() deletable?: boolean;
  @Input() content?: string = "";
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
