import {
  GoabDataGrid,
  GoabTable,
  GoabBadge,
  GoabButton,
  GoabContainer,
  GoabCheckbox,
  GoabBlock,
  GoabMenuButton,
  GoabMenuAction,
} from "@abgov/react-components";

export function DocsDataGridRoute() {
  return (
    <div>
      <h2>DataGrid</h2>

      <h3>Basic data grid</h3>
      <GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
        <GoabTable width="100%">
          <thead>
            <tr data-grid="row">
              <th data-grid="cell">Name</th>
              <th data-grid="cell">Role</th>
              <th data-grid="cell">Status</th>
              <th data-grid="cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr data-grid="row">
              <td data-grid="cell">Alice Johnson</td>
              <td data-grid="cell">Developer</td>
              <td data-grid="cell">
                <GoabBadge type="success" content="Active" />
              </td>
              <td data-grid="cell">
                <GoabButton type="tertiary" size="compact">
                  View
                </GoabButton>
              </td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell">Bob Smith</td>
              <td data-grid="cell">Designer</td>
              <td data-grid="cell">
                <GoabBadge type="success" content="Active" />
              </td>
              <td data-grid="cell">
                <GoabButton type="tertiary" size="compact">
                  View
                </GoabButton>
              </td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell">Carol White</td>
              <td data-grid="cell">Manager</td>
              <td data-grid="cell">
                <GoabBadge type="information" content="Away" />
              </td>
              <td data-grid="cell">
                <GoabButton type="tertiary" size="compact">
                  View
                </GoabButton>
              </td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell">David Brown</td>
              <td data-grid="cell">Analyst</td>
              <td data-grid="cell">
                <GoabBadge type="success" content="Active" />
              </td>
              <td data-grid="cell">
                <GoabButton type="tertiary" size="compact">
                  View
                </GoabButton>
              </td>
            </tr>
          </tbody>
        </GoabTable>
      </GoabDataGrid>

      <h3>Layout navigation</h3>
      <GoabDataGrid keyboardNav="layout" keyboardIconPosition="right">
        <GoabContainer mt="m" data-grid="row" maxWidth="100%">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "var(--goa-space-m)",
              alignItems: "flex-start",
            }}
          >
            <GoabCheckbox data-grid="cell-0" name="user-1" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--goa-space-m)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <GoabBlock direction="row" gap="s" alignment="center">
                <strong data-grid="cell-1">Mike Zwei</strong>
                <GoabBadge data-grid="cell-2" type="success" content="Removed" />
              </GoabBlock>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--goa-space-xl)",
                }}
              >
                <GoabBlock direction="column" gap="xs" data-grid="cell-4">
                  <strong>Updated</strong>
                  <span>Jun 30, 2022 at 2:30 PM</span>
                </GoabBlock>
                <GoabBlock direction="column" gap="xs" data-grid="cell-5">
                  <strong>Email</strong>
                  <span>mike.zwei@gmail.com</span>
                </GoabBlock>
                <GoabBlock direction="column" gap="xs" data-grid="cell-6">
                  <strong>Program</strong>
                  <span>Wee Wild Ones Curry</span>
                </GoabBlock>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--goa-space-xl)",
                }}
              >
                <GoabBlock direction="column" gap="xs" data-grid="cell-7">
                  <strong>Program ID</strong>
                  <span>74528567</span>
                </GoabBlock>
                <GoabBlock direction="column" gap="xs" data-grid="cell-8">
                  <strong>Service access</strong>
                  <span>Claims Adjustments</span>
                </GoabBlock>
              </div>
            </div>
            <GoabMenuButton
              data-grid="cell-3"
              text="Actions"
              type="tertiary"
              size="compact"
            >
              <GoabMenuAction action="open" text="Open" />
              <GoabMenuAction action="delete" text="Delete" />
            </GoabMenuButton>
          </div>
        </GoabContainer>
        <GoabContainer mt="m" data-grid="row" maxWidth="100%">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "var(--goa-space-m)",
              alignItems: "flex-start",
            }}
          >
            <GoabCheckbox data-grid="cell-0" name="user-2" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--goa-space-m)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <GoabBlock direction="row" gap="s" alignment="center">
                <strong data-grid="cell-1">Emma Stroman</strong>
                <GoabBadge
                  data-grid="cell-2"
                  type="emergency"
                  content="To be removed"
                />
              </GoabBlock>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--goa-space-xl)",
                }}
              >
                <GoabBlock direction="column" gap="xs" data-grid="cell-4">
                  <strong>Updated</strong>
                  <span>Nov 28, 2021 at 1:30 PM</span>
                </GoabBlock>
                <GoabBlock direction="column" gap="xs" data-grid="cell-5">
                  <strong>Email</strong>
                  <span>emma.stroman@gmail.com</span>
                </GoabBlock>
                <GoabBlock direction="column" gap="xs" data-grid="cell-6">
                  <strong>Program</strong>
                  <span>Fort McMurray</span>
                </GoabBlock>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--goa-space-xl)",
                }}
              >
                <GoabBlock direction="column" gap="xs" data-grid="cell-7">
                  <strong>Program ID</strong>
                  <span>74522643</span>
                </GoabBlock>
                <GoabBlock direction="column" gap="xs" data-grid="cell-8">
                  <strong>Service access</strong>
                  <span>Claims Adjustments</span>
                </GoabBlock>
              </div>
            </div>
            <GoabMenuButton
              data-grid="cell-3"
              text="Actions"
              type="tertiary"
              size="compact"
            >
              <GoabMenuAction action="open" text="Open" />
              <GoabMenuAction action="delete" text="Delete" />
            </GoabMenuButton>
          </div>
        </GoabContainer>
      </GoabDataGrid>
    </div>
  );
}

export default DocsDataGridRoute;
