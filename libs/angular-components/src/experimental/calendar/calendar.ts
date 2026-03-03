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
import { formatDate } from "../../date-utils";

@Component({
  standalone: true,
  selector: "goabx-calendar",

  template: `
    @if (isReady) {
      <goa-calendar
        [attr.name]="name"
        [value]="value"
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

  @Input() name?: string;
  @Input() value?: Date | string;
  @Input() min?: Date;
  @Input() max?: Date;

  @Output() onChange = new EventEmitter<GoabCalendarOnChangeDetail>();

  isReady = false;

  minString(): string | undefined {
    if (!this.min) return undefined;
    return formatDate(this.min);
  }

  maxString(): string | undefined {
    if (!this.max) return undefined;
    return formatDate(this.max);
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
