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
  @Input() text?: string;
  @Input() type?: GoabButtonType;
  @Input() size?: GoabButtonSize;
  @Input() variant?: GoabButtonVariant;
  @Input() maxWidth?: string;
  @Input() leadingIcon?: GoabIconType;
  @Input() ariaLabel?: string;
  @Input() testId?: string;
  @Output() onAction = new EventEmitter<GoabMenuButtonOnActionDetail>();

  _onAction(e: Event) {
    const detail = (e as CustomEvent<GoabMenuButtonOnActionDetail>).detail;
    this.onAction.emit(detail);
  }
}
