import {
  GoabIconType,
  GoabInputAutoCapitalize,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabInputType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  booleanAttribute,
  numberAttribute,
  TemplateRef,
  ChangeDetectorRef,
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";
import { NgIf, NgTemplateOutlet, CommonModule } from "@angular/common";

export interface IgnoreMe {
  ignore: string;
}

@Component({
  standalone: true,
  selector: "goab-input",
  imports: [NgIf, NgTemplateOutlet, CommonModule],
  template: `
    <goa-input
      #goaComponentRef
      *ngIf="isReady"
      [attr.type]="type"
      [attr.name]="name"
      [attr.focused]="focused"
      [attr.value]="value"
      [attr.autocapitalize]="autoCapitalize"
      [attr.autocomplete]="autoComplete"
      [attr.placeholder]="placeholder"
      [attr.leadingicon]="leadingIcon"
      [attr.trailingicon]="trailingIcon"
      [attr.variant]="variant"
      [disabled]="disabled"
      [attr.readonly]="readonly"
      [attr.error]="error"
      [attr.data-testid]="testId"
      [attr.width]="width"
      [attr.arialabel]="ariaLabel"
      [attr.arialabelledby]="ariaLabelledBy"
      [attr.min]="min"
      [attr.max]="max"
      [attr.step]="step"
      [attr.prefix]="prefix"
      [attr.suffix]="suffix"
      [attr.debounce]="debounce"
      [attr.maxlength]="maxLength"
      [attr.id]="id"
      [attr.mt]="mt"
      [attr.mr]="mr"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.handletrailingiconclick]="handleTrailingIconClick"
      [attr.textalign]="textAlign"
      (_trailingIconClick)="_onTrailingIconClick($event)"
      (_change)="_onChange($event)"
      (_focus)="_onFocus($event)"
      (_blur)="_onBlur($event)"
      (_keyPress)="_onKeyPress($event)"
      [attr.trailingiconarialabel]="trailingIconAriaLabel"
    >
      <div slot="leadingContent">
        <ng-container *ngIf="leadingContent">
          <ng-container *ngIf="getLeadingContentAsTemplate(); else stringLeading">
            <ng-container
              [ngTemplateOutlet]="getLeadingContentAsTemplate()"
            ></ng-container>
          </ng-container>
          <ng-template #stringLeading>{{ getLeadingContentAsString() }}</ng-template>
        </ng-container>
      </div>

      <ng-content />

      <div slot="trailingContent">
        <ng-container *ngIf="trailingContent">
          <ng-container *ngIf="getTrailingContentAsTemplate(); else stringTrailing">
            <ng-container
              [ngTemplateOutlet]="getTrailingContentAsTemplate()"
            ></ng-container>
          </ng-container>
          <ng-template #stringTrailing>{{ getTrailingContentAsString() }}</ng-template>
        </ng-container>
      </div>
    </goa-input>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabInput),
    },
  ],
})
export class GoabInput extends GoabControlValueAccessor implements OnInit {
  @Input() type?: GoabInputType = "text";
  @Input() name?: string;
  @Input({ transform: numberAttribute }) debounce?: number;
  @Input() autoCapitalize?: GoabInputAutoCapitalize;
  @Input() autoComplete?: string;
  @Input() placeholder?: string;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() variant?: string;
  @Input({ transform: booleanAttribute }) focused?: boolean;
  @Input({ transform: booleanAttribute }) readonly?: boolean;
  @Input() width?: string;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() ariaLabel?: string;
  @Input({ transform: numberAttribute }) maxLength?: number;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input({ transform: numberAttribute }) step?: number;
  @Input() ariaLabelledBy?: string;
  @Input() trailingIconAriaLabel?: string;
  @Input() textAlign?: "left" | "right" = "left";
  @Input() leadingContent!: string | TemplateRef<any>;
  @Input() trailingContent!: string | TemplateRef<any>;

  @Output() onTrailingIconClick = new EventEmitter();
  @Output() onFocus = new EventEmitter<GoabInputOnFocusDetail>();
  @Output() onBlur = new EventEmitter<GoabInputOnBlurDetail>();
  @Output() onKeyPress = new EventEmitter<GoabInputOnKeyPressDetail>();
  @Output() onChange = new EventEmitter<GoabInputOnChangeDetail>();

  isReady = false;
  handleTrailingIconClick = false;

  constructor(
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
  ) {
    super(renderer);
  }
  ngOnInit() {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);

    this.handleTrailingIconClick = this.onTrailingIconClick.observed;
    if (typeof this.value === "number") {
      console.warn("For numeric values use goab-input-number.");
    }
  }

  _onTrailingIconClick(_: Event) {
    if (this.handleTrailingIconClick) {
      this.onTrailingIconClick.emit();
    }
  }

  _onChange(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnChangeDetail>).detail;
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }

  _onKeyPress(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail;
    this.onKeyPress.emit(detail);

    this.fcTouched?.();
  }

  _onFocus(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail;
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = (e as CustomEvent<GoabInputOnBlurDetail>).detail;
    this.onBlur.emit(detail);
  }

  getLeadingContentAsString(): string {
    return this.leadingContent instanceof TemplateRef ? "" : this.leadingContent;
  }

  getLeadingContentAsTemplate(): TemplateRef<any> | null {
    if (!this.leadingContent) return null;
    return this.leadingContent instanceof TemplateRef ? this.leadingContent : null;
  }

  getTrailingContentAsString(): string {
    return this.trailingContent instanceof TemplateRef ? "" : this.trailingContent;
  }

  getTrailingContentAsTemplate(): TemplateRef<any> | null {
    if (!this.trailingContent) return null;
    return this.trailingContent instanceof TemplateRef ? this.trailingContent : null;
  }
}
