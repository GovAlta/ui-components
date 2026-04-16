import {
  GoabTextAreaCountBy,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaSize,
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
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-textarea",

  template: `
    @if (isReady) {
      <goa-textarea
        #goaComponentRef
        [attr.version]="version"
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
        [attr.autocomplete]="autoComplete"
        [attr.size]="size"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_change)="_onChange($event)"
        (_keyPress)="_onKeyPress($event)"
        (_blur)="_onBlur($event)"
      >
      </goa-textarea>
    }
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
/** A multi-line field where users can input and edit text. */
export class GoabTextArea extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Name of the input value that is received in the _change event. */
  @Input() name?: string;
  /** Text displayed within the input when no value is set. */
  @Input() placeholder?: string;
  /** Set the number of rows. @default 3 */
  @Input({ transform: numberAttribute }) rows?: number;
  /** Sets the input to a read only state. */
  @Input({ transform: booleanAttribute }) readOnly?: boolean;
  /** Width of the text area. */
  @Input() width?: string;
  /** Defines how the text will be translated for the screen reader. If not specified it will fall back to the name. */
  @Input() ariaLabel?: string;
  /** Counting interval for characters or words, specifying whether to count every character or word. @default "" */
  @Input() countBy?: GoabTextAreaCountBy = "";
  /** Maximum number of characters or words allowed. @default -1 */
  @Input() maxCount?: number = -1;
  /** Maximum width of the text area. */
  @Input() maxWidth?: string;
  /** Specifies the autocomplete attribute for the textarea input. @default "on" */
  @Input() autoComplete?: string = "on";
  /** Sets the size variant of the textarea. @default "default" */
  @Input() size?: GoabTextAreaSize = "default";

  /** Emits when the textarea value changes. Emits the name and new value. */
  @Output() onChange = new EventEmitter<GoabTextAreaOnChangeDetail>();
  /** Emits when a key is pressed in the textarea. Emits the name, value, and key. */
  @Output() onKeyPress = new EventEmitter<GoabTextAreaOnKeyPressDetail>();
  /** Emits when the textarea loses focus. Emits the name and current value. */
  @Output() onBlur = new EventEmitter<GoabTextAreaOnBlurDetail>();

  isReady = false;
  version = "2";

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onChange(e: Event) {
    const detail = { ...(e as CustomEvent<GoabTextAreaOnChangeDetail>).detail, event: e };
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.value);
  }

  _onKeyPress(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabTextAreaOnKeyPressDetail>).detail,
      event: e,
    };
    this.markAsTouched();
    this.onKeyPress.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = { ...(e as CustomEvent<GoabTextAreaOnBlurDetail>).detail, event: e };
    this.markAsTouched();
    this.onBlur.emit(detail);
  }
}
