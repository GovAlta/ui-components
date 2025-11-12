import { GoabIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-link",
  template: `
    <goa-link
      *ngIf="isReady"
      [attr.leadingicon]="leadingIcon"
      [attr.trailingicon]="trailingIcon"
      [attr.testid]="testId"
      [attr.action]="action"
      [attr.action-arg]="actionArg"
      [attr.action-args]="JSON.stringify(actionArgs)"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-link>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabLink implements OnInit {
  isReady = false;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() testId?: string;
  @Input() action?: string;
  @Input() actionArg?: string;
  @Input() actionArgs?: Record<string, unknown>;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  protected readonly JSON = JSON;
}
