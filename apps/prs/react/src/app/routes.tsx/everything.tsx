import { useState } from "react";
import type { JSX } from "react";
import {
  GoabAccordion,
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCalendar,
  GoabCallout,
  GoabCheckbox,
  GoabCheckboxList,
  GoabChip,
  GoabCircularProgress,
  GoabOneColumnLayout,
  GoabContainer,
  GoabDatePicker,
  GoabDetails,
  GoabDivider,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFieldset,
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFilterChip,
  GoabFormItem,
  GoabFormStep,
  GoabFormStepper,
  GoabGrid,
  GoabHeroBanner,
  GoabHeroBannerActions,
  GoabIcon,
  GoabIconButton,
  GoabInput,
  GoabInputNumber,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabMicrositeHeader,
  GoabModal,
  GoabNotification,
  GoabPageBlock,
  GoabPages,
  GoabPagination,
  GoabPopover,
  GoabPublicForm,
  GoabPublicFormPage,
  GoabPublicFormSummary,
  GoabPublicFormTask,
  GoabPublicFormTaskList,
  GoabPublicSubform,
  GoabPublicSubformIndex,
  GoabRadioGroup,
  GoabRadioItem,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabSkeleton,
  GoabSpacer,
  GoabSpinner,
  GoabTab,
  GoabTable,
  GoabTableSortHeader,
  GoabTabs,
  GoabTemporaryNotificationCtrl,
  GoabText,
  GoabTextarea,
  GoabTooltip,
  GoabLinearProgress,
} from "@abgov/react-components";
import {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
  GoabBadgeType,
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabCalloutIconTheme,
  GoabCalloutType,
  GoabCalendarOnChangeDetail,
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxOnChangeDetail,
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  GoabDatePickerInputType,
  GoabDrawerPosition,
  GoabDropdownItemMountType,
  GoabDropdownOnChangeDetail,
  GoabFilterChipTheme,
  GoabFormItemLabelSize,
  GoabFieldsetOnContinueDetail,
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
  GoabFormState,
  GoabFormStepStatus,
  GoabFormStepperOnChangeDetail,
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabLinkButtonType,
  GoabModalCalloutVariant,
  GoabMenuButtonOnActionDetail,
  GoabNotificationType,
  GoabPaginationOnChangeDetail,
  GoabPopoverPosition,
  GoabRadioGroupOnChangeDetail,
  GoabSkeletonSize,
  GoabSkeletonType,
  GoabSpinnerSize,
  GoabSpinnerType,
  GoabTableOnSortDetail,
  GoabTabsOnChangeDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaCountBy,
  GoabTextColor,
  GoabTextSize,
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
  GoabDatePickerOnChangeDetail,
} from "@abgov/ui-components-common";
type EventLogEntry = {
  name: string;
  detail: unknown;
  timestamp: string;
};
const BADGE_TYPES: GoabBadgeType[] = [
  "information",
  "success",
  "important",
  "emergency",
  "dark",
  "midtone",
  "light",
  "archived",
  "aqua",
  "black",
  "blue",
  "green",
  "orange",
  "pink",
  "red",
  "violet",
  "white",
  "yellow",
  "aqua-light",
  "black-light",
  "blue-light",
  "green-light",
  "orange-light",
  "pink-light",
  "red-light",
  "violet-light",
  "yellow-light",
];
const BUTTON_TYPES: GoabButtonType[] = [
  "primary",
  "submit",
  "secondary",
  "tertiary",
  "start",
];
const BUTTON_VARIANTS: GoabButtonVariant[] = ["normal", "destructive", "inverse"];
const BUTTON_SIZES: GoabButtonSize[] = ["normal", "compact"];
const ACCORDION_HEADING_SIZES: GoabAccordionHeadingSize[] = ["small", "medium"];
const ACCORDION_ICON_POSITIONS: GoabAccordionIconPosition[] = ["left", "right"];
const CALLOUT_TYPES: GoabCalloutType[] = [
  "information",
  "success",
  "important",
  "emergency",
  "event",
];
const CALLOUT_ICON_THEMES: GoabCalloutIconTheme[] = ["outline", "filled"];
const CIRCULAR_PROGRESS_VARIANTS: GoabCircularProgressVariant[] = [
  "inline",
  "fullscreen",
];
const CIRCULAR_PROGRESS_SIZES: GoabCircularProgressSize[] = ["small", "large"];
const CONTAINER_TYPES: GoabContainerType[] = [
  "interactive",
  "non-interactive",
  "info",
  "error",
  "success",
  "important",
];
const CONTAINER_ACCENTS: Array<GoabContainerAccent | undefined> = [
  undefined,
  "thin",
  "thick",
  "filled",
];
const CONTAINER_PADDINGS: GoabContainerPadding[] = ["compact", "relaxed"];
const CONTAINER_WIDTHS: GoabContainerWidth[] = ["content", "full"];
const DATE_PICKER_INPUTS: GoabDatePickerInputType[] = ["calendar", "input"];
const DROPDOWN_MOUNT_TYPES: GoabDropdownItemMountType[] = ["append", "prepend", "reset"];
const FILTER_CHIP_THEMES: GoabFilterChipTheme[] = ["outline", "filled"];
const FORM_ITEM_LABEL_SIZES: GoabFormItemLabelSize[] = ["regular", "large"];
const FORM_STEP_STATUSES: GoabFormStepStatus[] = [
  "not-started",
  "incomplete",
  "complete",
];
const ICON_BUTTON_VARIANTS: GoabIconButtonVariant[] = [
  "color",
  "nocolor",
  "dark",
  "light",
  "destructive",
];
const ICON_TYPES: GoabIconType[] = [
  "home",
  "alert",
  "checkmark-circle",
  "information-circle",
  "menu",
];
const LINK_BUTTON_TYPES: GoabLinkButtonType[] = [
  "start",
  "primary",
  "secondary",
  "tertiary",
];
const POPOVER_POSITIONS: GoabPopoverPosition[] = ["auto", "above", "below"];
const SPINNER_TYPES: GoabSpinnerType[] = ["infinite", "progress"];
const SPINNER_SIZES: GoabSpinnerSize[] = ["small", "medium", "large", "xlarge"];
const NOTIFICATION_TYPES: GoabNotificationType[] = [
  "information",
  "important",
  "emergency",
  "event",
];
const MODAL_CALLOUT_VARIANTS: GoabModalCalloutVariant[] = [
  "information",
  "important",
  "emergency",
  "success",
  "event",
];
const SKELETON_TYPES: GoabSkeletonType[] = [
  "text",
  "title",
  "text-small",
  "avatar",
  "header",
  "paragraph",
  "thumbnail",
  "card",
  "profile",
];
const SKELETON_SIZES: GoabSkeletonSize[] = ["1", "2", "3", "4"];
const TOOLTIP_POSITIONS: GoabTooltipPosition[] = ["top", "bottom", "left", "right"];
const TOOLTIP_ALIGNMENTS: GoabTooltipHorizontalAlignment[] = ["left", "center", "right"];
const TEXT_SIZES: GoabTextSize[] = [
  "heading-xl",
  "heading-l",
  "heading-m",
  "heading-s",
  "heading-xs",
  "body-l",
  "body-m",
  "body-s",
  "body-xs",
];
const TEXT_COLORS: GoabTextColor[] = ["primary", "secondary"];
const TEXTAREA_COUNT_BY: GoabTextAreaCountBy[] = ["", "character", "word"];
const TAB_ITEMS = [
  { id: "tab-1", heading: "Overview" },
  { id: "tab-2", heading: "Details" },
  { id: "tab-3", heading: "Attachments" },
];
const TABLE_DATA = [
  { name: "Alpha", created: "2024-02-14", status: "Active", progress: 68 },
  { name: "Beta", created: "2023-11-08", status: "Paused", progress: 34 },
  { name: "Gamma", created: "2024-05-22", status: "Active", progress: 82 },
];
export function EverythingRoute(): JSX.Element {
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxListSelection, setCheckboxListSelection] = useState<string[]>([]);
  const [dropdownSelection, setDropdownSelection] = useState<string | undefined>();
  const [dropdownMultiSelection, setDropdownMultiSelection] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState("option-1");
  const [datePickerValue, setDatePickerValue] = useState("2025-05-15");
  const [datePickerInputValue, setDatePickerInputValue] = useState<
    string | Date | undefined
  >("2025-05-20");
  const [textInputValue, setTextInputValue] = useState("Sample value");
  const [numberInputValue, setNumberInputValue] = useState<number>(42);
  const [textareaValue, setTextareaValue] = useState(
    "Sample multiline text\nsecond line",
  );
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<string | undefined>();
  const [spinnerProgress] = useState(65);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    perPage: 10,
    total: 75,
  });
  const [tableSortState, setTableSortState] = useState<GoabTableOnSortDetail>({
    sortBy: "name",
    sortDir: -1,
  });
  const [tabsState, setTabsState] = useState(1);
  const [formStepperState, setFormStepperState] = useState(-1);
  const [drawerState, setDrawerState] = useState<{
    open: boolean;
    position: GoabDrawerPosition;
  }>({
    open: false,
    position: "right",
  });
  const [modalState, setModalState] = useState({ standard: false, alert: false });
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [accordionLastToggle, setAccordionLastToggle] = useState<{
    heading: string;
    open: boolean;
  }>();
  const [chipClicks, setChipClicks] = useState(0);
  const [filterChipClicks, setFilterChipClicks] = useState(0);
  const [fileUploadCardEvents, setFileUploadCardEvents] = useState<string[]>([]);
  const [fileUploadInputFiles, setFileUploadInputFiles] = useState<string[]>([]);
  const [headerMenuActivated, setHeaderMenuActivated] = useState(false);
  const [iconButtonClickCount, setIconButtonClickCount] = useState<
    Record<GoabIconButtonVariant, number>
  >({
    color: 0,
    nocolor: 0,
    dark: 0,
    light: 0,
    destructive: 0,
  });
  const [inputTrailingClicks, setInputTrailingClicks] = useState(0);
  const [numberInputTrailingClicks, setNumberInputTrailingClicks] = useState(0);
  const [menuAction, setMenuAction] = useState<string | undefined>();
  const [publicFormEvents, setPublicFormEvents] = useState<string[]>([]);
  const [fieldsetContinueEvents, setFieldsetContinueEvents] = useState<
    GoabFieldsetOnContinueDetail[]
  >([]);
  const [publicSubformEvents, setPublicSubformEvents] = useState<string[]>([]);
  const logEvent = (name: string, detail: unknown) => {
    console.log(`[everything][react] ${name}`, detail);
    const entry: EventLogEntry = { name, detail, timestamp: new Date().toISOString() };
    setEventLog((prev) => [entry, ...prev].slice(0, 50));
  };
  const handleButtonClick = (
    type: GoabButtonType,
    variant?: GoabButtonVariant,
    size?: GoabButtonSize,
  ) => {
    logEvent("button.click", { type, variant, size });
  };
  const handleAccordionChange = (heading: string, open: boolean) => {
    setAccordionLastToggle({ heading, open });
    logEvent("accordion.change", { heading, open });
  };
  const handleCheckboxChange = (detail: GoabCheckboxOnChangeDetail) => {
    setCheckboxValue(detail.checked);
    logEvent("checkbox.change", detail);
  };
  const handleCheckboxListChange = (detail: GoabCheckboxListOnChangeDetail) => {
    setCheckboxListSelection(detail.value || []);
    logEvent("checkboxList.change", detail);
  };
  const handleDropdownChange = (detail: GoabDropdownOnChangeDetail) => {
    setDropdownSelection(detail.value);
    setDropdownMultiSelection(detail.values || []);
    logEvent("dropdown.change", detail);
  };
  const handleCalendarChange = (detail: GoabCalendarOnChangeDetail) => {
    setCalendarSelectedDate(detail.value);
    logEvent("calendar.change", detail);
  };
  const handleChipClick = (label: string) => {
    setChipClicks((prev) => {
      const next = prev + 1;
      logEvent("chip.click", { label, count: next });
      return next;
    });
  };
  const handleFilterChipClick = (label: string) => {
    setFilterChipClicks((prev) => {
      const next = prev + 1;
      logEvent("filterChip.click", { label, count: next });
      return next;
    });
  };
  const handleRadioChange = (detail: GoabRadioGroupOnChangeDetail) => {
    setSelectedRadio(detail.value);
    logEvent("radio.change", detail);
  };
  const handleDatePickerChange = (detail: GoabDatePickerOnChangeDetail) => {
    setDatePickerValue((detail.value || "").toString());
    logEvent("datePicker.change", detail);
  };
  const handleDateInputChange = (detail: GoabDatePickerOnChangeDetail) => {
    setDatePickerInputValue(detail.value);
    logEvent("datePicker.input", detail);
  };
  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    setTextInputValue(detail.value);
    logEvent("input.change", detail);
  };
  const handleInputFocus = (detail: GoabInputOnFocusDetail) =>
    logEvent("input.focus", detail);
  const handleInputBlur = (detail: GoabInputOnBlurDetail) =>
    logEvent("input.blur", detail);
  const handleInputKeyPress = (detail: GoabInputOnKeyPressDetail) =>
    logEvent("input.keyPress", detail);
  const handleInputTrailingIconClick = () => {
    setInputTrailingClicks((prev) => {
      const next = prev + 1;
      logEvent("input.trailingIconClick", { count: next });
      return next;
    });
  };
  const handleNumberInputChange = (detail: GoabInputOnChangeDetail<number>) => {
    setNumberInputValue(Number(detail.value));
    logEvent("input-number.change", detail);
  };
  const handleNumberInputTrailingIconClick = () => {
    setNumberInputTrailingClicks((prev) => {
      const next = prev + 1;
      logEvent("input-number.trailingIconClick", { count: next });
      return next;
    });
  };
  const handleTextareaChange = (detail: GoabTextAreaOnChangeDetail) => {
    setTextareaValue(detail.value);
    logEvent("textarea.change", detail);
  };
  const handleTextareaKeyPress = (detail: GoabTextAreaOnKeyPressDetail) =>
    logEvent("textarea.keyPress", detail);
  const handleTextareaBlur = (detail: GoabTextAreaOnBlurDetail) =>
    logEvent("textarea.blur", detail);
  const handleFileUploadCardCancel = (detail: GoabFileUploadOnCancelDetail) => {
    setFileUploadCardEvents((prev) =>
      [`Cancelled: ${detail.filename}`, ...prev].slice(0, 5),
    );
    logEvent("fileUploadCard.cancel", detail);
  };
  const handleFileUploadCardDelete = (detail: GoabFileUploadOnDeleteDetail) => {
    setFileUploadCardEvents((prev) =>
      [`Deleted: ${detail.filename}`, ...prev].slice(0, 5),
    );
    logEvent("fileUploadCard.delete", detail);
  };
  const handleFileUploadInputSelect = (detail: GoabFileUploadInputOnSelectFileDetail) => {
    setFileUploadInputFiles((prev) => {
      const name = detail.file?.name;
      if (!name) {
        return prev;
      }
      return [name, ...prev].slice(0, 5);
    });
    logEvent("fileUploadInput.select", {
      name: detail.file?.name,
      size: detail.file?.size,
      type: detail.file?.type,
    });
  };
  const toggleDrawer = (position: GoabDrawerPosition) => {
    setDrawerState((prev) => {
      const nextOpen = !(prev.open && prev.position === position);
      const next = { open: nextOpen, position };
      logEvent("drawer.toggle", next);
      return next;
    });
  };
  const handleDrawerClose = () => {
    setDrawerState((prev) => ({ ...prev, open: false }));
    logEvent("drawer.close", {});
  };
  const openModal = (kind: "standard" | "alert") => {
    setModalState((prev) => {
      const next = { ...prev, [kind]: true };
      logEvent(`modal.${kind}.open`, true);
      return next;
    });
  };
  const closeModal = (kind: "standard" | "alert") => {
    setModalState((prev) => {
      const next = { ...prev, [kind]: false };
      logEvent(`modal.${kind}.close`, true);
      return next;
    });
  };
  const handleNotificationDismiss = () => {
    setNotificationDismissed(true);
    logEvent("notification.dismiss", {});
  };
  const handleHeaderMenuClick = () => {
    setHeaderMenuActivated(true);
    logEvent("header.menuClick", {});
  };
  const handleIconButtonClick = (variant: GoabIconButtonVariant) => {
    setIconButtonClickCount((prev) => {
      const next = { ...prev, [variant]: (prev[variant] || 0) + 1 };
      logEvent("iconButton.click", { variant, count: next[variant] });
      return next;
    });
  };
  const handleMenuAction = (detail: GoabMenuButtonOnActionDetail) => {
    setMenuAction(detail.action);
    logEvent("menu.action", detail);
  };
  const handlePaginationChange = (detail: GoabPaginationOnChangeDetail) => {
    setPaginationState((prev) => ({ ...prev, page: detail.page }));
    logEvent("pagination.change", detail);
  };
  const handleTabsChange = (detail: GoabTabsOnChangeDetail) => {
    setTabsState(detail.tab);
    logEvent("tabs.change", detail);
  };
  const handleTableSort = (detail: GoabTableOnSortDetail) => {
    setTableSortState(detail);
    logEvent("table.sort", detail);
  };
  const handleFormStepperChange = (detail: GoabFormStepperOnChangeDetail) => {
    setFormStepperState(detail.step);
    logEvent("formStepper.change", detail);
  };
  const drawerActions = (
    <GoabButton type="secondary" onClick={() => toggleDrawer(drawerState.position)}>
      Close
    </GoabButton>
  );
  const modalPrimaryActions = (
    <GoabButtonGroup alignment="end">
      <GoabButton type="secondary" onClick={() => closeModal("standard")}>
        Cancel
      </GoabButton>
      <GoabButton type="primary" onClick={() => closeModal("standard")}>
        Confirm
      </GoabButton>
    </GoabButtonGroup>
  );
  const modalAlertActions = (
    <GoabButton type="primary" onClick={() => closeModal("alert")}>
      Acknowledge
    </GoabButton>
  );
  const heroActions = (
    <GoabButtonGroup alignment="start">
      <GoabButton type="primary" onClick={() => handleButtonClick("primary")}>
        Get started
      </GoabButton>
      <GoabButton type="secondary" onClick={() => handleButtonClick("secondary")}>
        Secondary CTA
      </GoabButton>
    </GoabButtonGroup>
  );
  const tooltipContent = "Tooltip content rendered via template.";
  const popoverTarget = <GoabButton type="tertiary">Popover target</GoabButton>;
  const eventLogSection = (
    <GoabDetails maxWidth="100%" heading="Event Log" open>
      <GoabBlock gap="s" direction="column">
        <GoabText tag="h3" size="heading-s">
          Recent events
        </GoabText>
        <GoabBlock gap="2xs" direction="column">
          {eventLog.length === 0 ? (
            <GoabText tag="p" size="body-s">
              Interact with the components to populate the log.
            </GoabText>
          ) : (
            eventLog.map((entry, index) => (
              <GoabContainer
                type="interactive"
                padding="relaxed"
                key={`${entry.timestamp}-${index}`}
                mb="xs"
              >
                <GoabBlock gap="xs" direction="column">
                  <GoabText tag="p" size="body-s">
                    <strong>{entry.timestamp}</strong> - {entry.name}
                  </GoabText>
                  <pre style={{ fontSize: 12, whiteSpace: "pre-wrap", margin: 0 }}>
                    {JSON.stringify(entry.detail, null, 2)}
                  </pre>
                </GoabBlock>
              </GoabContainer>
            ))
          )}
        </GoabBlock>
      </GoabBlock>
    </GoabDetails>
  );
  const layoutSection = (
    <GoabDetails maxWidth="100%" heading="Layout & Typography" open>
      <GoabBlock gap="l" direction="column">
        <GoabGrid minChildWidth="220px" gap="m">
          <GoabContainer type="interactive" padding="relaxed">
            <GoabText tag="h3" size="heading-s">
              Text sizes
            </GoabText>
            <GoabBlock gap="xs" direction="column">
              {TEXT_SIZES.map((size) => (
                <GoabText
                  key={size}
                  tag={size.startsWith("heading") ? "h4" : "p"}
                  size={size}
                >
                  {size}
                </GoabText>
              ))}
            </GoabBlock>
          </GoabContainer>
          <GoabContainer type="interactive" padding="relaxed">
            <GoabText tag="h3" size="heading-s">
              Text colors
            </GoabText>
            <GoabBlock gap="xs" direction="column">
              {TEXT_COLORS.map((color) => (
                <GoabText key={color} tag="p" size="body-m" color={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)} text
                </GoabText>
              ))}
            </GoabBlock>
          </GoabContainer>
          <GoabContainer type="interactive" padding="relaxed">
            <GoabText tag="h3" size="heading-s">
              Block variations
            </GoabText>
            <GoabBlock gap="xs" direction="column">
              <GoabBlock gap="m" direction="row">
                <GoabBadge type="information" content="Row layout" />
                <GoabBadge type="success" content="Gap m" />
              </GoabBlock>
              <GoabBlock gap="xs" direction="column" alignment="center">
                <GoabBadge type="important" content="Column layout" />
                <GoabBadge type="success" content="Centered" />
              </GoabBlock>
            </GoabBlock>
          </GoabContainer>
        </GoabGrid>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Containers
          </GoabText>
          <GoabGrid minChildWidth="240px" gap="m">
            {CONTAINER_TYPES.map((type, index) => (
              <GoabContainer
                key={type}
                type={type}
                accent={CONTAINER_ACCENTS[index % CONTAINER_ACCENTS.length]}
                padding={CONTAINER_PADDINGS[index % CONTAINER_PADDINGS.length]}
                width={CONTAINER_WIDTHS[index % CONTAINER_WIDTHS.length]}
              >
                <GoabText tag="p" size="body-m">
                  Type: {type}
                  <br />
                  Accent: {CONTAINER_ACCENTS[index % CONTAINER_ACCENTS.length] ?? "none"}
                </GoabText>
              </GoabContainer>
            ))}
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Grid & Column layout
          </GoabText>
          <GoabOneColumnLayout>
            <GoabGrid minChildWidth="180px" gap="s" mt="s">
              <GoabPageBlock width="content">
                <GoabText tag="h4" size="heading-xs">
                  Responsive grid cards
                </GoabText>
                <GoabText tag="p" size="body-m">
                  The grid wrapper uses <code>minChildWidth="180px"</code> to
                  automatically wrap items.
                </GoabText>
              </GoabPageBlock>
              <GoabContainer type="info">
                <GoabText tag="p" size="body-m">
                  Column layout constrains inner content to a readable width.
                </GoabText>
              </GoabContainer>
              <GoabContainer type="important" accent="filled">
                <GoabText tag="p" size="body-m">
                  Use padding tokens to illustrate spacing.
                </GoabText>
              </GoabContainer>
            </GoabGrid>
          </GoabOneColumnLayout>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <img
            src="https://picsum.photos/600/200?random=1"
            alt="Decorative illustration"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <GoabText tag="h3" size="heading-s">
            Card image & actions
          </GoabText>
          <GoabText tag="p" size="body-m">
            Cards support image and actions slots via dedicated wrapper components.
          </GoabText>
          <GoabDivider mb="s" />
          <GoabBlock gap="m" direction="row" alignment="start">
            <GoabButton type="secondary" onClick={() => handleButtonClick("secondary")}>
              Preview
            </GoabButton>
            <GoabButton type="primary" onClick={() => handleButtonClick("primary")}>
              Approve
            </GoabButton>
          </GoabBlock>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Spacers & Pages
          </GoabText>
          <GoabBlock gap="m" direction="row">
            <GoabBlock gap="xs" direction="column">
              <GoabText tag="h4" size="heading-xs">
                Spacer samples
              </GoabText>
              <GoabBlock direction="row" gap="none" alignment="center">
                <GoabText tag="span" size="body-s">
                  Left
                </GoabText>
                <GoabSpacer hSpacing="fill" />
                <GoabText tag="span" size="body-s">
                  Right
                </GoabText>
              </GoabBlock>
              <GoabBlock direction="column" gap="3xs">
                <GoabText tag="span" size="body-s">
                  Vertical spacer:
                </GoabText>
                <GoabSpacer vSpacing="l" />
                <GoabBadge type="success" content="Space applied" />
              </GoabBlock>
            </GoabBlock>
            <GoabBlock gap="xs" direction="column">
              <GoabText tag="h4" size="heading-xs">
                Pages control
              </GoabText>
              <GoabPages current={2}>
                <a href="#">Overview</a>
                <a href="#">Details</a>
                <a href="#">History</a>
              </GoabPages>
            </GoabBlock>
          </GoabBlock>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
  );
  const buttonsSection = (
    <GoabDetails maxWidth="100%" heading="Buttons & Actions" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Buttons by type
          </GoabText>
          <GoabGrid minChildWidth="160px" gap="m">
            {BUTTON_TYPES.map((type) => (
              <GoabButton key={type} type={type} onClick={() => handleButtonClick(type)}>
                {type.charAt(0).toUpperCase() + type.slice(1)} button
              </GoabButton>
            ))}
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Variants & sizes
          </GoabText>
          <GoabBlock gap="m" direction="column">
            {BUTTON_VARIANTS.map((variant) => (
              <GoabBlock key={variant} gap="s" direction="row" alignment="center">
                <GoabText tag="span" size="body-m">
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </GoabText>
                {BUTTON_SIZES.map((size) => (
                  <GoabButton
                    key={`${variant}-${size}`}
                    type="primary"
                    variant={variant}
                    size={size}
                    onClick={() => handleButtonClick("primary", variant, size)}
                  >
                    {size} / {variant}
                  </GoabButton>
                ))}
              </GoabBlock>
            ))}
          </GoabBlock>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Button group & links
          </GoabText>
          <GoabBlock gap="m" direction="row" alignment="center">
            <GoabButtonGroup alignment="center" gap="relaxed">
              <GoabButton type="primary" onClick={() => handleButtonClick("primary")}>
                Primary
              </GoabButton>
              <GoabButton type="secondary" onClick={() => handleButtonClick("secondary")}>
                Secondary
              </GoabButton>
              <GoabButton type="tertiary" onClick={() => handleButtonClick("tertiary")}>
                Tertiary
              </GoabButton>
            </GoabButtonGroup>
            <GoabBlock gap="xs" direction="column">
              {LINK_BUTTON_TYPES.map((linkType) => (
                <GoabLink key={linkType} action={linkType}>
                  {linkType.charAt(0).toUpperCase() + linkType.slice(1)} link (action
                  logged)
                </GoabLink>
              ))}
            </GoabBlock>
          </GoabBlock>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Icon buttons & icons
          </GoabText>
          <GoabGrid minChildWidth="160px" gap="m">
            {ICON_BUTTON_VARIANTS.map((variant, index) => (
              <GoabIconButton
                key={variant}
                variant={variant}
                icon={ICON_TYPES[index % ICON_TYPES.length]}
                title={`${variant} icon button`}
                onClick={() => handleIconButtonClick(variant)}
              />
            ))}
          </GoabGrid>
          <GoabText tag="p" size="body-s">
            Click counts: {JSON.stringify(iconButtonClickCount)}
          </GoabText>
          <GoabGrid minChildWidth="120px" gap="s" mt="s">
            {ICON_TYPES.map((icon, index) => (
              <GoabIcon
                key={`${icon}-${index}`}
                type={icon}
                size={((index % 6) + 1).toString() as GoabIconSize}
                theme={index % 2 === 0 ? "outline" : "filled"}
              />
            ))}
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Menu button
          </GoabText>
          <GoabMenuButton text="Download" onAction={handleMenuAction}>
            <GoabMenuAction text="CSV (Filtered)" action="csv-filtered" />
            <GoabMenuAction text="CSV (All)" action="csv-all" />
            <GoabMenuAction text="JSON (Filtered)" action="json-filtered" />
            <GoabMenuAction text="JSON (All)" action="json-all" />
          </GoabMenuButton>
          <GoabText tag="p" size="body-s" mt="s">
            Latest menu action: <strong>{menuAction ?? "pending"}</strong>
          </GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
  );
  const indicatorsSection = (
    <GoabDetails maxWidth="100%" heading="Indicators & Chips" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Badge palette
          </GoabText>
          <GoabGrid minChildWidth="140px" gap="s">
            {BADGE_TYPES.map((badgeType) => (
              <GoabBadge key={badgeType} type={badgeType} content={badgeType} />
            ))}
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Chips
          </GoabText>
          <GoabBlock gap="m" direction="row" alignment="center">
            <GoabChip
              content="Default chip"
              onClick={() => handleChipClick("default chip")}
            />
            <GoabChip
              content="Leading icon"
              leadingIcon="information-circle"
              iconTheme="filled"
              onClick={() => handleChipClick("leading icon")}
            />
            <GoabChip
              content="Deletable error"
              deletable
              error
              onClick={() => handleChipClick("deletable")}
            />
          </GoabBlock>
          <GoabText tag="p" size="body-s">
            Clicks tracked: {chipClicks}
          </GoabText>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Filter chips
          </GoabText>
          <GoabBlock gap="m" direction="row">
            {FILTER_CHIP_THEMES.map((theme) => (
              <GoabFilterChip
                key={theme}
                content={`${theme} theme`}
                iconTheme={theme}
                onClick={() => handleFilterChipClick(theme)}
              />
            ))}
          </GoabBlock>
          <GoabText tag="p" size="body-s">
            Filter chip clicks: {filterChipClicks}
          </GoabText>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Progress indicator
          </GoabText>
          <GoabText tag="p" size="body-s" mt="s">
            Current progress: 25%
          </GoabText>
          <GoabLinearProgress
            testId="progress-25"
            progress={25}
            showPercentage={true}
            ariaLabel="Demo progress indicator at 25%"
          ></GoabLinearProgress>
          <GoabLinearProgress
            testId="progress-indeterminate"
            progress={null}
            showPercentage={false}
            ariaLabel="Indeterminate progress indicator"
          ></GoabLinearProgress>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
  );
  const formSection = (
    <GoabDetails maxWidth="100%" heading="Form Controls" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Inputs
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem
              label="Standard input"
              requirement="required"
              helpText={<GoabText tag="span">Value: {textInputValue}</GoabText>}
            >
              <GoabInput
                name="standard-input"
                placeholder="Type here…"
                value={textInputValue}
                leadingIcon="search"
                trailingIcon="close"
                trailingIconAriaLabel="clear input"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyPress={handleInputKeyPress}
                onTrailingIconClick={handleInputTrailingIconClick}
              />
            </GoabFormItem>
            {FORM_ITEM_LABEL_SIZES.map((size) => (
              <GoabFormItem
                key={size}
                label={`Label ${size}`}
                labelSize={size}
                requirement="optional"
                helpText={<GoabText tag="span">Label size: {size}</GoabText>}
              >
                <GoabInput
                  name={`input-${size}`}
                  placeholder={`Label size: ${size}`}
                  onChange={handleInputChange}
                />
              </GoabFormItem>
            ))}
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Number input & textarea
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem
              label="Number input"
              helpText={
                <GoabText tag="span" size="body-s">
                  Current: {numberInputValue} (trailing icon clicks:{" "}
                  {numberInputTrailingClicks})
                </GoabText>
              }
            >
              <GoabInputNumber
                name="numeric"
                value={numberInputValue}
                leadingContent="$"
                trailingContent="CAD"
                trailingIcon="calculator"
                onChange={handleNumberInputChange}
                onTrailingIconClick={handleNumberInputTrailingIconClick}
              />
            </GoabFormItem>
            <GoabFormItem
              label="Textarea"
              helpText={
                <GoabText tag="span" size="body-s">
                  Length: {textareaValue.length} chars
                </GoabText>
              }
            >
              <GoabTextarea
                name="notes"
                value={textareaValue}
                placeholder="Enter notes"
                rows={4}
                countBy={TEXTAREA_COUNT_BY[1]}
                onChange={handleTextareaChange}
                onKeyPress={handleTextareaKeyPress}
                onBlur={handleTextareaBlur}
              />
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Checkboxes & radio
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem
              label="Single checkbox"
              helpText={
                <GoabText tag="span" size="body-s">
                  Checked: {checkboxValue.toString()}
                </GoabText>
              }
            >
              <GoabCheckbox
                name="single-checkbox"
                value="agree"
                text="I agree"
                checked={checkboxValue}
                onChange={handleCheckboxChange}
              />
            </GoabFormItem>
            <GoabFormItem
              label="Checkbox list"
              helpText={
                <GoabText tag="span" size="body-s">
                  Selected:{" "}
                  {checkboxListSelection.length
                    ? checkboxListSelection.join(", ")
                    : "None"}
                </GoabText>
              }
            >
              <GoabCheckboxList
                name="fruits"
                value={checkboxListSelection}
                onChange={handleCheckboxListChange}
              >
                <GoabCheckbox name="apples" value="apples" text="Apples" />
                <GoabCheckbox name="bananas" value="bananas" text="Bananas" />
                <GoabCheckbox name="pears" value="pears" text="Pears" />
              </GoabCheckboxList>
            </GoabFormItem>
            <GoabFormItem
              label="Radio group"
              helpText={
                <GoabText tag="span" size="body-s">
                  Selected: {selectedRadio}
                </GoabText>
              }
            >
              <GoabRadioGroup
                name="delivery"
                value={selectedRadio}
                orientation="horizontal"
                onChange={handleRadioChange}
              >
                <GoabRadioItem value="option-1" label="Pickup" />
                <GoabRadioItem value="option-2" label="Delivery" />
                <GoabRadioItem value="option-3" label="Courier" disabled />
              </GoabRadioGroup>
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Dropdowns
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem
              label="Single select dropdown"
              helpText={
                <GoabText tag="span" size="body-s">
                  Selected: {dropdownSelection ?? "None"}
                </GoabText>
              }
            >
              <GoabDropdown
                name="countries"
                placeholder="Select ..."
                filterable
                onChange={handleDropdownChange}
              >
                <GoabDropdownItem value="ca" label="Canada" />
                <GoabDropdownItem value="us" label="United States" />
                <GoabDropdownItem value="mx" label="Mexico" />
              </GoabDropdown>
            </GoabFormItem>
            <GoabFormItem
              label="Multi select dropdown"
              helpText={
                <GoabText tag="span" size="body-s">
                  Selected:{" "}
                  {dropdownMultiSelection.length
                    ? dropdownMultiSelection.join(", ")
                    : "None"}
                </GoabText>
              }
            >
              <GoabDropdown
                name="mounts"
                placeholder="Select mounts"
                multiselect
                value={dropdownMultiSelection}
                onChange={handleDropdownChange}
              >
                {DROPDOWN_MOUNT_TYPES.map((mount) => (
                  <GoabDropdownItem
                    key={mount}
                    value={mount}
                    label={mount}
                    mountType={mount}
                  />
                ))}
              </GoabDropdown>
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Date controls
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem label="Date picker (calendar)">
              <GoabDatePicker
                name="reviewDate"
                value={datePickerValue}
                type={DATE_PICKER_INPUTS[0]}
                onChange={handleDatePickerChange}
              />
            </GoabFormItem>
            <GoabFormItem label="Date picker (input)">
              <GoabDatePicker
                name="nextDate"
                value={datePickerInputValue}
                type={DATE_PICKER_INPUTS[1]}
                onChange={handleDateInputChange}
              />
            </GoabFormItem>
            <GoabFormItem
              label="Calendar component"
              helpText={
                <GoabText tag="span" size="body-s">
                  Selected date: {calendarSelectedDate ?? "None"}
                </GoabText>
              }
            >
              <GoabCalendar name="calendar-demo" onChange={handleCalendarChange} />
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            File upload
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem
              label="File upload input"
              helpText={
                <GoabText tag="span" size="body-s">
                  Files:{" "}
                  {fileUploadInputFiles.length ? fileUploadInputFiles.join(", ") : "None"}
                </GoabText>
              }
            >
              <GoabFileUploadInput
                variant="dragdrop"
                accept=".pdf,.docx"
                maxFileSize="1.2 MB"
                onSelectFile={handleFileUploadInputSelect}
              />
            </GoabFormItem>
            <GoabFormItem
              label="Upload card"
              helpText={
                <GoabText tag="span" size="body-s">
                  {fileUploadCardEvents[0] ?? "No actions yet"}
                </GoabText>
              }
            >
              <GoabFileUploadCard
                filename="budget.xlsx"
                size={1.5}
                onCancel={handleFileUploadCardCancel}
                onDelete={handleFileUploadCardDelete}
              />
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Form stepper
          </GoabText>
          <GoabFormStepper step={formStepperState} onChange={handleFormStepperChange}>
            {FORM_STEP_STATUSES.map((status, index) => (
              <GoabFormStep key={index} text={`Step ${index + 1}`} status={status} />
            ))}
          </GoabFormStepper>
          <GoabPages current={formStepperState} mb="3xl">
            <div>Page 1 content</div>
            <div>Page 2 content</div>
            <div>Page 3 content</div>
            <div>Page 4 content</div>
          </GoabPages>
          <GoabText tag="p" size="body-s" mt="s">
            Active step: {formStepperState}
          </GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
  );
  const feedbackSection = (
    <GoabDetails maxWidth="100%" heading="Feedback & Overlays" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Callouts
          </GoabText>
          <GoabGrid minChildWidth="260px" gap="m">
            {CALLOUT_TYPES.map((type, index) => (
              <GoabCallout
                key={type}
                type={type}
                heading={type.charAt(0).toUpperCase() + type.slice(1)}
                iconTheme={CALLOUT_ICON_THEMES[index % CALLOUT_ICON_THEMES.length]}
              >
                <GoabText tag="p" size="body-m">
                  This is a {type} callout using the{" "}
                  {CALLOUT_ICON_THEMES[index % CALLOUT_ICON_THEMES.length]} icon theme.
                </GoabText>
              </GoabCallout>
            ))}
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Notifications
          </GoabText>
          {NOTIFICATION_TYPES.map((type) => (
            <GoabNotification
              key={type}
              type={type}
              maxContentWidth="480px"
              onDismiss={handleNotificationDismiss}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} notification. Dismiss to
              trigger logging.
            </GoabNotification>
          ))}
          <GoabText tag="p" size="body-s" mt="s">
            Dismissed: {notificationDismissed.toString()}
          </GoabText>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Modal & Drawer
          </GoabText>
          <GoabBlock gap="m" direction="row">
            <GoabButton type="primary" onClick={() => openModal("standard")}>
              Open Modal
            </GoabButton>
            <GoabButton type="secondary" onClick={() => openModal("alert")}>
              Open Alert Modal
            </GoabButton>
            <GoabButton
              type="tertiary"
              onClick={() => toggleDrawer(drawerState.position)}
            >
              Toggle Drawer ({drawerState.position})
            </GoabButton>
          </GoabBlock>
          <GoabModal
            heading="Standard modal"
            open={modalState.standard}
            onClose={() => closeModal("standard")}
            actions={modalPrimaryActions}
          >
            <GoabText tag="p" size="body-m">
              Standard modal content with template driven actions.
            </GoabText>
          </GoabModal>
          <GoabModal
            heading={tooltipContent}
            open={modalState.alert}
            calloutVariant={MODAL_CALLOUT_VARIANTS[1]}
            onClose={() => closeModal("alert")}
            actions={modalAlertActions}
          >
            <GoabText tag="p" size="body-m">
              Alert modals demonstrate template headings by reusing tooltip content.
            </GoabText>
          </GoabModal>
          <GoabDrawer
            position={drawerState.position}
            open={drawerState.open}
            heading="Account drawer"
            actions={drawerActions}
            onClose={handleDrawerClose}
          >
            <GoabText tag="p" size="body-m">
              Drawer body content.
            </GoabText>
          </GoabDrawer>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Tooltip & Popover
          </GoabText>
          <GoabBlock gap="l" direction="row">
            {TOOLTIP_POSITIONS.map((pos, index) => (
              <GoabTooltip
                key={pos}
                position={pos}
                content={tooltipContent}
                hAlign="center"
              >
                <GoabButton type="secondary">Tooltip {pos}</GoabButton>
              </GoabTooltip>
            ))}
            <GoabPopover position={POPOVER_POSITIONS[1]} target={popoverTarget}>
              <GoabText tag="p" size="body-m">
                Popover content aligned {POPOVER_POSITIONS[1]} relative to the button.
              </GoabText>
            </GoabPopover>
          </GoabBlock>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Progress & Skeletons
          </GoabText>
          <GoabGrid minChildWidth="200px" gap="m">
            <GoabBlock direction="column" gap="xs">
              <GoabText tag="span" size="body-m">
                Circular progress
              </GoabText>
              {CIRCULAR_PROGRESS_VARIANTS.map((variant, index) => (
                <GoabCircularProgress
                  key={`${variant}-${index}`}
                  variant={variant}
                  size={CIRCULAR_PROGRESS_SIZES[index % CIRCULAR_PROGRESS_SIZES.length]}
                  progress={spinnerProgress}
                />
              ))}
            </GoabBlock>
            <GoabBlock direction="column" gap="xs">
              <GoabText tag="span" size="body-m">
                Spinner types
              </GoabText>
              {SPINNER_TYPES.map((type, index) => (
                <GoabSpinner
                  key={`${type}-${index}`}
                  type={type}
                  size={SPINNER_SIZES[index % SPINNER_SIZES.length]}
                />
              ))}
            </GoabBlock>
            <GoabBlock direction="column" gap="xs">
              <GoabText tag="span" size="body-m">
                Skeletons
              </GoabText>
              {SKELETON_TYPES.map((skeleton, index) => (
                <GoabSkeleton
                  key={`${skeleton}-${index}`}
                  type={skeleton}
                  size={SKELETON_SIZES[index % SKELETON_SIZES.length]}
                  lineCount={index + 1}
                />
              ))}
            </GoabBlock>
          </GoabGrid>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Temporary notification controller
          </GoabText>
          <GoabTemporaryNotificationCtrl
            verticalPosition="top"
            horizontalPosition="right"
          />
          <GoabText tag="p" size="body-s" mt="s">
            Controller is positioned top-right to ensure attributes are respected.
          </GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
  );
  const navigationSection = (
    <GoabDetails maxWidth="100%" heading="Navigation & Data" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Accordion & Tabs
          </GoabText>
          <GoabGrid minChildWidth="320px" gap="m">
            {ACCORDION_HEADING_SIZES.map((headingSize, index) => (
              <GoabAccordion
                key={`${headingSize}-${index}`}
                heading={`Accordion ${index + 1}`}
                headingSize={headingSize}
                iconPosition={
                  ACCORDION_ICON_POSITIONS[index % ACCORDION_ICON_POSITIONS.length]
                }
                headingContent={<GoabBadge type="information" content="Slot content" />}
                open={index === 0}
                onChange={(open) => handleAccordionChange(`Accordion ${index + 1}`, open)}
              >
                <GoabText tag="p" size="body-m">
                  Accordion content for {headingSize} heading. Toggle to emit change
                  events.
                </GoabText>
              </GoabAccordion>
            ))}
          </GoabGrid>
          <GoabText tag="p" size="body-s" mt="s">
            Last toggle: {accordionLastToggle?.heading ?? "None"} ?{" "}
            {accordionLastToggle?.open?.toString() ?? "n/a"}
          </GoabText>
          <GoabTabs initialTab={tabsState} onChange={handleTabsChange}>
            {TAB_ITEMS.map((tab) => (
              <GoabTab key={tab.id} heading={tab.heading}>
                <GoabText tag="p" size="body-m">
                  Content for {tab.heading}.
                </GoabText>
              </GoabTab>
            ))}
          </GoabTabs>
          <GoabText tag="p" size="body-s" mt="s">
            Selected tab index: {tabsState}
          </GoabText>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Table & Pagination
          </GoabText>
          <GoabTable variant="normal" onSort={handleTableSort}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>
                    <GoabTableSortHeader name="name" direction="none">
                      Name
                    </GoabTableSortHeader>
                  </th>
                  <th>
                    <GoabTableSortHeader name="created" direction="asc">
                      Created
                    </GoabTableSortHeader>
                  </th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.created}</td>
                    <td>{row.status}</td>
                    <td>{row.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GoabTable>
          <GoabText tag="p" size="body-s" mt="s">
            Last sort: {tableSortState.sortBy} ({tableSortState.sortDir})
          </GoabText>
          <GoabPagination
            itemCount={paginationState.total}
            perPageCount={paginationState.perPage}
            pageNumber={paginationState.page}
            variant="all"
            onChange={handlePaginationChange}
          />
          <GoabText tag="p" size="body-s" mt="s">
            Page: {paginationState.page} /{" "}
            {Math.ceil(paginationState.total / paginationState.perPage)}
          </GoabText>
        </GoabContainer>
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">
            Site chrome
          </GoabText>
          <GoabOneColumnLayout>
            <GoabMicrositeHeader type="alpha" version="UAT" />
            <GoabAppHeader heading="Sample App" onMenuClick={handleHeaderMenuClick}>
              <a href="#">Home</a>
              <GoabAppHeaderMenu heading="Menu">
                <a href="#">Item 1</a>
                <a href="#">Item 2</a>
              </GoabAppHeaderMenu>
            </GoabAppHeader>
            <GoabHeroBanner
              heading="Hero banner"
              backgroundUrl="https://picsum.photos/1200/400?random=3"
            >
              <GoabText tag="p" size="body-l">
                Hero banner demonstrates background imagery and projected actions.
              </GoabText>
              <GoabHeroBannerActions>{heroActions}</GoabHeroBannerActions>
            </GoabHeroBanner>
            <GoabBlock direction="row" gap="l" mt="m">
              <GoabSideMenu>
                <GoabSideMenuHeading>Menu heading</GoabSideMenuHeading>
                <GoabSideMenuGroup heading="Group one">
                  <a href="#">Link A</a>
                  <a href="#">Link B</a>
                </GoabSideMenuGroup>
                <a href="#">Loose link</a>
              </GoabSideMenu>
              <GoabPageBlock width="full">
                <GoabText tag="p" size="body-m">
                  Content area with side menu demonstrates layout wrappers.
                </GoabText>
              </GoabPageBlock>
            </GoabBlock>
            <GoabAppFooter maxContentWidth="100%">
              <GoabAppFooterNavSection heading="Resources">
                <a href="#">Documentation</a>
                <a href="#">Support</a>
              </GoabAppFooterNavSection>
              <GoabAppFooterMetaSection>
                <GoabText tag="p" size="body-s">
                  Copyright 2025 Government of Alberta
                </GoabText>
              </GoabAppFooterMetaSection>
            </GoabAppFooter>
          </GoabOneColumnLayout>
          <GoabText tag="p" size="body-s" mt="s">
            Header menu clicked: {headerMenuActivated.toString()}
          </GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
  );
  const sections = [
    eventLogSection,
    layoutSection,
    buttonsSection,
    indicatorsSection,
    formSection,
    feedbackSection,
    navigationSection,
  ];
  return (
    <GoabBlock gap="xl" direction="column">
      <GoabText tag="h1" size="heading-l">
        All Components - React Component Showcase
      </GoabText>
      <GoabText tag="p" size="body-m">
        This route mirrors the Angular manual test to verify every component and event
        handler in the React wrappers.
      </GoabText>
      {sections.map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </GoabBlock>
  );
}
export default EverythingRoute;
