import { GoabText, GoabFormItem, GoabInput } from "@abgov/react-components";
import { GoabInputOnBlurDetail } from "@abgov/ui-components-common";
import { useState } from "react";

export function Bug3635Route() {
  const [inputValue, setInputValue] = useState<string>("");

  function inputBlur(details: GoabInputOnBlurDetail) {
    setInputValue(details.value);
  }

  return (
    <>
      <GoabText tag="h1">Bug 3635 - Input: Leading icon color</GoabText>
      <GoabFormItem label="Leading Icon Input" mb="xl">
        <GoabInput
          name="autocomplete-test-v2"
          leadingIcon="search"
          onBlur={(e) => inputBlur(e)}
          value={inputValue}
        />
      </GoabFormItem>
      <GoabFormItem label="Leading Icon Input - Compact" mb="xl">
        <GoabInput
          name="autocomplete-test-v2"
          size="compact"
          leadingIcon="search"
          onBlur={(e) => inputBlur(e)}
          value={inputValue}
        />
      </GoabFormItem>
    </>
  );
}
