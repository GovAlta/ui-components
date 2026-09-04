import {
  GoabBadgeType,
  GoabIconType,
  GoabBadgeSize,
  GoabBadgeEmphasis,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
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
  selector: "goab-badge",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-badge
        [attr.size]="size"
        [attr.emphasis]="emphasis"
        [attr.type]="type"
        [attr.icon]="showIcon ? 'true' : 'false'"
        [attr.icontype]="iconType"
        [attr.arialabel]="ariaLabel"
        [attr.content]="getContentAsString()"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        @if (getContentAsTemplate()) {
          <div slot="content">
            <ng-container [ngTemplateOutlet]="getContentAsTemplate()"></ng-container>
          </div>
        }
      </goa-badge>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
/** Small labels which hold small amounts of information, system feedback, or states. */
export class GoabBadge extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the context and colour of the badge. */
  @Input() type?: GoabBadgeType;
  /** Sets the content displayed in the badge. Accepts a string or template for custom content. */
  @Input() content?: string | TemplateRef<unknown>;
  /** @deprecated Use icontype instead. Includes an icon in the badge. */
  @Input({ transform: booleanAttribute }) icon?: boolean;
  /** Sets the icon type to display in the badge. */
  @Input() iconType?: GoabIconType;
  /** Sets the size of the badge. @default "medium" */
  @Input() size?: GoabBadgeSize = "medium";
  /** Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. @default "strong" */
  @Input() emphasis?: GoabBadgeEmphasis = "strong";
  /** Sets the accessible label for screen readers. */
  @Input() ariaLabel?: string;

  isReady = false;

  get showIcon(): boolean {
    return this.icon ?? !!this.iconType;
  }

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
}
