import { ABGovTextAreaCountBy, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

export type ABGovTextAreaOnChangeDetail = {
  name: string;
  value: string;
}

export type ABGovTextAreaOnKeyPressDetail = {
  name: string;
  value: string;
  key: string;
}

@Component({
  standalone: true,
  selector: "abgov-textarea",
  template: `
    <goa-textarea
      [name]="name"
      [value]="value"
      [id]="id"
      [placeholder]="placeholder"
      [rows]="rows"
      [error]="error"
      [disabled]="disabled"
      [width]="width"
      [arialabel]="ariaLabel"
      [countby]="countBy"
      [maxcount]="maxCount"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="_onChange($event)"
      (_keypress)="_onKeyPress($event)"
    >
    </goa-textarea>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovTextArea {
  @Input({ required: true }) name!: string;
  @Input() value?: string = "";
  @Input() id?: string;
  @Input() placeholder?: string;
  @Input() rows?: number;
  @Input() error?: boolean;
  @Input() disabled?: boolean;
  @Input() width?: string;
  @Input() ariaLabel?: string;
  @Input() countBy?: ABGovTextAreaCountBy;
  @Input() maxCount?: number;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<ABGovTextAreaOnChangeDetail>();
  @Output() onKeyPress = new EventEmitter<ABGovTextAreaOnKeyPressDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<ABGovTextAreaOnChangeDetail>).detail;
    this.onChange.emit(detail)
  }

  _onKeyPress(e: any) {
    const detail = (e as CustomEvent<ABGovTextAreaOnKeyPressDetail>).detail;
    this.onKeyPress.emit(detail)
  }
}
