import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabTabsOnChangeDetail, GoabTabsVariant } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goabx-tabs",
  template: `
    <goa-tabs
      *ngIf="isReady"
      [attr.version]="version"
      [attr.initialtab]="initialTab"
      [attr.testid]="testId"
      [attr.variant]="variant"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-tabs>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxTabs implements OnInit {
  isReady = false;
  version = "2";
  @Input({ transform: numberAttribute }) initialTab?: number;
  @Input() testId?: string;
  @Input() variant?: GoabTabsVariant;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onChange = new EventEmitter<GoabTabsOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabTabsOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
