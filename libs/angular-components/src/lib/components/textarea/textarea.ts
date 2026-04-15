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
export class GoabTextArea extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() name?: string;
  @Input() placeholder?: string;
  @Input({ transform: numberAttribute }) rows?: number;
  @Input({ transform: booleanAttribute }) readOnly?: boolean;
  @Input() width?: string;
  @Input() ariaLabel?: string;
  @Input() countBy?: GoabTextAreaCountBy = "";
  @Input() maxCount?: number = -1;
  @Input() maxWidth?: string;
  @Input() autoComplete?: string = "on";
  @Input() size?: GoabTextAreaSize = "default";

  @Output() onChange = new EventEmitter<GoabTextAreaOnChangeDetail>();
  @Output() onKeyPress = new EventEmitter<GoabTextAreaOnKeyPressDetail>();
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
