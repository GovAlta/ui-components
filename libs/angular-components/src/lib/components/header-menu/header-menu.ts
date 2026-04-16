import { GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostBinding,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-app-header-menu",
  template: `@if (isReady) {
    <goa-app-header-menu
      [attr.leadingicon]="leadingIcon"
      [attr.heading]="heading"
      [attr.testid]="testId"
    >
      <ng-content />
    </goa-app-header-menu>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Menu items within the app header. */
export class GoabAppHeaderMenu extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Icon displayed before the heading text. */
  @Input() leadingIcon?: GoabIconType;
  /** The menu heading text displayed as the dropdown trigger. */
  @Input() heading?: string;
  /** Sets the slot name for the component. */
  @Input() slotName?: string;

  @HostBinding("attr.slot")
  get hostSlot(): string | null {
    return this.slotName ?? null;
  }

  isReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
