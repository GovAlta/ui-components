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
export class GoabChip extends GoabBaseComponent implements OnInit {
  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  /** @deprecated Use GoAFilterChip instead. Icon displayed at the start of the chip. */
  @Input() leadingIcon?: GoabIconType | null;
  /**
   * @deprecated Use GoAFilterChip instead. Shows an error state on the chip.
   * @default false
   */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /**
   * @deprecated Use GoAFilterChip instead. When true, shows a delete icon and makes chip clickable.
   * @default false
   */
  @Input({ transform: booleanAttribute }) deletable?: boolean;
  /** @deprecated Use GoAFilterChip instead. The text content displayed in the chip. */
  @Input() content?: string = "";
  /** @deprecated Use GoAFilterChip instead. The chip variant style. */
  @Input() variant?: GoabChipVariant;
  /**
   * @deprecated Use GoAFilterChip instead. The icon theme - outline or filled.
   * @default "outline"
   */
  @Input() iconTheme?: GoabChipTheme;

  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
