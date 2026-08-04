import { useState } from "react";
import { GoabBlock, GoabButton, GoabText, GoabTooltip } from "@abgov/react-components";

export function Bug3495Route() {
  const [label, setLabel] = useState("Copy");

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #3495: Tooltip width issue when text changes
      </GoabText>
      <GoabText tag="p" mb="l">
        Clicking the copy button changes the tooltip content from "Copy" to "Copied"
        while the tooltip stays open. Expected: the tooltip resizes to fit the new
        text. Actual (before fix): the tooltip kept the narrower width measured for
        "Copy", squeezing the "Copied" text.
      </GoabText>

      <GoabBlock gap="m" direction="row" alignment="center">
        <GoabTooltip content={label}>
          <GoabButton
            type="tertiary"
            leadingIcon="copy"
            onClick={() => setLabel("Copied")}
          >
            456 789 0123
          </GoabButton>
        </GoabTooltip>

        <GoabButton type="secondary" onClick={() => setLabel("Copy")}>
          Reset tooltip text
        </GoabButton>
      </GoabBlock>
    </div>
  );
}

export default Bug3495Route;
