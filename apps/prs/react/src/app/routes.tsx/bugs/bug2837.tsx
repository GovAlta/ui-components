import React from "react";
import { GoabBlock, GoabText, GoabInput, GoabInputNumber } from "@abgov/react-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2837Route() {
  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    console.log("Input change:", detail);
  };

  const handleNumberInputChange = (detail: GoabInputOnChangeDetail<number>) => {
    console.log("Number input change:", detail);
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2837: trailingContent and leadingContent Test
      </GoabText>

      <GoabText size="body-m" mb="2xl">
        This test demonstrates the issue with trailingContent and leadingContent
        properties not working with GoabInputNumber component. All inputs have onChange
        handlers that log to console.
      </GoabText>

      {/* GoabInput Tests */}
      <GoabText size="heading-m" mb="l">
        GoabInput Tests
      </GoabText>

      <GoabBlock gap="l" direction="column">
        {/* Test 1: GoabInput with no additional properties */}
        <GoabBlock gap="m" direction="column">
          <GoabText size="body-s" mb="xs">
            1. GoabInput with no additional properties
          </GoabText>
          <GoabInput name="input1" placeholder="GoabInput" onChange={handleInputChange} />
        </GoabBlock>

        {/* Test 2: GoabInput with leadingContent and trailingContent */}
        <GoabBlock gap="m" direction="column">
          <GoabText size="body-s" mb="xs">
            2. GoabInput with leadingContent and trailingContent
          </GoabText>
          <GoabInput
            name="input2"
            placeholder="GoabInput"
            leadingContent={<strong>Test</strong>}
            trailingContent={<strong>Test</strong>}
            onChange={handleInputChange}
          />
        </GoabBlock>
      </GoabBlock>

      {/* GoabInputNumber Tests */}
      <GoabText size="heading-m" mb="l" mt="2xl">
        GoabInputNumber Tests
      </GoabText>

      <GoabBlock gap="l" direction="column">
        {/* Test 3: GoabInputNumber with no additional properties */}
        <GoabBlock gap="m" direction="column">
          <GoabText size="body-s" mb="xs">
            3. GoabInputNumber with no additional properties
          </GoabText>
          <GoabInputNumber
            name="inputNumber1"
            placeholder="GoabInputNumber"
            onChange={handleNumberInputChange}
          />
        </GoabBlock>

        {/* Test 4: GoabInputNumber with leadingContent and trailingContent */}
        <GoabBlock gap="m" direction="column">
          <GoabText size="body-s" mb="xs">
            4. GoabInputNumber with leadingContent and trailingContent
          </GoabText>
          <GoabInputNumber
            name="inputNumber2"
            placeholder="GoabInputNumber"
            leadingContent="Test"
            trailingContent="Test"
            onChange={handleNumberInputChange}
          />
        </GoabBlock>
      </GoabBlock>

      <GoabText size="body-s" mt="2xl">
        Check the browser console to see the onChange events when you type in the inputs.
      </GoabText>
    </div>
  );
}
