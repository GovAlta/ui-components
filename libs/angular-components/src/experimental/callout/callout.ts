import {
  GoabCalloutAriaLive,
  GoabCalloutSize,
  GoabCalloutType,
  GoabCalloutIconTheme,
  GoabCalloutEmphasis,
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
  selector: "goabx-callout",

  template: `
    @if (isReady) {
      <goa-callout
        [attr.version]="version"
        [attr.type]="type"
        [attr.heading]="heading"
        [attr.size]="size"
        [attr.maxwidth]="maxWidth"
        [attr.arialive]="ariaLive"
        [attr.icontheme]="iconTheme"
        [attr.emphasis]="emphasis"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-callout>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxCallout extends GoabBaseComponent implements OnInit {
  isReady = false;
  version = "2";

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

  /**
   * Define the context and colour of the callout.
   */
  @Input() type?: GoabCalloutType = "information";
  /**
   * Callout heading text.
   * @default ""
   */
  @Input() heading?: string = "";
  /**
   * Sets the size of the callout. 'medium' has reduced padding and type size for compact areas.
   * @default "large"
   */
  @Input() size?: GoabCalloutSize = "large";
  /**
   * Sets the maximum width of the callout.
   * @default "none"
   */
  @Input() maxWidth?: string;
  /**
   * Indicates how assistive technology should handle updates to the live region.
   * @default "off"
   */
  @Input() ariaLive?: GoabCalloutAriaLive = "off";
  /**
   * Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons.
   * @default "outline"
   */
  @Input() iconTheme?: GoabCalloutIconTheme = "outline";
  /**
   * Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal.
   * @default "medium"
   */
  @Input() emphasis?: GoabCalloutEmphasis = "medium";
}
