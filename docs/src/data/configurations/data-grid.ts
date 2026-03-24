/**
 * DataGrid Component Configurations
 *
 * DataGrid wraps content to add keyboard navigation between rows and cells.
 */

import type { ComponentConfigurations } from "./types";

export const dataGridConfigurations: ComponentConfigurations = {
  componentSlug: "data-grid",
  componentName: "Data grid",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic data grid",
      description: "Keyboard-navigable table",
      code: {
        react: `<GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
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
        <td data-grid="cell"><GoabBadge type="success" content="Active" /></td>
        <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
      </tr>
      <tr data-grid="row">
        <td data-grid="cell">Bob Smith</td>
        <td data-grid="cell">Designer</td>
        <td data-grid="cell"><GoabBadge type="success" content="Active" /></td>
        <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
      </tr>
      <tr data-grid="row">
        <td data-grid="cell">Carol White</td>
        <td data-grid="cell">Manager</td>
        <td data-grid="cell"><GoabBadge type="information" content="Away" /></td>
        <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
      </tr>
      <tr data-grid="row">
        <td data-grid="cell">David Brown</td>
        <td data-grid="cell">Analyst</td>
        <td data-grid="cell"><GoabBadge type="success" content="Active" /></td>
        <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
      </tr>
    </tbody>
  </GoabTable>
</GoabDataGrid>`,
        angular: `<goab-data-grid keyboardNav="table" keyboardIconPosition="right">
  <goab-table width="100%">
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
        <td data-grid="cell"><goab-badge type="success" content="Active"></goab-badge></td>
        <td data-grid="cell"><goab-button type="tertiary" size="compact">View</goab-button></td>
      </tr>
      <tr data-grid="row">
        <td data-grid="cell">Bob Smith</td>
        <td data-grid="cell">Designer</td>
        <td data-grid="cell"><goab-badge type="success" content="Active"></goab-badge></td>
        <td data-grid="cell"><goab-button type="tertiary" size="compact">View</goab-button></td>
      </tr>
      <tr data-grid="row">
        <td data-grid="cell">Carol White</td>
        <td data-grid="cell">Manager</td>
        <td data-grid="cell"><goab-badge type="information" content="Away"></goab-badge></td>
        <td data-grid="cell"><goab-button type="tertiary" size="compact">View</goab-button></td>
      </tr>
      <tr data-grid="row">
        <td data-grid="cell">David Brown</td>
        <td data-grid="cell">Analyst</td>
        <td data-grid="cell"><goab-badge type="success" content="Active"></goab-badge></td>
        <td data-grid="cell"><goab-button type="tertiary" size="compact">View</goab-button></td>
      </tr>
    </tbody>
  </goab-table>
</goab-data-grid>`,
        webComponents: `<goa-data-grid keyboard-nav="table" keyboard-icon-position="right">
  <goa-table version="2" width="100%">
    <table width="100%">
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
          <td data-grid="cell"><goa-badge version="2" type="success" content="Active"></goa-badge></td>
          <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
        </tr>
        <tr data-grid="row">
          <td data-grid="cell">Bob Smith</td>
          <td data-grid="cell">Designer</td>
          <td data-grid="cell"><goa-badge version="2" type="success" content="Active"></goa-badge></td>
          <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
        </tr>
        <tr data-grid="row">
          <td data-grid="cell">Carol White</td>
          <td data-grid="cell">Manager</td>
          <td data-grid="cell"><goa-badge version="2" type="information" content="Away"></goa-badge></td>
          <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
        </tr>
        <tr data-grid="row">
          <td data-grid="cell">David Brown</td>
          <td data-grid="cell">Analyst</td>
          <td data-grid="cell"><goa-badge version="2" type="success" content="Active"></goa-badge></td>
          <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
        </tr>
      </tbody>
    </table>
  </goa-table>
</goa-data-grid>`,
      },
    },
    {
      id: "layout-navigation",
      name: "Layout navigation",
      description: "Card-based layout with keyboard navigation",
      code: {
        react: `<GoabDataGrid keyboardNav="layout" keyboardIconPosition="right">
  <GoabContainer mt="m" data-grid="row" maxWidth="100%">
    <div style={{ display: "flex", flexDirection: "row", gap: "var(--goa-space-m)", alignItems: "flex-start" }}>
      <GoabCheckbox data-grid="cell-0" name="user-1" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-m)", flex: 1, minWidth: 0 }}>
        <GoabBlock direction="row" gap="s" alignment="center">
          <strong data-grid="cell-1">Mike Zwei</strong>
          <GoabBadge data-grid="cell-2" type="success" content="Removed" />
        </GoabBlock>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
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
      <GoabMenuButton data-grid="cell-3" text="Actions" type="tertiary" size="compact">
        <GoabMenuAction action="open" text="Open" />
        <GoabMenuAction action="delete" text="Delete" />
      </GoabMenuButton>
    </div>
  </GoabContainer>
  <GoabContainer mt="m" data-grid="row" maxWidth="100%">
    <div style={{ display: "flex", flexDirection: "row", gap: "var(--goa-space-m)", alignItems: "flex-start" }}>
      <GoabCheckbox data-grid="cell-0" name="user-2" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-m)", flex: 1, minWidth: 0 }}>
        <GoabBlock direction="row" gap="s" alignment="center">
          <strong data-grid="cell-1">Emma Stroman</strong>
          <GoabBadge data-grid="cell-2" type="emergency" content="To be removed" />
        </GoabBlock>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
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
      <GoabMenuButton data-grid="cell-3" text="Actions" type="tertiary" size="compact">
        <GoabMenuAction action="open" text="Open" />
        <GoabMenuAction action="delete" text="Delete" />
      </GoabMenuButton>
    </div>
  </GoabContainer>
</GoabDataGrid>`,
        angular: `<goab-data-grid keyboardNav="layout" keyboardIconPosition="right">
  <goab-container mt="m" data-grid="row" maxWidth="100%">
    <div style="display: flex; flex-direction: row; gap: var(--goa-space-m); align-items: flex-start">
      <goab-checkbox data-grid="cell-0" name="user-1"></goab-checkbox>
      <div style="display: flex; flex-direction: column; gap: var(--goa-space-m); flex: 1; min-width: 0">
        <goab-block direction="row" gap="s" alignment="center">
          <strong data-grid="cell-1">Mike Zwei</strong>
          <goab-badge data-grid="cell-2" type="success" content="Removed"></goab-badge>
        </goab-block>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goab-block direction="column" gap="xs" data-grid="cell-4">
            <strong>Updated</strong>
            <span>Jun 30, 2022 at 2:30 PM</span>
          </goab-block>
          <goab-block direction="column" gap="xs" data-grid="cell-5">
            <strong>Email</strong>
            <span>mike.zwei@gmail.com</span>
          </goab-block>
          <goab-block direction="column" gap="xs" data-grid="cell-6">
            <strong>Program</strong>
            <span>Wee Wild Ones Curry</span>
          </goab-block>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goab-block direction="column" gap="xs" data-grid="cell-7">
            <strong>Program ID</strong>
            <span>74528567</span>
          </goab-block>
          <goab-block direction="column" gap="xs" data-grid="cell-8">
            <strong>Service access</strong>
            <span>Claims Adjustments</span>
          </goab-block>
        </div>
      </div>
      <goab-menu-button data-grid="cell-3" text="Actions" type="tertiary" size="compact">
        <goab-menu-action action="open" text="Open"></goab-menu-action>
        <goab-menu-action action="delete" text="Delete"></goab-menu-action>
      </goab-menu-button>
    </div>
  </goab-container>
  <goab-container mt="m" data-grid="row" maxWidth="100%">
    <div style="display: flex; flex-direction: row; gap: var(--goa-space-m); align-items: flex-start">
      <goab-checkbox data-grid="cell-0" name="user-2"></goab-checkbox>
      <div style="display: flex; flex-direction: column; gap: var(--goa-space-m); flex: 1; min-width: 0">
        <goab-block direction="row" gap="s" alignment="center">
          <strong data-grid="cell-1">Emma Stroman</strong>
          <goab-badge data-grid="cell-2" type="emergency" content="To be removed"></goab-badge>
        </goab-block>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goab-block direction="column" gap="xs" data-grid="cell-4">
            <strong>Updated</strong>
            <span>Nov 28, 2021 at 1:30 PM</span>
          </goab-block>
          <goab-block direction="column" gap="xs" data-grid="cell-5">
            <strong>Email</strong>
            <span>emma.stroman@gmail.com</span>
          </goab-block>
          <goab-block direction="column" gap="xs" data-grid="cell-6">
            <strong>Program</strong>
            <span>Fort McMurray</span>
          </goab-block>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goab-block direction="column" gap="xs" data-grid="cell-7">
            <strong>Program ID</strong>
            <span>74522643</span>
          </goab-block>
          <goab-block direction="column" gap="xs" data-grid="cell-8">
            <strong>Service access</strong>
            <span>Claims Adjustments</span>
          </goab-block>
        </div>
      </div>
      <goab-menu-button data-grid="cell-3" text="Actions" type="tertiary" size="compact">
        <goab-menu-action action="open" text="Open"></goab-menu-action>
        <goab-menu-action action="delete" text="Delete"></goab-menu-action>
      </goab-menu-button>
    </div>
  </goab-container>
</goab-data-grid>`,
        webComponents: `<goa-data-grid keyboard-nav="layout" keyboard-icon-position="right">
  <goa-container version="2" mt="m" data-grid="row" maxwidth="100%">
    <div style="display: flex; flex-direction: row; gap: var(--goa-space-m); align-items: flex-start">
      <goa-checkbox version="2" data-grid="cell-0" name="user-1"></goa-checkbox>
      <div style="display: flex; flex-direction: column; gap: var(--goa-space-m); flex: 1; min-width: 0">
        <goa-block direction="row" gap="s" alignment="center">
          <strong data-grid="cell-1">Mike Zwei</strong>
          <goa-badge version="2" data-grid="cell-2" type="success" content="Removed"></goa-badge>
        </goa-block>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goa-block direction="column" gap="xs" data-grid="cell-4">
            <strong>Updated</strong>
            <span>Jun 30, 2022 at 2:30 PM</span>
          </goa-block>
          <goa-block direction="column" gap="xs" data-grid="cell-5">
            <strong>Email</strong>
            <span>mike.zwei@gmail.com</span>
          </goa-block>
          <goa-block direction="column" gap="xs" data-grid="cell-6">
            <strong>Program</strong>
            <span>Wee Wild Ones Curry</span>
          </goa-block>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goa-block direction="column" gap="xs" data-grid="cell-7">
            <strong>Program ID</strong>
            <span>74528567</span>
          </goa-block>
          <goa-block direction="column" gap="xs" data-grid="cell-8">
            <strong>Service access</strong>
            <span>Claims Adjustments</span>
          </goa-block>
        </div>
      </div>
      <goa-menu-button version="2" data-grid="cell-3" text="Actions" type="tertiary" size="compact">
        <goa-menu-action action="open" text="Open"></goa-menu-action>
        <goa-menu-action action="delete" text="Delete"></goa-menu-action>
      </goa-menu-button>
    </div>
  </goa-container>
  <goa-container version="2" mt="m" data-grid="row" maxwidth="100%">
    <div style="display: flex; flex-direction: row; gap: var(--goa-space-m); align-items: flex-start">
      <goa-checkbox version="2" data-grid="cell-0" name="user-2"></goa-checkbox>
      <div style="display: flex; flex-direction: column; gap: var(--goa-space-m); flex: 1; min-width: 0">
        <goa-block direction="row" gap="s" alignment="center">
          <strong data-grid="cell-1">Emma Stroman</strong>
          <goa-badge version="2" data-grid="cell-2" type="emergency" content="To be removed"></goa-badge>
        </goa-block>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goa-block direction="column" gap="xs" data-grid="cell-4">
            <strong>Updated</strong>
            <span>Nov 28, 2021 at 1:30 PM</span>
          </goa-block>
          <goa-block direction="column" gap="xs" data-grid="cell-5">
            <strong>Email</strong>
            <span>emma.stroman@gmail.com</span>
          </goa-block>
          <goa-block direction="column" gap="xs" data-grid="cell-6">
            <strong>Program</strong>
            <span>Fort McMurray</span>
          </goa-block>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: var(--goa-space-xl)">
          <goa-block direction="column" gap="xs" data-grid="cell-7">
            <strong>Program ID</strong>
            <span>74522643</span>
          </goa-block>
          <goa-block direction="column" gap="xs" data-grid="cell-8">
            <strong>Service access</strong>
            <span>Claims Adjustments</span>
          </goa-block>
        </div>
      </div>
      <goa-menu-button version="2" data-grid="cell-3" text="Actions" type="tertiary" size="compact">
        <goa-menu-action action="open" text="Open"></goa-menu-action>
        <goa-menu-action action="delete" text="Delete"></goa-menu-action>
      </goa-menu-button>
    </div>
  </goa-container>
</goa-data-grid>`,
      },
    },
  ],
};
