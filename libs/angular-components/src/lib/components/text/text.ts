import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  ChangeDetectorRef,
  HostBinding,
  inject,
} from "@angular/core";

import {
  GoabTextColor,
  GoabTextHeadingElement,
  GoabTextMaxWidth,
  GoabTextSize,
  GoabTextTextElement,
  Spacing,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-text",

  template: `
    @if (isReady) {
      <goa-text
        [attr.as]="tag"
        [attr.size]="size"
        [attr.maxwidth]="maxWidth"
        [attr.color]="color"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-text>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Provides consistent sizing, spacing, and colour to written content. */
export class GoabText implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** The HTML element to render. Use semantic elements like 'h1'-'h6' for headings. */
  @Input() tag?: GoabTextTextElement | GoabTextHeadingElement;
  /** Overrides the text size. */
  @Input() size?: GoabTextSize;
  /** Sets the max width. */
  @Input() maxWidth?: GoabTextMaxWidth;
  /** Sets the text colour. */
  @Input() color?: GoabTextColor;
  /** Sets the id attribute on the host element. */
  @Input() id?: string;
  /*
    This is necessary because angular outputs two elements, <goab-text> and <goa-text>
    This removes the id from <goa-text> and only outputs it to <goab-text>
  */
  @HostBinding("attr.id") get hostId() {
    return this.id;
  }
  /** Top margin. */
  @Input() mt?: Spacing;
  /** Bottom margin. */
  @Input() mb?: Spacing;
  /** Left margin. */
  @Input() ml?: Spacing;
  /** Right margin. */
  @Input() mr?: Spacing;

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
