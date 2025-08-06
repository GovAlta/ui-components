import { GoabPageBlockSize } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-page-block",
  template: `
    <goa-page-block
      *ngIf="isReady"
      [attr.width]="width"
      [attr.testid]="testId"
    >
      <ng-content></ng-content>
    </goa-page-block>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPageBlock implements OnInit {
  isReady = false;
  @Input() width?: GoabPageBlockSize;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
