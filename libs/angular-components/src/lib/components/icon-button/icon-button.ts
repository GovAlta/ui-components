import {
  GoabIconButtonVariant,
  GoabIconSize,
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
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-icon-button",
  template: `
    <goa-icon-button
      *ngIf="isReady"
      [attr.icon]="icon"
      [disabled]="disabled"
      [attr.size]="size"
      [attr.variant]="variant"
      [title]="title"
      [attr.arialabel]="ariaLabel"
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
      <ng-content></ng-content>
    </goa-icon-button>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabIconButton extends GoabBaseComponent implements OnInit {
  isReady = false;
  protected readonly JSON = JSON;
  @Input({ required: true }) icon!: GoabIconType;
  @Input() size?: GoabIconSize = "medium";
  @Input() variant?: GoabIconButtonVariant;
  @Input() title?: string;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Input() ariaLabel?: string;
  @Input() action?: string;
  @Input() actionArg?: string;
  @Input() actionArgs?: Record<string, unknown>;
  @Output() onClick = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  _onClick() {
    this.onClick.emit();
  }


}
