import {
  GoabBadgeType,
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
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-badge",
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
/** Small labels which hold small amounts of information, system feedback, or states. */
export class GoabBadge extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the context and colour of the badge. */
  @Input() type?: GoabBadgeType;
  /** Sets the text label of the badge. */
  @Input() content?: string;
  // Ensure boolean input; attribute only set when true so default behaviour is false
  /** @deprecated Use icontype instead. Includes an icon in the badge. */
  @Input({ transform: booleanAttribute }) icon?: boolean;
  /** Sets the icon type to display in the badge. */
  @Input() iconType?: GoabIconType;
  /** Sets the size of the badge. @default "medium" */
  @Input() size?: GoabBadgeSize = "medium";
  /** Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. @default "strong" */
  @Input() emphasis?: GoabBadgeEmphasis = "strong";
  /** Sets the accessible label for screen readers. */
  @Input() ariaLabel?: string;

  isReady = false;
  version = "2";

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
