import { useState } from "react";
import {
  GoabInput,
  GoabInputNumber,
  GoabBlock,
  GoabText,
  GoabFormItem,
} from "@abgov/react-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function Feat2722Route() {
  const [textValue, setTextValue] = useState<string>("Sample text input");
  const [numberValue, setNumberValue] = useState<number>(12345.67);
  const [currencyValue, setCurrencyValue] = useState<number>(99.99);
  const [percentageValue, setPercentageValue] = useState<number>(85.5);

  const onTextChange = (details: GoabInputOnChangeDetail) => {
    console.log("Text changed:", details);
    setTextValue(details.value);
  };

  const onNumberChange = (details: GoabInputOnChangeDetail<number>) => {
    console.log("Number changed:", details);
    setNumberValue(details.value);
  };

  const onCurrencyChange = (details: GoabInputOnChangeDetail<number>) => {
    console.log("Currency changed:", details);
    setCurrencyValue(details.value);
  };

  const onPercentageChange = (details: GoabInputOnChangeDetail<number>) => {
    console.log("Percentage changed:", details);
    setPercentageValue(details.value);
  };

  return (
    <main>
      <h1>Input Text Alignment Feature Test</h1>
      <p>Testing the textAlign property functionality for input components</p>

      <GoabBlock gap="m" direction="column">
        <h2>Text Input Alignment</h2>
        <p>Testing left vs right alignment for text inputs</p>

        <GoabBlock gap="l" direction="column">
          <GoabFormItem label="Left Aligned Text (Default)">
            <GoabInput
              name="text-left"
              value={textValue}
              textAlign="left"
              testId="text-left-input"
              onChange={onTextChange}
              placeholder="Enter text here..."
            />
          </GoabFormItem>

          <GoabFormItem label="Right Aligned Text">
            <GoabInput
              name="text-right"
              value={textValue}
              textAlign="right"
              testId="text-right-input"
              onChange={onTextChange}
              placeholder="Enter text here..."
            />
          </GoabFormItem>
        </GoabBlock>

        <h2>Number Input Alignment</h2>
        <p>Number inputs default to right alignment for better readability</p>

        <GoabBlock gap="l" direction="column">
          <GoabFormItem label="Number Input (Default Right Aligned)">
            <GoabInputNumber
              name="number-default"
              value={numberValue}
              testId="number-default-input"
              onChange={onNumberChange}
              placeholder="0.00"
            />
          </GoabFormItem>

          <GoabFormItem label="Number Input (Explicit Left Aligned)">
            <GoabInputNumber
              name="number-left"
              value={numberValue}
              textAlign="left"
              testId="number-left-input"
              onChange={onNumberChange}
              placeholder="0.00"
            />
          </GoabFormItem>

          <GoabFormItem label="Number Input (Explicit Right Aligned)">
            <GoabInputNumber
              name="number-right"
              value={numberValue}
              textAlign="right"
              testId="number-right-input"
              onChange={onNumberChange}
              placeholder="0.00"
            />
          </GoabFormItem>
        </GoabBlock>

        <h2>Currency and Percentage Examples</h2>
        <p>Demonstrating right alignment for financial and percentage data</p>

        <GoabBlock gap="l" direction="column">
          <GoabFormItem label="Currency Amount (Right Aligned)">
            <GoabInputNumber
              name="currency"
              value={currencyValue}
              textAlign="right"
              testId="currency-input"
              onChange={onCurrencyChange}
              placeholder="0.00"
              trailingContent="$"
            />
          </GoabFormItem>

          <GoabFormItem label="Percentage (Right Aligned)">
            <GoabInputNumber
              name="percentage"
              value={percentageValue}
              textAlign="right"
              testId="percentage-input"
              onChange={onPercentageChange}
              placeholder="0.0"
              trailingContent="%"
            />
          </GoabFormItem>
        </GoabBlock>

        <h2>Test Results</h2>
        <GoabBlock gap="s" direction="column">
          <GoabText tag="p">
            <strong>Text Value:</strong> {textValue || "None"}
          </GoabText>
          <GoabText tag="p">
            <strong>Number Value:</strong> {numberValue || "None"}
          </GoabText>
          <GoabText tag="p">
            <strong>Currency Value:</strong> ${currencyValue || "None"}
          </GoabText>
          <GoabText tag="p">
            <strong>Percentage Value:</strong> {percentageValue || "None"}%
          </GoabText>
        </GoabBlock>

        <h2>Feature Summary</h2>
        <GoabBlock gap="s" direction="column">
          <GoabText tag="p">
            ✅ <strong>textAlign="left"</strong> - Text is left-aligned (default for text
            inputs)
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>textAlign="right"</strong> - Text is right-aligned (default for
            number inputs)
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Number inputs</strong> default to right alignment for better
            numeric readability
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Currency and percentage</strong> inputs benefit from right
            alignment
          </GoabText>
        </GoabBlock>
      </GoabBlock>
    </main>
  );
}
