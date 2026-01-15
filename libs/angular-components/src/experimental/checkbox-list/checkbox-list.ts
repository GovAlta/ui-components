import { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";
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
  selector: "goabx-checkbox-list",
  template: ` <goa-checkbox-list
    *ngIf="isReady"
    [attr.name]="name"
    [value]="value"
    [disabled]="disabled"
    [attr.error]="error"
    [attr.testid]="testId"
    [id]="id"
    [attr.maxwidth]="maxWidth"
    [attr.version]="version"
    [attr.size]="size"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_change)="_onChange($event)"
  >
    <ng-content />
  </goa-checkbox-list>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabxCheckboxList),
    },
  ],
})
export class GoabxCheckboxList extends GoabControlValueAccessor implements OnInit {
  isReady = false;
  version = "2";
  @Input() name!: string;
  @Input() maxWidth?: string;
  @Input() size?: "default" | "compact" = "default";

  // Override value to handle string arrays consistently
  @Input() override value?: string[];

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

  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  _onChange(e: Event) {
    const detail = { ...(e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail, event: e };
    this.onChange.emit(detail);
    this.markAsTouched();

    // Update the form control with the selected values
    const selectedValues = detail.value || [];
    // clone to ensure a new reference so the underlying web component updates
    this.value = [...selectedValues];
    this.fcChange?.([...selectedValues]);
  }

  // Simplified writeValue - expects array input directly
  override writeValue(value: string[] | null): void {
    // clone to ensure a new reference and trigger downstream updates
    this.value = Array.isArray(value) ? [...value] : [];
  }
}
