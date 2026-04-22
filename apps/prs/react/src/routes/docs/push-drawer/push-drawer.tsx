import { useState } from "react";
import {
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabPushDrawer,
  GoabTable,
  GoabText,
} from "@abgov/react-components";

export function DocsPushDrawerRoute() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div>
      <h2>Push Drawer</h2>

      <h3>Basic push drawer</h3>
      <div style={{ display: "flex", minHeight: "400px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setBasicOpen(true)}>Open push drawer</GoabButton>
        </div>
        <GoabPushDrawer
          heading="Application details"
          width="260px"
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
        >
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">
            Applicant name
          </GoabText>
          <GoabText size="body-m" mt="none">
            Jane Smith
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">
            File number
          </GoabText>
          <GoabText size="body-m" mt="none">
            24567-9876
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">
            Status
          </GoabText>
          <GoabBadge type="success" content="Approved" />
          <GoabText tag="h4" size="heading-xs" mb="s" mt="m">
            Submitted
          </GoabText>
          <GoabText size="body-m" mt="none">
            January 15, 2025
          </GoabText>
        </GoabPushDrawer>
      </div>

      <h3>Custom width</h3>
      <div style={{ display: "flex", minHeight: "400px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setWideOpen(true)}>Open wide push drawer</GoabButton>
        </div>
        <GoabPushDrawer
          heading="Case notes"
          width="600px"
          open={wideOpen}
          onClose={() => setWideOpen(false)}
        >
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">
            Officer
          </GoabText>
          <GoabText size="body-m" mt="none">
            Const. M. Roberts, Badge #4412
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">
            Date
          </GoabText>
          <GoabText size="body-m" mt="none">
            February 3, 2025
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">
            Notes
          </GoabText>
          <GoabText size="body-m" mt="none">
            Applicant provided updated documentation. Reviewed supporting evidence and
            confirmed eligibility criteria are met. Forwarded to supervisor for final
            approval.
          </GoabText>
        </GoabPushDrawer>
      </div>

      <h3>With actions</h3>
      <div style={{ display: "flex", minHeight: "320px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setActionsOpen(true)}>Open push drawer</GoabButton>
        </div>
        <GoabPushDrawer
          heading="Edit notification preferences"
          width="280px"
          open={actionsOpen}
          onClose={() => setActionsOpen(false)}
          actions={
            <GoabButtonGroup alignment="start">
              <GoabButton size="compact">Save</GoabButton>
              <GoabButton type="secondary" size="compact">Cancel</GoabButton>
            </GoabButtonGroup>
          }
        >
          <GoabFormItem label="Email notifications">
            <GoabCheckboxList name="email-notifications" value={["updates", "deadlines"]}>
              <GoabCheckbox name="updates" text="Case status updates" />
              <GoabCheckbox name="deadlines" text="Upcoming deadlines" />
              <GoabCheckbox name="assignments" text="New assignments" />
            </GoabCheckboxList>
          </GoabFormItem>
        </GoabPushDrawer>
      </div>

      <h3>Long content</h3>
      <div style={{ display: "flex", minHeight: "320px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GoabButton onClick={() => setLongOpen(true)}>Open push drawer</GoabButton>
        </div>
        <GoabPushDrawer
          heading="Case history"
          width="320px"
          open={longOpen}
          onClose={() => setLongOpen(false)}
          actions={
            <GoabButtonGroup alignment="start">
              <GoabButton size="compact">Export</GoabButton>
              <GoabButton type="secondary" size="compact">Close</GoabButton>
            </GoabButtonGroup>
          }
        >
          <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Jan 15, 2025</GoabText>
          <GoabText size="body-m" mt="none">
            Application received. Initial review completed by intake officer. All
            required documents present.
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Feb 3, 2025</GoabText>
          <GoabText size="body-m" mt="none">
            Background check initiated. Applicant contacted for additional
            verification of employment history.
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Feb 18, 2025</GoabText>
          <GoabText size="body-m" mt="none">
            Employment verification received. Forwarded to senior reviewer for
            assessment.
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Mar 1, 2025</GoabText>
          <GoabText size="body-m" mt="none">
            Senior review complete. Recommendation for approval pending supervisor
            sign-off.
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Mar 10, 2025</GoabText>
          <GoabText size="body-m" mt="none">
            Supervisor approved. Final documentation prepared for applicant
            notification.
          </GoabText>
          <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Mar 12, 2025</GoabText>
          <GoabText size="body-m" mt="none">
            Approval letter sent to applicant via registered mail. Case marked as
            complete.
          </GoabText>
        </GoabPushDrawer>
      </div>

      <h2>Examples</h2>

      <h3>Filter a list using a push drawer</h3>
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
            {!filterOpen && (
              <GoabButton
                type="secondary"
                size="compact"
                leadingIcon="filter"
                onClick={() => setFilterOpen(true)}
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
                  <td><GoabBadge type="success" content="Completed" /></td>
                  <td>Gilbert Barton</td>
                  <td>24567-9876</td>
                  <td>Traffic safety act</td>
                </tr>
                <tr>
                  <td><GoabBadge type="information" content="New" /></td>
                  <td>Brynn Hurley</td>
                  <td>98765-3456</td>
                  <td>Trespass to premises act</td>
                </tr>
                <tr>
                  <td><GoabBadge type="default" content="In review" /></td>
                  <td>Marco Silva</td>
                  <td>34521-7890</td>
                  <td>Gaming, liquor, and cannabis act</td>
                </tr>
                <tr>
                  <td><GoabBadge type="success" content="Completed" /></td>
                  <td>Dana Chen</td>
                  <td>55123-4567</td>
                  <td>Traffic safety act</td>
                </tr>
                <tr>
                  <td><GoabBadge type="information" content="New" /></td>
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
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <GoabFormItem label="Act">
            <GoabCheckboxList name="act" onChange={() => { /* no-op */ }}>
              <GoabCheckbox name="traffic" text="Traffic safety act" size="compact" />
              <GoabCheckbox name="gaming" text="Gaming, liquor, and cannabis act" size="compact" />
              <GoabCheckbox name="trespass" text="Trespass to premises act" size="compact" />
            </GoabCheckboxList>
          </GoabFormItem>
          <GoabFormItem label="Status" mt="l">
            <GoabDropdown name="status" onChange={() => { /* no-op */ }} value="" size="compact">
              <GoabDropdownItem value="" label="All statuses" />
              <GoabDropdownItem value="new" label="New" />
              <GoabDropdownItem value="in-review" label="In review" />
              <GoabDropdownItem value="completed" label="Completed" />
            </GoabDropdown>
          </GoabFormItem>
        </GoabPushDrawer>
      </div>
    </div>
  );
}
