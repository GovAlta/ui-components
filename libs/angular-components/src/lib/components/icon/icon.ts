import { GoabIconOverridesType, GoabIconSize, GoabIconTheme, GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-icon",
  template: `
    <goa-icon
      *ngIf="isReady"
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
  `,
  styles: [":host { display: inline-flex; align-items: center; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabIcon extends GoabBaseComponent implements OnInit {
  @Input({ required: true }) type!: GoabIconType | GoabIconOverridesType;
  @Input() size?: GoabIconSize;
  @Input() theme?: GoabIconTheme;
  @Input({ transform: booleanAttribute }) inverted?: boolean;
  @Input() fillColor?: string;
  @Input({ transform: numberAttribute }) opacity?: number;
  @Input() title?: string;
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
