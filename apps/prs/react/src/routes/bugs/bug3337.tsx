import {
  GoabButton,
  GoabFormItem,
  GoabInput,
  GoabText,
} from "@abgov/react-components";

import { GoabInputOnBlurDetail } from "@abgov/ui-components-common";
import { useState } from "react";

export function Bug3337Route() {
  const [inputValue, setInputValue] = useState<string>("");

  function buttonClick() {
    console.log("clicked");
  }

  function inputBlur(details: GoabInputOnBlurDetail) {
    setInputValue(details.value);
  }

  return (
    <>
      <GoabText tag="h1">Bug 3337 - Input autocomplete default styling</GoabText>
      <GoabText tag="p">
        Chromium browsers add their own styling to inputs using autocomplete, which
        overwrites our styling. This is to ensure our styling remains at all times.
      </GoabText>

      <GoabFormItem label="Autocomplete Input" mb="xl">
        <GoabInput
          name="autocomplete-test"
          leadingIcon="search"
          onBlur={(e) => inputBlur(e)}
          value={inputValue}
          autoComplete="name"
        />
      </GoabFormItem>
      <GoabFormItem label="Autocomplete Input (GoabInput)" mb="xl">
        <GoabInput
          name="autocomplete-test-v2"
          leadingIcon="search"
          onBlur={(e) => inputBlur(e)}
          value={inputValue}
          autoComplete="name"
        />
      </GoabFormItem>
      <GoabButton onClick={() => buttonClick()}>Click Me</GoabButton>
    </>
  );
}
