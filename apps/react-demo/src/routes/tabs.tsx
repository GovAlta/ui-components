import { GoABadge, GoADropdown, GoADropdownItem, GoATab, GoATable, GoATabs } from "@abgov/react-components";
import { useState } from "react";

export default function Tabs() {
  const [value, setValue] = useState('');
  function onChange(name: string, value: string | string[]) {
    setValue(value as string);
  }
  return (
    <>
      <GoATabs data-cy="TabsSelector" initialTab={2}>
        <GoATab heading="Profile">
          <p>
            <b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <GoADropdown name="colors" value={value} onChange={onChange} data-cy="CountrydropdownSelector">
            <GoADropdownItem value="red" label="Red" />
            <GoADropdownItem value="green" label="Green" />
            <GoADropdownItem value="blue" label="Blue" />
          </GoADropdown>
        </GoATab>
        <GoATab
          heading={
            <>
              Review pending <GoABadge type="important" content="1" />
            </>
          }
        >
          <GoATable variant="relaxed">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Person 1's first name</td>
                <td>Person 1's last name</td>
                <td>Waiting for a week</td>
              </tr>
              <tr>
                <td>Person 2's first name</td>
                <td>Person 2's last name</td>
                <td>Waiting for 2 weeks</td>
              </tr>
            </tbody>
          </GoATable>
        </GoATab>
        <GoATab
          heading={
            <>
              Completed <GoABadge type="midtone" content="1" />
            </>
          }
        >
          <p>
            <b>Completed:</b> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <p>New paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </GoATab>
      </GoATabs>
    </>
  );
}
