import {
  GoabChipTheme,
  GoabChipVariant,
  GoabIconType,
} from "@abgov/ui-components-common";
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
export class GoabChip extends GoabBaseComponent {
  @Input() leadingIcon?: GoabIconType | null;
  @Input() error?: boolean;
  @Input() deletable?: boolean;
  @Input() content?: string = "";
  @Input() variant?: GoabChipVariant;
  @Input() iconTheme?: GoabChipTheme;

  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
