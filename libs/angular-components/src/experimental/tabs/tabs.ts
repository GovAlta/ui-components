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
import {
  GoabTabsOnChangeDetail,
  GoabTabsOrientation,
  GoabTabsVariant,
  GoabTabsNavigation,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goabx-tabs",
  template: `
    @if (isReady) {
      <goa-tabs
        [attr.version]="version"
        [attr.initialtab]="initialTab"
        [attr.testid]="testId"
        [attr.variant]="variant"
        [attr.orientation]="orientation"
        [attr.navigation]="navigation"
        (_change)="_onChange($event)"
      >
        <ng-content />
      </goa-tabs>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxTabs implements OnInit {
  isReady = false;
  version = "2";
  @Input({ transform: numberAttribute }) initialTab?: number;
  @Input() testId?: string;
  @Input() variant?: GoabTabsVariant;
  /** Tab layout orientation. "auto" stacks vertically on mobile (default), "horizontal" keeps horizontal on all screen sizes. */
  @Input() orientation?: GoabTabsOrientation;
  @Input() navigation?: GoabTabsNavigation;

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
