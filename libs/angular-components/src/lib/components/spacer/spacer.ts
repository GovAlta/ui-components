import { GoabSpacerHorizontalSpacing, GoabSpacerVerticalSpacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-spacer",
  template: `
    <goa-spacer
      *ngIf="isReady"
      [attr.hspacing]="hSpacing"
      [attr.vspacing]="vSpacing"
      [attr.testid]="testId"
    >
    </goa-spacer>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSpacer implements OnInit {
  isReady = false;
  @Input() hSpacing?: GoabSpacerHorizontalSpacing;
  @Input() vSpacing?: GoabSpacerVerticalSpacing;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
