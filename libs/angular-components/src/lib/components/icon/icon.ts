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
export class GoabIcon extends GoabBaseComponent implements OnInit {
  @Input({ required: true }) type!: GoabIconType | GoabIconOverridesType;
  /**
   * Sets the size of the icon. Accepts numeric (1-6) or named sizes.
   * @default "medium"
   */
  @Input() size?: GoabIconSize;
  /**
   * Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons.
   * @default "outline"
   */
  @Input() theme?: GoabIconTheme;
  /**
   * When true, inverts the icon colors for use on dark backgrounds.
   * @default false
   */
  @Input({ transform: booleanAttribute }) inverted?: boolean;
  /**
   * Sets a custom fill color for the icon. Accepts any valid CSS color value.
   * @default ""
   */
  @Input() fillColor?: string;
  /**
   * Sets the opacity of the icon from 0 (transparent) to 1 (opaque).
   * @default 1
   */
  @Input({ transform: numberAttribute }) opacity?: number;
  /**
   * Adds an accessible title to the icon SVG. Used by screen readers.
   * @default ""
   */
  @Input() title?: string;
  /**
   * Defines how the icon will be announced by screen readers.
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
