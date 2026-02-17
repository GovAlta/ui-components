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
export class GoabButtonGroup extends GoabBaseComponent implements OnInit {
  @Input() alignment?: GoabButtonGroupAlignment;
  @Input() gap?: GoabButtonGroupGap;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
