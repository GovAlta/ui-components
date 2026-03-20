import { render } from "vitest-browser-react";
import { vi, describe, it, expect } from "vitest";
import { useState, useMemo } from "react";
import { GoabxTable, GoabxTableSortHeader } from "../src/experimental";

type SortEntry = { column: string; direction: "asc" | "desc" };
type RowData = { id: number; name: string; department: string; salary: number };

const initialData: RowData[] = [
  { id: 1, name: "Alice Johnson", department: "Engineering", salary: 95000 },
  { id: 2, name: "Bob Smith", department: "Marketing", salary: 72000 },
  { id: 3, name: "Carol Williams", department: "Engineering", salary: 105000 },
  { id: 4, name: "David Brown", department: "Sales", salary: 68000 },
  { id: 5, name: "Eve Davis", department: "Marketing", salary: 78000 },
];

function sortData(data: RowData[], sorts: SortEntry[]): RowData[] {
  if (sorts.length === 0) return data;
  return [...data].sort((a, b) => {
    for (const { column, direction } of sorts) {
      const aVal = a[column as keyof RowData];
      const bVal = b[column as keyof RowData];
      let cmp = 0;
      if (typeof aVal === "string" && typeof bVal === "string") {
        cmp = aVal.localeCompare(bVal);
      } else {
        cmp = (aVal as number) - (bVal as number);
      }
      if (cmp !== 0) return direction === "asc" ? cmp : -cmp;
    }
    return 0;
  });
}

/** Query row names from the light DOM render container (not shadow DOM). */
function getRowNames(container: HTMLElement): string[] {
  const rows = container.querySelectorAll("tbody tr");
  return Array.from(rows).map((row) => row.querySelector("td")!.textContent!.trim());
}

/** Get the shadow DOM button inside a goa-table-sort-header, queried from the light DOM container. */
function getSortHeaderButton(container: HTMLElement, name: string): HTMLElement {
  const header = container.querySelector(`goa-table-sort-header[name="${name}"]`);
  return header!.shadowRoot!.querySelector("button")!;
}

/** Wait for sort headers to be mounted and their shadow roots to be ready. */
async function waitForHeaders(container: HTMLElement, count: number) {
  await vi.waitFor(
    () => {
      const headers = container.querySelectorAll("goa-table-sort-header");
      expect(headers.length).toBe(count);
      // Ensure shadow roots are ready
      headers.forEach((h) => {
        expect(h.shadowRoot).toBeTruthy();
        expect(h.shadowRoot!.querySelector("button")).toBeTruthy();
      });
    },
    { timeout: 3000 },
  );
}

