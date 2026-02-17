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
  @Input({ transform: numberAttribute }) initialTab?: number;
  @Input() testId?: string;
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
