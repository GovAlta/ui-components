import { GoabChipTheme } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

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
export class GoabFilterChip extends GoabBaseComponent {
  @Input() error?: boolean;
  @Input() deletable?: boolean;
  @Input() content?: string = "";
  @Input() iconTheme?: GoabChipTheme;

  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
