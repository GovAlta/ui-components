import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabIconType } from "@abgov/ui-components-common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-side-menu-group",
  template: `
    @if (isReady) {
      <goa-side-menu-group
        [attr.version]="version"
        [attr.heading]="heading"
        [attr.testid]="testId"
        [attr.icon]="icon"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-side-menu-group>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSideMenuGroup extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  @Input({ required: true }) heading!: string;
  @Input() icon?: GoabIconType;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
