import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    <goa-radio-item
      [attr.name]="name"
      [attr.value]="value"
      [attr.label]="label"
      [attr.description]="description"
      [attr.arialabel]="ariaLabel"
      [attr.disabled]="disabled"
      [attr.checked]="checked"
      [attr.error]="error"
      [attr.data-testid]="testId"
    >
      <ng-content />
    </goa-radio-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABRadioItem {
  @Input() value?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() description?: string;
  @Input() ariaLabel?: string;
  @Input() disabled?: boolean;
  @Input() checked?: boolean;
  @Input() error?: boolean;
  @Input() testId?: string;
}
