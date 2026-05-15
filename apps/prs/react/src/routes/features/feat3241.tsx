import { useEffect, useState } from "react";
import {
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabCalendar,
  GoabCallout,
  GoabCheckbox,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFilterChip,
  GoabFormItem,
  GoabGrid,
  GoabInput,
  GoabLink,
  GoabModal,
  GoabNotification,
  GoabPagination,
  GoabRadioGroup,
  GoabRadioItem,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabTab,
  GoabTable,
  GoabTableSortHeader,
  GoabTabs,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";

import type {
  GoabPaginationOnChangeDetail,
  GoabTableOnSortDetail,
  GoabTabsOnChangeDetail,
} from "@abgov/ui-components-common";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export function Feat3241Route() {
  const [users, setUsers] = useState<User[]>([
    {
      firstName: "Christian",
      lastName: "Batz",
      age: 18,
    },
    {
      firstName: "Brain",
      lastName: "Wisozk",
      age: 19,
    },
    {
      firstName: "Neha",
      lastName: "Jones",
      age: 23,
    },
    {
      firstName: "Tristin",
      lastName: "Buckridge",
      age: 31,
    },
  ]);
  const [goabxDrawerOpen, setGoabxDrawerOpen] = useState(false);
  const [goabxModalOpen, setGoabxModalOpen] = useState(false);
  const [goabxPage, setGoabxPage] = useState(1);
  const [goabxTab, setGoabxTab] = useState(1);
  const [goabxFilterClicks, setGoabxFilterClicks] = useState(0);
  const [goabxNotificationStatus, setGoabxNotificationStatus] = useState(
    "No dismiss action yet.",
  );

  const [goabDrawerOpen, setGoabDrawerOpen] = useState(false);
  const [goabModalOpen, setGoabModalOpen] = useState(false);
  const [goabPage, setGoabPage] = useState(1);
  const [goabTab, setGoabTab] = useState(1);
  const [goabFilterClicks, setGoabFilterClicks] = useState(0);
  const [goabNotificationStatus, setGoabNotificationStatus] = useState(
    "No dismiss action yet.",
  );

  const onGoabxPaginationChange = (detail: GoabPaginationOnChangeDetail) => {
    setGoabxPage(detail.page);
  };

  const onGoabxTabsChange = (detail: GoabTabsOnChangeDetail) => {
    setGoabxTab(detail.tab);
  };

  const onGoabxFilterClick = () => {
    setGoabxFilterClicks((prev) => prev + 1);
  };

  const onGoabxNotificationDismiss = () => {
    setGoabxNotificationStatus("Goabx notification dismissed.");
  };

  const onGoabPaginationChange = (detail: GoabPaginationOnChangeDetail) => {
    setGoabPage(detail.page);
  };

  const onGoabTabsChange = (detail: GoabTabsOnChangeDetail) => {
    setGoabTab(detail.tab);
  };

  const onGoabFilterClick = () => {
    setGoabFilterClicks((prev) => prev + 1);
  };

  const onGoabNotificationDismiss = () => {
    setGoabNotificationStatus("Goab notification dismissed.");
  };

  const noop = () => {
    /* nothing */
  };

  function sortData(event: GoabTableOnSortDetail) {
    console.log("sorting");
    const _users = [...users];
    _users.sort((a: any, b: any) => {
      return (a[event.sortBy] > b[event.sortBy] ? 1 : -1) * event.sortDir;
    });
    setUsers(_users);
  }

  return (
    <>
      <GoabText tag="h1">Feat 3241 - Experimental wrapper checks</GoabText>
      <GoabText tag="p" maxWidth="900px">
        V2 component comparisons — all components now promoted from experimental to the main package.
      </GoabText>
      <GoabText tag="p" maxWidth="900px">
        Implements all new V2 properties
      </GoabText>

      <GoabText tag="h2" mt="3xl" mb="m">
        Footer
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabFooter
          </GoabText>
          <GoabAppFooter maxContentWidth="100%">
            <GoabAppFooterNavSection maxColumnCount={1}>
              <a href="a.html">Arts and culture</a>
            </GoabAppFooterNavSection>
            <GoabAppFooterMetaSection>
              <a href="privacy.html">Privacy</a>
            </GoabAppFooterMetaSection>
          </GoabAppFooter>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabFooter
          </GoabText>
          <GoabAppFooter maxContentWidth="100%">
            <GoabAppFooterNavSection maxColumnCount={1}>
              <a href="a.html">Arts and culture</a>
            </GoabAppFooterNavSection>
            <GoabAppFooterMetaSection>
              <a href="privacy.html">Privacy</a>
            </GoabAppFooterMetaSection>
          </GoabAppFooter>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Badge
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabBadge
          </GoabText>
          <GoabBadge type="success" content="Experimental" />
          <GoabText tag="h3" mb="m">
            Size = large
          </GoabText>
          <GoabBadge type="success" content="Experimental" size="large" />
          <GoabText tag="h3" mb="m">
            Emphasis = subtle
          </GoabText>
          <GoabBadge type="success" content="Experimental" emphasis="subtle" />
          <GoabText tag="h3" mb="m">
            New type property value
          </GoabText>
          <GoabBadge type="dawn" content="Experimental" />
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabBadge
          </GoabText>
          <GoabBadge type="success" content="Standard" />
          <GoabText tag="h3" mb="m">
            Type property value that no longer exists
          </GoabText>
          <GoabText tag="p" mb="m">
            Should only work with design tokens v1
          </GoabText>
          <GoabBadge type="prairie" content="Standard" />
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Button
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabButton
          </GoabText>
          <GoabButton type="primary" leadingIcon="add">
            Goabx action
          </GoabButton>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabButton
          </GoabText>
          <GoabButton type="primary" leadingIcon="add">
            Goab action
          </GoabButton>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Calendar
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabCalendar
          </GoabText>
          <GoabCalendar onChange={noop} />
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabCalendar
          </GoabText>
          <GoabCalendar onChange={noop} />
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Callout
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabCallout
          </GoabText>
          <GoabCallout type="information" heading="Goabx callout">
            <GoabText tag="p">Experimental callout content.</GoabText>
          </GoabCallout>
          <GoabText tag="h3" mb="m">
            Emphasis = high
          </GoabText>
          <GoabCallout type="information" heading="Goabx callout" emphasis="high">
            <GoabText tag="p">Experimental callout content</GoabText>
          </GoabCallout>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabCallout
          </GoabText>
          <GoabCallout type="information" heading="Goab callout">
            <GoabText tag="p">Standard callout content.</GoabText>
          </GoabCallout>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Datepicker
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabDatepicker
          </GoabText>
          <GoabDatePicker />
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabDatepicker
          </GoabText>
          <GoabDatePicker />
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Form Item and Input
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabFormItem + GoabInput
          </GoabText>
          <GoabFormItem label="Goabx input" helpText="Experimental wrapper input">
            <GoabInput name="goabx-name" placeholder="Enter a name" value="Jordan" />
          </GoabFormItem>
          <GoabText tag="h3" mb="m">
            Form Item - Input type = text-input
          </GoabText>
          <GoabFormItem
            label="Goabx input"
            helpText="Experimental wrapper input"
            type="text-input"
          >
            <GoabInput
              name="goabx-name-text-input"
              placeholder="Enter a name"
              value="Jordan"
            />
          </GoabFormItem>
          <GoabText tag="h3" mb="m">
            Input - Size = compact
          </GoabText>
          <GoabFormItem label="Goabx input" helpText="Experimental wrapper input">
            <GoabInput
              name="goabx-name-text-input"
              placeholder="Enter a name"
              value="Jordan"
              size="compact"
            />
          </GoabFormItem>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabFormItem + GoabInput
          </GoabText>
          <GoabFormItem label="Goab input" helpText="Standard wrapper input">
            <GoabInput
              name="goab-name"
              placeholder="Enter a name"
              value="Riley"
            ></GoabInput>
          </GoabFormItem>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Checkbox
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabCheckbox
          </GoabText>
          <GoabCheckbox name="goabx-check" text="Goabx checkbox" />
          <GoabText tag="h3" mb="m">
            Size = compact
          </GoabText>
          <GoabCheckbox
            name="goabx-check-compact"
            text="Goabx checkbox"
            size="compact"
          />
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabCheckbox
          </GoabText>
          <GoabCheckbox name="goab-check" text="Goab checkbox"></GoabCheckbox>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Dropdown and Items
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabDropdown
          </GoabText>
          <GoabFormItem label="Goabx dropdown">
            <GoabDropdown name="goabx-color" placeholder="Select a color" value="blue">
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          </GoabFormItem>
          <GoabText tag="h3" mb="m">
            Size = compact
          </GoabText>
          <GoabFormItem label="Goabx dropdown">
            <GoabDropdown
              name="goabx-color-compact"
              placeholder="Select a color"
              value="blue"
              size="compact"
            >
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          </GoabFormItem>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabDropdown
          </GoabText>
          <GoabFormItem label="Goab dropdown">
            <GoabDropdown name="goab-color" placeholder="Select a color" value="blue">
              <GoabDropdownItem label="Red" value="red" />
              <GoabDropdownItem label="Blue" value="blue" />
              <GoabDropdownItem label="Green" value="green" />
            </GoabDropdown>
          </GoabFormItem>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Textarea
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabTextArea
          </GoabText>
          <GoabFormItem label="Goabx textarea">
            <GoabTextArea name="goabx-notes" rows={3} placeholder="Goabx notes" />
          </GoabFormItem>
          <GoabText tag="h3" mb="m">
            Text Area - Size = compact
          </GoabText>
          <GoabFormItem label="Goabx textarea">
            <GoabTextArea
              name="goabx-notes"
              rows={3}
              placeholder="Goabx notes"
              size="compact"
            />
          </GoabFormItem>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabTextArea
          </GoabText>
          <GoabFormItem label="Goab textarea">
            <GoabTextArea name="goab-notes" rows={3} placeholder="Goab notes" />
          </GoabFormItem>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Radio Group and Items
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabRadioGroup
          </GoabText>
          <GoabFormItem label="Goabx radios">
            <GoabRadioGroup name="goabx-plan" value="standard">
              <GoabRadioItem name="goabx-plan" label="Standard" value="standard" />
              <GoabRadioItem name="goabx-plan" label="Premium" value="premium" />
            </GoabRadioGroup>
          </GoabFormItem>
          <GoabText tag="h3" mb="m">
            Radio Group - Size = compact
          </GoabText>
          <GoabText tag="h3" mb="m">
            Radio Item - Compact = true
          </GoabText>
          <GoabFormItem label="Goabx radios">
            <GoabRadioGroup name="goabx-plan-compact" value="standard" size="compact">
              <GoabRadioItem
                name="goabx-plan-compact"
                label="Standard"
                value="standard"
                compact
              />
              <GoabRadioItem
                name="goabx-plan-compact"
                label="Premium"
                value="premium"
                compact
              />
            </GoabRadioGroup>
          </GoabFormItem>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabRadioGroup
          </GoabText>
          <GoabFormItem label="Goab radios">
            <GoabRadioGroup name="goab-plan" value="standard">
              <GoabRadioItem name="goab-plan" label="Standard" value="standard" />
              <GoabRadioItem name="goab-plan" label="Premium" value="premium" />
            </GoabRadioGroup>
          </GoabFormItem>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Filter Chip
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabFilterChip w/ Secondary Text
          </GoabText>
          <GoabFilterChip
            content="Goabx chip"
            secondaryText="Experimental"
            onClick={onGoabxFilterClick}
          />
          <GoabText tag="h3" mb="m">
            Leading Icon
          </GoabText>
          <GoabFilterChip
            content="Goabx chip"
            secondaryText="Experimental"
            leadingIcon="accessibility"
            iconTheme="filled"
            onClick={onGoabxFilterClick}
          />
          <GoabText tag="p">Clicks: {goabxFilterClicks}</GoabText>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabFilterChip
          </GoabText>
          <GoabFilterChip
            content="Goab chip"
            iconTheme="outline"
            onClick={onGoabFilterClick}
          />
          <GoabText tag="p">Clicks: {goabFilterClicks}</GoabText>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Link
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabLink
          </GoabText>
          <GoabLink>
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goabx link
            </a>
          </GoabLink>
          <GoabText tag="h3" mb="m">
            Color = dark
          </GoabText>
          <GoabLink color="dark">
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goabx link
            </a>
          </GoabLink>
          <GoabText tag="h3" mb="m">
            Size = large
          </GoabText>
          <GoabLink size="large">
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goabx link
            </a>
          </GoabLink>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabLink
          </GoabText>
          <GoabLink>
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goab link
            </a>
          </GoabLink>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Notification
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabNotification
          </GoabText>
          <GoabNotification type="information" onDismiss={onGoabxNotificationDismiss}>
            Goabx notification content.
          </GoabNotification>
          <GoabText tag="h3" mb="m">
            Emphasis = low
          </GoabText>
          <GoabNotification
            type="information"
            onDismiss={onGoabxNotificationDismiss}
            emphasis="low"
          >
            Goabx notification content.
          </GoabNotification>
          <GoabText tag="h3" mb="m">
            Compact = true
          </GoabText>
          <GoabNotification
            type="information"
            onDismiss={onGoabxNotificationDismiss}
            compact
          >
            Goabx notification content.
          </GoabNotification>
          <GoabText tag="p">Status: {goabxNotificationStatus}</GoabText>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabNotification
          </GoabText>
          <GoabNotification type="information" onDismiss={onGoabNotificationDismiss}>
            Goab notification content.
          </GoabNotification>
          <GoabText tag="p">Status: {goabNotificationStatus}</GoabText>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Pagination
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabPagination
          </GoabText>
          <GoabPagination
            itemCount={87}
            perPageCount={10}
            pageNumber={goabxPage}
            onChange={onGoabxPaginationChange}
          />
          <GoabText tag="p">Current page: {goabxPage}</GoabText>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabPagination
          </GoabText>
          <GoabPagination
            itemCount={87}
            perPageCount={10}
            pageNumber={goabPage}
            onChange={onGoabPaginationChange}
          />
          <GoabText tag="p">Current page: {goabPage}</GoabText>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Tabs
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabTabs
          </GoabText>
          <GoabTabs onChange={onGoabxTabsChange}>
            <GoabTab heading="Overview">
              <GoabText tag="p">Goabx tab one content.</GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p">Goabx tab two content.</GoabText>
            </GoabTab>
            <GoabTab heading="Notes">
              <GoabText tag="p">Goabx tab three content.</GoabText>
            </GoabTab>
          </GoabTabs>
          <GoabText tag="p" mt="0">
            Selected tab: {goabxTab}
          </GoabText>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabTabs
          </GoabText>
          <GoabTabs onChange={onGoabTabsChange}>
            <GoabTab heading="Overview">
              <GoabText tag="p">Goab tab one content.</GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p">Goab tab two content.</GoabText>
            </GoabTab>
            <GoabTab heading="Notes">
              <GoabText tag="p">Goab tab three content.</GoabText>
            </GoabTab>
          </GoabTabs>
          <GoabText tag="p" mt="0">
            Selected tab: {goabTab}
          </GoabText>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Table
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabTable
          </GoabText>
          <GoabTable onSort={sortData}>
            <thead>
              <tr>
                <th>
                  <GoabTableSortHeader name="firstName">First name</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="lastName">Last name</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="age" direction="asc">
                    Age
                  </GoabTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.firstName}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
          <GoabText tag="h3" mb="m">
            GoabTable - Striped = true
          </GoabText>
          <GoabTable striped>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.firstName}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabTable
          </GoabText>
          <GoabTable onSort={sortData}>
            <thead>
              <tr>
                <th>
                  <GoabTableSortHeader name="firstName">First name</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="lastName">Last name</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="age" direction="asc">
                    Age
                  </GoabTableSortHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.firstName}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        File Upload Input
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabFileUploadInput
          </GoabText>
          <GoabFormItem label="Goabx upload input">
            <GoabFileUploadInput
              variant="dragdrop"
              accept=".pdf,.png"
              onSelectFile={() => noop}
            />
          </GoabFormItem>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabFileUploadInput
          </GoabText>
          <GoabFormItem label="Goab upload input">
            <GoabFileUploadInput
              variant="dragdrop"
              accept=".pdf,.png"
              onSelectFile={() => noop}
            />
          </GoabFormItem>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        File Upload Card
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabFileUploadCard
          </GoabText>
          <GoabFileUploadCard filename="report.pdf" size={1200000} />
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabFileUploadCard
          </GoabText>
          <GoabFileUploadCard filename="report.pdf" size={1200000} />
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Drawer
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabDrawer
          </GoabText>
          <GoabButton type="secondary" onClick={() => setGoabxDrawerOpen(true)}>
            Open Goabx drawer
          </GoabButton>
          <GoabDrawer
            open={goabxDrawerOpen}
            position="right"
            heading="Goabx drawer"
            actions={
              <GoabButton type="secondary" onClick={() => setGoabxDrawerOpen(false)}>
                Close
              </GoabButton>
            }
            onClose={() => setGoabxDrawerOpen(false)}
          >
            <GoabText tag="p">Goabx drawer content.</GoabText>
          </GoabDrawer>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabDrawer
          </GoabText>
          <GoabButton type="secondary" onClick={() => setGoabDrawerOpen(true)}>
            Open Goab drawer
          </GoabButton>
          <GoabDrawer
            open={goabDrawerOpen}
            position="right"
            heading="Goab drawer"
            actions={
              <GoabButton type="secondary" onClick={() => setGoabDrawerOpen(false)}>
                Close
              </GoabButton>
            }
            onClose={() => setGoabDrawerOpen(false)}
          >
            <GoabText tag="p">Goab drawer content.</GoabText>
          </GoabDrawer>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Modal
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabModal
          </GoabText>
          <GoabButton type="secondary" onClick={() => setGoabxModalOpen(true)}>
            Open Goabx modal
          </GoabButton>
          <GoabModal
            open={goabxModalOpen}
            heading="Goabx modal"
            actions={
              <GoabButtonGroup alignment="end">
                <GoabButton type="secondary" onClick={() => setGoabxModalOpen(false)}>
                  Cancel
                </GoabButton>
                <GoabButton type="primary" onClick={() => setGoabxModalOpen(false)}>
                  Confirm
                </GoabButton>
              </GoabButtonGroup>
            }
            onClose={() => setGoabxModalOpen(false)}
          >
            <GoabText tag="p">Goabx modal content.</GoabText>
          </GoabModal>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabModal
          </GoabText>
          <GoabButton type="secondary" onClick={() => setGoabModalOpen(true)}>
            Open Goab modal
          </GoabButton>
          <GoabModal
            open={goabModalOpen}
            heading="Goab modal"
            actions={
              <GoabButtonGroup alignment="end">
                <GoabButton type="secondary" onClick={() => setGoabModalOpen(false)}>
                  Cancel
                </GoabButton>
                <GoabButton type="primary" onClick={() => setGoabModalOpen(false)}>
                  Confirm
                </GoabButton>
              </GoabButtonGroup>
            }
            onClose={() => setGoabModalOpen(false)}
          >
            <GoabText tag="p">Goab modal content.</GoabText>
          </GoabModal>
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Side Menu
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabSideMenu
          </GoabText>
          <GoabSideMenu>
            <GoabSideMenuHeading
              meta={<GoabBadge type="important" content="2" />}
              icon="settings"
            >
              Goabx navigation
            </GoabSideMenuHeading>
            <GoabSideMenuGroup heading="Primary" icon="home">
              <a href="#goabx-home">Goabx home</a>
              <a href="#goabx-settings">Goabx settings</a>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabSideMenu
          </GoabText>
          <GoabSideMenu>
            <GoabSideMenuHeading
              meta={<GoabBadge type="important" content="2" />}
              icon="settings"
            >
              Goab navigation
            </GoabSideMenuHeading>
            <GoabSideMenuGroup heading="Primary" icon="home">
              <a href="#goab-home">Goab home</a>
              <a href="#goab-settings">Goab settings</a>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        </div>
      </GoabGrid>
    </>
  );
}
