import { useState, useMemo, useCallback, useEffect } from "react";
import {
  GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabContainer, GoabDetails,
  GoabDivider, GoabDropdown, GoabDropdownItem, GoabFilterChip, GoabFormItem,
  GoabGrid, GoabInput, GoabLink, GoabTable, GoabText,
} from "@abgov/react-components";
import type { GoabBadgeType, GoabInputOnChangeDetail, GoabInputOnKeyPressDetail } from "@abgov/ui-components-common";

export function DocsTextRoute() {
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Filter data in a table
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [filterInputError, setFilterInputError] = useState("");

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

  const handleFilterInputChange = (detail: GoabInputOnChangeDetail) => {
    setFilterInputValue(detail.value.trim());
  };

  const handleFilterInputKeyPress = (detail: GoabInputOnKeyPressDetail) => {
    if (detail.key === "Enter") applyFilter();
  };

  const applyFilter = () => {
    if (filterInputValue === "") { setFilterInputError("Empty filter"); return; }
    if (typedChips.includes(filterInputValue)) { setFilterInputError("Enter a unique filter"); return; }
    setTypedChips([...typedChips, filterInputValue]);
    setTimeout(() => setFilterInputValue(""), 0);
    setFilterInputError("");
  };

  const removeTypedChip = (chip: string) => {
    setTypedChips(typedChips.filter((c) => c !== chip));
    setFilterInputError("");
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

  return (
    <div>
      <h2>Text</h2>

      <h3>Basic text</h3>
      <GoabText>This is a paragraph of text with default styling.</GoabText>

      <h3>Heading sizes</h3>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="heading-xl">Heading XL</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="heading-l">Heading L</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="heading-m">Heading M</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="heading-s">Heading S</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="heading-xs">Heading XS</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="heading-2xs">Heading 2XS</GoabText>
      <GoabDivider mb="none" mt="none" />

      <h3>Body sizes</h3>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="body-l">Body large text</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="body-m">Body medium text (default)</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="body-s">Body small text</GoabText>
      <GoabDivider mb="none" mt="none" />
      <GoabText size="body-xs">Body extra small text</GoabText>
      <GoabDivider mb="none" mt="none" />

      <h3>Color</h3>
      <GoabText color="primary" mt="none" mb="none">Primary color text (default)</GoabText>
      <GoabText color="secondary" mb="none">Secondary color text</GoabText>

      <h2>Examples</h2>

      <h3>Ask a user for an address</h3>
      <GoabText size="heading-l" mt="none" mb="xl">What is your address?</GoabText>
      <GoabFormItem label="Street Address">
        <GoabInput name="address" type="text" value={address} onChange={(e) => setAddress(e.value)} width="100%" />
      </GoabFormItem>
      <GoabFormItem label="Suite or unit #" mt="l">
        <GoabInput name="suite" type="text" value={suite} onChange={(e) => setSuite(e.value)} width="100%" />
      </GoabFormItem>
      <GoabFormItem label="City or town" mt="l">
        <GoabInput name="city" type="text" value={city} onChange={(e) => setCity(e.value)} width="100%" />
      </GoabFormItem>
      <GoabBlock direction="row" gap="l" mt="l">
        <GoabFormItem label="Province or territory">
          <GoabDropdown onChange={(e) => setProvince(e.value ?? "")} name="province" value={province} width="100%">
            <GoabDropdownItem label="Alberta" value="AB" />
            <GoabDropdownItem label="British Columbia" value="BC" />
            <GoabDropdownItem label="Manitoba" value="MB" />
            <GoabDropdownItem label="Ontario" value="ON" />
            <GoabDropdownItem label="Saskatchewan" value="SK" />
          </GoabDropdown>
        </GoabFormItem>
        <GoabFormItem label="Postal Code">
          <GoabInput name="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.value)} width="7ch" />
        </GoabFormItem>
      </GoabBlock>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={() => { /* no-op */ }}>Save and continue</GoabButton>
        <GoabButton type="secondary" onClick={() => { /* no-op */ }}>Cancel</GoabButton>
      </GoabButtonGroup>

      <h3>Ask a user for direct deposit information</h3>
      <GoabText tag="h1" size="heading-l" mt="none" mb="m">Direct deposit information</GoabText>
      <GoabText tag="p" mb="xl">
        Find this information on your bank's website or on your personal cheques.
        Contact your bank if you can't find this information.
      </GoabText>
      <form>
        <GoabFormItem label="Bank or Institution number" helpText="3-4 digits in length">
          <GoabInput maxLength={4} name="bankNumber" onChange={(e) => setBankNumber(e.value)} value={bankNumber} ariaLabel="bankNumber" width="88px" />
        </GoabFormItem>
        <GoabFormItem label="Branch or Transit number" helpText="5 digits in length" mt="l">
          <GoabInput maxLength={5} name="transitNumber" onChange={(e) => setTransitNumber(e.value)} value={transitNumber} ariaLabel="transitNumber" width="143px" />
        </GoabFormItem>
        <GoabFormItem label="Account number" helpText="3-12 digits in length" mt="l">
          <GoabInput maxLength={12} name="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.value)} ariaLabel="accountNumber" />
        </GoabFormItem>
      </form>
      <GoabDetails heading="Where can I find this information on a personal cheque?" mt="l">
        <GoabText tag="p" mb="m">
          Below is an example of where you can find the required bank information on a personal cheque.
        </GoabText>
        <img src="https://design.alberta.ca/images/details-demo.jpg" alt="Cheque example showing bank information locations" />
      </GoabDetails>
      <GoabButton type="submit" mt="2xl">Save and continue</GoabButton>

      <h3>Card grid</h3>
      <GoabGrid gap="xl" minChildWidth="320px">
        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m"><a href="#">Waitlist submission</a></GoabLink>
          <GoabText mt="none" mb="none">Enter and maintain information about the households waiting for affordable housing with your organization.</GoabText>
        </GoabContainer>
        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m"><a href="#">Lodge assistance program</a></GoabLink>
          <GoabText mt="none" mb="none">Keep track of the individuals who are placed in lodges and may qualify for the Lodge Assistance Program subsidy.</GoabText>
        </GoabContainer>
        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m"><a href="#">Education Support</a></GoabLink>
          <GoabText mt="none" mb="none">Explore educational resources, enroll in courses, and track your academic progress effortlessly.</GoabText>
        </GoabContainer>
        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m"><a href="#">Social Assistance</a></GoabLink>
          <GoabText mt="none" mb="none">Learn about available support programs, apply for financial aid, and access community resources.</GoabText>
        </GoabContainer>
      </GoabGrid>

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
          <GoabButton type="tertiary" size="compact" leadingIcon="calendar" onClick={() => console.log("Add to calendar clicked")}>
            Add to calendar
          </GoabButton>
        }>
        <GoabTable width="100%" striped>
          <tbody>
            <tr><td>Business plan submission</td><td style={{ textAlign: "right" }}>June 30, 2024</td></tr>
            <tr><td>Annual review</td><td style={{ textAlign: "right" }}>October 3, 2024</td></tr>
            <tr><td>Application submission</td><td style={{ textAlign: "right" }}>December 20, 2024</td></tr>
            <tr><td>Application review</td><td style={{ textAlign: "right" }}>January 3, 2025</td></tr>
          </tbody>
        </GoabTable>
      </GoabContainer>

      <h3>Filter data in a table</h3>
      <GoabFormItem id="textFilterInput" error={filterInputError} mb="m">
        <GoabBlock gap="xs" direction="row" alignment="start" width="100%">
          <div style={{ flex: 1 }}>
            <GoabInput
              name="textFilterInput"
              aria-labelledby="textFilterInput"
              value={filterInputValue}
              leadingIcon="search"
              width="100%"
              onChange={handleFilterInputChange}
              onKeyPress={handleFilterInputKeyPress}
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
    </div>
  );
}
