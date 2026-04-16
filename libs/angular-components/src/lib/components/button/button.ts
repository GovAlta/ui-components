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
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-button",

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
/** Carry out an important action or navigate to another page. */
export class GoabButton extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, and "start" for prominent call-to-action buttons. @default "primary" */
  @Input() type?: GoabButtonType = "primary";
  /** Sets the size of the button. Use "compact" for inline actions or space-constrained layouts. @default "normal" */
  @Input() size?: GoabButtonSize;
  /** Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for dark backgrounds. @default "normal" */
  @Input() variant?: GoabButtonVariant;
  /** Sets the disabled state. When true, prevents user interaction and applies disabled styling. */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /** Sets the icon displayed before the button text. */
  @Input() leadingIcon?: GoabIconType;
  /** Icon displayed after the button text. */
  @Input() trailingIcon?: GoabIconType;
  /** Sets a custom width for the button (e.g., "200px" or "100%"). */
  @Input() width?: string;
  /** Action identifier passed in click events for event delegation patterns. */
  @Input() action?: string;
  /** Single argument value passed with the action in click events. */
  @Input() actionArg?: string;
  /** Multiple argument values passed with the action in click events. */
  @Input() actionArgs?: Record<string, unknown>;

  /** Emits when the button is clicked. */
  @Output() onClick = new EventEmitter();

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

  _onClick() {
    this.onClick.emit();
  }

  protected readonly JSON = JSON;
}
