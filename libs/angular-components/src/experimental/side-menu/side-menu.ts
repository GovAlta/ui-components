import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goabx-side-menu",
  template: `
    <goa-side-menu
      *ngIf="isReady"
      [attr.version]="version"
      [attr.testid]="testId"
    >
      <ng-content />
    </goa-side-menu>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabxSideMenu implements OnInit {
  isReady = false;
  version = "2";
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
