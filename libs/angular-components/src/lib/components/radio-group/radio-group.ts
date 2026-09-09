import {
  GoabRadioGroupOnBlurDetail,
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOnFocusDetail,
  GoabRadioGroupOrientation,
  GoabRadioGroupSize,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  ChangeDetectorRef,
    inject,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-group",
  template: `
    @if (isReady) {
      <goa-radio-group
        #goaComponentRef
        [attr.name]="name"
        [attr.value]="value"
        [disabled]="disabled"
        [attr.orientation]="orientation"
        [attr.error]="error"
        [attr.arialabel]="ariaLabel"
        [attr.size]="size"
        [id]="id"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_change)="_onChange($event)"
        (_focus)="_onFocus($event)"
        (_blur)="_onBlur($event)"
      >
        <ng-content />
      </goa-radio-group>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabRadioGroup),
    },
  ],
})
/** Allow users to select one option from a set. */
export class GoabRadioGroup extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** The name for the radio group. Used for accessibility and change events. */
  @Input() name?: string;
  /** The currently selected value in the radio group. */
  @Input() override value?: string;
  /** Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. */
  @Input() orientation?: GoabRadioGroupOrientation;
  /** Defines how the radio group will be announced by screen readers. */
  @Input() ariaLabel?: string;
  /** Sets the size of all radio items. 'compact' reduces spacing for dense layouts. @default "default" */
  @Input() size?: GoabRadioGroupSize = "default";


  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when the selected radio item changes. Emits the name, value, and event of the selected item. */
  @Output() onChange = new EventEmitter<GoabRadioGroupOnChangeDetail>();
  /** Emits when focus enters any radio item in the group. */
  @Output() onFocus = new EventEmitter<GoabRadioGroupOnFocusDetail>();
  /** Emits when focus leaves all radio items in the group. */
  @Output() onBlur = new EventEmitter<GoabRadioGroupOnBlurDetail>();

  _onChange(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail,
      event: e,
    };
    this.markAsTouched();
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }

  _onFocus(e: Event) {
    const detail = { ...(e as CustomEvent<GoabRadioGroupOnFocusDetail>).detail, event: e };
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = { ...(e as CustomEvent<GoabRadioGroupOnBlurDetail>).detail, event: e };
    this.markAsTouched();
    this.onBlur.emit(detail);
  }
}
