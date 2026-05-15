import { useState } from "react";
import {
  GoabTable,
  GoabTableSortHeader,
  GoabBlock,
  GoabText,
  GoabButton,
} from "@abgov/react-components";
import { GoabTableOnSortDetail } from "@abgov/ui-components-common";

export const Bug2821Route = () => {
  const [sortLog, setSortLog] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [sortedData, setSortedData] = useState([
    { id: 1, name: "Alice Johnson", age: 28, department: "Engineering" },
    { id: 2, name: "Bob Smith", age: 32, department: "Marketing" },
    { id: 3, name: "Carol Davis", age: 25, department: "Sales" },
    { id: 4, name: "David Wilson", age: 35, department: "Engineering" },
    { id: 5, name: "Eva Brown", age: 29, department: "HR" },
  ]);

  // Original data for resetting
  const originalData = [
    { id: 1, name: "Alice Johnson", age: 28, department: "Engineering" },
    { id: 2, name: "Bob Smith", age: 32, department: "Marketing" },
    { id: 3, name: "Carol Davis", age: 25, department: "Sales" },
    { id: 4, name: "David Wilson", age: 35, department: "Engineering" },
    { id: 5, name: "Eva Brown", age: 29, department: "HR" },
  ];

  const handleSort = (detail: GoabTableOnSortDetail) => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    const sortDirection = detail.sortDir === 1 ? "ascending" : "descending";
    const logEntry = `Click ${newClickCount}: Sort by "${detail.sortBy}" - ${sortDirection}`;

    setSortLog((prev) => [...prev, logEntry]);
    console.log("Sort event:", detail);

    // Sort the data based on the sort event
    const sorted = [...originalData].sort((a, b) => {
      let aValue: any = a[detail.sortBy as keyof typeof a];
      let bValue: any = b[detail.sortBy as keyof typeof b];

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Handle number comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return detail.sortDir === 1 ? aValue - bValue : bValue - aValue;
      }

      // Handle string comparison
      if (aValue < bValue) {
        return detail.sortDir === 1 ? -1 : 1;
      }
      if (aValue > bValue) {
        return detail.sortDir === 1 ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
  };

  const resetTest = () => {
    setSortLog([]);
    setClickCount(0);
    setSortedData(originalData);
  };

  return (
    <main>
      <GoabText tag="h1">Bug 2821: Table Header Sorting Issue</GoabText>
      <GoabText tag="p">
        Testing the table sorting bug where the first two clicks stay ascending before
        toggling to descending.
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <section>
          <GoabText tag="h2">Test Instructions</GoabText>
          <GoabText tag="p">
            Click on any column header multiple times to test the sorting behavior:
          </GoabText>
          <ol>
            <li>Click on "Name" header - should show ascending (first click)</li>
            <li>Click on "Name" header again - should show descending (second click)</li>
            <li>Click on "Name" header again - should show ascending (third click)</li>
            <li>
              <strong>Bug:</strong> Currently the first two clicks both show ascending
            </li>
          </ol>
        </section>

        <section>
          <GoabText tag="h2">Test Table</GoabText>
          <GoabTable onSort={handleSort}>
            <thead>
              <tr>
                <th>
                  <GoabTableSortHeader name="id">ID</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="name">Name</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="age">Age</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="department">Department</GoabTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                  <td>{row.department}</td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </section>

        <section>
          <GoabText tag="h2">Sort Event Log</GoabText>
          <GoabBlock gap="s" direction="row">
            <GoabButton type="secondary" size="compact" onClick={resetTest}>
              Reset Test
            </GoabButton>
            <GoabText tag="span">Click Count: {clickCount}</GoabText>
          </GoabBlock>

          {sortLog.length > 0 ? (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {sortLog.map((log, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "0.5rem", fontFamily: "monospace" }}
                >
                  {log}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontStyle: "italic", color: "#666" }}>
              <GoabText tag="p">
                No sort events yet. Click on a column header to start testing.
              </GoabText>
            </div>
          )}
        </section>

        <section>
          <GoabText tag="h3">Expected Behavior:</GoabText>
          <ul>
            <li>Click 1: ascending (↑)</li>
            <li>Click 2: descending (↓)</li>
            <li>Click 3: ascending (↑)</li>
            <li>Click 4: descending (↓)</li>
            <li>And so on...</li>
          </ul>
        </section>
      </GoabBlock>
    </main>
  );
};
