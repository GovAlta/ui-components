import {
  GoabContainer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
} from "@abgov/react-components";

export function Bug3450Route() {
  return (
    <div>
      <h1>Bug 3450 - Dropdown expanding inside Container</h1>

      <GoabContainer width="300px" style={{ border: "1px solid black" }}>
        <p>The dropdown below should expand inside of the container.</p>

        <GoabFormItem label="Basic dropdown">
          <GoabDropdown placeholder="-- Watch me Expand --">
            <GoabDropdownItem value="1" label="Option 1" />
            <GoabDropdownItem value="2" label="Option 2" />
            <GoabDropdownItem value="3" label="Option 3" />
          </GoabDropdown>
        </GoabFormItem>
      </GoabContainer>
    </div>
  );
}
