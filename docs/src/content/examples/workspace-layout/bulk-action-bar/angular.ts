import { Component } from "@angular/core";

type Status = "Accepted" | "Denied" | "Cancelled" | "Email sent";
type Priority = "High" | "Medium" | "Low";

interface Row {
  id: string;
  name: string;
  status: Status;
  assignedTo: string | null;
  dueDate: string;
  jurisdiction: string;
  fileNumber: string;
  priority: Priority;
}

const NAMES = [
  "Gilbert Barton", "Shelley Leffler", "Randal Sanford", "Bonnie Metz",
  "Lowell Kuhn", "William Boyer", "Virginia Johns", "Marvin Hamill",
  "Wendell Gerhold", "Wendy Cormier", "Mable Macejkovic", "Don Walsh",
  "Ethan White", "Mia Robinson", "Noah Clark", "Ava Lewis",
  "Lucas Walker", "Charlotte Hall", "Benjamin Young", "Amelia Allen",
  "Liam Wilson", "Olivia Brown", "Henry Davis", "Sophia Garcia",
  "Mason Martinez", "Isabella Rodriguez", "Lucas King", "Mia Hernandez",
  "Logan Lopez", "Aria Gonzalez",
];

const STATUSES: Status[] = ["Accepted", "Denied", "Cancelled", "Email sent"];
const JURISDICTIONS = [
  "Calgary", "Edmonton", "Red Deer", "Lethbridge",
  "Medicine Hat", "Fort McMurray", "Grande Prairie", "Spruce Grove",
];
const ASSIGNEES: (string | null)[] = ["Edna Mode", "Bob Parr", "Helen Parr", null, null];
const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

