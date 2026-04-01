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
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-badge",
  template: `
    @if (isReady) {
      <goa-badge
        [attr.version]="version"
        [attr.size]="size"
        [attr.emphasis]="emphasis"
        [attr.type]="type"
        [attr.icon]="icon ? 'true' : 'false'"
        [attr.icontype]="iconType"
        [attr.arialabel]="ariaLabel"
        [attr.content]="content"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
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
export class GoabBadge extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() type?: GoabBadgeType;
  @Input() content?: string;
  // Ensure boolean input; attribute only set when true so default behaviour is false
  @Input({ transform: booleanAttribute }) icon?: boolean;
  @Input() iconType?: GoabIconType;
  @Input() size?: GoabBadgeSize = "medium";
  @Input() emphasis?: GoabBadgeEmphasis = "strong";
  @Input() ariaLabel?: string;

  isReady = false;
  version = "2";

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
