import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-side-menu",
  template: `
    <goa-side-menu *ngIf="isReady" [attr.testid]="testId">
      <ng-content />
    </goa-side-menu>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabSideMenu implements OnInit {
  isReady = false;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
