import {
  GoabIconButtonVariant,
  GoabIconSize,
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
  selector: "goab-icon-button",
  template: `
    @if (isReady) {
      <goa-icon-button
        [attr.icon]="icon"
        [disabled]="disabled"
        [attr.size]="size"
        [attr.variant]="variant"
        [title]="title"
        [attr.arialabel]="ariaLabel"
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
        <ng-content></ng-content>
      </goa-icon-button>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabIconButton extends GoabBaseComponent implements OnInit {
  isReady = false;
  protected readonly JSON = JSON;
  @Input({ required: true }) icon!: GoabIconType;
  /**
   * Sets the size of button.
   * @default "medium"
   */
  @Input() size?: GoabIconSize = "medium";
  /**
   * Styles the button to show color, light, dark or destructive action.
   * @default "color"
   */
  @Input() variant?: GoabIconButtonVariant;
  /**
   * Sets the title of the button.
   * @default ""
   */
  @Input() title?: string;
  /**
   * Disables the button.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /**
   * Sets the aria-label of the button.
   * @default ""
   */
  @Input() ariaLabel?: string;
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

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  _onClick() {
    this.onClick.emit();
  }
}
