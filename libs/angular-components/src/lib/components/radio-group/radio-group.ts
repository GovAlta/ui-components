import {
  GoabRadioGroupOnChangeDetail,
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
        [attr.version]="version"
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
  version = "2";
  /** The name for the radio group. Used for accessibility and change events. */
  @Input() name?: string;
  /** The currently selected value in the radio group. */
  @Input() override value?: string;
  /** Sets the layout direction. 'vertical' stacks items, 'horizontal' places them in a row. */
  @Input() orientation?: GoabRadioGroupOrientation;
  /** Defines how the radio group will be announced by screen readers. */
  @Input() ariaLabel?: string;
  /** Sets the size of all radio items. 'compact' reduces spacing for dense layouts (V2 only). @default "default" */
  @Input() size?: GoabRadioGroupSize = "default";


  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when the selected radio item changes. Emits the name, value, and event of the selected item. */
  @Output() onChange = new EventEmitter<GoabRadioGroupOnChangeDetail>();

  _onChange(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail,
      event: e,
    };
    this.markAsTouched();
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }
}
