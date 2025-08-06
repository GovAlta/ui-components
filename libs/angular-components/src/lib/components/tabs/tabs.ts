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
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-tabs",
  template: `
    <goa-tabs
      *ngIf="isReady"
      [attr.initialtab]="initialTab"
      [attr.testid]="testId"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-tabs>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTabs implements OnInit {
  isReady = false;
  @Input({ transform: numberAttribute }) initialTab?: number;
  @Input() testId?: string;

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
