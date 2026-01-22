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
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-radio-group",
  template: `
    <goa-radio-group
      #goaComponentRef
      *ngIf="isReady"
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
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabxRadioGroup),
    },
  ],
})
export class GoabxRadioGroup extends GoabControlValueAccessor implements OnInit {
  isReady = false;
  version = "2";
  @Input() name?: string;
  @Input() orientation?: GoabRadioGroupOrientation;
  @Input() ariaLabel?: string;
  @Input() size?: GoabRadioGroupSize = "default";

  constructor(
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
  ) {
    super(renderer);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onChange = new EventEmitter<GoabRadioGroupOnChangeDetail>();

  _onChange(e: Event) {
    const detail = { ...(e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail, event: e };
    this.markAsTouched();
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }
}
