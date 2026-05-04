import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Spacing,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-block",

  template: `
    @if (isReady) {
      <goa-block
        [attr.gap]="gap"
        [attr.direction]="direction"
        [attr.alignment]="alignment"
        [attr.width]="width"
        [attr.min-width]="minWidth"
        [attr.max-width]="maxWidth"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-block>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Group components into a block with consistent space between. */
export class GoabBlock extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the spacing between items. Uses design system spacing tokens. */
  @Input() gap?: Spacing;
  /** Sets the stacking direction of child components. */
  @Input() direction?: GoabBlockDirection;
  /** Sets the primary axis alignment of child components. */
  @Input() alignment?: GoabBlockAlignment;
  /** Sets the width of the block container. Defaults to max-content. */
  @Input() width?: string;
  /** Sets the minimum width of the block container. */
  @Input() minWidth?: string;
  /** Sets the maximum width of the block container. */
  @Input() maxWidth?: string;

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
