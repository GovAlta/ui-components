import {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap,
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
  selector: "goab-button-group",

  template: `
    @if (isReady) {
      <goa-button-group
        [attr.alignment]="alignment"
        [attr.gap]="gap"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-button-group>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Display multiple related actions stacked or in a horizontal row to help with arrangement and spacing. */
export class GoabButtonGroup extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Positions the button group in the page layout. */
  @Input() alignment?: GoabButtonGroupAlignment;
  /** Sets the spacing between buttons in the button group. */
  @Input() gap?: GoabButtonGroupGap;

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
