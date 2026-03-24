import { GoabBadgeType, GoabIconType } from "@abgov/ui-components-common";
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
  selector: "goab-badge",
  template: `
    @if (isReady) {
      <goa-badge
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
export class GoabBadge extends GoabBaseComponent implements OnInit {
  /** Defines the context and colour of the badge. */
  @Input() type?: GoabBadgeType;
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
   * Accessible label for screen readers.
   * @default ""
   */
  @Input() ariaLabel?: string;

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
