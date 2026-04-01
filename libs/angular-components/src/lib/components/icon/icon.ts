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
export class GoabIcon extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) type!: GoabIconType | GoabIconOverridesType;
  @Input() size?: GoabIconSize;
  @Input() theme?: GoabIconTheme;
  @Input({ transform: booleanAttribute }) inverted?: boolean;
  @Input() fillColor?: string;
  @Input({ transform: numberAttribute }) opacity?: number;
  @Input() title?: string;
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
