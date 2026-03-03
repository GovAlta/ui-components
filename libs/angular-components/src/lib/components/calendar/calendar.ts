import { GoabCalendarOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-calendar",

  template: `
    @if (isReady) {
      <goa-calendar
        [attr.name]="name"
        [value]="value"
        [attr.min]="min?.toISOString()"
        [attr.max]="max?.toISOString()"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_change)="_onChange($event)"
      >
        <ng-content />
      </goa-calendar>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCalendar extends GoabBaseComponent implements OnInit {
  @Input() name?: string;
  @Input() value?: Date | string;
  @Input() min?: Date;
  @Input() max?: Date;

  @Output() onChange = new EventEmitter<GoabCalendarOnChangeDetail>();

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
      console.log("GoabCalendar initialized with:", this.name, {
        value: this.value,
        min: this.min,
        max: this.max,
      });
    }, 0);
  }

  _onChange(e: Event) {
    const details = (e as CustomEvent<GoabCalendarOnChangeDetail>).detail;
    this.onChange.emit(details);
  }
}
