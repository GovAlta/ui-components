import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabIconType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-app-header-menu",
  template: `
    <goa-app-header-menu
      *ngIf="isReady"
      [attr.leadingicon]="leadingIcon"
      [attr.heading]="heading"
      [attr.testid]="testId"
    >
      <ng-content />
    </goa-app-header-menu>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabAppHeaderMenu implements OnInit {
  isReady = false;
  @Input() leadingIcon?: GoabIconType;
  @Input() heading?: string;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
