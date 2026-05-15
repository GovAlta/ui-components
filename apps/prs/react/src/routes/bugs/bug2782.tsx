import { GoabInput, GoabBlock, GoabText, GoabFormItem } from "@abgov/react-components";

export function Bug2782Route() {
  const textValue =
    "This is a disabled textarea that should be visible regardless of background color.";

  return (
    <GoabBlock gap="l" direction="column">
      <h1>Disabled Inputs Visibility Bug Test (Issue #2782)</h1>

      {/* Issue Description */}
      <GoabBlock gap="m" direction="column">
        <h2>Issue Description</h2>
        <p>
          According to
          <a
            href="https://github.com/GovAlta/ui-components/issues/2782"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub issue #2782
          </a>
          , disabled inputs are not visible and get hidden by container backgrounds:
        </p>
        <ul>
          <li>
            <strong>Problem:</strong> Disabled inputs are not visible regardless of
            background color
          </li>
          <li>
            <strong>Expected:</strong> Disabled inputs should appear no matter the
            background colour
          </li>
          <li>
            <strong>Fix:</strong> Added z-index: 0 to input container styling in web
            components
          </li>
        </ul>
      </GoabBlock>

      {/* Test Instructions */}
      <GoabBlock gap="m" direction="column">
        <h2>Test Instructions</h2>
        <p>
          Below are three containers with different background colors, each containing a
          disabled GoabTextArea. All disabled textareas should be visible regardless of
          the background color.
        </p>
      </GoabBlock>

      {/* Test 1: Default Background */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 1: Default Background</h2>
        <p>This container uses the default background color:</p>

        <GoabFormItem label="Default Background Input">
          <GoabInput
            name="test-input-1"
            testId="bug2782-input-default"
            disabled={true}
            placeholder="This input should be visible"
          />
        </GoabFormItem>
      </GoabBlock>

      {/* Test 2: Dark Grey Background */}
      <div style={{ backgroundColor: "#666666", padding: "20px", borderRadius: "8px" }}>
        <GoabBlock gap="m" direction="column">
          <h2 style={{ color: "white" }}>Test 2: Dark Grey Background</h2>
          <p style={{ color: "white" }}>
            This container uses a dark grey background color:
          </p>

          <GoabFormItem label="Dark Background Input">
            <GoabInput
              name="test-input-2"
              testId="bug2782-input-dark"
              disabled={true}
              placeholder="This input should be visible on dark background"
            />
          </GoabFormItem>
        </GoabBlock>
      </div>

      {/* Test 3: Red Background */}
      <div style={{ backgroundColor: "#ff0000", padding: "20px", borderRadius: "8px" }}>
        <GoabBlock gap="m" direction="column">
          <h2 style={{ color: "white" }}>Test 3: Red Background</h2>
          <p style={{ color: "white" }}>
            This container uses a red background color (as mentioned in the original
            issue):
          </p>

          <GoabFormItem label="Red Background Input">
            <GoabInput
              name="test-input-3"
              testId="bug2782-input-red"
              disabled={true}
              placeholder="This input should be visible on red background"
            />
          </GoabFormItem>
        </GoabBlock>
      </div>

      {/* Expected vs Actual Behavior */}
      <GoabBlock gap="m" direction="column">
        <h2>Expected vs Actual Behavior</h2>
        <GoabBlock gap="s" direction="column">
          <h3>Expected Behavior (After Fix)</h3>
          <ul>
            <li>
              All disabled textareas should be visible regardless of background color
            </li>
            <li>Disabled textareas should maintain proper contrast and readability</li>
            <li>No textareas should be hidden behind container backgrounds</li>
          </ul>
        </GoabBlock>

        <GoabBlock gap="s" direction="column">
          <h3>Actual Behavior (Before Fix)</h3>
          <ul>
            <li>
              Disabled textareas were not visible against different background colors
            </li>
            <li>
              Same issue occurred with red background as mentioned in the original report
            </li>
            <li>Textareas appeared to be hidden by container backgrounds</li>
          </ul>
        </GoabBlock>
      </GoabBlock>
    </GoabBlock>
  );
}

export default Bug2782Route;
