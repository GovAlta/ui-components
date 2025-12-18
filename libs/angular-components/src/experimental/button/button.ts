import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../../lib/components/base.component";

@Component({
  standalone: true,
  selector: "goabx-button", // eslint-disable-line
  imports: [CommonModule],
  template: `
    <div class="v2-experimental-tokens">
      <goa-button
        *ngIf="isReady"
        [attr.version]="'2'"
        [attr.type]="type"
        [attr.size]="size"
        [attr.variant]="variant"
        [disabled]="disabled"
        [attr.leadingicon]="leadingIcon"
        [attr.trailingicon]="trailingIcon"
        [attr.width]="width"
        [attr.testid]="testId"
        [attr.action]="action"
        [attr.action-arg]="actionArg"
        [attr.action-args]="JSON.stringify(actionArgs)"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_click)="_onClick()"
      >
        <ng-content />
      </goa-button>
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxButton extends GoabBaseComponent implements OnInit {
  @Input() type?: GoabButtonType = "primary";
  @Input() size?: GoabButtonSize;
  @Input() variant?: GoabButtonVariant;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() width?: string;
  @Input() action?: string;
  @Input() actionArg?: string;
  @Input() actionArgs?: Record<string, unknown>;

  @Output() onClick = new EventEmitter();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
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

  protected readonly JSON = JSON;
}
