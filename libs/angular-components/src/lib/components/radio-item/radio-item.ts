import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    @if (isReady) {
      <goa-radio-item
        [attr.version]="version"
        [attr.name]="name"
        [attr.value]="value"
        [attr.label]="label"
        [attr.description]="getDescriptionAsString()"
        [attr.arialabel]="ariaLabel"
        [attr.revealarialabel]="revealAriaLabel"
        [disabled]="disabled"
        [attr.compact]="compact"
        [attr.maxwidth]="maxWidth"
        [attr.checked]="checked"
        [attr.error]="error"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
        <div slot="description">
          <ng-container [ngTemplateOutlet]="getDescriptionAsTemplate()"></ng-container>
        </div>
        <div slot="reveal">
          @if (this.reveal) {
            <ng-container [ngTemplateOutlet]="reveal"></ng-container>
          }
        </div>
      </goa-radio-item>
    }
  `,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabRadioItem extends GoabBaseComponent implements OnInit {
  @Input() value?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() description!: string | TemplateRef<any>;
  @Input() reveal?: TemplateRef<any>;
  @Input() ariaLabel?: string;
  @Input() revealAriaLabel?: string;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Input({ transform: booleanAttribute }) checked?: boolean;
  @Input({ transform: booleanAttribute }) error?: boolean;
  @Input() maxWidth?: string;
  @Input({ transform: booleanAttribute }) compact?: boolean;

  isReady = false;
  version = "2";

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

  getDescriptionAsString(): string {
    return !this.description || this.description instanceof TemplateRef
      ? ""
      : this.description;
  }

  getDescriptionAsTemplate(): TemplateRef<any> | null {
    if (!this.description) return null;
    return this.description instanceof TemplateRef ? this.description : null;
  }
}