@Component({
  selector: "app-bulk-action-bar-workspace-layout",
  template: `
    <ng-template #sideMenuTpl>
      <goab-work-side-menu
        heading="Workspace"
        url="/"
        [open]="true"
        [primaryContent]="primaryTpl"
      />
    </ng-template>

    <ng-template #primaryTpl>
      <goab-work-side-menu-group icon="grid" heading="Work">
        <goab-work-side-menu-item icon="document" label="Cases" url="/cases" />
        <goab-work-side-menu-item icon="folder" label="Documents" url="/documents" />
        <goab-work-side-menu-item icon="bar-chart" label="Reports" url="/reports" />
      </goab-work-side-menu-group>
    </ng-template>

    <ng-template #pageHeaderTpl>
      <div class="page-header">
        <h1 class="page-header__title">Cases</h1>
        <span class="page-header__count">{{ rows.length }} cases</span>
      </div>
    </ng-template>

    <ng-template #pageFooterTpl>
      @if (hasSelection) {
        <div class="bulk-footer">
          <goab-button type="secondary" size="compact" (onClick)="clear()">
            Clear selection ({{ selected.size }})
          </goab-button>
          <goab-button type="primary" size="compact">Assign to me</goab-button>
          <goab-button type="tertiary" size="compact">Delete selected</goab-button>
          <span class="bulk-footer__count">
            {{ selected.size }} of {{ rows.length }} selected
          </span>
        </div>
      } @else {
        <div class="bulk-footer bulk-footer--empty">
          Select cases to perform bulk actions
        </div>
      }
    </ng-template>

    <goab-workspace-layout
      [sideMenu]="sideMenuTpl"
      [pageHeader]="pageHeaderTpl"
      [pageFooter]="pageFooterTpl"
    >
      <div class="content">
        <goab-table width="100%">
          <table width="100%">
            <thead>
              <tr>
                <th class="select-col">
                  <goab-checkbox
                    name="select-all"
                    [checked]="allSelected"
                    (onChange)="selectAll()"
                    ariaLabel="Select all cases"
                  />
                </th>
                <th>Name</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Due date</th>
                <th>Jurisdiction</th>
                <th>File number</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              @for (row of rows; track row.id) {
                <tr>
                  <td>
                    <goab-checkbox
                      [name]="'select-' + row.id"
                      [checked]="selected.has(row.id)"
                      (onChange)="toggle(row.id)"
                      [ariaLabel]="'Select ' + row.name"
                    />
                  </td>
                  <td><strong>{{ row.name }}</strong></td>
                  <td>
                    <goab-badge [type]="statusBadge[row.status]" [content]="row.status" />
                  </td>
                  <td>
                    @if (row.assignedTo) {
                      {{ row.assignedTo }}
                    } @else {
                      <a href="#" class="assign-me-link">Assign me</a>
                    }
                  </td>
                  <td>{{ row.dueDate }}</td>
                  <td>{{ row.jurisdiction }}</td>
                  <td>{{ row.fileNumber }}</td>
                  <td>
                    <goab-badge [type]="priorityBadge[row.priority]" [content]="row.priority" />
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </goab-table>
      </div>
    </goab-workspace-layout>
  `,
  styles: [
    `
      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--goa-space-m) var(--goa-space-l);
        background: var(--goa-color-greyscale-white);
      }
      .page-header__title {
        margin: 0;
        font-size: var(--goa-font-size-5);
      }
      .page-header__count {
        color: var(--goa-color-text-secondary);
      }
      .bulk-footer {
        display: flex;
        align-items: center;
        gap: var(--goa-space-m);
        padding: var(--goa-space-s) var(--goa-space-l);
        background: var(--goa-color-greyscale-white);
      }
      .bulk-footer--empty {
        color: var(--goa-color-text-secondary);
        font-size: var(--goa-font-size-2);
      }
      .bulk-footer__count {
        margin-left: auto;
        color: var(--goa-color-text-secondary);
        font-size: var(--goa-font-size-2);
      }
      .content {
        padding: var(--goa-space-l);
      }
      .select-col {
        width: 2.5rem;
      }
      .assign-me-link {
        text-decoration: underline;
      }
      @media (max-width: 623px) {
        .bulk-footer {
          flex-direction: column;
          align-items: stretch;
          gap: var(--goa-space-s);
          padding: var(--goa-space-m) var(--goa-space-l);
        }
        .bulk-footer__count {
          margin-left: 0;
          order: -1;
          text-align: center;
        }
        .bulk-footer goab-button {
          width: 100%;
        }
      }
    `,
  ],
})
export class WorkspaceLayoutBulkActionBarComponent {
  rows: Row[] = NAMES.map((name, i) => ({
    id: `row-${i + 1}`,
    name,
    status: STATUSES[i % STATUSES.length],
    assignedTo: ASSIGNEES[i % ASSIGNEES.length],
    dueDate: new Date(2026, i % 12, 1 + (i % 28)).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
    jurisdiction: JURISDICTIONS[i % JURISDICTIONS.length],
    fileNumber: (1234567890 + i * 11111).toString().slice(0, 10),
    priority: PRIORITIES[i % PRIORITIES.length],
  }));

  statusBadge: Record<Status, "success" | "emergency" | "information" | "important"> = {
    Accepted: "success",
    Denied: "emergency",
    Cancelled: "information",
    "Email sent": "important",
  };

  priorityBadge: Record<Priority, "emergency" | "important" | "information"> = {
    High: "emergency",
    Medium: "important",
    Low: "information",
  };

  // Land with a few rows already selected so the bulk action bar in the
  // page footer is visible immediately.
  selected = new Set<string>([this.rows[0].id, this.rows[1].id, this.rows[2].id]);

  toggle(id: string): void {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
    // Force change detection on Set mutation.
    this.selected = new Set(this.selected);
  }

  selectAll(): void {
    this.selected = this.selected.size === this.rows.length
      ? new Set()
      : new Set(this.rows.map((r) => r.id));
  }

  clear(): void {
    this.selected = new Set();
  }

  get hasSelection(): boolean {
    return this.selected.size > 0;
  }

  get allSelected(): boolean {
    return this.selected.size === this.rows.length;
  }
}