describe("GoabxTable Browser Tests", () => {
  describe("single-column sorting", () => {
    it("should sort by name ascending on first click", async () => {
      const onSort = vi.fn();

      const Component = () => {
        const [sorts, setSorts] = useState<SortEntry[]>([]);
        const sorted = useMemo(() => sortData(initialData, sorts), [sorts]);

        return (
          <GoabxTable
            testId="single-sort-table"
            onSort={(detail) => {
              setSorts([
                {
                  column: detail.sortBy,
                  direction: detail.sortDir === 1 ? "asc" : "desc",
                },
              ]);
              onSort(detail);
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="department">
                    Department
                  </GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="salary">Salary</GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>${row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);
      await waitForHeaders(container, 3);

      // Initial order should be the original data order
      expect(getRowNames(container)).toEqual([
        "Alice Johnson",
        "Bob Smith",
        "Carol Williams",
        "David Brown",
        "Eve Davis",
      ]);

      // Click Name header to sort ascending
      getSortHeaderButton(container, "name").click();

      await vi.waitFor(() => {
        expect(onSort).toHaveBeenCalled();
        expect(getRowNames(container)).toEqual([
          "Alice Johnson",
          "Bob Smith",
          "Carol Williams",
          "David Brown",
          "Eve Davis",
        ]);
      });
    });

    it("should toggle sort direction on subsequent clicks", async () => {
      const Component = () => {
        const [sorts, setSorts] = useState<SortEntry[]>([]);
        const sorted = useMemo(() => sortData(initialData, sorts), [sorts]);

        return (
          <GoabxTable
            testId="toggle-sort-table"
            onSort={(detail) => {
              setSorts([
                {
                  column: detail.sortBy,
                  direction: detail.sortDir === 1 ? "asc" : "desc",
                },
              ]);
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="salary">Salary</GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>${row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);
      await waitForHeaders(container, 2);

      // First click — sort ascending
      getSortHeaderButton(container, "name").click();
      await vi.waitFor(() => {
        expect(getRowNames(container)).toEqual([
          "Alice Johnson",
          "Bob Smith",
          "Carol Williams",
          "David Brown",
          "Eve Davis",
        ]);
      });

      // Second click — sort descending
      getSortHeaderButton(container, "name").click();
      await vi.waitFor(() => {
        expect(getRowNames(container)).toEqual([
          "Eve Davis",
          "David Brown",
          "Carol Williams",
          "Bob Smith",
          "Alice Johnson",
        ]);
      });
    });

    it("should switch sort column when clicking a different header", async () => {
      const Component = () => {
        const [sorts, setSorts] = useState<SortEntry[]>([]);
        const sorted = useMemo(() => sortData(initialData, sorts), [sorts]);

        return (
          <GoabxTable
            testId="switch-col-table"
            onSort={(detail) => {
              setSorts([
                {
                  column: detail.sortBy,
                  direction: detail.sortDir === 1 ? "asc" : "desc",
                },
              ]);
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="salary">Salary</GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>${row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);
      await waitForHeaders(container, 2);

      // Sort by name first
      getSortHeaderButton(container, "name").click();
      await vi.waitFor(() => {
        expect(getRowNames(container)[0]).toBe("Alice Johnson");
      });

      // Now click salary — should sort by salary ascending, replacing name sort
      getSortHeaderButton(container, "salary").click();
      await vi.waitFor(() => {
        // Salary asc: 68000, 72000, 78000, 95000, 105000
        expect(getRowNames(container)).toEqual([
          "David Brown",
          "Bob Smith",
          "Eve Davis",
          "Alice Johnson",
          "Carol Williams",
        ]);
      });
    });
  });

  describe("multi-column sorting", () => {
    it("should sort by two columns when clicking sequentially", async () => {
      const Component = () => {
        const [sorts, setSorts] = useState<SortEntry[]>([]);
        const sorted = useMemo(() => sortData(initialData, sorts), [sorts]);

        return (
          <GoabxTable
            testId="multi-sort-table"
            sortMode="multi"
            onMultiSort={(detail) => {
              setSorts(detail.sorts);
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="department">
                    Department
                  </GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="salary">Salary</GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>${row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);
      await waitForHeaders(container, 3);

      // Click department to sort ascending
      getSortHeaderButton(container, "department").click();
      await vi.waitFor(() => {
        // Department asc: Engineering (Alice, Carol), Marketing (Bob, Eve), Sales (David)
        const names = getRowNames(container);
        expect(names[0]).toBe("Alice Johnson"); // Engineering
        expect(names[4]).toBe("David Brown"); // Sales
      });

      // Click salary as secondary sort
      getSortHeaderButton(container, "salary").click();
      await vi.waitFor(() => {
        // Dept asc then salary asc within each dept
        // Engineering: Alice (95k), Carol (105k)
        // Marketing: Bob (72k), Eve (78k)
        // Sales: David (68k)
        expect(getRowNames(container)).toEqual([
          "Alice Johnson",
          "Carol Williams",
          "Bob Smith",
          "Eve Davis",
          "David Brown",
        ]);
      });
    });
  });

  describe("declarative initial sort (multi)", () => {
    it("should apply initial sort from direction and sortOrder props", async () => {
      const onSort = vi.fn();

      const Component = () => {
        const [sorts, setSorts] = useState<SortEntry[]>([]);
        const sorted = useMemo(() => sortData(initialData, sorts), [sorts]);

        return (
          <GoabxTable
            testId="initial-sort-table"
            sortMode="multi"
            onMultiSort={(detail) => {
              setSorts(detail.sorts);
              onSort(detail);
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="department" direction="asc" sortOrder={1}>
                    Department
                  </GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="salary" direction="desc" sortOrder={2}>
                    Salary
                  </GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>${row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);

      // Wait for initial sort to be applied
      await vi.waitFor(
        () => {
          // Dept asc, then salary desc within each dept
          // Engineering: Carol (105k), Alice (95k)
          // Marketing: Eve (78k), Bob (72k)
          // Sales: David (68k)
          expect(getRowNames(container)).toEqual([
            "Carol Williams",
            "Alice Johnson",
            "Eve Davis",
            "Bob Smith",
            "David Brown",
          ]);
        },
        { timeout: 3000 },
      );

      // Verify the initial onMultiSort was dispatched
      expect(onSort).toHaveBeenCalled();
      const lastCall = onSort.mock.calls[onSort.mock.calls.length - 1][0];
      expect(lastCall.sorts).toEqual([
        { column: "department", direction: "asc" },
        { column: "salary", direction: "desc" },
      ]);
    });

    it("should update sort when clicking a header after initial sort", async () => {
      const Component = () => {
        const [sorts, setSorts] = useState<SortEntry[]>([]);
        const sorted = useMemo(() => sortData(initialData, sorts), [sorts]);

        return (
          <GoabxTable
            testId="initial-then-click-table"
            sortMode="multi"
            onMultiSort={(detail) => {
              setSorts(detail.sorts);
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="department" direction="asc" sortOrder={1}>
                    Department
                  </GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="salary" direction="desc" sortOrder={2}>
                    Salary
                  </GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>${row.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);

      // Wait for initial sort to apply
      await vi.waitFor(
        () => {
          expect(getRowNames(container)[0]).toBe("Carol Williams");
        },
        { timeout: 3000 },
      );

      // Click Name header — should add name as a sort column (replacing secondary since max is 2)
      getSortHeaderButton(container, "name").click();

      await vi.waitFor(() => {
        // Department asc is primary, name asc replaces salary as secondary
        // Engineering: Alice, Carol
        // Marketing: Bob, Eve
        // Sales: David
        expect(getRowNames(container)).toEqual([
          "Alice Johnson",
          "Carol Williams",
          "Bob Smith",
          "Eve Davis",
          "David Brown",
        ]);
      });
    });
  });

  describe("sort header direction attribute", () => {
    it("should update direction attribute on sort header after clicking", async () => {
      const Component = () => {
        return (
          <GoabxTable
            testId="direction-attr-table"
            onSort={() => {
              /* noop */
            }}
          >
            <thead>
              <tr>
                <th>
                  <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
                </th>
                <th>
                  <GoabxTableSortHeader name="department">
                    Department
                  </GoabxTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>Engineering</td>
              </tr>
            </tbody>
          </GoabxTable>
        );
      };

      const { container } = render(<Component />);
      await waitForHeaders(container, 2);

      const nameHeader = container.querySelector('goa-table-sort-header[name="name"]')!;
      const deptHeader = container.querySelector(
        'goa-table-sort-header[name="department"]',
      )!;

      // Initially both should be "none"
      expect(nameHeader.getAttribute("direction")).toBe("none");
      expect(deptHeader.getAttribute("direction")).toBe("none");

      // Click name header
      getSortHeaderButton(container, "name").click();

      await vi.waitFor(() => {
        expect(nameHeader.getAttribute("direction")).toBe("asc");
        expect(deptHeader.getAttribute("direction")).toBe("none");
      });

      // Click again for descending
      getSortHeaderButton(container, "name").click();

      await vi.waitFor(() => {
        expect(nameHeader.getAttribute("direction")).toBe("desc");
        expect(deptHeader.getAttribute("direction")).toBe("none");
      });

      // Click department — name should reset to none
      getSortHeaderButton(container, "department").click();

      await vi.waitFor(() => {
        expect(nameHeader.getAttribute("direction")).toBe("none");
        expect(deptHeader.getAttribute("direction")).toBe("asc");
      });
    });
  });
});
