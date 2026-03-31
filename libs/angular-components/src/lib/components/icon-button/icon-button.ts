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
  /** @required Sets the icon. */
  @Input({ required: true }) icon!: GoabIconType;
  /** Sets the size of button. @default "medium" */
  @Input() size?: GoabIconSize = "medium";
  /** Styles the button to show color, light, dark or destructive action. */
  @Input() variant?: GoabIconButtonVariant;
  /** Sets the title of the button. */
  @Input() title?: string;
  /** Disables the button. */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /** Sets the aria-label of the button. */
  @Input() ariaLabel?: string;
  /** Action identifier passed in click events for event delegation patterns. */
  @Input() action?: string;
  /** Single argument value passed with the action in click events. */
  @Input() actionArg?: string;
  /** Multiple argument values passed with the action in click events. */
  @Input() actionArgs?: Record<string, unknown>;
  /** Emits when the icon button is clicked. */
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
