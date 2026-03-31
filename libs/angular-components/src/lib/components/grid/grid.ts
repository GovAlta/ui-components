import { Spacing } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-grid",
  template: `
    @if (isReady) {
      <goa-grid
        [attr.gap]="gap"
        [attr.minchildwidth]="minChildWidth"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-grid>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabGrid extends GoabBaseComponent implements OnInit {
  isReady = false;
  /** @required Minimum width of the child elements. */
  @Input({ required: true }) minChildWidth!: string;
  /** Gap between child items. */
  @Input() gap?: Spacing;

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
