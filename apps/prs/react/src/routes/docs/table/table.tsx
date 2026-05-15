import { useState, useMemo, useCallback, useEffect } from "react";
import {
  GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabCallout, GoabCheckbox,
  GoabCheckboxList, GoabContainer, GoabDropdown, GoabDropdownItem, GoabFilterChip,
  GoabFormItem, GoabIconButton, GoabInput, GoabLink, GoabPagination, GoabPushDrawer,
  GoabSpacer, GoabTab, GoabTable, GoabTableSortHeader, GoabTabs, GoabText,
} from "@abgov/react-components";
import type {
  GoabBadgeType, GoabDropdownOnChangeDetail, GoabInputOnChangeDetail,
  GoabInputOnKeyPressDetail, GoabTableOnSortDetail, GoabTableOnMultiSortDetail,
} from "@abgov/ui-components-common";

interface Person {
  name: string;
  status: string;
  date: string;
}

const initialData: Person[] = [
  { name: "Alice Johnson", status: "Active", date: "2024-01-15" },
  { name: "Charlie Brown", status: "Pending", date: "2024-03-20" },
  { name: "Bob Smith", status: "Active", date: "2024-02-10" },
  { name: "Emma Wilson", status: "Inactive", date: "2023-12-01" },
  { name: "David Lee", status: "Pending", date: "2024-01-30" },
];

