import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

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
      [attr.checked]="checked"
      [attr.error]="error"
      [attr.data-testid]="testId"
    >
      <ng-content />
      <div slot="description">
        <ng-container [ngTemplateOutlet]="getDescriptionAsTemplate()"></ng-container>
      </div>
    </goa-radio-item>
  `,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabRadioItem {
  @Input() value?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() description!: string | TemplateRef<any>;
  @Input() ariaLabel?: string;
  @Input() disabled?: boolean;
  @Input() checked?: boolean;
  @Input() error?: boolean;
  @Input() testId?: string;

  getDescriptionAsString(): string {
    return (!this.description || this.description instanceof TemplateRef) ? "" : this.description;
  }

  getDescriptionAsTemplate(): TemplateRef<any> | null {
    if (!this.description) return null;
    return this.description instanceof TemplateRef ? this.description : null;
  }
}
