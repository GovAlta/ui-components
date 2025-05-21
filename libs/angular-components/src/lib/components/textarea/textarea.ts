import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  forwardRef,
  numberAttribute,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-textarea",
  template: `
    <goa-textarea
      [attr.name]="name"
      [attr.value]="value"
      [attr.placeholder]="placeholder"
      [attr.rows]="rows"
      [attr.error]="error"
      [disabled]="disabled"
      [attr.readonly]="readOnly"
      [attr.width]="width"
      [attr.maxwidth]="maxWidth"
      [attr.arialabel]="ariaLabel"
      [attr.countby]="countBy"
      [attr.maxcount]="maxCount"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
      (_keyPress)="_onKeyPress($event)"
    >
    </goa-textarea>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabTextArea),
    },
  ],
})
export class GoabTextArea extends GoabControlValueAccessor {
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input({ transform: numberAttribute }) rows?: number;
  @Input({ transform: booleanAttribute }) readOnly?: boolean;
  @Input() width?: string;
  @Input() ariaLabel?: string;
  @Input() countBy?: GoabTextAreaCountBy = "";
  @Input() maxCount?: number = -1;
  @Input() maxWidth?: string;

  @Output() onChange = new EventEmitter<GoabTextAreaOnChangeDetail>();
  @Output() onKeyPress = new EventEmitter<GoabTextAreaOnKeyPressDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabTextAreaOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.value);
  }

  _onKeyPress(e: Event) {
    const detail = (e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail;
    this.markAsTouched();
    this.onKeyPress.emit(detail);
  }
}