export function DocsTableRoute() {
  const [sortData, setSortData] = useState<Person[]>(initialData);
  const [multiSortData, setMultiSortData] = useState<Person[]>(initialData);
  const [filterOpen, setFilterOpen] = useState(false);

  // Pagination
  interface User { id: string; firstName: string; lastName: string; age: number; }
  const [users, setUsers] = useState<User[]>([]);
  const [pageUsers, setPageUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const firstNames = ["Emma","Liam","Olivia","Noah","Ava","James","Sophia","William","Isabella","Oliver","Mia","Benjamin","Charlotte","Elijah","Amelia","Lucas","Harper","Mason","Evelyn","Logan"];
    const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Wilson","Anderson","Taylor","Thomas","Moore","Jackson","Martin","Lee","Thompson","White"];
    const _users: User[] = [];
    for (let i = 1; i <= 100; i++) {
      _users.push({
        id: `user-${i}`,
        firstName: firstNames[(i - 1) % firstNames.length],
        lastName: lastNames[(i - 1) % lastNames.length],
        age: 20 + (i % 40),
      });
    }
    setUsers(_users);
    setPageUsers(_users.slice(0, perPage));
  }, [perPage]);

  const changePage = (newPage: number) => {
    const offset = (newPage - 1) * perPage;
    setPage(newPage);
    setPageUsers(users.slice(offset, offset + perPage));
  };

  // Sort data in a table
  const [sortExampleUsers, setSortExampleUsers] = useState([
    { firstName: "Christian", lastName: "Batz", age: 18 },
    { firstName: "Brain", lastName: "Wisozk", age: 19 },
    { firstName: "Neha", lastName: "Jones", age: 23 },
    { firstName: "Tristin", lastName: "Buckridge", age: 31 },
  ]);

  const sortExampleData = (event: GoabTableOnSortDetail) => {
    const sorted = [...sortExampleUsers].sort((a: any, b: any) => {
      return (a[event.sortBy] > b[event.sortBy] ? 1 : -1) * event.sortDir;
    });
    setSortExampleUsers(sorted);
  };

  const handlePerPageChange = (event: GoabDropdownOnChangeDetail) => {
    const val = parseInt(event.value || "10");
    setPage(1);
    setPerPage(val);
    setPageUsers(users.slice(0, val));
  };

  // Filter data in a table
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const errorEmpty = "Empty filter";
  const errorDuplicate = "Enter a unique filter";

  const filterData = useMemo(
    () => [
      { status: { type: "information" as GoabBadgeType, text: "In progress" }, name: "Ivan Schmidt", id: "7838576954" },
      { status: { type: "success" as GoabBadgeType, text: "Completed" }, name: "Luz Lakin", id: "8576953364" },
      { status: { type: "information" as GoabBadgeType, text: "In progress" }, name: "Keith McGlynn", id: "9846041345" },
      { status: { type: "success" as GoabBadgeType, text: "Completed" }, name: "Melody Frami", id: "7385256175" },
      { status: { type: "important" as GoabBadgeType, text: "Updated" }, name: "Frederick Skiles", id: "5807570418" },
      { status: { type: "success" as GoabBadgeType, text: "Completed" }, name: "Dana Pfannerstill", id: "5736306857" },
    ],
    [],
  );

  const [dataFiltered, setDataFiltered] = useState(filterData);

  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    setInputValue(detail.value.trim());
  };

  const handleInputKeyPress = (detail: GoabInputOnKeyPressDetail) => {
    if (detail.key === "Enter") applyFilter();
  };

  const applyFilter = () => {
    if (inputValue === "") { setInputError(errorEmpty); return; }
    if (typedChips.includes(inputValue)) { setInputError(errorDuplicate); return; }
    setTypedChips([...typedChips, inputValue]);
    setTimeout(() => setInputValue(""), 0);
    setInputError("");
  };

  const removeTypedChip = (chip: string) => {
    setTypedChips(typedChips.filter((c) => c !== chip));
    setInputError("");
  };

  const checkNested = useCallback((obj: object, chip: string): boolean => {
    return Object.values(obj).some((value) =>
      typeof value === "object" && value !== null
        ? checkNested(value, chip)
        : typeof value === "string" && value.toLowerCase().includes(chip.toLowerCase()),
    );
  }, []);

  const getFilteredData = useCallback(
    (chips: string[]) => {
      if (chips.length === 0) return filterData;
      return filterData.filter((item: object) => chips.every((chip) => checkNested(item, chip)));
    },
    [checkNested, filterData],
  );

  useEffect(() => {
    setDataFiltered(getFilteredData(typedChips));
  }, [getFilteredData, typedChips]);

  const handleSort = (detail: GoabTableOnSortDetail) => {
    const sorted = [...sortData].sort((a, b) => {
      const key = detail.sortBy as keyof Person;
      return a[key].localeCompare(b[key]) * detail.sortDir;
    });
    setSortData(sorted);
  };

  const handleMultiSort = (detail: GoabTableOnMultiSortDetail) => {
    const sorted = [...multiSortData].sort((a, b) => {
      for (const sort of detail.sorts) {
        const key = sort.column as keyof Person;
        const dir = sort.direction === "asc" ? 1 : -1;
        const cmp = a[key].localeCompare(b[key]);
        if (cmp !== 0) return cmp * dir;
      }
      return 0;
    });
    setMultiSortData(sorted);
  };

  return (
    <div>
      <h2>Table</h2>

      <h3>Basic table</h3>
      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Smith</td>
            <td>Active</td>
            <td>Jan 15, 2024</td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>Pending</td>
            <td>Jan 16, 2024</td>
          </tr>
        </tbody>
      </GoabTable>

      <h3>Striped rows</h3>
      <GoabTable striped>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Widget A</td>
            <td>10</td>
            <td>$25.00</td>
          </tr>
          <tr>
            <td>Widget B</td>
            <td>5</td>
            <td>$15.00</td>
          </tr>
          <tr>
            <td>Widget C</td>
            <td>20</td>
            <td>$10.00</td>
          </tr>
        </tbody>
      </GoabTable>

      <h3>Size</h3>
      <GoabText mt="none" mb="s">Normal</GoabText>
      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>License renewal</td>
            <td>Renew your driver's license online</td>
          </tr>
          <tr>
            <td>Vehicle registration</td>
            <td>Register a new or used vehicle</td>
          </tr>
        </tbody>
      </GoabTable>
      <GoabText mt="l" mb="s">Relaxed</GoabText>
      <GoabTable width="100%" variant="relaxed">
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>License renewal</td>
            <td>Renew your driver's license online</td>
          </tr>
          <tr>
            <td>Vehicle registration</td>
            <td>Register a new or used vehicle</td>
          </tr>
        </tbody>
      </GoabTable>

      <h3>Constrained width</h3>
      <GoabTable width="400px">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>APP-2024-001</td>
            <td>John Smith</td>
            <td>Under review</td>
          </tr>
          <tr>
            <td>APP-2024-002</td>
            <td>Jane Doe</td>
            <td>Approved</td>
          </tr>
        </tbody>
      </GoabTable>

      <h3>Single column sorting</h3>
      <GoabTable onSort={handleSort}>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
            </th>
            <th>
              <GoabTableSortHeader name="date">Date</GoabTableSortHeader>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortData.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.status}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <h3>Multi-column sorting</h3>
      <GoabTable sortMode="multi" onMultiSort={handleMultiSort}>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
            </th>
            <th>
              <GoabTableSortHeader name="date">Date</GoabTableSortHeader>
            </th>
          </tr>
        </thead>
        <tbody>
          {multiSortData.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.status}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <h2>Examples</h2>

      <h3>Display numbers in a table so they can be scanned easily</h3>
      <GoabTable width="100%">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th className="goa-table-number-header">ID Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sarah</td>
            <td>Johnson</td>
            <td className="goa-table-number-column">54</td>
          </tr>
          <tr>
            <td>Michael</td>
            <td>Chen</td>
            <td className="goa-table-number-column">4567</td>
          </tr>
          <tr>
            <td>Emily</td>
            <td>Williams</td>
            <td className="goa-table-number-column">892</td>
          </tr>
          <tr>
            <td>David</td>
            <td>Brown</td>
            <td className="goa-table-number-column">12345</td>
          </tr>
          <tr>
            <td>Jennifer</td>
            <td>Martinez</td>
            <td className="goa-table-number-column">7</td>
          </tr>
        </tbody>
      </GoabTable>

      <h3>Display user information</h3>
      <GoabContainer>
        <GoabText tag="span" size="body-m" color="secondary" mt="none" mb="none">Housing Advisor</GoabText>
        <GoabText size="heading-m" mt="none" mb="s">Tracy Hero</GoabText>
        <GoabBlock direction="row" gap="s">
          <GoabBlock direction="column" gap="m">
            <GoabText tag="span" size="heading-xs" mt="none" mb="none">Email</GoabText>
            <GoabText tag="span" size="heading-xs" mt="none" mb="none">Phone</GoabText>
          </GoabBlock>
          <GoabBlock direction="column" gap="m">
            <GoabText tag="span" size="body-m" mt="none" mb="none">tracyhero@email.com</GoabText>
            <GoabText tag="span" size="body-m" mt="none" mb="none">283-203-4921</GoabText>
          </GoabBlock>
        </GoabBlock>
      </GoabContainer>

      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading="Upcoming important due dates"
        actions={
          <GoabButton
            type="tertiary"
            size="compact"
            leadingIcon="calendar"
            onClick={() => console.log("Add to calendar clicked")}>
            Add to calendar
          </GoabButton>
        }>
        <GoabTable width="100%" striped>
          <tbody>
            <tr>
              <td>Business plan submission</td>
              <td style={{ textAlign: "right" }}>June 30, 2024</td>
            </tr>
            <tr>
              <td>Annual review</td>
              <td style={{ textAlign: "right" }}>October 3, 2024</td>
            </tr>
            <tr>
              <td>Application submission</td>
              <td style={{ textAlign: "right" }}>December 20, 2024</td>
            </tr>
            <tr>
              <td>Application review</td>
              <td style={{ textAlign: "right" }}>January 3, 2025</td>
            </tr>
          </tbody>
        </GoabTable>
      </GoabContainer>

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

      <h3>Filter data in a table</h3>
      <GoabFormItem id="filterChipInput" error={inputError} mb="m">
        <GoabBlock gap="xs" direction="row" alignment="start" width="100%">
          <div style={{ flex: 1 }}>
            <GoabInput
              name="filterChipInput"
              aria-labelledby="filterChipInput"
              value={inputValue}
              leadingIcon="search"
              width="100%"
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </div>
          <GoabButton type="secondary" onClick={() => applyFilter()} leadingIcon="filter">
            Filter
          </GoabButton>
        </GoabBlock>
      </GoabFormItem>

      {typedChips.length > 0 && (
        <div>
          <GoabText tag="span" color="secondary" mb="xs" mr="xs">Filter:</GoabText>
          {typedChips.map((typedChip, index) => (
            <GoabFilterChip
              key={index}
              content={typedChip}
              mb="xs"
              mr="xs"
              onClick={() => removeTypedChip(typedChip)}
            />
          ))}
          <GoabButton type="tertiary" size="compact" mb="xs" onClick={() => setTypedChips([])}>
            Clear all
          </GoabButton>
        </div>
      )}

      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th className="goa-table-number-header">ID Number</th>
          </tr>
        </thead>
        <tbody>
          {dataFiltered.map((item) => (
            <tr key={item.id}>
              <td><GoabBadge type={item.status.type} content={item.status.text} icon={false} /></td>
              <td>{item.name}</td>
              <td className="goa-table-number-column">{item.id}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      {dataFiltered.length === 0 && filterData.length > 0 && (
        <GoabBlock mt="l" mb="l">No results found</GoabBlock>
      )}

      <h3>Review page</h3>
      <GoabText size="heading-l" mt="none" mb="none">Review your answers</GoabText>
      <GoabText size="heading-s" color="secondary" mt="l" mb="none">Your situation</GoabText>
      <GoabTable mt="l">
        <tbody>
          <tr>
            <td><strong>What was your (the applicant's) relationship to the deceased?</strong></td>
            <td>Other</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
          <tr>
            <td><strong>My relationship to the deceased was</strong></td>
            <td>Manager</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
          <tr>
            <td><strong>Was the deceased part of a household that was receiving Assured Income for the Severely Handicapped (AISH) or Income Support?</strong></td>
            <td>No</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
          <tr>
            <td><strong>Was the deceased a minor?</strong></td>
            <td>No</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
          <tr>
            <td><strong>What was the deceased's marital status at time of death?</strong></td>
            <td>Married</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
          <tr>
            <td><strong>Did the deceased have any dependents?</strong></td>
            <td>No</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
          <tr>
            <td><strong>Was the deceased a sponsored immigrant?</strong></td>
            <td>Yes</td>
            <td><GoabLink>Change</GoabLink></td>
          </tr>
        </tbody>
      </GoabTable>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary">Confirm and continue</GoabButton>
        <GoabButton type="tertiary">Back to application overview</GoabButton>
      </GoabButtonGroup>

      <h3>Set a specific tab to be active</h3>
      <GoabTabs initialTab={2}>
        <GoabTab heading="All">
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={`review-${i}`}>
                  <td><GoabBadge type="important" content="Review pending" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
              {[0, 1].map((i) => (
                <tr key={`complete-${i}`}>
                  <td><GoabBadge type="information" content="Complete" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
        <GoabTab heading={<>Review pending <GoabBadge type="important" content="4" icon={false} /></>}>
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={i}>
                  <td><GoabBadge type="important" content="Review pending" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
        <GoabTab heading={<>Complete <GoabBadge type="information" content="338" icon={false} /></>}>
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1].map((i) => (
                <tr key={i}>
                  <td><GoabBadge type="information" content="Complete" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
      </GoabTabs>

      <h3>Show different views of data in a table</h3>
      <GoabTabs initialTab={1}>
        <GoabTab heading="All">
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={`review-${i}`}>
                  <td><GoabBadge type="important" content="Review pending" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
              {[0, 1].map((i) => (
                <tr key={`complete-${i}`}>
                  <td><GoabBadge type="information" content="Complete" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
        <GoabTab heading={<>Review pending <GoabBadge type="important" content="4" icon={false} /></>}>
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={i}>
                  <td><GoabBadge type="important" content="Review pending" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
        <GoabTab heading={<>Complete <GoabBadge type="information" content="338" icon={false} /></>}>
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1].map((i) => (
                <tr key={i}>
                  <td><GoabBadge type="information" content="Complete" /></td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td><GoabButton type="tertiary" size="compact">Action</GoabButton></td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
      </GoabTabs>

      <h3>Show number of results per page</h3>
      <GoabTable width="100%" mb="xl">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.age}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <GoabBlock alignment="center" width="100%">
        <GoabBlock mb="m" alignment="center">
          Show
          <GoabDropdown
            onChange={handlePerPageChange}
            value={perPage.toString()}
            width="9ch"
          >
            <GoabDropdownItem value="10" label="10" />
            <GoabDropdownItem value="20" label="20" />
            <GoabDropdownItem value="30" label="30" />
          </GoabDropdown>
          <span style={{ width: "75px" }}>per page</span>
        </GoabBlock>
        <GoabSpacer hSpacing="fill" />
        <GoabPagination
          itemCount={users.length}
          perPageCount={perPage}
          pageNumber={page}
          onChange={(event) => changePage(event.page)}
        />
      </GoabBlock>

      <h3>Show multiple actions in a compact table</h3>
      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>Id Number</th>
            <th style={{ width: "1%", whiteSpace: "nowrap" }}>Edit | Flag | Send</th>
          </tr>
        </thead>
        <tbody>
          {[
            { status: "information", statusText: "In progress", name: "Darlene Robertson", id: 45904 },
            { status: "default", statusText: "Inactive", name: "Floyd Miles", id: 47838 },
            { status: "success", statusText: "Active", name: "Kathryn Murphy", id: 34343 },
            { status: "important", statusText: "Recent", name: "Annette Black", id: 89897 },
            { status: "success", statusText: "Active", name: "Esther Howard", id: 12323 },
            { status: "success", statusText: "Active", name: "Jane Cooper", id: 56565 },
          ].map((row) => (
            <tr key={row.id}>
              <td>
                <GoabBadge
                  type={row.status as "information" | "default" | "success" | "important"}
                  content={row.statusText}
                  icon={false}
                />
              </td>
              <td>{row.name}</td>
              <td className="goa-table-number-column">{row.id}</td>
              <td>
                <GoabBlock>
                  <GoabIconButton size="small" icon="pencil" ariaLabel="Edit" />
                  <GoabIconButton size="small" icon="flag" ariaLabel="Flag" />
                  <GoabIconButton size="small" icon="mail" ariaLabel="Send" />
                </GoabBlock>
              </td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <h3>Show status in a table</h3>
      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th className="goa-table-number-header">File number</th>
            <th style={{ width: "1%", whiteSpace: "nowrap" }}></th>
          </tr>
        </thead>
        <tbody>
          {([
            { key: 1, type: "important" as GoabBadgeType, content: "Pending" },
            { key: 2, type: "emergency" as GoabBadgeType, content: "Failed" },
            { key: 3, type: "success" as GoabBadgeType, content: "Complete" },
            { key: 4, type: "information" as GoabBadgeType, content: "In progress" },
            { key: 5, type: "default" as GoabBadgeType, content: "Closed" },
            { key: 6, type: "success" as GoabBadgeType, content: "Complete" },
          ]).map((badge) => (
            <tr key={badge.key}>
              <td><GoabBadge type={badge.type} content={badge.content} icon={false} /></td>
              <td>Lorem ipsum dolor sit amet consectetur</td>
              <td className="goa-table-number-column">1234567890</td>
              <td>
                <GoabButton size="compact" type="tertiary" onClick={() => console.log("clicked")}>
                  Assign
                </GoabButton>
              </td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <h3>Sort data in a table</h3>
      <GoabTable onSort={sortExampleData} width="100%">
        <thead>
          <tr>
            <th><GoabTableSortHeader name="firstName">First name</GoabTableSortHeader></th>
            <th><GoabTableSortHeader name="lastName">Last name</GoabTableSortHeader></th>
            <th><GoabTableSortHeader name="age" direction="asc">Age</GoabTableSortHeader></th>
          </tr>
        </thead>
        <tbody>
          {sortExampleUsers.map((user) => (
            <tr key={user.firstName}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>

      <h3>Task list page</h3>
      <GoabText tag="h1" mt="none">Apply for a service</GoabText>
      <GoabCallout
        type="important"
        emphasis="low"
        size="medium"
        heading="Application incomplete"
        mb="2xl"
        mt="xl"
        maxWidth="360px"
      >
        You have completed 1 of 3 sections.
      </GoabCallout>

      <GoabText tag="h2">1. Before you start</GoabText>
      <GoabTable width="100%" mb="2xl" mt="l">
        <tbody>
          <tr>
            <td><a href="#">Read terms of use</a></td>
            <td className="goa-table-number-column">
              <GoabBadge type="success" content="Completed" ariaLabel="completed" icon={false} />
            </td>
          </tr>
        </tbody>
      </GoabTable>

      <GoabText tag="h2">2. Prepare application</GoabText>
      <GoabTable width="100%" mb="2xl" mt="l">
        <tbody>
          <tr>
            <td><a href="#">Your contact details</a></td>
            <td className="goa-table-number-column">
              <GoabBadge type="information" content="Not started" ariaLabel="not started" icon={false} />
            </td>
          </tr>
          <tr>
            <td><a href="#">Your family</a></td>
            <td className="goa-table-number-column">
              <GoabBadge type="information" content="Not started" ariaLabel="not started" icon={false} />
            </td>
          </tr>
          <tr>
            <td><a href="#">Verify your identity</a></td>
            <td className="goa-table-number-column">
              <GoabBadge type="information" content="Not started" ariaLabel="not started" icon={false} />
            </td>
          </tr>
        </tbody>
      </GoabTable>

      <GoabText tag="h2" mb="s">3. Schedule service</GoabText>
      <GoabText size="body-s" color="secondary" mt="2xs">
        You need to complete the previous section before you can start this task.
      </GoabText>
      <GoabTable width="100%" mt="l" mb="3xl">
        <tbody>
          <tr>
            <td>Receive email confirmation</td>
            <td className="goa-table-number-column">
              <GoabBadge type="default" content="Cannot start yet" ariaLabel="cannot start yet" icon={false} />
            </td>
          </tr>
          <tr>
            <td>Pay service fee</td>
            <td className="goa-table-number-column">
              <GoabBadge type="default" content="Cannot start yet" ariaLabel="cannot start yet" icon={false} />
            </td>
          </tr>
        </tbody>
      </GoabTable>
    </div>
  );
}
