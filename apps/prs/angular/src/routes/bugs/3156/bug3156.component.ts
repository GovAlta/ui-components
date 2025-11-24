import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownOnChangeDetail,
  GoabFormItem,
  GoabText,
} from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

type DropdownItemLog = {
  label: string;
  value: string;
  mountType: string;
};

@Component({
  standalone: true,
  selector: "abgov-bug3156",
  templateUrl: "./bug3156.component.html",
  styleUrls: ["./bug3156.component.css"],
  imports: [
    CommonModule,
    GoabBlock,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabText,
  ],
})
export class Bug3156Component implements AfterViewInit, OnDestroy {
  readonly months = [
    { label: "January", value: "0" },
    { label: "February", value: "1" },
    { label: "March", value: "2" },
    { label: "April", value: "3" },
    { label: "May", value: "4" },
    { label: "June", value: "5" },
    { label: "July", value: "6" },
    { label: "August", value: "7" },
    { label: "September", value: "8" },
    { label: "October", value: "9" },
    { label: "November", value: "10" },
    { label: "December", value: "11" },
  ];

  mountedItems: DropdownItemLog[] = [];
  selectedValue = "";
  calendarValue?: string | Date;

  @ViewChild("dropdownHost", { static: true })
  dropdownHost?: ElementRef<HTMLElement>;

  private listenerTarget?: HTMLElement;

  private readonly handleMessage = (event: Event) => {
    const customEvent = event as CustomEvent<{
      action: string;
      data?: { label?: string; value?: string; mountType?: string };
    }>;

    if (customEvent.detail?.action !== "dropdown-item:mounted") {
      return;
    }

    const detail = customEvent.detail.data ?? {};

    this.mountedItems = [
      ...this.mountedItems,
      {
        label: this.describe(detail.label),
        value: this.describe(detail.value),
        mountType: this.describe(detail.mountType),
      },
    ];
  };

  ngAfterViewInit(): void {
    this.listenerTarget = this.dropdownHost?.nativeElement ?? undefined;
    this.listenerTarget?.addEventListener("msg", this.handleMessage as EventListener);
  }

  ngOnDestroy(): void {
    this.listenerTarget?.removeEventListener("msg", this.handleMessage as EventListener);
  }

  onDropdownChange(detail: GoabDropdownOnChangeDetail): void {
    this.selectedValue = detail.value ?? "";
  }

  onCalendarChange(detail: GoabDatePickerOnChangeDetail): void {
    this.calendarValue = detail.value;
  }

  trackByValue(_: number, month: { value: string; label: string }): string {
    return month.value;
  }

  get selectedMonthLabel(): string {
    const match = this.months.find((month) => month.value === this.selectedValue);
    return match?.label ?? "None";
  }

  get calendarValueLabel(): string {
    if (this.calendarValue instanceof Date) {
      return this.calendarValue.toISOString();
    }

    return this.calendarValue ?? "None";
  }

  private describe(value?: string): string {
    if (value === undefined) {
      return "(missing)";
    }

    if (value === "") {
      return "(empty)";
    }

    return value;
  }
}
