import React, { useState } from "react";
import {
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabText,
} from "@abgov/react-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

export function Bug3248Route() {
  const [colors, setColors] = useState<string[]>(["red", "blue", "green", "yellow", "purple"]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const reduceToOne = () => {
    setColors(["blue"]);
  };

  const reduceToTwo = () => {
    setColors(["green", "yellow"]);
  };

  const resetToAll = () => {
    setColors(["red", "blue", "green", "yellow", "purple"]);
  };

  const onChange = (detail: GoabDropdownOnChangeDetail) => {
    console.log("Dropdown changed:", detail);
    setSelectedColor(detail.value || "");
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto", padding: "2rem" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2333: Dropdown Reset Test
      </GoabText>

      <GoabText size="body-m" mb="2xl">
        This test demonstrates the dropdown reset issue. When dropdown items are dynamically
        removed, the dropdown should properly sync its internal state to reflect the updated
        list of options.
      </GoabText>

      <GoabText size="heading-m" mb="l">
        Test Scenario
      </GoabText>

      <GoabText size="body-s" mb="m">
        1. Select a color from the dropdown below
      </GoabText>
      <GoabText size="body-s" mb="m">
        2. Click one of the buttons to reduce the number of available options
      </GoabText>
      <GoabText size="body-s" mb="m">
        3. Open the dropdown again - it should only show the remaining options
      </GoabText>
      <GoabText size="body-s" mb="2xl">
        4. The bug occurred when the filtered options weren't synced after items were destroyed
      </GoabText>

      <GoabText size="body-m" mb="m">
        Currently showing {colors.length} color(s): {colors.join(", ")}
      </GoabText>

      <GoabText size="body-m" mb="m">
        Selected value: {selectedColor || "None"}
      </GoabText>

      <GoabDropdown
        name="favcolor"
        placeholder="Select a color"
        value={selectedColor}
        onChange={onChange}
        mb="xl"
      >
        {colors.map((color) => (
          <GoabDropdownItem key={color} label={color} value={color} />
        ))}
      </GoabDropdown>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <GoabButton type="secondary" onClick={reduceToOne}>
          Reduce to 1 item (blue)
        </GoabButton>
        <GoabButton type="secondary" onClick={reduceToTwo}>
          Reduce to 2 items (green, yellow)
        </GoabButton>
        <GoabButton type="primary" onClick={resetToAll}>
          Reset to all items
        </GoabButton>
      </div>

      <GoabText size="body-s" mb="m" mt="2xl">
        <strong>Expected behavior:</strong> After clicking a reduction button, opening the
        dropdown should only display the items that remain in the list.
      </GoabText>
      <GoabText size="body-s">
        <strong>Bug behavior (before fix):</strong> The dropdown would still show all original
        items even after they were removed, because syncFilteredOptions() wasn't called when
        child items were destroyed.
      </GoabText>
    </div>
  );
}
