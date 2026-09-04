import { GoabChipTheme, GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
  TemplateRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-filter-chip",
  imports: [NgTemplateOutlet],
  template: `@if (isReady) {
    <goa-filter-chip
      [attr.error]="error"
      [attr.icontheme]="iconTheme"
      [attr.content]="getContentAsString()"
      [attr.arialabel]="ariaLabel"
      [attr.secondarytext]="secondaryText"
      [attr.leadingicon]="leadingIcon"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_click)="_onClick()"
    >
      @if (getContentAsTemplate()) {
        <div slot="content">
          <ng-container [ngTemplateOutlet]="getContentAsTemplate()"></ng-container>
        </div>
      }
      <ng-content />
    </goa-filter-chip>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Allow the user to enter information, filter content, and make selections. */
export class GoabFilterChip extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Shows an error state. */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /** Marks the chip as deletable. */
  @Input({ transform: booleanAttribute }) deletable?: boolean;
  /** Content displayed in the chip. Accepts a string or template for custom content. */
  @Input() content?: string | TemplateRef<unknown> = "";
  /** Accessible content used to label the filter chip controls. */
  @Input() ariaLabel?: string;
  /** Sets the icon theme style for the filter chip. */
  @Input() iconTheme?: GoabChipTheme;
  /** Secondary text displayed in a smaller size before the main content. */
  @Input() secondaryText?: string = "";
  /** Icon displayed at the start of the chip. */
  @Input() leadingIcon?: GoabIconType | null = null;

  /** Emits when the filter chip delete button is clicked. */
  @Output() onClick = new EventEmitter();

  isReady = false;

  getContentAsString(): string | undefined {
    return typeof this.content === "string" ? this.content : undefined;
  }

  getContentAsTemplate(): TemplateRef<unknown> | null {
    return this.content instanceof TemplateRef ? this.content : null;
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onClick() {
    this.onClick.emit();
  }
}
