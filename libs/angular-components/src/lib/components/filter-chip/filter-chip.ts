import { GoabChipTheme } from "@abgov/ui-components-common";
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
  selector: "goab-filter-chip",
  template: `@if (isReady) {
    <goa-filter-chip
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
    </goa-filter-chip>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFilterChip extends GoabBaseComponent implements OnInit {
  /**
   * Shows an error state.
   * @default false
   */
  @Input({ transform: booleanAttribute }) error?: boolean;
  @Input({ transform: booleanAttribute }) deletable?: boolean;
  /**
   * Text label of the chip.
   * @required
   */
  @Input() content?: string = "";
  @Input() iconTheme?: GoabChipTheme;

  @Output() onClick = new EventEmitter();

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

  _onClick() {
    this.onClick.emit();
  }
}
