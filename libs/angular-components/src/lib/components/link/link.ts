import {
  GoabIconType,
  GoabLinkColor,
  GoabLinkSize,
  Spacing,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-link",
  template: `
    @if (isReady) {
      <goa-link
        [attr.leadingicon]="leadingIcon"
        [attr.trailingicon]="trailingIcon"
        [attr.testid]="testId"
        [attr.action]="action"
        [attr.color]="color"
        [attr.size]="size"
        [attr.action-arg]="actionArg"
        [attr.action-args]="JSON.stringify(actionArgs)"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
      </goa-link>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabLink implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() testId?: string;
  @Input() action?: string;
  @Input() color?: GoabLinkColor = "interactive";
  @Input() size?: GoabLinkSize = "medium";
  @Input() actionArg?: string;
  @Input() actionArgs?: Record<string, unknown>;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  protected readonly JSON = JSON;
}
