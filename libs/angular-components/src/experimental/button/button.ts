import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-button",

  template: `
    @if (isReady) {
      <goa-button
        [attr.version]="version"
        [attr.type]="type"
        [attr.size]="size"
        [attr.variant]="variant"
        [disabled]="disabled"
        [attr.leadingicon]="leadingIcon"
        [attr.trailingicon]="trailingIcon"
        [attr.width]="width"
        [attr.testid]="testId"
        [attr.action]="action"
        [attr.action-arg]="actionArg"
        [attr.action-args]="JSON.stringify(actionArgs)"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_click)="_onClick()"
      >
        <ng-content />
      </goa-button>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxButton extends GoabBaseComponent implements OnInit {
  /**
   * Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, and "start" for prominent call-to-action buttons.
   * @default "primary"
   */
  @Input() type?: GoabButtonType = "primary";
  /**
   * Controls the size of the button. Use "compact" for inline actions or space-constrained layouts.
   * @default "normal"
   */
  @Input() size?: GoabButtonSize;
  /**
   * Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for dark backgrounds.
   * @default "normal"
   */
  @Input() variant?: GoabButtonVariant;
  /**
   * When true, prevents user interaction and applies disabled styling.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /** Icon displayed before the button text. */
  @Input() leadingIcon?: GoabIconType;
  /** Icon displayed after the button text. */
  @Input() trailingIcon?: GoabIconType;
  /**
   * Sets a custom width for the button (e.g., "200px" or "100%").
   * @default ""
   */
  @Input() width?: string;
  /**
   * Action identifier passed in click events for event delegation patterns.
   * @default ""
   */
  @Input() action?: string;
  /**
   * Single argument value passed with the action in click events.
   * @default ""
   */
  @Input() actionArg?: string;
  /**
   * Multiple argument values passed with the action in click events.
   * @default {}
   */
  @Input() actionArgs?: Record<string, unknown>;

  @Output() onClick = new EventEmitter();

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

  _onClick() {
    this.onClick.emit();
  }

  protected readonly JSON = JSON;
}
