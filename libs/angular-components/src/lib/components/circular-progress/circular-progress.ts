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

import {
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-circular-progress",
  template: `
    <goa-circular-progress
      *ngIf="isReady"
      [attr.variant]="variant || 'inline'"
      [attr.size]="size || 'large'"
      [attr.message]="message"
      [attr.visible]="visible"
      [attr.progress]="progress"
      [attr.testid]="testId"
    >
    </goa-circular-progress>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabCircularProgress implements OnInit {
  @Input() variant?: GoabCircularProgressVariant;
  @Input() size?: GoabCircularProgressSize;
  @Input() message?: string;
  @Input({ transform: booleanAttribute }) visible?: boolean;
  @Input({ transform: numberAttribute }) progress?: number;
  @Input() testId?: string;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
