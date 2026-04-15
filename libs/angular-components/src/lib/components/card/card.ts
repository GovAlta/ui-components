import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-card",

  template: `
    @if (isReady) {
      <goa-card
        [attr.elevation]="elevation"
        [attr.width]="width"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-card>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A container that groups related content and actions. */
export class GoabCard extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  /** Adds a shadow to the card. 0 shows a border, 1-3 increase shadow intensity. */
  @Input({ transform: numberAttribute }) elevation?: number;
  /** Sets the width of the card. */
  @Input() width?: string;
}
