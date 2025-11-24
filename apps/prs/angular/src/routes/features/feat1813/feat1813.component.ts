import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabDatePicker,
  GoabDatePickerOnChangeDetail,
  GoabPopover,
  GoabButton,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
  GoabText,
  GoabBlock,
} from "@abgov/angular-components";
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";

interface DatePickerScenario {
  id: string;
  label: string;
  width?: string;
  containerWidth?: string;
  type?: "calendar" | "input";
  description: string;
  emphasis?: string;
}

interface ScenarioMeasurement {
  hostWidth?: number;
  inputWidth?: number;
  widthAttr?: string | null;
}

@Component({
  standalone: true,
  selector: "abgov-feat1813",
  templateUrl: "./feat1813.component.html",
  styleUrls: ["./feat1813.component.css"],
  imports: [
    CommonModule,
    GoabDatePicker,
    GoabPopover,
    GoabButton,
    GoabFormItem,
    GoabDropdown,
    GoabDropdownItem,
    GoabText,
    ReactiveFormsModule,
    FormsModule,
    GoabBlock,
  ],
})
export class Feat1813Component implements OnInit, AfterViewInit, OnDestroy {
  lastSelectedDate = "";
  lastSelectedDropdown: string | null = "red";
  dropdownGroup = new FormGroup({
    dropdownCtrl: new FormControl("red"),
  });
  measurements: Record<string, ScenarioMeasurement> = {};

  readonly scenarios: DatePickerScenario[] = [
    {
      id: "default",
      label: "Default (no width provided)",
      description: "Should fall back to the shared default 16ch width like GoA inputs.",
    },
    {
      id: "ch-24",
      label: "Character width (24ch)",
      width: "24ch",
      description:
        "Ensures ch units are preserved and forwarded to the underlying GoA input.",
    },
    {
      id: "px-360",
      label: "Fixed width (360px)",
      width: "360px",
      description: "Checks pixel widths and ensures popover content fits target.",
    },
    {
      id: "percent-80",
      label: "Relative width (80% inside 560px container)",
      width: "80%",
      containerWidth: "560px",
      description: "Validates percentage widths respect the parent container.",
    },
    {
      id: "clamp-small",
      label: "Requested width below minimum (8ch in a 120px slot)",
      width: "8ch",
      containerWidth: "120px",
      description:
        "Should not shrink below the minimum readable width; expect ≥ 16ch (~160px).",
      emphasis: "Must stay readable",
    },
    {
      id: "input-segments",
      label: "Type “input” with explicit width (340px)",
      width: "340px",
      type: "input",
      description:
        "Ensures segmented date input respects width and keeps month/day/year layout aligned.",
    },
  ];

  private resizeHandler = () => this.scheduleMeasurement();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  onDateChange(details: GoabDatePickerOnChangeDetail) {
    console.log("Date changed:", details);
    this.lastSelectedDate = details.value
      ? new Date(details.value).toLocaleDateString()
      : "None";
  }

  ngOnInit() {
    this.dropdownGroup.controls["dropdownCtrl"].valueChanges.subscribe((value) => {
      if (!value) {
        console.log("Value empty");
        this.dropdownGroup.controls["dropdownCtrl"].setValue(this.lastSelectedDropdown);
      } else {
        console.log("Value changed: ", value);
        this.lastSelectedDropdown = value;
      }
    });
  }

  ngAfterViewInit(): void {
    this.scheduleMeasurement();
    window.addEventListener("resize", this.resizeHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener("resize", this.resizeHandler);
  }

  trackByScenarioId(_: number, scenario: DatePickerScenario): string {
    return scenario.id;
  }

  private scheduleMeasurement(): void {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.measurements = this.collectMeasurements();
        this.cdr.markForCheck();
      }, 0);
    });
  }

  private collectMeasurements(): Record<string, ScenarioMeasurement> {
    const readings: Record<string, ScenarioMeasurement> = {};

    for (const scenario of this.scenarios) {
      const wrapper = document.querySelector<HTMLElement>(
        `[data-scenario="${scenario.id}"]`,
      );

      const host = wrapper?.querySelector<HTMLElement>("goa-date-picker") ?? undefined;

      const hostWidth = host?.getBoundingClientRect().width;

      const popover = host?.shadowRoot?.querySelector<HTMLElement>("goa-popover");
      const goaInput = popover?.querySelector<HTMLElement>("goa-input");
      const widthAttr = goaInput?.getAttribute("width") ?? null;
      const inputElement =
        goaInput?.shadowRoot?.querySelector<HTMLElement>("input") ?? goaInput;
      const inputWidth = inputElement?.getBoundingClientRect().width;

      if (scenario.type === "input" && !goaInput) {
        const formItem = host?.shadowRoot?.querySelector<HTMLElement>("goa-form-item");
        readings[scenario.id] = {
          hostWidth: hostWidth ? Math.round(hostWidth) : undefined,
          inputWidth: formItem
            ? Math.round(formItem.getBoundingClientRect().width)
            : undefined,
          widthAttr,
        };
        continue;
      }

      readings[scenario.id] = {
        hostWidth: hostWidth ? Math.round(hostWidth) : undefined,
        inputWidth: inputWidth ? Math.round(inputWidth) : undefined,
        widthAttr,
      };
    }

    return readings;
  }
}
