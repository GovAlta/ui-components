import {
  GoabxBadgeType,
  GoabIconType,
  GoabBadgeSize,
  GoabBadgeEmphasis,
} from "@abgov/ui-components-common";
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
  selector: "goabx-badge",
  template: `
    @if (isReady) {
      <goa-badge
        [attr.version]="version"
        [attr.size]="size"
        [attr.emphasis]="emphasis"
        [attr.type]="type"
        [attr.icon]="icon ? 'true' : 'false'"
        [attr.icontype]="iconType"
        [attr.arialabel]="ariaLabel"
        [attr.content]="content"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
      </goa-badge>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class GoabxBadge extends GoabBaseComponent implements OnInit {
  /** Defines the context and colour of the badge. */
  @Input() type?: GoabxBadgeType;
  /**
   * Text label of the badge.
   * @default ""
   */
  @Input() content?: string;
  // Ensure boolean input; attribute only set when true so default behaviour is false
  /**
   * @deprecated Use icontype instead. Includes an icon in the badge.
   * @default ""
   */
  @Input({ transform: booleanAttribute }) icon?: boolean;
  /** Icon type to display in the badge. */
  @Input() iconType?: GoabIconType;
  /**
   * Sets the size of the badge.
   * @default "medium"
   */
  @Input() size?: GoabBadgeSize = "medium";
  /**
   * Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis.
   * @default "strong"
   */
  @Input() emphasis?: GoabBadgeEmphasis = "strong";
  /**
   * Accessible label for screen readers.
   * @default ""
   */
  @Input() ariaLabel?: string;

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
}
