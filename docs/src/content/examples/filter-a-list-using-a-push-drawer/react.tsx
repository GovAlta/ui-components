import { useState } from "react";
import {
  GoabxButton,
  GoabxCheckbox,
  GoabxCheckboxList,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxTable,
  GoabxBadge,
} from "@abgov/react-components/experimental";
import { GoabPushDrawer } from "@abgov/react-components";

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
            <GoabxButton
              type="secondary"
              size="compact"
              leadingIcon="filter"
              onClick={() => setOpen(true)}
            >
              Filters
            </GoabxButton>
          )}
        </div>

        <GoabxTable width="100%">
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
                  <GoabxBadge type="success" content="Completed" />
                </td>
                <td>Gilbert Barton</td>
                <td>24567-9876</td>
                <td>Traffic safety act</td>
              </tr>
              <tr>
                <td>
                  <GoabxBadge type="information" content="New" />
                </td>
                <td>Brynn Hurley</td>
                <td>98765-3456</td>
                <td>Trespass to premises act</td>
              </tr>
              <tr>
                <td>
                  <GoabxBadge type="midtone" content="In review" />
                </td>
                <td>Marco Silva</td>
                <td>34521-7890</td>
                <td>Gaming, liquor, and cannabis act</td>
              </tr>
              <tr>
                <td>
                  <GoabxBadge type="success" content="Completed" />
                </td>
                <td>Dana Chen</td>
                <td>55123-4567</td>
                <td>Traffic safety act</td>
              </tr>
              <tr>
                <td>
                  <GoabxBadge type="information" content="New" />
                </td>
                <td>Amira Hassan</td>
                <td>67890-1234</td>
                <td>Trespass to premises act</td>
              </tr>
            </tbody>
          </table>
        </GoabxTable>
      </div>

      <GoabPushDrawer
        heading="Filters"
        width="260px"
        open={open}
        onClose={() => setOpen(false)}
      >
        <GoabxFormItem label="Act">
          <GoabxCheckboxList name="act" onChange={() => {}}>
            <GoabxCheckbox name="traffic" text="Traffic safety act" size="compact" />
            <GoabxCheckbox
              name="gaming"
              text="Gaming, liquor, and cannabis act"
              size="compact"
            />
            <GoabxCheckbox
              name="trespass"
              text="Trespass to premises act"
              size="compact"
            />
          </GoabxCheckboxList>
        </GoabxFormItem>
        <GoabxFormItem label="Status" mt="l">
          <GoabxDropdown name="status" onChange={() => {}} value="" size="compact">
            <GoabxDropdownItem value="" label="All statuses" />
            <GoabxDropdownItem value="new" label="New" />
            <GoabxDropdownItem value="in-review" label="In review" />
            <GoabxDropdownItem value="completed" label="Completed" />
          </GoabxDropdown>
        </GoabxFormItem>
      </GoabPushDrawer>
    </div>
  );
}
