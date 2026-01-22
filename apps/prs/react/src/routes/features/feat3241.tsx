import { useState } from "react";
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
  GoabTabs,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";
import {
  GoabxAppFooter,
  GoabxAppFooterMetaSection,
  GoabxAppFooterNavSection,
  GoabxBadge,
  GoabxButton,
  GoabxCalendar,
  GoabxCallout,
  GoabxCheckbox,
  GoabxDatePicker,
  GoabxDrawer,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFileUploadCard,
  GoabxFileUploadInput,
  GoabxFilterChip,
  GoabxFormItem,
  GoabxInput,
  GoabxLink,
  GoabxModal,
  GoabxNotification,
  GoabxPagination,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxSideMenu,
  GoabxSideMenuGroup,
  GoabxSideMenuHeading,
  GoabxTable,
  GoabxTabs,
  GoabxTextArea,
} from "@abgov/react-components/experimental";
import type {
  GoabPaginationOnChangeDetail,
  GoabTabsOnChangeDetail,
} from "@abgov/ui-components-common";

export function Feat3241Route() {
  const [goabxDrawerOpen, setGoabxDrawerOpen] = useState(false);
  const [goabDrawerOpen, setGoabDrawerOpen] = useState(false);
  const [goabxModalOpen, setGoabxModalOpen] = useState(false);
  const [goabModalOpen, setGoabModalOpen] = useState(false);
  const [goabxPage, setGoabxPage] = useState(1);
  const [goabPage, setGoabPage] = useState(1);
  const [goabxTab, setGoabxTab] = useState(1);
  const [goabTab, setGoabTab] = useState(1);
  const [goabxFilterClicks, setGoabxFilterClicks] = useState(0);
  const [goabFilterClicks, setGoabFilterClicks] = useState(0);
  const [goabxNotificationStatus, setGoabxNotificationStatus] = useState(
    "No dismiss action yet.",
  );
  const [goabNotificationStatus, setGoabNotificationStatus] = useState(
    "No dismiss action yet.",
  );

  const onGoabxPaginationChange = (detail: GoabPaginationOnChangeDetail) => {
    setGoabxPage(detail.page);
  };

  const onGoabPaginationChange = (detail: GoabPaginationOnChangeDetail) => {
    setGoabPage(detail.page);
  };

  const onGoabxTabsChange = (detail: GoabTabsOnChangeDetail) => {
    setGoabxTab(detail.tab);
  };

  const onGoabTabsChange = (detail: GoabTabsOnChangeDetail) => {
    setGoabTab(detail.tab);
  };

  const onGoabxFilterClick = () => {
    setGoabxFilterClicks((prev) => prev + 1);
  };

  const onGoabFilterClick = () => {
    setGoabFilterClicks((prev) => prev + 1);
  };

  const onGoabxNotificationDismiss = () => {
    setGoabxNotificationStatus("Goabx notification dismissed.");
  };

  const onGoabNotificationDismiss = () => {
    setGoabNotificationStatus("Goab notification dismissed.");
  };

  const noop = () => {
    /* nothing */
  };

  return (
    <>
      <GoabText tag="h1">Feat 3241 - Experimental wrapper checks</GoabText>
      <GoabText tag="p" maxWidth="900px">
        Side-by-side comparisons of Goabx wrappers and the matching Goab components.
      </GoabText>
      <GoabText tag="p" maxWidth="900px">
        Also implements all new properties created for Goabx components
      </GoabText>

      <GoabText tag="h2" mt="3xl" mb="m">
        Footer
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabxFooter
          </GoabText>
          <GoabxAppFooter maxContentWidth="100%">
            <GoabxAppFooterNavSection maxColumnCount={1}>
              <a href="a.html">Arts and culture</a>
            </GoabxAppFooterNavSection>
            <GoabxAppFooterMetaSection>
              <a href="privacy.html">Privacy</a>
            </GoabxAppFooterMetaSection>
          </GoabxAppFooter>
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
            GoabxBadge
          </GoabText>
          <GoabxBadge type="success" content="Experimental" />
          <GoabText tag="h3" mb="m">
            Size = large
          </GoabText>
          <GoabxBadge type="success" content="Experimental" size="large" />
          <GoabText tag="h3" mb="m">
            Emphasis = subtle
          </GoabText>
          <GoabxBadge type="success" content="Experimental" emphasis="subtle" />
          <GoabText tag="h3" mb="m">
            New type property value
          </GoabText>
          <GoabxBadge type="dawn" content="Experimental" />
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
          <GoabBadge type="pink-light" content="Standard" />
        </div>
      </GoabGrid>

      <GoabText tag="h2" mt="3xl" mb="m">
        Button
      </GoabText>
      <GoabGrid minChildWidth="500px" gap="xl" mb="xl">
        <div>
          <GoabText tag="h3" mb="m">
            GoabxButton
          </GoabText>
          <GoabxButton type="primary" leadingIcon="add">
            Goabx action
          </GoabxButton>
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
            GoabxCalendar
          </GoabText>
          <GoabxCalendar onChange={noop} />
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
            GoabxCallout
          </GoabText>
          <GoabxCallout type="information" heading="Goabx callout">
            <GoabText tag="p">Experimental callout content.</GoabText>
          </GoabxCallout>
          <GoabText tag="h3" mb="m">
            Emphasis = high
          </GoabText>
          <GoabxCallout type="information" heading="Goabx callout" emphasis="high">
            <GoabText tag="p">Experimental callout content</GoabText>
          </GoabxCallout>
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
            GoabxDatepicker
          </GoabText>
          <GoabxDatePicker />
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
            GoabxFormItem + GoabxInput
          </GoabText>
          <GoabxFormItem label="Goabx input" helpText="Experimental wrapper input">
            <GoabxInput name="goabx-name" placeholder="Enter a name" value="Jordan" />
          </GoabxFormItem>
          <GoabText tag="h3" mb="m">
            Form Item - Input type = text-input
          </GoabText>
          <GoabxFormItem
            label="Goabx input"
            helpText="Experimental wrapper input"
            type="text-input"
          >
            <GoabxInput
              name="goabx-name-text-input"
              placeholder="Enter a name"
              value="Jordan"
            />
          </GoabxFormItem>
          <GoabText tag="h3" mb="m">
            Input - Size = compact
          </GoabText>
          <GoabxFormItem label="Goabx input" helpText="Experimental wrapper input">
            <GoabxInput
              name="goabx-name-text-input"
              placeholder="Enter a name"
              value="Jordan"
              size="compact"
            />
          </GoabxFormItem>
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
            GoabxCheckbox
          </GoabText>
          <GoabxCheckbox name="goabx-check" text="Goabx checkbox" />
          <GoabText tag="h3" mb="m">
            Size = compact
          </GoabText>
          <GoabxCheckbox
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
            GoabxDropdown
          </GoabText>
          <GoabxFormItem label="Goabx dropdown">
            <GoabxDropdown name="goabx-color" placeholder="Select a color" value="blue">
              <GoabxDropdownItem label="Red" value="red" />
              <GoabxDropdownItem label="Blue" value="blue" />
              <GoabxDropdownItem label="Green" value="green" />
            </GoabxDropdown>
          </GoabxFormItem>
          <GoabText tag="h3" mb="m">
            Size = compact
          </GoabText>
          <GoabxFormItem label="Goabx dropdown">
            <GoabxDropdown
              name="goabx-color-compact"
              placeholder="Select a color"
              value="blue"
              size="compact"
            >
              <GoabxDropdownItem label="Red" value="red" />
              <GoabxDropdownItem label="Blue" value="blue" />
              <GoabxDropdownItem label="Green" value="green" />
            </GoabxDropdown>
          </GoabxFormItem>
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
            GoabxTextArea
          </GoabText>
          <GoabxFormItem label="Goabx textarea">
            <GoabxTextArea name="goabx-notes" rows={3} placeholder="Goabx notes" />
          </GoabxFormItem>
          <GoabText tag="h3" mb="m">
            Text Area - Size = compact
          </GoabText>
          <GoabxFormItem label="Goabx textarea">
            <GoabxTextArea
              name="goabx-notes"
              rows={3}
              placeholder="Goabx notes"
              size="compact"
            />
          </GoabxFormItem>
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
            GoabxRadioGroup
          </GoabText>
          <GoabxFormItem label="Goabx radios">
            <GoabxRadioGroup name="goabx-plan" value="standard">
              <GoabxRadioItem name="goabx-plan" label="Standard" value="standard" />
              <GoabxRadioItem name="goabx-plan" label="Premium" value="premium" />
            </GoabxRadioGroup>
          </GoabxFormItem>
          <GoabText tag="h3" mb="m">
            Radio Group - Size = compact
          </GoabText>
          <GoabText tag="h3" mb="m">
            Radio Item - Compact = true
          </GoabText>
          <GoabxFormItem label="Goabx radios">
            <GoabxRadioGroup name="goabx-plan-compact" value="standard" size="compact">
              <GoabxRadioItem
                name="goabx-plan-compact"
                label="Standard"
                value="standard"
                compact
              />
              <GoabxRadioItem
                name="goabx-plan-compact"
                label="Premium"
                value="premium"
                compact
              />
            </GoabxRadioGroup>
          </GoabxFormItem>
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
            GoabxFilterChip w/ Secondary Text
          </GoabText>
          <GoabxFilterChip
            content="Goabx chip"
            secondaryText="Experimental"
            onClick={onGoabxFilterClick}
          />
          <GoabText tag="h3" mb="m">
            Leading Icon
          </GoabText>
          <GoabxFilterChip
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
            GoabxLink
          </GoabText>
          <GoabxLink>
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goabx link
            </a>
          </GoabxLink>
          <GoabText tag="h3" mb="m">
            Color = dark
          </GoabText>
          <GoabxLink color="dark">
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goabx link
            </a>
          </GoabxLink>
          <GoabText tag="h3" mb="m">
            Size = large
          </GoabText>
          <GoabxLink size="large">
            <a href="https://example.com" rel="noreferrer" target="_blank">
              Goabx link
            </a>
          </GoabxLink>
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
            GoabxNotification
          </GoabText>
          <GoabxNotification type="information" onDismiss={onGoabxNotificationDismiss}>
            Goabx notification content.
          </GoabxNotification>
          <GoabText tag="h3" mb="m">
            Emphasis = low
          </GoabText>
          <GoabxNotification
            type="information"
            onDismiss={onGoabxNotificationDismiss}
            emphasis="low"
          >
            Goabx notification content.
          </GoabxNotification>
          <GoabText tag="h3" mb="m">
            Compact = true
          </GoabText>
          <GoabxNotification
            type="information"
            onDismiss={onGoabxNotificationDismiss}
            compact
          >
            Goabx notification content.
          </GoabxNotification>
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
            GoabxPagination
          </GoabText>
          <GoabxPagination
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
            GoabxTabs
          </GoabText>
          <GoabxTabs onChange={onGoabxTabsChange}>
            <GoabTab heading="Overview">
              <GoabText tag="p">Goabx tab one content.</GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p">Goabx tab two content.</GoabText>
            </GoabTab>
            <GoabTab heading="Notes">
              <GoabText tag="p">Goabx tab three content.</GoabText>
            </GoabTab>
          </GoabxTabs>
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
            GoabxTable
          </GoabText>
          <GoabxTable>
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payments</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Reporting</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </GoabxTable>
          <GoabText tag="h3" mb="m">
            GoabxTable - Striped = true
          </GoabText>
          <GoabxTable striped>
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payments</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Reporting</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </GoabxTable>
        </div>
        <div>
          <GoabText tag="h3" mb="m">
            GoabTable
          </GoabText>
          <GoabTable>
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payments</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Reporting</td>
                <td>Pending</td>
              </tr>
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
            GoabxFileUploadInput
          </GoabText>
          <GoabxFormItem label="Goabx upload input">
            <GoabxFileUploadInput
              variant="dragdrop"
              accept=".pdf,.png"
              onSelectFile={() => noop}
            />
          </GoabxFormItem>
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
            GoabxFileUploadCard
          </GoabText>
          <GoabxFileUploadCard filename="report.pdf" size={1200000} />
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
            GoabxDrawer
          </GoabText>
          <GoabxButton type="secondary" onClick={() => setGoabxDrawerOpen(true)}>
            Open Goabx drawer
          </GoabxButton>
          <GoabxDrawer
            open={goabxDrawerOpen}
            position="right"
            heading="Goabx drawer"
            actions={
              <GoabxButton type="secondary" onClick={() => setGoabxDrawerOpen(false)}>
                Close
              </GoabxButton>
            }
            onClose={() => setGoabxDrawerOpen(false)}
          >
            <GoabText tag="p">Goabx drawer content.</GoabText>
          </GoabxDrawer>
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
            GoabxModal
          </GoabText>
          <GoabxButton type="secondary" onClick={() => setGoabxModalOpen(true)}>
            Open Goabx modal
          </GoabxButton>
          <GoabxModal
            open={goabxModalOpen}
            heading="Goabx modal"
            actions={
              <GoabButtonGroup alignment="end">
                <GoabxButton type="secondary" onClick={() => setGoabxModalOpen(false)}>
                  Cancel
                </GoabxButton>
                <GoabxButton type="primary" onClick={() => setGoabxModalOpen(false)}>
                  Confirm
                </GoabxButton>
              </GoabButtonGroup>
            }
            onClose={() => setGoabxModalOpen(false)}
          >
            <GoabText tag="p">Goabx modal content.</GoabText>
          </GoabxModal>
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
            GoabxSideMenu
          </GoabText>
          <GoabxSideMenu>
            <GoabxSideMenuHeading
              meta={<GoabxBadge type="important" content="2" />}
              icon="settings"
            >
              Goabx navigation
            </GoabxSideMenuHeading>
            <GoabxSideMenuGroup heading="Primary" icon="home">
              <a href="#goabx-home">Goabx home</a>
              <a href="#goabx-settings">Goabx settings</a>
            </GoabxSideMenuGroup>
          </GoabxSideMenu>
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
