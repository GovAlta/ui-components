import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
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
  GoabTable,
  GoabTableSortHeader,
} from "../src";

describe("DataGrid", () => {
  type User = {
    idNumber: string;
    nameOfChild?: string;
    dataStarted: string;
    dateSubmitted: string;
    status: string;
    updated?: string;
    email?: string;
    program?: string;
    programId?: string;
    serviceAccess?: string;
    approver?: string;
  };

  const testUsers: User[] = [
    {
      idNumber: "1",
      dataStarted: "Feb 21, 2023",
      dateSubmitted: "Feb 25, 2023",
      status: "Removed",
    },
    {
      idNumber: "2",
      dataStarted: "Feb 21, 2023",
      dateSubmitted: "Feb 25, 2023",
      status: "To be removed",
    },
  ];

  const testUsersWithContainer: User[] = [
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
      default:
        return "information";
    }
  };

  const TestDataGrid = ({ onOpen = vi.fn(), initialUsers = testUsers }: { onOpen?: (userId: string) => void, initialUsers?: User[] }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    const handleDelete = (userId: string) => {
      // Actually remove the user from the array to test DOM changes
      const updatedUsers = users.filter(user => user.idNumber !== userId);
      setUsers(updatedUsers);
    };

    const handleSort = (event: any) => {
      const { sortBy, sortDir } = event;
      const sortedUsers = [...users].sort((a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir);
      setUsers(sortedUsers);
    };

    const isSelected = (userId: string): boolean => {
      return selectedUsers.includes(userId);
    };

    const toggleSelection = (userId: string) => {
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    };

    return (
      <div>
        <GoabDataGrid testId="data-grid" keyboardNav="table">
          <GoabTable width="100%" mb="xl" onSort={handleSort}>
            <thead>
              <tr data-grid="row">
                <th style={{ paddingBottom: 0 }} data-grid="cell">
                  <GoabCheckbox testId="selectAll" name="selectAll" mt="2" checked={isSelectedAll} />
                </th>
                <th data-grid="cell">
                  <GoabTableSortHeader name="idNumber">ID Number</GoabTableSortHeader>
                </th>
                <th data-grid="cell">
                  <GoabTableSortHeader name="dataStarted">Date Started</GoabTableSortHeader>
                </th>
                <th data-grid="cell">
                  <GoabTableSortHeader name="dateSubmitted">Date Submitted</GoabTableSortHeader>
                </th>
                <th data-grid="cell">
                  <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
                </th>
                <th data-grid="cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.idNumber} data-grid="row" data-testid={`row-${user.idNumber}`}>
                  <td data-grid="cell">
                    <GoabCheckbox
                      name={`user${user.idNumber}`}
                      testId={`checkbox-${user.idNumber}`}
                      checked={isSelected(user.idNumber)}
                      onChange={() => toggleSelection(user.idNumber)}
                    />
                  </td>
                  <td data-grid="cell" data-testid={`cell-${user.idNumber}-idNumber`}>{user.idNumber}</td>
                  <td data-grid="cell" data-testid={`cell-${user.idNumber}-dateStarted`}>{user.dataStarted}</td>
                  <td data-grid="cell" data-testid={`cell-${user.idNumber}-dateSubmitted`}>{user.dateSubmitted}</td>
                  <td data-grid="cell" data-testid={`cell-${user.idNumber}-status`}>
                    <GoabBadge type={getStatusBadgeType(user.status)} content={user.status} />
                  </td>
                  <td data-grid="cell">
                    <GoabButton
                      type="tertiary"
                      onClick={() => handleDelete(user.idNumber)}
                      testId={`delete-${user.idNumber}`}
                    >
                      Delete
                    </GoabButton>
                    <GoabButton
                      type="tertiary"
                      onClick={() => onOpen(user.idNumber)}
                      testId={`open-${user.idNumber}`}
                    >
                      Open
                    </GoabButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabDataGrid>
      </div>
    );
  };

  const TestDataGridWithContainer = ({ initialUsers = testUsersWithContainer }: { initialUsers?: User[] }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [openMessage, setOpenMessage] = useState<string>("");

    const isSelected = (userId: string): boolean => {
      return selectedUsers.includes(userId);
    };

    const toggleSelection = (userId: string) => {
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    };

    const onOpen = (userId: string) => {
      setOpenMessage(`Open user ${userId}`);
    };

    const onApproverChange = (userId: string, event: any) => {
      const user = users.find((u) => u.idNumber === userId);
      if (user) {
        user.approver = event.value;
        setUsers([...users]);
      }
    };

    return (
      <div>
        {openMessage && <div data-testid="open-user">{openMessage}</div>}
        <GoabDataGrid keyboardNav="layout">
          {users.map((user) => (
            <GoabContainer key={user.idNumber} mt="l" data-grid="row">
              <GoabBlock direction="row" gap="m" alignment="start">
                <GoabCheckbox
                  name={"container-"+user.idNumber}
                  data-grid="cell-0"
                  checked={isSelected(user.idNumber)}
                  onChange={() => toggleSelection(user.idNumber)}
                />

                <GoabBlock direction="column" gap="s" alignment="start">
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
                        <div data-testid={`approver-${user.idNumber}`}>{user.approver}</div>
                        <GoabDropdown
                          testId={`approver-dropdown-${user.idNumber}`}
                          value={user.approver}
                          onChange={(event) => onApproverChange(user.idNumber, event)}
                        >
                          <GoabDropdownItem value="Sarah Ellis"></GoabDropdownItem>
                          <GoabDropdownItem value="John Doe" label={"John Doe"}></GoabDropdownItem>
                          <GoabDropdownItem value="Jane Smith"></GoabDropdownItem>
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
      </div>
    );
  };

  describe("Keyboard Navigation", () => {
    it("Using with Table - should navigate with arrow keys and show yellow border on focused cells", async () => {
      const result = render(<TestDataGrid />);

      // Wait for components to fully render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Wait for initial grid setup
      // 6 header cells + 6 cells per row * 2 rows = 18 total
      await vi.waitFor(() => {
        const allGridCells = result.container.querySelectorAll('[role="gridcell"]');
        expect(allGridCells.length).toBe(18);
      });

      // Focus on the first gridcell in header row (select all checkbox)
      const selectAllCheckbox = result.container.querySelector('thead [role="gridcell"]') as HTMLElement;
      expect(selectAllCheckbox).toBeTruthy();
      await userEvent.click(selectAllCheckbox);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press key "Arrow Right"
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Arrow Down
      await userEvent.keyboard("{ArrowDown}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify td data-testid="cell-1-idNumber" has style outline:3px solid var(--goa-color-interactive-focus)
      const cell1IdNumber = result.container.querySelector('[data-testid="cell-1-idNumber"]') as HTMLElement;
      expect(cell1IdNumber).toBeTruthy();
      expect(cell1IdNumber.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Press Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify td data-testid="cell-1-dateStarted" has style outline:3px solid var(--goa-color-interactive-focus)
      const cell1DateStarted = result.container.querySelector('[data-testid="cell-1-dateStarted"]') as HTMLElement;
      expect(cell1DateStarted?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // verify td data-testid="cell-1-idNumber" has no more style defined on line 129 (no focus)
      expect(cell1IdNumber?.style.outline).toBe('');

      // Press Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify td data-testid="cell-1-dateSubmitted" has inline style outline 3px...
      const cell1DateSubmitted = result.container.querySelector('[data-testid="cell-1-dateSubmitted"]') as HTMLElement;
      expect(cell1DateSubmitted?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Press Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify td data-testid="cell-1-status" has inline style outline
      const cell1Status = result.container.querySelector('[data-testid="cell-1-status"]') as HTMLElement;
      expect(cell1Status?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Press Arrow Right to move to Actions column (last cell with buttons)
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if it's the Delete button by text content
      expect(document.activeElement?.tagName).toBe('GOA-BUTTON');
      expect(document.activeElement?.textContent?.trim()).toContain('Delete');

      // Press Arrow Right to move to Open button (second button in same cell)
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify Open button is focused
      expect(document.activeElement?.tagName).toBe('GOA-BUTTON');
      expect(document.activeElement?.textContent?.trim()).toContain('Open');

      // Test table mode boundary - Arrow Right at last cell should stay in same position
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should still be on Open button (last focusable element in row)
      expect(document.activeElement?.tagName).toBe('GOA-BUTTON');
      expect(document.activeElement?.textContent?.trim()).toContain('Open');

      // Press Arrow Left multiple times to go back to first cell
      await userEvent.keyboard("{ArrowLeft}"); // Back to Delete button
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowLeft}"); // Back to Status cell
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowLeft}"); // Back to Date Submitted
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowLeft}"); // Back to Date Started
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowLeft}"); // Back to ID Number
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowLeft}"); // Back to checkbox (first cell)
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify we're now on the checkbox (first cell)
      // The checkbox is a goa-checkbox web component
      expect(document.activeElement?.tagName).toBe('GOA-CHECKBOX');

      // Test table mode boundary - Arrow Left at first cell should stay in same position
      await userEvent.keyboard("{ArrowLeft}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should still be on checkbox or first cell
      expect(document.activeElement?.tagName).toBe('GOA-CHECKBOX');

      // Verify Grid listens to Slotted content changes
      // Test sorting - Press arrow up to go back to header
      await userEvent.keyboard("{ArrowUp}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Enter to sort by Status column
      await userEvent.keyboard("{Enter}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Enter again to sort in reverse order
      await userEvent.keyboard("{Enter}");
      await new Promise(resolve => setTimeout(resolve, 200)); // Give time for sort and DOM update

      // Arrow Down to go to first data row
      await userEvent.keyboard("{ArrowDown}");
      await new Promise(resolve => setTimeout(resolve, 200));

      // After sorting, focus should be on the first cell of first row (checkbox)
      expect(document.activeElement?.tagName).toBe('GOA-CHECKBOX');

      // Navigate to the status column to verify sorting worked
      // Press Arrow Right 4 times to get to status column (checkbox -> id -> dateStarted -> dateSubmitted -> status)
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Now we should be on a status cell - verify one is focused
      const statusCells = result.container.querySelectorAll('td[data-testid*="-status"]');
      let focusedStatusCell: HTMLElement | null = null;

      statusCells.forEach(cell => {
        const htmlCell = cell as HTMLElement;
        if (htmlCell.style.outline?.includes('3px solid')) {
          focusedStatusCell = htmlCell;
        }
      });

      expect(focusedStatusCell).toBeTruthy();
      expect(focusedStatusCell?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Press arrow right to move to Actions column
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Enter to delete the current row
      const rowCountBefore = result.container.querySelectorAll('tbody tr').length;
      await userEvent.keyboard("{Enter}");
      await new Promise(resolve => setTimeout(resolve, 200)); // Give time for deletion and DOM update

      // Verify one row is removed from DOM
      const rowCountAfter = result.container.querySelectorAll('tbody tr').length;
      expect(rowCountAfter).toBe(rowCountBefore - 1);

      // Press Arrow Left to go back to status column
      await userEvent.keyboard("{ArrowLeft}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify a status cell is still highlighted after deletion
      const remainingStatusCell = result.container.querySelector('td[data-testid*="-status"]') as HTMLElement;
      expect(remainingStatusCell).toBeTruthy();
      expect(remainingStatusCell?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');
    });

    it("Using with Container - should navigate with arrow keys", async() => {
      // TestDataGridWithContainer render
      const result = render(<TestDataGridWithContainer />);

      // Wait for components to fully render
      await new Promise(resolve => setTimeout(resolve, 500));
      // Click on <strong data-grid="cell-1"
      const cell1 = result.container.querySelector('[data-grid="cell-1"]') as HTMLElement;
      await userEvent.click(cell1);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify that it is highlighted style: outline: 3px...
      expect(cell1?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');
      // Press Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify goa-block data-grid="cell-2" highlighted
      const cell2 = result.container.querySelector('[data-grid="cell-2"]') as HTMLElement;
      expect(cell2?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // verify that data-grid="cell-1" no more highlighted
      expect(cell1?.style.outline).toBe('');
      // Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Enter
      await userEvent.keyboard("{Enter}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // We will have a <div data-testid="open-user">{{message}}</div> which will update message when we press Open button => "Open user 1" for example
      // Verify the message to test if Open is triggered
      const openMessage = result.container.querySelector('[data-testid="open-user"]') as HTMLElement;
      expect(openMessage?.textContent).toBe("Open user 1");
      // Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify data-grid="cell-4" highlighted
      const cell4 = result.container.querySelector('[data-grid="cell-4"]') as HTMLElement;
      expect(cell4?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify data-grid="cell-5" highlighted
      const cell5 = result.container.querySelector('[data-grid="cell-5"]') as HTMLElement;
      expect(cell5?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify data-grid="cell-6" highlighted
      const cell6 = result.container.querySelector('[data-grid="cell-6"]') as HTMLElement;
      expect(cell6?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify data-grid="cell-7" highlighted
      const cell7 = result.container.querySelector('[data-grid="cell-7"]') as HTMLElement;
      expect(cell7?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');

      // Arrow Right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify data-grid="cell-8" highlighted
      const cell8 = result.container.querySelector('[data-grid="cell-8"]') as HTMLElement;
      expect(cell8?.style.outline).toContain('3px solid var(--goa-color-interactive-focus)');
      // Arrow right
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Enter
      await userEvent.keyboard("{Enter}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Arrow Down
      await userEvent.keyboard("{ArrowDown}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Press Enter
      await userEvent.keyboard("{Enter}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify div data-testid="approver-1" has text content = John Doe
      const approver1 = result.container.querySelector('[data-testid="approver-1"]') as HTMLElement;
      expect(approver1?.textContent).toBe("John Doe");
    })

    it("Using with Container (Layout mode) - arrow right from last cell wraps to next row", async () => {
      // TestDataGridWithContainer render with layout mode
      const result = render(<TestDataGridWithContainer />);

      // Wait for components to fully render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to the approver cell (cell-9) of the first row by starting from the checkbox
      // Click on the first checkbox to establish initial focus
      const firstRowCheckbox = result.container.querySelectorAll('[data-grid="cell-0"]')[0] as HTMLElement;
      await userEvent.click(firstRowCheckbox);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Navigate right through all cells to reach cell-9 (approver)
      // From cell-0 to cell-1
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-1 to cell-2
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-2 to cell-3
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-3 to cell-4
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-4 to cell-5
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-5 to cell-6
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-6 to cell-7
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-7 to cell-8
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // From cell-8 to cell-9 (approver)
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if the dropdown inside cell-9 is focused (it contains focusable elements)
      const activeElement = document.activeElement;

      // The dropdown should be focused since cell-9 contains a focusable dropdown
      expect(activeElement?.tagName).toBe('GOA-DROPDOWN');

      // Press Arrow Right - in layout mode, this should wrap to the next row's first cell (checkbox)
      await userEvent.keyboard("{ArrowRight}");
      await new Promise(resolve => setTimeout(resolve, 300));

      // Check that a checkbox is now focused (should be the second row's checkbox)
      const newActiveElement = document.activeElement;
      expect(newActiveElement?.tagName).toBe('GOA-CHECKBOX');
    });
  });

});
