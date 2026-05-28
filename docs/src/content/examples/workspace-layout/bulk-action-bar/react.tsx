import { useState } from "react";
import {
  GoabBadge,
  GoabButton,
  GoabCheckbox,
  GoabTable,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
} from "@abgov/react-components";

type Status = "Accepted" | "Denied" | "Cancelled" | "Email sent";
type Priority = "High" | "Medium" | "Low";

type Row = {
  id: string;
  name: string;
  status: Status;
  assignedTo: string | null;
  dueDate: string;
  jurisdiction: string;
  fileNumber: string;
  priority: Priority;
};

const NAMES = [
  "Gilbert Barton",
  "Shelley Leffler",
  "Randal Sanford",
  "Bonnie Metz",
  "Lowell Kuhn",
  "William Boyer",
  "Virginia Johns",
  "Marvin Hamill",
  "Wendell Gerhold",
  "Wendy Cormier",
  "Mable Macejkovic",
  "Don Walsh",
  "Ethan White",
  "Mia Robinson",
  "Noah Clark",
  "Ava Lewis",
  "Lucas Walker",
  "Charlotte Hall",
  "Benjamin Young",
  "Amelia Allen",
  "Liam Wilson",
  "Olivia Brown",
  "Henry Davis",
  "Sophia Garcia",
  "Mason Martinez",
  "Isabella Rodriguez",
  "Lucas King",
  "Mia Hernandez",
  "Logan Lopez",
  "Aria Gonzalez",
];

const STATUSES: Status[] = ["Accepted", "Denied", "Cancelled", "Email sent"];
const JURISDICTIONS = ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat", "Fort McMurray", "Grande Prairie", "Spruce Grove"];
const ASSIGNEES = ["Edna Mode", "Bob Parr", "Helen Parr", null, null];
const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

const rows: Row[] = NAMES.map((name, i) => ({
  id: `row-${i + 1}`,
  name,
  status: STATUSES[i % STATUSES.length],
  assignedTo: ASSIGNEES[i % ASSIGNEES.length],
  dueDate: new Date(2026, (i % 12), 1 + (i % 28)).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }),
  jurisdiction: JURISDICTIONS[i % JURISDICTIONS.length],
  fileNumber: `${(1234567890 + i * 11111).toString().slice(0, 10)}`,
  priority: PRIORITIES[i % PRIORITIES.length],
}));

const statusBadge: Record<Status, "success" | "emergency" | "information" | "important"> = {
  Accepted: "success",
  Denied: "emergency",
  Cancelled: "information",
  "Email sent": "important",
};

const priorityBadge: Record<Priority, "emergency" | "important" | "information"> = {
  High: "emergency",
  Medium: "important",
  Low: "information",
};

const styles = `
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
    .bulk-footer goa-button {
      width: 100%;
    }
  }
`;

export function WorkspaceLayoutBulkActionBarExample() {
  // Land with a few rows already selected so the bulk action bar in the
  // page footer is visible immediately.
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set([rows[0].id, rows[1].id, rows[2].id]),
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clear = () => setSelected(new Set());
  const selectAll = () =>
    setSelected((prev) =>
      prev.size === rows.length ? new Set() : new Set(rows.map((r) => r.id)),
    );
  const hasSelection = selected.size > 0;
  const allSelected = selected.size === rows.length;

  return (
    <>
      <style>{styles}</style>
      <GoabWorkspaceLayout
        sideMenu={
          <GoabWorkSideMenu
            heading="Workspace"
            url="/"
            open={true}
            primaryContent={
              <GoabWorkSideMenuGroup icon="grid" heading="Work">
                <GoabWorkSideMenuItem icon="document" label="Cases" url="/cases" />
                <GoabWorkSideMenuItem icon="folder" label="Documents" url="/documents" />
                <GoabWorkSideMenuItem icon="bar-chart" label="Reports" url="/reports" />
              </GoabWorkSideMenuGroup>
            }
          />
        }
        pageHeader={
          <div className="page-header">
            <h1 className="page-header__title">Cases</h1>
            <span className="page-header__count">{rows.length} cases</span>
          </div>
        }
        pageFooter={
          hasSelection ? (
            <div className="bulk-footer">
              <GoabButton type="secondary" size="compact" onClick={clear}>
                Clear selection ({selected.size})
              </GoabButton>
              <GoabButton type="primary" size="compact">
                Assign to me
              </GoabButton>
              <GoabButton type="tertiary" size="compact">
                Delete selected
              </GoabButton>
              <span className="bulk-footer__count">
                {selected.size} of {rows.length} selected
              </span>
            </div>
          ) : (
            <div className="bulk-footer bulk-footer--empty">
              Select cases to perform bulk actions
            </div>
          )
        }
      >
        <div className="content">
          <GoabTable width="100%">
            <table width="100%">
              <thead>
                <tr>
                  <th className="select-col">
                    <GoabCheckbox
                      name="select-all"
                      checked={allSelected}
                      onChange={selectAll}
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
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <GoabCheckbox
                        name={`select-${row.id}`}
                        checked={selected.has(row.id)}
                        onChange={() => toggle(row.id)}
                        ariaLabel={`Select ${row.name}`}
                      />
                    </td>
                    <td>
                      <strong>{row.name}</strong>
                    </td>
                    <td>
                      <GoabBadge type={statusBadge[row.status]} content={row.status} />
                    </td>
                    <td>
                      {row.assignedTo ?? (
                        <a href="#" className="assign-me-link">
                          Assign me
                        </a>
                      )}
                    </td>
                    <td>{row.dueDate}</td>
                    <td>{row.jurisdiction}</td>
                    <td>{row.fileNumber}</td>
                    <td>
                      <GoabBadge
                        type={priorityBadge[row.priority]}
                        content={row.priority}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GoabTable>
        </div>
      </GoabWorkspaceLayout>
    </>
  );
}
