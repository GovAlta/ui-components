import { GoabInput, GoabFormItem, GoabGrid } from "@abgov/react-components";
import { useState } from "react";

export const Bug2529Route = () => {
  const [meridanValue, setMeridanValue] = useState("");
  const [rangeValue, setRangeValue] = useState("");
  const [townshipValue, setTownshipValue] = useState("");

  return (
    <main>
      <h2>Bug 2529: Input Width Not Being Correctly Generated</h2>
      <p>
        Testing input width issues with grid layout and flex layout as described in GitHub
        issue #2529
      </p>

      <h3>Test 1: With Grid Component</h3>
      <div style={{ margin: "24px", padding: "24px", width: "614px" }}>
        <div style={{ border: "1px solid black", backgroundColor: "lightgray" }}>
          <GoabGrid minChildWidth="156px" gap="2xl">
            <div>
              <GoabFormItem label="Meridan">
                <GoabInput
                  name="meridan"
                  value={meridanValue}
                  onChange={(detail) => setMeridanValue(detail.value)}
                  error={true}
                />
              </GoabFormItem>
            </div>
            <div>
              <GoabFormItem label="Range">
                <GoabInput
                  name="range"
                  value={rangeValue}
                  onChange={(detail) => setRangeValue(detail.value)}
                />
              </GoabFormItem>
            </div>
            <div>
              <GoabFormItem label="Township">
                <GoabInput
                  name="township"
                  value={townshipValue}
                  onChange={(detail) => setTownshipValue(detail.value)}
                />
              </GoabFormItem>
            </div>
          </GoabGrid>
        </div>
      </div>

      <h3>Test 2: Without Grid Component (Flex Layout)</h3>
      <div style={{ margin: "24px", padding: "24px", width: "614px" }}>
        <div style={{ border: "1px solid black", backgroundColor: "lightgray" }}>
          <div style={{ display: "flex", gap: "48px" }}>
            <div style={{ flex: "1", minWidth: "156px" }}>
              <GoabFormItem label="Meridan">
                <GoabInput
                  name="meridan-flex"
                  value={meridanValue}
                  onChange={(detail) => setMeridanValue(detail.value)}
                  width="100%"
                  error={true}
                />
              </GoabFormItem>
            </div>
            <div style={{ flex: "1", minWidth: "156px" }}>
              <GoabFormItem label="Range">
                <GoabInput
                  name="range-flex"
                  value={rangeValue}
                  onChange={(detail) => setRangeValue(detail.value)}
                  width="100%"
                />
              </GoabFormItem>
            </div>
            <div style={{ flex: "1", minWidth: "156px" }}>
              <GoabFormItem label="Township">
                <GoabInput
                  name="township-flex"
                  value={townshipValue}
                  onChange={(detail) => setTownshipValue(detail.value)}
                  width="100%"
                />
              </GoabFormItem>
            </div>
          </div>
        </div>
      </div>

      <h3>Test 3: Individual Input Width Tests</h3>
      <div style={{ margin: "24px", padding: "24px", width: "614px" }}>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "lightgray",
            padding: "16px",
          }}
        >
          <GoabFormItem label="Fixed Width (200px)" mb="l">
            <GoabInput name="fixed-width" width="200px" placeholder="200px width" />
          </GoabFormItem>

          <GoabFormItem label="Percentage Width (50%)" mb="l">
            <GoabInput name="percent-width" width="50%" placeholder="50% width" />
          </GoabFormItem>

          <GoabFormItem label="Character Width (20ch)" mb="l">
            <GoabInput name="char-width" width="20ch" placeholder="20ch width" />
          </GoabFormItem>

          <GoabFormItem label="Rem Width (15rem)" mb="l">
            <GoabInput name="rem-width" width="15rem" placeholder="15rem width" />
          </GoabFormItem>
        </div>
      </div>

      <h3>Issue Description</h3>
      <p>
        The issue occurs when the <code>goab-input</code> component uses minimum width,
        but the input component inside takes up more width than given. This could be
        related to the <code>padding</code> property.
      </p>

      <h3>Expected Behavior</h3>
      <ul>
        <li>Input components should respect their container width constraints</li>
        <li>
          Width for the inner input component should be correct relative to the outer
          parent component
        </li>
        <li>No overflow beyond the allocated container width</li>
      </ul>

      <h3>Current Values</h3>
      <p>
        <strong>Meridan:</strong> {meridanValue || "Empty"}
      </p>
      <p>
        <strong>Range:</strong> {rangeValue || "Empty"}
      </p>
      <p>
        <strong>Township:</strong> {townshipValue || "Empty"}
      </p>
    </main>
  );
};
