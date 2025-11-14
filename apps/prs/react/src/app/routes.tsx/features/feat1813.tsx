import { useLayoutEffect, useMemo, useState } from "react";
import {
  GoabDatePicker,
  GoabBlock,
  GoabText,
  GoabPopover,
  GoabButton,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
} from "@abgov/react-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

type DatePickerScenario = {
  id: string;
  label: string;
  width?: string;
  containerWidth?: string;
  type?: "calendar" | "input";
  description: string;
  emphasis?: string;
};

type ScenarioMeasurement = {
  hostWidth?: number;
  inputWidth?: number;
  widthAttr?: string | null;
};

export function Feat1813Route() {
  const [lastSelectedDate, setLastSelectedDate] = useState<string>("");
  const [lastSelectedDropdown, setLastSelectedDropdown] = useState<string>("");
  const [dropdownValue, setDropdownValue] = useState<string>("");
  const [measurements, setMeasurements] = useState<Record<string, ScenarioMeasurement>>(
    {},
  );

  const scenarios = useMemo<DatePickerScenario[]>(
    () => [
      {
        id: "default",
        label: "Default (no width provided)",
        description: "Falls back to the shared 16ch default like other inputs.",
      },
      {
        id: "ch-24",
        label: "Character width (24ch)",
        width: "24ch",
        description: "Confirms ch units make it through to the rendered input.",
      },
      {
        id: "px-360",
        label: "Fixed width (360px)",
        width: "360px",
        description: "Validates px widths while keeping the popover aligned.",
      },
      {
        id: "percent-80",
        label: "Relative width (80% of 560px container)",
        width: "80%",
        containerWidth: "560px",
        description: "Ensures percentage widths respect their parent container.",
      },
      {
        id: "clamp-small",
        label: "Requested width below minimum (8ch in a 120px slot)",
        width: "8ch",
        containerWidth: "120px",
        description: "Should never shrink below the minimum readable width (≈16ch).",
        emphasis: "Must clamp ≥ 16ch so the date stays legible.",
      },
      {
        id: "input-segments",
        label: "Type “input” with explicit width (340px)",
        width: "340px",
        type: "input",
        description:
          "Segmented month/day/year inputs should line up within the requested width.",
      },
    ],
    [],
  );

  const onDateChange = (details: GoabDatePickerOnChangeDetail) => {
    console.log("Date changed:", details);
    setLastSelectedDate(
      details.value ? new Date(details.value).toLocaleDateString() : "None",
    );
  };

  const dropdownChange = (details: GoabDropdownOnChangeDetail) => {
    if (!details.value) {
      console.log("Value empty");
      setDropdownValue(lastSelectedDropdown);
    } else {
      console.log("Value changed: ", details.value);
      setLastSelectedDropdown(details.value);
      setDropdownValue(details.value);
    }
  };

  useLayoutEffect(() => {
    const readMeasurements = (): Record<string, ScenarioMeasurement> => {
      const result: Record<string, ScenarioMeasurement> = {};

      scenarios.forEach((scenario) => {
        const wrapper = document.querySelector<HTMLElement>(
          `[data-scenario="${scenario.id}"]`,
        );
        const host = wrapper?.querySelector<HTMLElement>("goa-date-picker") ?? undefined;
        const hostWidth = host?.getBoundingClientRect().width;

        const popover = host?.shadowRoot?.querySelector<HTMLElement>("goa-popover");
        const goaInput = popover?.querySelector<HTMLElement>("goa-input");
        const widthAttr = goaInput?.getAttribute("width") ?? null;
        const inputElement =
          goaInput?.shadowRoot?.querySelector<HTMLElement>("input") ??
          goaInput ??
          undefined;
        const inputWidth = inputElement?.getBoundingClientRect().width;

        if (scenario.type === "input" && !goaInput) {
          const formItem = host?.shadowRoot?.querySelector<HTMLElement>("goa-form-item");
          result[scenario.id] = {
            hostWidth: hostWidth ? Math.round(hostWidth) : undefined,
            inputWidth: formItem
              ? Math.round(formItem.getBoundingClientRect().width)
              : undefined,
            widthAttr,
          };
          return;
        }

        result[scenario.id] = {
          hostWidth: hostWidth ? Math.round(hostWidth) : undefined,
          inputWidth: inputWidth ? Math.round(inputWidth) : undefined,
          widthAttr,
        };
      });

      return result;
    };

    const equalMeasurements = (
      prev: Record<string, ScenarioMeasurement>,
      next: Record<string, ScenarioMeasurement>,
    ) => {
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      if (prevKeys.length !== nextKeys.length) {
        return false;
      }
      return prevKeys.every((key) => {
        const prevValue = prev[key];
        const nextValue = next[key];
        if (!prevValue && !nextValue) {
          return true;
        }
        if (!prevValue || !nextValue) {
          return false;
        }
        return (
          prevValue.hostWidth === nextValue.hostWidth &&
          prevValue.inputWidth === nextValue.inputWidth &&
          prevValue.widthAttr === nextValue.widthAttr
        );
      });
    };

    const update = () => {
      requestAnimationFrame(() => {
        setMeasurements((prev) => {
          const next = readMeasurements();
          if (equalMeasurements(prev, next)) {
            return prev;
          }
          return next;
        });
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, [scenarios]);

  return (
    <main>
      <GoabText tag="h1" size="heading-l">
        Date Picker width property
      </GoabText>
      <GoabText tag="p" size="body-m">
        Exercises fixed, relative, and constrained widths for the calendar view and
        segmented input flavour. Measurements capture what the DOM reports so regressions
        are easy to spot.
      </GoabText>

      <GoabBlock gap="2xl" direction="column">
        <GoabBlock direction="column" gap="l">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              data-scenario={scenario.id}
              style={{
                width: scenario.containerWidth,
              }}
            >
              <GoabBlock direction="column" gap="s">
                <GoabText tag="h3" size="heading-s">
                  {scenario.label}
                </GoabText>
                <GoabText tag="p" size="body-s">
                  {scenario.description}
                </GoabText>
                {scenario.emphasis ? (
                  <GoabText tag="p" size="body-s">
                    {scenario.emphasis}
                  </GoabText>
                ) : null}

                <GoabFormItem label={scenario.label}>
                  <GoabDatePicker
                    name={scenario.id}
                    width={scenario.width}
                    type={scenario.type}
                    onChange={onDateChange}
                  />
                </GoabFormItem>

                <GoabText tag="p" size="body-s">
                  Host width:
                  {measurements[scenario.id]?.hostWidth !== undefined
                    ? ` ${measurements[scenario.id]?.hostWidth}px`
                    : " –"}
                  {" · "}Input width:
                  {measurements[scenario.id]?.inputWidth !== undefined
                    ? ` ${measurements[scenario.id]?.inputWidth}px`
                    : " –"}
                </GoabText>
                <GoabText tag="p" size="body-s">
                  Input width attribute:
                  {measurements[scenario.id]?.widthAttr !== undefined
                    ? ` ${measurements[scenario.id]?.widthAttr || "none"}`
                    : " –"}
                </GoabText>
              </GoabBlock>
            </div>
          ))}
        </GoabBlock>

        <section>
          <GoabText tag="h4">Popover</GoabText>
          <GoabPopover
            target={
              <GoabButton type="secondary" size="compact">
                Popover Test
              </GoabButton>
            }
          >
            <p>This is a popover</p>
            <p>It can be used for a number of different contexts</p>
          </GoabPopover>
        </section>

        <section>
          <GoabFormItem label="Dropdown">
            <GoabDropdown
              name="item"
              value={dropdownValue}
              onChange={(details) => dropdownChange(details)}
              width="300px"
              filterable={true}
            >
              <GoabDropdownItem value="red" label="Red" />
              <GoabDropdownItem value="green" label="Green" />
              <GoabDropdownItem value="blue" label="Blue" />
              <GoabDropdownItem value="black" label="Black" />
              <GoabDropdownItem value="white" label="White" />
              <GoabDropdownItem value="yellow" label="Yellow" />
              <GoabDropdownItem value="magenta" label="Magenta" />
              <GoabDropdownItem value="purple" label="Purple" />
            </GoabDropdown>
          </GoabFormItem>
        </section>

        <section>
          <h2>Test Results</h2>
          <GoabText tag="p">
            Last selected date: {lastSelectedDate || "None selected"}
          </GoabText>
          <GoabText tag="p">
            Last selected dropdown: {lastSelectedDropdown || "None selected"}
          </GoabText>
        </section>
      </GoabBlock>
    </main>
  );
}
