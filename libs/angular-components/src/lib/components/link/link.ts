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
/** Wraps an anchor element to add icons or margins. */
export class GoabLink implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Icon displayed before the link text. */
  @Input() leadingIcon?: GoabIconType;
  /** Icon displayed after the link text. */
  @Input() trailingIcon?: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Custom action event name to dispatch when the link is clicked. */
  @Input() action?: string;
  /** Sets the color theme. 'interactive' for blue, 'dark' for black, 'light' for white text. @default "interactive" */
  @Input() color?: GoabLinkColor = "interactive";
  /** Sets the text size and corresponding icon size. @default "medium" */
  @Input() size?: GoabLinkSize = "medium";
  /** Single argument to pass with the action event (deprecated, use actionArgs). */
  @Input() actionArg?: string;
  /** Object of arguments to pass with the action event. */
  @Input() actionArgs?: Record<string, unknown>;
  /** Top margin. */
  @Input() mt?: Spacing;
  /** Bottom margin. */
  @Input() mb?: Spacing;
  /** Left margin. */
  @Input() ml?: Spacing;
  /** Right margin. */
  @Input() mr?: Spacing;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  protected readonly JSON = JSON;
}
