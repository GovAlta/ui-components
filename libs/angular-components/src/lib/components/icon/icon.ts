import {
  GoabIconOverridesType,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-icon",
  template: `
    @if (isReady) {
      <goa-icon
        [attr.type]="type"
        [attr.theme]="theme"
        [attr.size]="size"
        [attr.inverted]="inverted"
        [attr.fillcolor]="fillColor"
        [attr.opacity]="opacity"
        [attr.title]="title"
        [attr.arialabel]="ariaLabel"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        [attr.testid]="testId"
      >
      </goa-icon>
    }
  `,
  styles: [":host { display: inline-flex; align-items: center; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A simple and universal graphic symbol representing an action, object, or concept to help guide the user. */
export class GoabIcon extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** @required The icon type to display. See GoabIconType for available icons. */
  @Input({ required: true }) type!: GoabIconType | GoabIconOverridesType;
  /** Sets the size of the icon. Accepts numeric (1-6) or named sizes. @default "medium" */
  @Input() size?: GoabIconSize;
  /** Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons. */
  @Input() theme?: GoabIconTheme;
  /** When true, inverts the icon colors for use on dark backgrounds. */
  @Input({ transform: booleanAttribute }) inverted?: boolean;
  /** Sets a custom fill color for the icon. Accepts any valid CSS color value. */
  @Input() fillColor?: string;
  /** Sets the opacity of the icon from 0 (transparent) to 1 (opaque). */
  @Input({ transform: numberAttribute }) opacity?: number;
  /** Adds an accessible title to the icon SVG. Used by screen readers. */
  @Input() title?: string;
  /** Defines how the icon will be announced by screen readers. */
  @Input() ariaLabel?: string;

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
