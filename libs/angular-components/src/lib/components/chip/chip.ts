import {
  GoabChipTheme,
  GoabChipVariant,
  GoabIconType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-chip",
  imports: [CommonModule],
  template: `<goa-chip
    *ngIf="isReady"
    [attr.leadingicon]="leadingIcon"
    [attr.variant]="variant"
    [attr.error]="error"
    [attr.deletable]="deletable"
    [attr.icontheme]="iconTheme"
    [attr.content]="content"
    [attr.testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_click)="_onClick()"
  >
    <ng-content />
  </goa-chip>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabChip extends GoabBaseComponent implements OnInit {
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

  @Input() leadingIcon?: GoabIconType | null;
  @Input({ transform: booleanAttribute }) error?: boolean;
  @Input({ transform: booleanAttribute }) deletable?: boolean;
  @Input() content?: string = "";
  @Input() variant?: GoabChipVariant;
  @Input() iconTheme?: GoabChipTheme;

  @Output() onClick = new EventEmitter();

  _onClick() {
    this.onClick.emit();
  }
}
