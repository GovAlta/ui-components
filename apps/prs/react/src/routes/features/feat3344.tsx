/**
 * PR 4: Table & TableSortHeader V2 Updates
 *
 * Tests:
 * - TableSortHeader with chevron-expand icon (unsorted state)
 * - TableSortHeader with arrow-up/arrow-down (sorted states)
 * - Built-in single and multi-column sorting
 * - sortOrder numbers for multi-column sort priority
 * - V2 focus ring on icon only (not whole button)
 */

import { useEffect, useMemo, useState } from "react";
import { GoabBlock, GoabDivider, GoabDetails } from "@abgov/react-components";
// ?url suffix tells Vite to resolve the path without injecting the CSS
import v2TokensUrl from "@abgov/design-tokens-v2/dist/tokens.css?url";
import { GoabxTable, GoabxTableSortHeader } from "@abgov/react-components/experimental";
import type { GoabTableSortEntry } from "@abgov/ui-components-common";

type RowData = { id: number; name: string; department: string; salary: number };

const initialData: RowData[] = [
  { id: 1, name: "Alice Johnson", department: "Engineering", salary: 95000 },
  { id: 2, name: "Bob Smith", department: "Marketing", salary: 72000 },
  { id: 3, name: "Carol Williams", department: "Engineering", salary: 105000 },
  { id: 4, name: "David Brown", department: "Sales", salary: 68000 },
  { id: 5, name: "Eve Davis", department: "Marketing", salary: 78000 },
];

function sortData(data: RowData[], sorts: GoabTableSortEntry[]): RowData[] {
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

export function Feat3344Route() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = v2TokensUrl;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [currentSorts, setCurrentSorts] = useState<GoabTableSortEntry[]>([]);
  const [multiSorts, setMultiSorts] = useState<GoabTableSortEntry[]>([]);
  const [test3Sorts, setTest3Sorts] = useState<GoabTableSortEntry[]>([]);

  const singleSorted = useMemo(() => sortData(initialData, currentSorts), [currentSorts]);
  const multiSorted = useMemo(() => sortData(initialData, multiSorts), [multiSorts]);
  const test3Sorted = useMemo(() => sortData(initialData, test3Sorts), [test3Sorts]);

  const formatSorts = (sorts: GoabTableSortEntry[]): string => {
    if (sorts.length === 0) return "None";
    return sorts.map((s, i) => `${i + 1}. ${s.column} (${s.direction})`).join(", ");
  };

  return (
    <div>
      <h1>PR 4: Table & TableSortHeader V2</h1>

      <GoabBlock>
        <GoabDetails heading="Changes in this PR">
          <p>
            <strong>TableSortHeader:</strong>
            <br />
            - Always-visible sort icon (chevron-expand when unsorted)
            <br />
            - Arrow-up/arrow-down for sorted states
            <br />
            - sortOrder prop shows "1", "2" for multi-column sort
            <br />
            <br />
            <strong>Table:</strong>
            <br />
            - sortMode="single" (default) or "multi" (up to 2 columns)
            <br />
            - Initial sort declared on headers via direction + sortOrder
            <br />- onSort callback with sortBy, sortDir, and sorts array
          </p>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <h2>Test 1: Single-Column Sort (Default)</h2>
      <p>
        Click column headers to sort. Only one column sorts at a time (default behavior).
      </p>
      <p>
        <small>Current sort: {formatSorts(currentSorts)}</small>
      </p>

      <GoabxTable
        mt="m"
        onSort={(detail) =>
          setCurrentSorts([
            { column: detail.sortBy, direction: detail.sortDir === 1 ? "asc" : "desc" },
          ])
        }
      >
        <thead>
          <tr>
            <th>
              <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
            </th>
            <th>
              <GoabxTableSortHeader name="department">Department</GoabxTableSortHeader>
            </th>
            <th className="goa-table-cell--numeric">
              <GoabxTableSortHeader name="salary">Salary</GoabxTableSortHeader>
            </th>
          </tr>
        </thead>
        <tbody>
          {singleSorted.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.department}</td>
              <td className="goa-table-cell--numeric">${row.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </GoabxTable>

      <GoabDivider mt="l" mb="l" />

      <h2>Test 2: Multi-Column Sort</h2>
      <p>With sortMode="multi", click columns to add them to sort order (up to 2).</p>
      <p>
        <small>Current sort: {formatSorts(multiSorts)}</small>
      </p>

      <GoabxTable
        mt="m"
        sortMode="multi"
        onMultiSort={(detail) => setMultiSorts(detail.sorts)}
      >
        <thead>
          <tr>
            <th>
              <GoabxTableSortHeader name="name">Name</GoabxTableSortHeader>
            </th>
            <th>
              <GoabxTableSortHeader name="department">Department</GoabxTableSortHeader>
            </th>
            <th className="goa-table-cell--numeric">
              <GoabxTableSortHeader name="salary">Salary</GoabxTableSortHeader>
            </th>
          </tr>
        </thead>
        <tbody>
          {multiSorted.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.department}</td>
              <td className="goa-table-cell--numeric">${row.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </GoabxTable>

      <GoabDivider mt="l" mb="l" />

      <h2>Test 3: Multi Initial Sort (declarative)</h2>
      <p>
        Two initial sorts declared on headers: Department ascending (primary), Salary
        descending (secondary). Use direction + sortOrder on each header to set priority.
      </p>
      <p>
        <small>Current sort: {formatSorts(test3Sorts)}</small>
      </p>

      <GoabxTable
        mt="m"
        sortMode="multi"
        onMultiSort={(detail) => setTest3Sorts(detail.sorts)}
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
            <th className="goa-table-cell--numeric">
              <GoabxTableSortHeader name="salary" direction="desc" sortOrder={2}>
                Salary
              </GoabxTableSortHeader>
            </th>
          </tr>
        </thead>
        <tbody>
          {test3Sorted.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.department}</td>
              <td className="goa-table-cell--numeric">${row.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </GoabxTable>
    </div>
  );
}

export default Feat3344Route;
