import { GoabIconType, Spacing } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
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
  isReady = false;
  /** Icon displayed before the link text. */
  @Input() leadingIcon?: GoabIconType;
  /** Icon displayed after the link text. */
  @Input() trailingIcon?: GoabIconType;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;
  /**
   * Custom action event name to dispatch when the link is clicked.
   * @default ""
   */
  @Input() action?: string;
  /**
   * Single argument to pass with the action event (deprecated, use actionArgs).
   * @default ""
   */
  @Input() actionArg?: string;
  /**
   * Object of arguments to pass with the action event.
   * @default {}
   */
  @Input() actionArgs?: Record<string, unknown>;
  /** Top margin. */
  @Input() mt?: Spacing;
  /** Bottom margin. */
  @Input() mb?: Spacing;
  /** Left margin. */
  @Input() ml?: Spacing;
  /** Right margin. */
  @Input() mr?: Spacing;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  protected readonly JSON = JSON;
}
