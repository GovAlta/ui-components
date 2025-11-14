import { useMemo, useState, JSX } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabGrid,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/react-components";

type SelectionOption = {
  value: string;
  label: string;
};

export function Feat2361Route(): JSX.Element {
  const [errorEnabled, setErrorEnabled] = useState(false);
  const [disabledEnabled, setDisabledEnabled] = useState(false);

  const errorMessage = errorEnabled
    ? "Example error message for feature 2361"
    : undefined;

  const horizontalOptions = useMemo<SelectionOption[]>(
    () => [
      { value: "city", label: "City" },
      { value: "suburbs", label: "Suburbs" },
      { value: "rural", label: "Rural" },
    ],
    [],
  );

  const verticalOptions = useMemo<SelectionOption[]>(
    () => [
      { value: "bronze", label: "Bronze" },
      { value: "silver", label: "Silver" },
      { value: "gold", label: "Gold" },
    ],
    [],
  );

  const checkboxListOptions = useMemo<SelectionOption[]>(
    () => [
      { value: "flight", label: "Flight notifications" },
      { value: "hotel", label: "Hotel updates" },
      { value: "events", label: "Event reminders" },
    ],
    [],
  );

  const checkboxOptions = useMemo<SelectionOption[]>(
    () => [
      { value: "docs", label: "Enable document sync" },
      { value: "metrics", label: "Enable metrics dashboard" },
      { value: "beta", label: "Join beta features" },
    ],
    [],
  );

  const emptySelection = useMemo<string[]>(() => [], []);

  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1">Feature 2361 - Selection control toggles</GoabText>
        <GoabText tag="p">
          Manual scenarios to verify the expanded clickable area on radio groups, checkbox
          lists, and standalone checkboxes while sharing toggle controls.
        </GoabText>
      </GoabBlock>

      <GoabBlock direction="row" gap="s">
        <GoabButton type="secondary" onClick={() => setErrorEnabled((state) => !state)}>
          {errorEnabled ? "Clear error state" : "Enable error state"}
        </GoabButton>
        <GoabButton
          type="secondary"
          onClick={() => setDisabledEnabled((state) => !state)}
        >
          {disabledEnabled ? "Enable controls" : "Disable controls"}
        </GoabButton>
      </GoabBlock>

      <GoabText tag="p" size="body-s">
        Error state: {errorEnabled ? "on" : "off"} | Disabled:{" "}
        {disabledEnabled ? "on" : "off"}
      </GoabText>

      <GoabGrid minChildWidth="320px" gap="l">
        <GoabFormItem label="Horizontal orientation" error={errorMessage}>
          <GoabRadioGroup
            name="feat2361-horizontal"
            orientation="horizontal"
            disabled={disabledEnabled}
            error={errorEnabled}
          >
            {horizontalOptions.map((option) => (
              <GoabRadioItem
                key={option.value}
                name="feat2361-horizontal"
                value={option.value}
                label={option.label}
                disabled={disabledEnabled}
                error={errorEnabled}
              />
            ))}
          </GoabRadioGroup>
        </GoabFormItem>

        <GoabFormItem label="Vertical orientation" error={errorMessage}>
          <GoabRadioGroup
            name="feat2361-vertical"
            orientation="vertical"
            disabled={disabledEnabled}
            error={errorEnabled}
          >
            {verticalOptions.map((option) => (
              <GoabRadioItem
                key={option.value}
                name="feat2361-vertical"
                value={option.value}
                label={option.label}
                disabled={disabledEnabled}
                error={errorEnabled}
              />
            ))}
          </GoabRadioGroup>
        </GoabFormItem>

        <GoabFormItem label="Checkbox list" error={errorMessage}>
          <GoabCheckboxList
            name="feat2361-checkbox-list"
            disabled={disabledEnabled}
            error={errorEnabled}
            value={emptySelection}
          >
            {checkboxListOptions.map((option) => (
              <GoabCheckbox
                key={option.value}
                name={option.value}
                value={option.value}
                text={option.label}
                disabled={disabledEnabled}
                error={errorEnabled}
              />
            ))}
          </GoabCheckboxList>
        </GoabFormItem>

        <GoabFormItem label="Standalone checkboxes" error={errorMessage}>
          <GoabBlock direction="column" gap="xs">
            {checkboxOptions.map((option) => (
              <GoabCheckbox
                key={option.value}
                name={option.value}
                value={option.value}
                text={option.label}
                disabled={disabledEnabled}
                error={errorEnabled}
              />
            ))}
          </GoabBlock>
        </GoabFormItem>
      </GoabGrid>
    </GoabBlock>
  );
}

export default Feat2361Route;
