import { useState } from "react";
import {
  GoabDatePicker,
  GoabDivider,
  GoabFormItem,
  GoabText,
} from "@abgov/react-components";
import type { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

export function Bug3815Route() {
  const [date, setDate] = useState<string | undefined>();

  const handleChange = (detail: GoabDatePickerOnChangeDetail) => {
    setDate(detail.valueStr || undefined);
  };

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #3815: Date picker size prop
      </GoabText>
      <GoabText tag="p" mb="l">
        GoabDatePicker now exposes a <code>size</code> prop ("default" | "compact")
        that applies to both the calendar and input variants.
      </GoabText>
      <GoabText tag="p" mb="l">
        When <code>type="input"</code> is used in a narrow container, the three
        fields now stay on one line and shrink to fit instead of overflowing (see
        the last example).
      </GoabText>

      <GoabText tag="h2" mb="s">
        Calendar variant sizes
      </GoabText>
      <GoabFormItem label="Default size" mb="l">
        <GoabDatePicker name="calDefault" value={date} onChange={handleChange} />
      </GoabFormItem>
      <GoabFormItem label="Compact size" labelSize="compact" mb="l">
        <GoabDatePicker
          name="calCompact"
          size="compact"
          value={date}
          onChange={handleChange}
        />
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2" mb="s">
        Input variant sizes
      </GoabText>
      <GoabFormItem label="Default size" mb="l">
        <GoabDatePicker
          name="inputDefault"
          type="input"
          value={date}
          onChange={handleChange}
        />
      </GoabFormItem>
      <GoabFormItem label="Compact size" labelSize="compact" mb="l">
        <GoabDatePicker
          name="inputCompact"
          type="input"
          size="compact"
          value={date}
          onChange={handleChange}
        />
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2" mb="s">
        Input variant in a narrow container
      </GoabText>
      <GoabText tag="p" mb="m">
        The three fields stay on one line and fit the container. The month field
        shrinks; while empty its prompt collapses to just the chevron, and the
        open menu keeps its full readable width.
      </GoabText>
      <div style={{ width: "20rem", outline: "1px dashed var(--goa-color-greyscale-400)" }}>
        <GoabFormItem label="Date of birth">
          <GoabDatePicker
            name="inputNarrow"
            type="input"
            value={date}
            onChange={handleChange}
          />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default Bug3815Route;
