import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import {
  GoabTabsOnChangeDetail,
  GoabTabsOrientation,
  GoabTabsVariant,
  GoabTabsNavigation,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-tabs",
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
/** Let users navigate between related sections of content, displaying one section at a time. */
export class GoabTabs implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  /** The initially active tab (1-based index). If not set, the first tab is active. */
  @Input({ transform: numberAttribute }) initialTab?: number;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Visual style variant. "segmented" shows pill-style tabs with animation. */
  @Input() variant?: GoabTabsVariant;
  /** Tab layout orientation. "auto" stacks vertically on mobile (default), "horizontal" keeps horizontal on all screen sizes. */
  @Input() orientation?: GoabTabsOrientation;
  /** Sets the navigation mode for tab switching. "hash" updates the URL hash when switching tabs. */
  @Input() navigation?: GoabTabsNavigation;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when the active tab changes. Emits the new tab index as GoabTabsOnChangeDetail. */
  @Output() onChange = new EventEmitter<GoabTabsOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabTabsOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
