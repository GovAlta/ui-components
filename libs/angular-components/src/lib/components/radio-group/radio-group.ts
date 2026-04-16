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
export class GoabRadioGroup extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  @Input() name?: string;
  @Input() orientation?: GoabRadioGroupOrientation;
  @Input() ariaLabel?: string;
  @Input() size?: GoabRadioGroupSize = "default";


  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

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
