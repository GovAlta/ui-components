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
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-filter-chip",
  template: `@if (isReady) {
    <goa-filter-chip
      [attr.version]="version"
      [attr.error]="error"
      [attr.icontheme]="iconTheme"
      [attr.content]="content"
      [attr.secondarytext]="secondaryText"
      [attr.leadingicon]="leadingIcon"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_click)="_onClick()"
    >
      <ng-content />
    </goa-filter-chip>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFilterChip extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) error?: boolean;
  @Input({ transform: booleanAttribute }) deletable?: boolean;
  @Input() content?: string = "";
  @Input() iconTheme?: GoabChipTheme;
  @Input() secondaryText?: string = "";
  @Input() leadingIcon?: GoabIconType | null = null;

  @Output() onClick = new EventEmitter();

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

  _onClick() {
    this.onClick.emit();
  }
}
