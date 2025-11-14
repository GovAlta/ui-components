import { useState } from "react";
import {
  GoabDropdown,
  GoabDropdownItem,
  GoabBlock,
  GoabText,
} from "@abgov/react-components";

export function Bug2849Route() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleDropdownChange = (event: any) => {
    setSelectedValue(event.value);
  };

  return (
    <GoabBlock gap="l" direction="column">
      <h1>Filterable Dropdown Keyboard Selection Bug Test (Issue #2849)</h1>

      {/* Issue Description */}
      <GoabBlock gap="m" direction="column">
        <h2>Issue Description</h2>
        <p>
          According to
          <a
            href="https://github.com/GovAlta/ui-components/issues/2849"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub issue #2849
          </a>
          , the filterable dropdown has keyboard selection issues:
        </p>
        <ul>
          <li>
            <strong>Shift + End:</strong> Should select text from cursor to end, but only
            moves cursor
          </li>
          <li>
            <strong>Shift + Home:</strong> Should select text from cursor to beginning,
            but only moves cursor
          </li>
        </ul>
      </GoabBlock>

      {/* Test Instructions */}
      <GoabBlock gap="m" direction="column">
        <h2>Test Instructions</h2>
        <GoabBlock gap="s" direction="column">
          <h3>Test 1: Shift + End</h3>
          <ol>
            <li>Click on the filterable dropdown below</li>
            <li>Type some text in the filter input (e.g., "test")</li>
            <li>Place your cursor at the beginning of the text</li>
            <li>
              Press <strong>Shift + End</strong>
            </li>
            <li>
              <strong>Expected:</strong> Text should be selected from cursor to end
            </li>
            <li>
              <strong>Actual:</strong> Cursor moves to end but no text is selected
            </li>
          </ol>
        </GoabBlock>

        <GoabBlock gap="s" direction="column">
          <h3>Test 2: Shift + Home</h3>
          <ol>
            <li>Click on the filterable dropdown below</li>
            <li>Type some text in the filter input (e.g., "test")</li>
            <li>Place your cursor at the end of the text</li>
            <li>
              Press <strong>Shift + Home</strong>
            </li>
            <li>
              <strong>Expected:</strong> Text should be selected from cursor to beginning
            </li>
            <li>
              <strong>Actual:</strong> Cursor moves to beginning but no text is selected
            </li>
          </ol>
        </GoabBlock>
      </GoabBlock>

      {/* Test Dropdown */}
      <GoabBlock gap="m" direction="column">
        <h2>Test Filterable Dropdown</h2>
        <p>Use this dropdown to test the keyboard selection issues:</p>

        <GoabDropdown
          name="test-dropdown"
          placeholder="Type to filter options..."
          filterable={true}
          onChange={handleDropdownChange}
          testId="bug2849-dropdown"
        >
          <GoabDropdownItem name="test-dropdown" label="Alberta" value="alberta" />
          <GoabDropdownItem name="test-dropdown" label="British Columbia" value="bc" />
          <GoabDropdownItem name="test-dropdown" label="Manitoba" value="manitoba" />
          <GoabDropdownItem name="test-dropdown" label="New Brunswick" value="nb" />
          <GoabDropdownItem
            name="test-dropdown"
            label="Newfoundland and Labrador"
            value="nl"
          />
          <GoabDropdownItem name="test-dropdown" label="Nova Scotia" value="ns" />
          <GoabDropdownItem name="test-dropdown" label="Ontario" value="ontario" />
          <GoabDropdownItem
            name="test-dropdown"
            label="Prince Edward Island"
            value="pei"
          />
          <GoabDropdownItem name="test-dropdown" label="Quebec" value="quebec" />
          <GoabDropdownItem
            name="test-dropdown"
            label="Saskatchewan"
            value="saskatchewan"
          />
        </GoabDropdown>

        <p>
          <strong>Selected Value:</strong> {selectedValue || "None"}
        </p>
      </GoabBlock>

      {/* Expected vs Actual Behavior */}
      <GoabBlock gap="m" direction="column">
        <h2>Expected vs Actual Behavior</h2>
        <GoabBlock gap="s" direction="column">
          <h3>Expected Behavior</h3>
          <ul>
            <li>
              Shift + End should select all text from the cursor position to the end of
              the input
            </li>
            <li>
              Shift + Home should select all text from the cursor position to the
              beginning of the input
            </li>
            <li>Selected text should be highlighted/visually indicated</li>
          </ul>
        </GoabBlock>

        <GoabBlock gap="s" direction="column">
          <h3>Actual Behavior (Bug)</h3>
          <ul>
            <li>Shift + End only moves the cursor to the end without selecting text</li>
            <li>
              Shift + Home only moves the cursor to the beginning without selecting text
            </li>
            <li>
              No text selection occurs, making it impossible to select text using these
              keyboard shortcuts
            </li>
          </ul>
        </GoabBlock>
      </GoabBlock>
    </GoabBlock>
  );
}

export default Bug2849Route;
