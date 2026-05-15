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
  selector: "goab-menu-button",
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
/** A button with more than one action. */
export class GoabMenuButton {
  /** The button label text. When provided, displays as a text button with a dropdown icon. */
  @Input() text?: string;
  /** The button style variant. */
  @Input() type?: GoabButtonType;
  /** Sets the size of the button. */
  @Input() size?: GoabButtonSize;
  /** Sets the color variant for semantic meaning. */
  @Input() variant?: GoabButtonVariant;
  /** Maximum width of the dropdown menu. */
  @Input() maxWidth?: string;
  /** Icon displayed before the button text. When no text is provided, displays as an icon button. */
  @Input() leadingIcon?: GoabIconType;
  /** Sets the aria-label for the icon button in icon-only mode. */
  @Input() ariaLabel?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Emits when a menu action is clicked. Emits the action detail. */
  @Output() onAction = new EventEmitter<GoabMenuButtonOnActionDetail>();

  _onAction(e: Event) {
    const detail = (e as CustomEvent<GoabMenuButtonOnActionDetail>).detail;
    this.onAction.emit(detail);
  }
}
