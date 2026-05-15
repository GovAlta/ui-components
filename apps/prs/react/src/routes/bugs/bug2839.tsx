import { useState } from "react";
import {
  GoabButton,
  GoabIconButton,
  GoabButtonGroup,
  GoabBlock,
} from "@abgov/react-components";

export function Bug2839Route() {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
    console.log(`Button clicked ${clickCount + 1} times`);
  };

  return (
    <GoabBlock gap="l" direction="column">
      <h1>Button State Persistence Bug Test (Issue #2839)</h1>

      {/* Issue Description */}
      <GoabBlock gap="m" direction="column">
        <h2>Issue Description</h2>
        <p>
          According to
          <a
            href="https://github.com/GovAlta/ui-components/issues/2839"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub issue #2839
          </a>
          , buttons stay in the same state after being clicked:
        </p>
        <ul>
          <li>
            <strong>Problem:</strong> When you click a button, it changes state as
            expected, but the state remains in effect until you click something else
          </li>
          <li>
            <strong>Expected:</strong> The state should change back as soon as the mouse
            button is released
          </li>
          <li>
            <strong>Reported by:</strong> Kevin Yu
          </li>
        </ul>
      </GoabBlock>

      {/* Test Instructions */}
      <GoabBlock gap="m" direction="column">
        <h2>Test Instructions</h2>
        <p>
          Click each button below and observe if the button state returns to normal
          immediately after releasing the mouse button. The button should not remain in a
          "pressed" or "active" state after the click is complete.
        </p>
        <p>
          <strong>Click Count:</strong> {clickCount}
        </p>
      </GoabBlock>

      {/* Test 1: Basic Button Types */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 1: Basic Button Types</h2>
        <p>Test primary, secondary, and tertiary button types:</p>

        <GoabBlock gap="s" direction="row">
          <GoabButton
            type="primary"
            onClick={handleButtonClick}
            testId="bug2839-primary-button"
          >
            Primary Button
          </GoabButton>

          <GoabButton
            type="secondary"
            onClick={handleButtonClick}
            testId="bug2839-secondary-button"
          >
            Secondary Button
          </GoabButton>

          <GoabButton
            type="tertiary"
            onClick={handleButtonClick}
            testId="bug2839-tertiary-button"
          >
            Tertiary Button
          </GoabButton>
        </GoabBlock>
      </GoabBlock>

      {/* Test 2: Button Sizes */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 2: Button Sizes</h2>
        <p>Test normal and compact button sizes:</p>

        <GoabBlock gap="s" direction="row">
          <GoabButton
            type="primary"
            size="normal"
            onClick={handleButtonClick}
            testId="bug2839-normal-size-button"
          >
            Normal Size
          </GoabButton>

          <GoabButton
            type="primary"
            size="compact"
            onClick={handleButtonClick}
            testId="bug2839-compact-size-button"
          >
            Compact Size
          </GoabButton>
        </GoabBlock>
      </GoabBlock>

      {/* Test 3: Button Variants */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 3: Button Variants</h2>
        <p>Test normal and destructive button variants:</p>

        <GoabBlock gap="s" direction="row">
          <GoabButton
            type="primary"
            variant="normal"
            onClick={handleButtonClick}
            testId="bug2839-normal-variant-button"
          >
            Normal Variant
          </GoabButton>

          <GoabButton
            type="primary"
            variant="destructive"
            onClick={handleButtonClick}
            testId="bug2839-destructive-variant-button"
          >
            Destructive Variant
          </GoabButton>
        </GoabBlock>
      </GoabBlock>

      {/* Test 4: Buttons with Icons */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 4: Buttons with Icons</h2>
        <p>Test buttons with leading and trailing icons:</p>

        <GoabBlock gap="s" direction="row">
          <GoabButton
            type="primary"
            leadingIcon="add"
            onClick={handleButtonClick}
            testId="bug2839-leading-icon-button"
          >
            Leading Icon
          </GoabButton>

          <GoabButton
            type="primary"
            trailingIcon="arrow-forward"
            onClick={handleButtonClick}
            testId="bug2839-trailing-icon-button"
          >
            Trailing Icon
          </GoabButton>

          <GoabButton
            type="primary"
            leadingIcon="add"
            trailingIcon="arrow-forward"
            onClick={handleButtonClick}
            testId="bug2839-both-icons-button"
          >
            Both Icons
          </GoabButton>
        </GoabBlock>
      </GoabBlock>

      {/* Test 5: Icon Buttons */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 5: Icon Buttons</h2>
        <p>Test GoabIconButton components:</p>

        <GoabBlock gap="s" direction="row">
          <GoabIconButton
            icon="add"
            onClick={handleButtonClick}
            testId="bug2839-icon-button-add"
          />

          <GoabIconButton
            icon="trash"
            onClick={handleButtonClick}
            testId="bug2839-icon-button-delete"
          />

          <GoabIconButton
            icon="pencil"
            onClick={handleButtonClick}
            testId="bug2839-icon-button-edit"
          />

          <GoabIconButton
            icon="close"
            onClick={handleButtonClick}
            testId="bug2839-icon-button-close"
          />
        </GoabBlock>
      </GoabBlock>

      {/* Test 6: Button Groups */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 6: Button Groups</h2>
        <p>Test multiple buttons inside GoabButtonGroup:</p>

        <GoabButtonGroup alignment="start">
          <GoabButton
            type="primary"
            onClick={handleButtonClick}
            testId="bug2839-group-button-1"
          >
            Group Button 1
          </GoabButton>

          <GoabButton
            type="secondary"
            onClick={handleButtonClick}
            testId="bug2839-group-button-2"
          >
            Group Button 2
          </GoabButton>

          <GoabButton
            type="tertiary"
            onClick={handleButtonClick}
            testId="bug2839-group-button-3"
          >
            Group Button 3
          </GoabButton>
        </GoabButtonGroup>
      </GoabBlock>

      {/* Test 7: Mixed Button Group */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 7: Mixed Button Group with Icons</h2>
        <p>Test button group with mixed types and icons:</p>

        <GoabButtonGroup alignment="start">
          <GoabButton
            type="primary"
            leadingIcon="add"
            onClick={handleButtonClick}
            testId="bug2839-mixed-group-primary"
          >
            Add Item
          </GoabButton>

          <GoabButton
            type="secondary"
            trailingIcon="pencil"
            onClick={handleButtonClick}
            testId="bug2839-mixed-group-secondary"
          >
            Edit
          </GoabButton>

          <GoabIconButton
            icon="trash"
            onClick={handleButtonClick}
            testId="bug2839-mixed-group-icon"
          />
        </GoabButtonGroup>
      </GoabBlock>

      {/* Expected vs Actual Behavior */}
      <GoabBlock gap="m" direction="column">
        <h2>Expected vs Actual Behavior</h2>
        <GoabBlock gap="s" direction="column">
          <h3>Expected Behavior (After Fix)</h3>
          <ul>
            <li>
              Button state should return to normal immediately after mouse button release
            </li>
            <li>No visual indication of "pressed" or "active" state should persist</li>
            <li>Focus state should not interfere with mouse interaction states</li>
            <li>All button types and variants should behave consistently</li>
          </ul>
        </GoabBlock>

        <GoabBlock gap="s" direction="column">
          <h3>Actual Behavior (Before Fix)</h3>
          <ul>
            <li>Button state remains in "pressed" or "active" state after click</li>
            <li>State only changes when clicking something else</li>
            <li>Focus state interferes with mouse interaction</li>
            <li>Poor user experience with buttons appearing "stuck"</li>
          </ul>
        </GoabBlock>
      </GoabBlock>
    </GoabBlock>
  );
}

export default Bug2839Route;
