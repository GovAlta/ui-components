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
export class GoabAppHeaderMenu extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() leadingIcon?: GoabIconType;
  @Input() heading?: string;
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
