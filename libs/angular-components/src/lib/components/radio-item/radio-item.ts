import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, booleanAttribute, } from "@angular/core";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    <goa-radio-item
      [attr.name]="name"
      [attr.value]="value"
      [attr.label]="label"
      [attr.description]="getDescriptionAsString()"
      [attr.arialabel]="ariaLabel"
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
          *ngIf="this.reveal !== null && this.reveal !== undefined"
          [ngTemplateOutlet]="reveal"
        ></ng-container>
      </div>
    </goa-radio-item>
  `,
  imports: [NgTemplateOutlet, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabRadioItem extends GoabBaseComponent {
  @Input() value?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() description!: string | TemplateRef<any>;
  @Input() reveal!: TemplateRef<any>;
  @Input() ariaLabel?: string;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Input({ transform: booleanAttribute }) checked?: boolean;
  @Input({ transform: booleanAttribute }) error?: boolean;
  @Input() maxWidth?: string;

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
