import { useState } from "react";
import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabContainer,
  GoabDataGrid,
  GoabDropdown,
  GoabDropdownItem,
  GoabLink,
  GoabTable,
  GoabTableSortHeader,
} from "@abgov/react-components";

type User = {
  idNumber: string;
  nameOfChild: string;
  dataStarted: string;
  dateSubmitted: string;
  status: string;
  updated: string;
  email: string;
  program: string;
  programId: string;
  serviceAccess: string;
  approver: string;
};

const initialUsers: User[] = [
  {
    idNumber: "1",
    nameOfChild: "Mike Zwei",
    dataStarted: "Feb 21, 2023",
    dateSubmitted: "Feb 25, 2023",
    status: "Removed",
    updated: "Jun 30, 2022 at 2:30 PM",
    email: "mike.zwei@gmail.com",
    program: "Wee Wild Ones Curry",
    programId: "74528567",
    serviceAccess: "Claims Adjustments",
    approver: "Sarah Ellis",
  },
  {
    idNumber: "2",
    nameOfChild: "Emma Stroman",
    dataStarted: "Feb 21, 2023",
    dateSubmitted: "Feb 25, 2023",
    status: "To be removed",
    updated: "Nov 28, 2021 at 1:30 PM",
    email: "emma.stroman@gmail.com",
    program: "Fort McMurray",
    programId: "74522643",
    serviceAccess: "Claims Adjustments",
    approver: "Sarah Ellis",
  },
];

const getStatusBadgeType = (status: string): "success" | "emergency" | "information" | "important" => {
  switch (status) {
    case "Removed":
      return "success";
    case "To be removed":
      return "emergency";
    case "Submitted":
      return "information";
    case "In review":
      return "information";
    case "Awaiting documentation":
      return "important";
    case "Denied":
      return "emergency";
    case "Approved":
      return "success";
    case "Closed":
      return "information";
    default:
      return "information";
  }
};

