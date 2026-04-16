import { useState } from "react";
import { GoabFilterChip, GoabFormItem, GoabInput } from "@abgov/react-components";

export function TypeToCreateANewFilter() {
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <GoabFormItem label="Type to create a chip" mb="m">
        <GoabInput
          name="chipInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.value.trim())}
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.value.trim()) {
              setTypedChips([...typedChips, e.value.trim()]);
              setTimeout(() => setInputValue(""), 0);
            } else if (e.key === "Backspace" && !e.value.trim() && typedChips.length > 0) {
              setTypedChips(typedChips.slice(0, -1));
            }
          }}
          width="100%"
        />
      </GoabFormItem>
      <div>
        {typedChips.map((chip, index) => (
          <GoabFilterChip
            key={index}
            content={chip}
            mb="xs"
            mr="xs"
            onClick={() => setTypedChips(typedChips.filter((c) => c !== chip))}
          />
        ))}
      </div>
    </>
  );
}
