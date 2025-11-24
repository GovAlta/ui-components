import { useState, type CSSProperties, JSX } from "react";
import {
  GoabBlock,
  GoabFormItem,
  GoabGrid,
  GoabInput,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";
import {
  GoabTextAreaOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
} from "@abgov/ui-components-common";

const resultPanelStyle: CSSProperties = {
  border: "1px solid #d6d6d6",
  borderRadius: "12px",
  background: "#f8f8f8",
  padding: "16px",
};

const eventLogStyle: CSSProperties = {
  border: "1px solid #d6d6d6",
  borderRadius: "12px",
  background: "#ffffff",
  padding: "16px",
};

const eventHeadingStyle: CSSProperties = {
  fontWeight: 600,
};

export function Feat2492Route(): JSX.Element {
  const [lastBlurValue, setLastBlurValue] = useState("");
  const [blurCount, setBlurCount] = useState(0);
  const [value, setValue] = useState("");
  const [changeLog, setChangeLog] = useState<GoabTextAreaOnChangeDetail[]>([]);
  const [keyPressLog, setKeyPressLog] = useState<GoabTextAreaOnKeyPressDetail[]>([]);

  function handleBlur({ value }: GoabTextAreaOnBlurDetail) {
    setLastBlurValue(value ?? "");
    setBlurCount((count) => count + 1);
  }

  function handleChange(detail: GoabTextAreaOnChangeDetail) {
    setValue(detail.value ?? "");
    setChangeLog((log) => [...log, detail].slice(-5));
  }

  function handleKeyPress(detail: GoabTextAreaOnKeyPressDetail) {
    setKeyPressLog((log) => [...log, detail].slice(-8));
  }

  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1">Feature 2492 - textarea blur preview</GoabText>
        <GoabText tag="p">
          Enter text, move focus away, and confirm the onBlur event emits the textarea
          value for display below.
        </GoabText>
      </GoabBlock>

      <GoabGrid minChildWidth="320px" gap="l">
        <GoabBlock direction="column" gap="m">
          <GoabText tag="h2">Interactive example</GoabText>
          <GoabFormItem
            label="Observation notes"
            helpText="Blur the textarea to surface the captured value."
          >
            <GoabTextArea
              name="feat2492-textarea"
              placeholder="Type your observations about the textarea blur behaviour"
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
            />
          </GoabFormItem>

          <GoabFormItem label="Companion input">
            <GoabInput
              name="feat2492-input"
              placeholder="Standalone GoabInput for layout"
            />
          </GoabFormItem>

          <GoabBlock direction="column" gap="xs">
            <GoabText tag="h3">Captured blur details</GoabText>
            {blurCount > 0 ? (
              <>
                <GoabText tag="p">Blur count: {blurCount}</GoabText>
                <GoabText tag="p">Last value: {lastBlurValue || "(empty text)"}</GoabText>
              </>
            ) : (
              <GoabText tag="p">
                Blur the textarea to capture and render its value.
              </GoabText>
            )}
          </GoabBlock>

          <GoabBlock direction="column" gap="xs">
            <GoabText tag="h3">Event log</GoabText>
            <GoabText tag="p">Change events</GoabText>
            {changeLog.length ? (
              changeLog.map((entry, index) => (
                <GoabText tag="p" key={`change-${index}`}>
                  {`Change ${index + 1}: ${entry.value || "(empty text)"}`}
                </GoabText>
              ))
            ) : (
              <GoabText tag="p">No onChange events captured yet.</GoabText>
            )}

            <GoabText tag="p">Key press events</GoabText>
            {keyPressLog.length ? (
              keyPressLog.map((entry, index) => (
                <GoabText tag="p" key={`key-${index}`}>
                  {`Key ${index + 1}: ${entry.key} � value: ${entry.value || "(empty text)"}`}
                </GoabText>
              ))
            ) : (
              <GoabText tag="p">No onKeyPress events captured yet.</GoabText>
            )}
          </GoabBlock>
        </GoabBlock>
      </GoabGrid>
    </GoabBlock>
  );
}