export function Feat2609Route() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [nextUserId, setNextUserId] = useState(3);

  const isSelected = (userId: string): boolean => {
    return selectedUsers.includes(userId);
  };

  const toggleSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const selectAll = (checked: boolean) => {
    setIsSelectedAll(checked);
    if (checked) {
      setSelectedUsers(users.map((u) => u.idNumber));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSort = (event: { sortBy: string; sortDir: number }) => {
    const { sortBy, sortDir } = event;
    const sortedUsers = [...users].sort((a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir);
    setUsers(sortedUsers);
  };

  const onOpen = (userId: string) => {
    alert("We are going to open a profile of this user " + userId);
  };

  const onApproverChange = (userId: string, value: string) => {
    setUsers(users.map((u) => (u.idNumber === userId ? { ...u, approver: value } : u)));
  };

  const addNewRows = () => {
    const newUsers: User[] = [];
    let currentId = nextUserId;
    for (let i = 0; i < 3; i++) {
      newUsers.push({
        idNumber: String(currentId),
        nameOfChild: `New User ${currentId}`,
        dataStarted: "Dec 1, 2023",
        dateSubmitted: "Dec 5, 2023",
        status: "Submitted",
        updated: "Dec 5, 2023 at 10:00 AM",
        email: `user${currentId}@example.com`,
        program: "Test Program",
        programId: `9999${currentId}`,
        serviceAccess: "Full Access",
        approver: "Sarah Ellis",
      });
      currentId++;
    }
    setNextUserId(currentId);
    setUsers([...users, ...newUsers]);
  };

  const removeLastRows = () => {
    if (users.length > 2) {
      setUsers(users.slice(0, -3));
    }
  };

  return (
    <main>
      <h2>Feature #2609: Data Grid Component</h2>
      <p>
        This feature adds a keyboard-navigable grid wrapper component that provides ARIA-compliant accessibility for
        tables and grid layouts.
      </p>

      <h3>Table with Dynamic Row Addition (Testing Dropdown Focus Issue)</h3>

      <div style={{ marginBottom: "1rem" }}>
        <GoabButton type="primary" onClick={addNewRows} mr="m">
          Add 3 New Rows (Simulate Pagination)
        </GoabButton>
        <GoabButton type="secondary" onClick={removeLastRows}>
          Remove Last 3 Rows
        </GoabButton>
        <span style={{ marginLeft: "1rem" }}>Total rows: {users.length}</span>
      </div>

      <p style={{ color: "#FF6B6B", marginBottom: "1rem" }}>
        <strong>Test Instructions:</strong>
        1. Navigate to a cell with a dropdown (Approver column) using arrow keys.
        2. Click "Add 3 New Rows" button.
        3. Navigate to a cell with a dropdown again.
        4. Try to navigate away with arrow keys - it should take only 1 press, not 3.
      </p>

      <GoabDataGrid keyboardNav="table">
        <GoabTable width="100%" mb="xl" onSort={handleSort}>
          <thead>
            <tr data-grid="row">
              <th style={{ paddingBottom: 0 }} data-grid="cell">
                <GoabCheckbox
                  name="selectAll"
                  mt="2"
                  checked={isSelectedAll}
                  onChange={(e) => selectAll(e.checked)}
                />
              </th>
              <th data-grid="cell-1">
                <GoabTableSortHeader name="idNumber">ID</GoabTableSortHeader>
              </th>
              <th data-grid="cell-2">
                <GoabTableSortHeader name="nameOfChild">Name</GoabTableSortHeader>
              </th>
              <th data-grid="cell-3">
                <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
              </th>
              <th data-grid="cell-4">Approver (Dropdown)</th>
              <th data-grid="cell-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.idNumber} data-grid="row">
                <td data-grid="cell">
                  <GoabCheckbox
                    name={`user${user.idNumber}`}
                    checked={isSelected(user.idNumber)}
                    onChange={() => toggleSelection(user.idNumber)}
                  />
                </td>
                <td data-grid="cell-1">{user.idNumber}</td>
                <td data-grid="cell-2">{user.nameOfChild}</td>
                <td data-grid="cell-3">
                  <GoabBadge type={getStatusBadgeType(user.status)} content={user.status} />
                </td>
                <td data-grid="cell-4">
                  <GoabDropdown value={user.approver} onChange={(e) => onApproverChange(user.idNumber, e.value ?? "")}>
                    <GoabDropdownItem value="Sarah Ellis" label="Sarah Ellis" />
                    <GoabDropdownItem value="John Doe" label="John Doe" />
                    <GoabDropdownItem value="Jane Smith" label="Jane Smith" />
                  </GoabDropdown>
                </td>
                <td data-grid="cell-5">
                  <GoabButton type="tertiary" onClick={() => onOpen(user.idNumber)}>
                    Open
                  </GoabButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabTable>
      </GoabDataGrid>

      <h3>Containers (Layout Mode)</h3>
      <p>Layout mode allows arrow keys to wrap between rows when reaching the edge.</p>
      <GoabDataGrid keyboardNav="layout">
        {users.map((user) => (
          <GoabContainer key={user.idNumber} mt="l" data-grid="row">
            <GoabBlock direction="row" gap="m" alignment="start">
              <GoabCheckbox
                data-grid="cell-0"
                name={`container-user${user.idNumber}`}
                checked={isSelected(user.idNumber)}
                onChange={() => toggleSelection(user.idNumber)}
              />

              <GoabBlock direction="column" gap="s" alignment="start" style={{ flex: 1 }}>
                <GoabBlock direction="row" gap="s" alignment="center">
                  <strong data-grid="cell-1">{user.nameOfChild}</strong>
                  <GoabBlock data-grid="cell-2">
                    <GoabBadge type={getStatusBadgeType(user.status)} content={user.status} />
                  </GoabBlock>
                </GoabBlock>

                <GoabBlock direction="row" gap="xl" alignment="start">
                  <GoabBlock direction="column" gap="s" alignment="start">
                    <GoabBlock direction="column" gap="xs" data-grid="cell-4">
                      <strong>Updated</strong>
                      <span>{user.updated}</span>
                    </GoabBlock>
                    <GoabBlock direction="column" gap="xs" data-grid="cell-7">
                      <strong>Program ID</strong>
                      <span>{user.programId}</span>
                    </GoabBlock>
                  </GoabBlock>

                  <GoabBlock direction="column" gap="s" alignment="start">
                    <GoabBlock direction="column" gap="xs" data-grid="cell-5">
                      <strong>Email</strong>
                      <span>{user.email}</span>
                    </GoabBlock>
                    <GoabBlock direction="column" gap="xs" data-grid="cell-8">
                      <strong>Service access</strong>
                      <span>{user.serviceAccess}</span>
                    </GoabBlock>
                  </GoabBlock>

                  <GoabBlock direction="column" gap="s" alignment="start">
                    <GoabBlock direction="column" gap="xs" data-grid="cell-6">
                      <strong>Program</strong>
                      <span>{user.program}</span>
                    </GoabBlock>
                    <GoabBlock direction="column" gap="xs" data-grid="cell-9">
                      <strong>Approver</strong>
                      <GoabDropdown
                        value={user.approver}
                        onChange={(e) => onApproverChange(user.idNumber, e.value ?? "")}
                      >
                        <GoabDropdownItem value="Sarah Ellis" label="Sarah Ellis" />
                        <GoabDropdownItem value="John Doe" label="John Doe" />
                        <GoabDropdownItem value="Jane Smith" label="Jane Smith" />
                      </GoabDropdown>
                    </GoabBlock>
                  </GoabBlock>
                </GoabBlock>
              </GoabBlock>

              <GoabButton type="tertiary" data-grid="cell-3" onClick={() => onOpen(user.idNumber)}>
                Open
              </GoabButton>
            </GoabBlock>
          </GoabContainer>
        ))}
      </GoabDataGrid>

      <h3>Table with Colspan and Different Column Counts</h3>
      <p>
        This table tests navigation with varying column counts and colspan attributes. Use arrow keys to navigate and
        observe focus behavior.
      </p>
      <GoabDataGrid keyboardNav="table">
        <GoabTable width="100%" mb="xl">
          <thead>
            <tr data-grid="row">
              <th data-grid="cell">Column 1</th>
              <th data-grid="cell-1">Column 2</th>
              <th data-grid="cell-2">Column 3</th>
              <th data-grid="cell-3">Column 4</th>
              <th data-grid="cell-4">Column 5</th>
            </tr>
          </thead>
          <tbody>
            <tr data-grid="row">
              <td data-grid="cell">Row 1, Cell 1</td>
              <td data-grid="cell-1">Row 1, Cell 2</td>
              <td data-grid="cell-2">Row 1, Cell 3</td>
              <td data-grid="cell-3">Row 1, Cell 4</td>
              <td data-grid="cell-4">Row 1, Cell 5</td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell">Row 2, Cell 1</td>
              <td data-grid="cell-1" colSpan={2}>
                Row 2, Cell 2 (spans 2 cols)
              </td>
              <td data-grid="cell-2" colSpan={2}>
                Row 2, Cell 3 (spans 2 cols)
              </td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell" colSpan={3}>
                Row 3, Cell 1 (spans 3 cols)
              </td>
              <td data-grid="cell-1" colSpan={2}>
                Row 3, Cell 2 (spans 2 cols)
              </td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell">Row 4, Cell 1</td>
              <td data-grid="cell-1">Row 4, Cell 2</td>
              <td data-grid="cell-2">Row 4, Cell 3</td>
              <td data-grid="cell-3">Row 4, Cell 4</td>
              <td data-grid="cell-4">Row 4, Cell 5</td>
            </tr>
            <tr data-grid="row">
              <td data-grid="cell" colSpan={5}>
                Row 5, Single Cell (spans all 5 cols)
              </td>
            </tr>
          </tbody>
        </GoabTable>
      </GoabDataGrid>

      <h3>Related Documents (Links with Hidden Keyboard Icon)</h3>
      <GoabDataGrid keyboardNav="layout" keyboardIcon={false}>
        <GoabBlock data-grid="row">
          <GoabLink data-grid="cell">
            <a href="https://www.w3.org/TR/wai-aria-1.1/">ARIA 1.1 Specification</a>
          </GoabLink>
          <GoabLink data-grid="cell-1">
            <a href="https://www.w3.org/TR/core-aam-1.1/">Core Accessibility API Mappings 1.1</a>
          </GoabLink>
          <GoabLink data-grid="cell-2">
            <a href="https://www.w3.org/WAI/intro/aria.php">WAI-ARIA Overview</a>
          </GoabLink>
          <GoabLink data-grid="cell-3">
            <a href="https://www.w3.org/WAI/intro/wcag">WCAG Overview</a>
          </GoabLink>
        </GoabBlock>
      </GoabDataGrid>
    </main>
  );
}

export default Feat2609Route;
