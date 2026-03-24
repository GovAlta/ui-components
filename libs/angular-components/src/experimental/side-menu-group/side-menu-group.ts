import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabIconType } from "@abgov/ui-components-common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-side-menu-group",
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
export class GoabxSideMenuGroup extends GoabBaseComponent implements OnInit {
  isReady = false;
  version = "2";
  /** The heading text for the menu group. */
  @Input({ required: true }) heading!: string;
  /** Icon displayed alongside the heading. */
  @Input() icon?: GoabIconType;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
