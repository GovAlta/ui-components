import { useState } from "react";
import {
  GoabBadge,
  GoabButton,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabPushDrawer,
  GoabTable,
} from "@abgov/react-components";

export function FilterAListUsingAPushDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "480px" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ flex: 1, margin: 0 }}>All cases</h3>
          {!open && (
            <GoabButton
              type="secondary"
              size="compact"
              leadingIcon="filter"
              onClick={() => setOpen(true)}
            >
              Filters
            </GoabButton>
          )}
        </div>

        <GoabTable width="100%">
          <table width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>File number</th>
                <th>Act</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <GoabBadge type="success" content="Completed" />
                </td>
                <td>Gilbert Barton</td>
                <td>24567-9876</td>
                <td>Traffic safety act</td>
              </tr>
              <tr>
                <td>
                  <GoabBadge type="information" content="New" />
                </td>
                <td>Brynn Hurley</td>
                <td>98765-3456</td>
                <td>Trespass to premises act</td>
              </tr>
              <tr>
                <td>
                  <GoabBadge type="midtone" content="In review" />
                </td>
                <td>Marco Silva</td>
                <td>34521-7890</td>
                <td>Gaming, liquor, and cannabis act</td>
              </tr>
              <tr>
                <td>
                  <GoabBadge type="success" content="Completed" />
                </td>
                <td>Dana Chen</td>
                <td>55123-4567</td>
                <td>Traffic safety act</td>
              </tr>
              <tr>
                <td>
                  <GoabBadge type="information" content="New" />
                </td>
                <td>Amira Hassan</td>
                <td>67890-1234</td>
                <td>Trespass to premises act</td>
              </tr>
            </tbody>
          </table>
        </GoabTable>
      </div>

      <GoabPushDrawer
        heading="Filters"
        width="260px"
        open={open}
        onClose={() => setOpen(false)}
      >
        <GoabFormItem label="Act">
          <GoabCheckboxList name="act" onChange={() => {}}>
            <GoabCheckbox name="traffic" text="Traffic safety act" size="compact" />
            <GoabCheckbox
              name="gaming"
              text="Gaming, liquor, and cannabis act"
              size="compact"
            />
            <GoabCheckbox
              name="trespass"
              text="Trespass to premises act"
              size="compact"
            />
          </GoabCheckboxList>
        </GoabFormItem>
        <GoabFormItem label="Status" mt="l">
          <GoabDropdown name="status" onChange={() => {}} value="" size="compact">
            <GoabDropdownItem value="" label="All statuses" />
            <GoabDropdownItem value="new" label="New" />
            <GoabDropdownItem value="in-review" label="In review" />
            <GoabDropdownItem value="completed" label="Completed" />
          </GoabDropdown>
        </GoabFormItem>
      </GoabPushDrawer>
    </div>
  );
}
