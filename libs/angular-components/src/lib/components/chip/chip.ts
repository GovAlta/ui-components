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
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-chip",

  template: `@if (isReady) {
    <goa-chip
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
    </goa-chip>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Compact element for labels, tags, or selections. */
export class GoabChip extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  /** @deprecated Use GoabFilterChip (goab-filter-chip) instead. Icon displayed at the start of the chip. */
  @Input() leadingIcon?: GoabIconType | null;
  /** @deprecated Use GoabFilterChip (goab-filter-chip) instead. Shows an error state on the chip. */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /** @deprecated Use GoabFilterChip (goab-filter-chip) instead. When true, shows a delete icon and makes chip clickable. */
  @Input({ transform: booleanAttribute }) deletable?: boolean;
  /** @deprecated Use GoabFilterChip (goab-filter-chip) instead. The text content displayed in the chip. */
  @Input() content?: string = "";
  /** @deprecated Use GoabFilterChip (goab-filter-chip) instead. The chip variant style. */
  @Input() variant?: GoabChipVariant;
  /** @deprecated Use GoabFilterChip (goab-filter-chip) instead. The icon theme - outline or filled. */
  @Input() iconTheme?: GoabChipTheme;

  /** Emits when the chip is clicked. */
  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
