import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  forwardRef,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { GoabDropdownOnChangeDetail, GoabDropdownSize } from "@abgov/ui-components-common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-multi-select",
  template: `
    @if (isReady) {
      <goa-multi-select
        #goaComponentRef
        [attr.version]="version"
        [attr.name]="name"
        [value]="value"
        [attr.arialabel]="ariaLabel"
        [attr.arialabelledby]="ariaLabelledBy"
        [disabled]="disabled"
        [attr.error]="error"
        [attr.filterable]="filterable"
        [attr.maxheight]="maxHeight"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        [attr.mt]="mt"
        [attr.placeholder]="placeholder"
        [attr.testid]="testId"
        [attr.width]="width"
        [attr.maxwidth]="maxWidth"
        [attr.size]="size"
        [id]="id"
        (_change)="_onChange($event)"
      >
        <ng-content />
      </goa-multi-select>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabMultiSelect),
    },
  ],
})
export class GoabMultiSelect extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input({ transform: booleanAttribute }) filterable?: boolean;
  @Input() maxHeight?: string;
  @Input() placeholder?: string;
  @Input() width?: string;
  @Input() maxWidth?: string;
  @Input() size?: GoabDropdownSize = "default";
  @Output() onChange = new EventEmitter<GoabDropdownOnChangeDetail>();

  isReady = false;
  version = "2";

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onChange(e: Event) {
    const detail = { ...(e as CustomEvent<GoabDropdownOnChangeDetail>).detail, event: e };
    this.onChange.emit(detail);
    this.markAsTouched();
    if (detail.values !== undefined) {
      this.value = JSON.stringify(detail.values);
      this.fcChange?.(detail.values);
    } else {
      this.value = detail.value || null;
      this.fcChange?.(detail.value || "");
    }
  }

  protected override convertValueToString(value: unknown): string {
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return super.convertValueToString(value);
  }

  public override writeValue(value: unknown): void {
    const stringValue = this.convertValueToString(value);
    this.value = stringValue || null;
    const el = this.goaComponentRef?.nativeElement as HTMLElement | undefined;
    if (el) {
      this.renderer.setAttribute(el, "value", stringValue);
    }
  }
}
