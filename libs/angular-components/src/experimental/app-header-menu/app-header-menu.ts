import { GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostBinding,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-app-header-menu",
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
export class GoabxAppHeaderMenu extends GoabBaseComponent implements OnInit {
  @Input() leadingIcon?: GoabIconType;
  @Input() heading?: string;
  @Input() slotName?: string;

  @HostBinding("attr.slot")
  get hostSlot(): string | null {
    return this.slotName ?? null;
  }

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
