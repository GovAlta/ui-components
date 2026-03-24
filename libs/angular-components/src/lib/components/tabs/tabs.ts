import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabTabsOnChangeDetail, GoabTabsVariant } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-tabs",
  template: `
    @if (isReady) {
      <goa-tabs
        [attr.initialtab]="initialTab"
        [attr.testid]="testId"
        [attr.variant]="variant"
        (_change)="_onChange($event)"
      >
        <ng-content />
      </goa-tabs>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTabs implements OnInit {
  isReady = false;
  /**
   * The initially active tab (1-based index). If not set, the first tab is active.
   * @default -1
   */
  @Input({ transform: numberAttribute }) initialTab?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;
  /**
   * Visual style variant. "segmented" shows pill-style tabs with animation.
   * @default "default"
   */
  @Input() variant?: GoabTabsVariant;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onChange = new EventEmitter<GoabTabsOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabTabsOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
