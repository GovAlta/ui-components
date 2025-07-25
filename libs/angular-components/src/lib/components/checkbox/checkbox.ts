import { GoabCheckboxOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  TemplateRef,
  booleanAttribute,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-checkbox",
  template: ` <goa-checkbox
    [attr.name]="name"
    [checked]="checked"
    [disabled]="disabled"
    [attr.indeterminate]="indeterminate ? 'true' : undefined"
    [attr.error]="error"
    [attr.text]="text"
    [value]="value"
    [attr.testid]="testId"
    [attr.arialabel]="ariaLabel"
    [attr.description]="getDescriptionAsString()"
    [attr.revealarialabel]="revealArialLabel"
    [id]="id"
    [attr.maxwidth]="maxWidth"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_change)="_onChange($event)"
  >
    <ng-content />
    <div slot="description">
      <ng-container [ngTemplateOutlet]="getDescriptionAsTemplate()"></ng-container>
    </div>
    <div slot="reveal">
      <ng-container *ngIf="reveal" [ngTemplateOutlet]="reveal"></ng-container>
    </div>
  </goa-checkbox>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabCheckbox),
    },
  ],
  imports: [NgTemplateOutlet, NgIf],
})
export class GoabCheckbox extends GoabControlValueAccessor {
  @Input() name?: string;
  @Input({ transform: booleanAttribute }) checked?: boolean;
  @Input({ transform: booleanAttribute }) indeterminate?: boolean;
  @Input() text?: string;
  // ** NOTE: can we just use the base component for this?
  @Input() override value?: string | number | boolean;
  @Input() ariaLabel?: string;
  @Input() description!: string | TemplateRef<any>;
  @Input() reveal?: TemplateRef<any>;
  @Input() revealArialLabel?: string;
  @Input() maxWidth?: string;

  @Output() onChange = new EventEmitter<GoabCheckboxOnChangeDetail>();

  getDescriptionAsString(): string {
    return typeof this.description === "string" ? this.description : "";
  }

  getDescriptionAsTemplate(): TemplateRef<any> | null {
    if (this.description) {
      return typeof this.description === "string" ? null : this.description;
    }
    return null;
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.binding === "check" ? detail.checked : detail.value || "");
  }
}
