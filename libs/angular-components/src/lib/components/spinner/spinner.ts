import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-spinner",
  template: `
    <goa-spinner
      *ngIf="isReady"
      [attr.type]="type"
      [attr.size]="size"
      [attr.invert]="invert"
      [attr.progress]="progress"
      [attr.testid]="testId"
    >
    </goa-spinner>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSpinner implements OnInit {
  isReady = false;
  @Input() type?: GoabSpinnerType;
  @Input() size?: GoabSpinnerSize;
  @Input({ transform: booleanAttribute }) invert?: boolean;
  @Input({ transform: numberAttribute }) progress?: number;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
