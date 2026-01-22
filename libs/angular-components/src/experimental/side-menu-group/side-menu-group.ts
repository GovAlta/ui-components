import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabIconType } from "@abgov/ui-components-common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-side-menu-group",
  template: `
    <goa-side-menu-group
      *ngIf="isReady"
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
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxSideMenuGroup extends GoabBaseComponent implements OnInit {
  isReady = false;
  version = "2";
  @Input({ required: true }) heading!: string;
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
