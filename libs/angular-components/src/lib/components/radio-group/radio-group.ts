import {
  GoabRadioGroupOnChangeDetail,
  GoabRadioGroupOrientation,
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
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-group",
  template: `
    <goa-radio-group
      *ngIf="isReady"
      [attr.name]="name"
      [attr.value]="value"
      [disabled]="disabled"
      [attr.orientation]="orientation"
      [attr.error]="error"
      [attr.arialabel]="ariaLabel"
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
  `,
  imports: [CommonModule],
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
  isReady = false;
  @Input() name?: string;
  @Input() orientation?: GoabRadioGroupOrientation;
  @Input() ariaLabel?: string;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onChange = new EventEmitter<GoabRadioGroupOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
    this.markAsTouched();
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }
}
