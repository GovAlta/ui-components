import {
  CalendarDate,
  GoabCalendarOnChangeDetail,
  Once,
} from "@abgov/ui-components-common";
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
  selector: "goabx-calendar",

  template: `
    @if (isReady) {
      <goa-calendar
        [attr.name]="name"
        [value]="valueString()"
        [attr.min]="minString()"
        [attr.max]="maxString()"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        [attr.version]="version"
        (_change)="_onChange($event)"
      >
        <ng-content />
      </goa-calendar>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxCalendar extends GoabBaseComponent implements OnInit {
  version = 2;

  /**
   * Name identifier for the calendar, included in change events.
   * @default ""
   */
  @Input() name?: string;
  /**
   * The currently selected date value in YYYY-MM-DD format.
   * @default ""
   */
  @Input() value?: Date | string;
  /**
   * The minimum selectable date in YYYY-MM-DD format. Defaults to 5 years in the past.
   * @default ""
   */
  @Input() min?: Date | string | undefined;
  /**
   * The maximum selectable date in YYYY-MM-DD format. Defaults to 5 years in the future.
   * @default ""
   */
  @Input() max?: Date | string | undefined;

  @Output() onChange = new EventEmitter<GoabCalendarOnChangeDetail>();

  isReady = false;

  private once: Once = new Once();

  private formatValue(param: string, val: Date | string | null | undefined): string {
    if (!val) return "";

    this.once.when(val instanceof Date).do(param, () => {
      console.warn(
        `GoabxCalendar: Using Date for '${param}' is deprecated. Use a string in YYYY-MM-DD format instead.`,
      );
    });

    return new CalendarDate(val).toString();
  }

  valueString(): string {
    return this.formatValue("value", this.value);
  }

  minString(): string {
    return this.formatValue("min", this.min);
  }

  maxString(): string {
    return this.formatValue("max", this.max);
  }

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

  _onChange(e: Event) {
    const details = (e as CustomEvent<GoabCalendarOnChangeDetail>).detail;
    this.onChange.emit(details);
  }
}
