import { useState } from "react";
import {
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabText,
  GoabButton,
} from "@abgov/react-components";

export function Bug4092Route() {
  const [selected, setSelected] = useState<string[]>([]);
  const [blurCount, setBlurCount] = useState(0);
  const [lastBlur, setLastBlur] = useState<{
    value: string[];
    labels: string[];
  } | null>(null);

  return (
    <main>
      <GoabText tag="h1" mt="none" mb="m">
        Bug #4092: Dropdown Multiselect blur
      </GoabText>
      <GoabText tag="p" mb="s">
        <a href="https://github.com/GovAlta/ui-components/issues/4092">
          View issue #4092
        </a>
      </GoabText>
      <GoabText tag="p" mb="m">
        Open the dropdown and select an option, then move focus to the button below. The
        blur count should increase once when focus leaves the multiselect. Moving focus
        between controls inside the dropdown should not increase it.
      </GoabText>

      <div style={{ maxWidth: "400px" }}>
        <GoabFormItem label="Favourite fruit">
          <GoabDropdownMultiselect
            name="bug4092-fruit"
            placeholder="Select fruit"
            value={selected}
            onChange={({ value }) => setSelected(value)}
            onBlur={({ value, labels }) => {
              setBlurCount((count) => count + 1);
              setLastBlur({ value, labels });
            }}
            testId="bug4092-dropdown-multiselect"
          >
            <GoabDropdownItem value="apple" label="Apple" />
            <GoabDropdownItem value="banana" label="Banana" />
            <GoabDropdownItem value="cherry" label="Cherry" />
          </GoabDropdownMultiselect>
        </GoabFormItem>
        <GoabText tag="p" mt="s" mb="xs">
          Blur callbacks: <output aria-live="polite">{blurCount}</output>
        </GoabText>
        <GoabText tag="p" mb="xs">
          Values on last blur: {lastBlur ? JSON.stringify(lastBlur.value) : "No blur yet"}
        </GoabText>
        <GoabText tag="p" mb="m">
          Labels on last blur:{" "}
          {lastBlur ? JSON.stringify(lastBlur.labels) : "No blur yet"}
        </GoabText>
        <GoabButton>Focus here to leave the multiselect</GoabButton>
      </div>
    </main>
  );
}

export default Bug4092Route;
