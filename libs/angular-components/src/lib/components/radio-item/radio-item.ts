import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet, CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    <goa-radio-item
      *ngIf="isReady"
      [attr.name]="name"
      [attr.value]="value"
      [attr.label]="label"
      [attr.description]="getDescriptionAsString()"
      [attr.arialabel]="ariaLabel"
      [attr.revealarialabel]="revealAriaLabel"
      [disabled]="disabled"
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
        <ng-container
          *ngIf="this.reveal"
          [ngTemplateOutlet]="reveal"
        ></ng-container>
      </div>
    </goa-radio-item>
    `,
  imports: [NgTemplateOutlet, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabRadioItem extends GoabBaseComponent {
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
