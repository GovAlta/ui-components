import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goabx-menu-button",
  template: `
    <goa-menu-button
      [attr.text]="text"
      [attr.type]="type"
      [attr.size]="size"
      [attr.variant]="variant"
      version="2"
      [attr.max-width]="maxWidth"
      [attr.leading-icon]="leadingIcon"
      [attr.aria-label]="ariaLabel"
      [attr.testid]="testId"
      (_action)="_onAction($event)"
    >
      <ng-content></ng-content>
    </goa-menu-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxMenuButton {
  /**
   * Display text for the menu action.
   * @default ""
   */
  @Input() text?: string;
  /**
   * The button style variant.
   * @default "primary"
   */
  @Input() type?: GoabButtonType;
  /**
   * Sets the size of the button.
   * @default "normal"
   */
  @Input() size?: GoabButtonSize;
  /**
   * Sets the color variant for semantic meaning.
   * @default "normal"
   */
  @Input() variant?: GoabButtonVariant;
  /** Maximum width of the dropdown menu. */
  @Input() maxWidth?: string;
  /** Icon displayed before the button text. When no text is provided, displays as an icon button. */
  @Input() leadingIcon?: GoabIconType;
  /**
   * Sets the aria-label for the icon button in icon-only mode.
   * @default "Open menu"
   */
  @Input() ariaLabel?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;
  @Output() onAction = new EventEmitter<GoabMenuButtonOnActionDetail>();

  _onAction(e: Event) {
    const detail = (e as CustomEvent<GoabMenuButtonOnActionDetail>).detail;
    this.onAction.emit(detail);
  }
}
