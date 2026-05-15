import {
  GoabBlock,
  GoabContainer,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabMenuAction,
  GoabMenuButton,
} from "@abgov/react-components";
import { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

export function Bug3450Route() {
  function onMenuAction(detail: GoabMenuButtonOnActionDetail) {
    console.log("Menu action:", detail.action);
  }

  return (
    <div>
      <h1>Bug 3450 - Dropdown expanding inside Container</h1>

      <GoabBlock gap="m" direction="row">
        <GoabContainer>
          <p>The GoabDropdown below should expand outside of the container.</p>

          <GoabFormItem label="Basic GoabDropdown">
            <GoabDropdown placeholder="-- Watch me Expand --">
              <GoabDropdownItem value="1" label="Option 1" />
              <GoabDropdownItem value="2" label="Option 2" />
              <GoabDropdownItem value="3" label="Option 3" />
            </GoabDropdown>
          </GoabFormItem>
        </GoabContainer>
        <GoabContainer>
          <p>The GoabDatePicker below should expand outside of the container.</p>

          <GoabFormItem label="Basic GoabDatePicker">
            <GoabDatePicker></GoabDatePicker>
          </GoabFormItem>
        </GoabContainer>
        <GoabContainer>
          <p>Menu Button should open properly also.</p>

          <GoabMenuButton text="Download" onAction={onMenuAction}>
            <GoabMenuAction text="CSV (Filtered)" action="csv-filtered" />
            <GoabMenuAction text="CSV (All)" action="csv-all" />
            <GoabMenuAction text="JSON (Filtered)" action="json-filtered" />
            <GoabMenuAction text="JSON (All)" action="json-all" />
          </GoabMenuButton>
        </GoabContainer>
      </GoabBlock>

      <h2>Testing Directions</h2>
      <p>This is a test of GoabPopover not GoabDropdown or GoabDatePicker.</p>
      <ul>
        <li>
          Open the GoabDropdown and GoabDatePicker and verify that they expand outside of
          the container.
        </li>
        <li>
          Verify that the GoabDropdown and GoabDatePicker are not cut off by the
          container.
        </li>
        <li>
          Shrink and expand the window to cause the GoabDropdown and GoabDatePicker to
          expand upwards instead.
        </li>
      </ul>
    </div>
  );
}
