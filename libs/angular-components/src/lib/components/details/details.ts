import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-details",

  template: `
    @if (isReady) {
      <goa-details
        [attr.heading]="heading"
        [attr.testid]="testId"
        [attr.open]="open"
        [attr.maxwidth]="maxWidth"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-details>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDetails extends GoabBaseComponent implements OnInit {
  /** The title heading. */
  @Input({ required: true }) heading!: string;
  /**
   * Controls if details is expanded or not.
   * @default false
   */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /**
   * Sets the maximum width of the details.
   * @default "75ch"
   */
  @Input() maxWidth?: string;

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
