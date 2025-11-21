import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  GoabAccordion,
  GoabAppFooter,
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCallout,
  GoabCheckbox,
  GoabCheckboxList,
  GoabChip,
  GoabCircularProgress,
  GoabColumnLayout,
  GoabContainer,
  GoabDatePicker,
  GoabDetails,
  GoabDivider,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFilterChip,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabFormItem,
  GoabFormItemSlot,
  GoabFormStep,
  GoabFormStepper,
  GoabGrid,
  GoabHeroBanner,
  GoabIcon,
  GoabIconButton,
  GoabInput,
  GoabInputNumber,
  GoabLinearProgress,
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
  GoabRadioGroup,
  GoabRadioItem,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabSkeleton,
  GoabSpacer,
  GoabTab,
  GoabTable,
  GoabTableSortHeader,
  GoabTabs,
  GoabTemporaryNotificationCtrl,
  GoabText,
  GoabTextArea,
  GoabTooltip,
} from "@abgov/angular-components";
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
  GoabFormItemRequirement,
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
  GoabFormStepStatus,
  GoabFormStepperOnChangeDetail,
  GoabFormStepperType,
  GoabIconButtonVariant,
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
  GoabPaginationVariant,
  GoabPopoverPosition,
  GoabRadioGroupOnChangeDetail,
  GoabSkeletonSize,
  GoabSkeletonType,
  GoabSpinnerSize,
  GoabSpinnerType,
  GoabTableOnSortDetail,
  GoabTableVariant,
  GoabTabsOnChangeDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
  GoabTextAreaCountBy,
  GoabTextColor,
  GoabTextSize,
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
  Spacing,
  GoabIconSize,
  GoabDatePickerOnChangeDetail,
  TemporaryNotification,
} from "@abgov/ui-components-common";

type EventLogEntry = {
  name: string;
  detail: unknown;
  timestamp: string;
};

interface User {
  name: string;
  created: string;
  status: string;
  progress: number;
}

type SizeCategory = "all" | "big" | "small";

type DropdownOption = { value: string; label: string };

interface DemoFormValue {
  radio: string;
  checkbox: boolean;
  input: string;
  dropdown: string;
  date: string | null;
  checkboxList: string[];
  textarea: string;
}

@Component({
  standalone: true,
  selector: "abgov-everything",
  templateUrl: "./everything.component.html",
  styleUrls: ["./everything.component.css"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoabAccordion,
    GoabAppFooter,
    GoabAppHeader,
    GoabAppHeaderMenu,
    GoabBadge,
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabCallout,
    GoabCheckbox,
    GoabCheckboxList,
    GoabChip,
    GoabCircularProgress,
    GoabColumnLayout,
    GoabContainer,
    GoabDatePicker,
    GoabDetails,
    GoabDivider,
    GoabDrawer,
    GoabDropdown,
    GoabDropdownItem,
    GoabFileUploadCard,
    GoabFileUploadInput,
    GoabFilterChip,
    GoabAppFooterMetaSection,
    GoabAppFooterNavSection,
    GoabFormItem,
    GoabFormItemSlot,
    GoabFormStep,
    GoabFormStepper,
    GoabGrid,
    GoabHeroBanner,
    GoabIcon,
    GoabIconButton,
    GoabInput,
    GoabInputNumber,
    GoabLinearProgress,
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
    GoabRadioGroup,
    GoabRadioItem,
    GoabSideMenu,
    GoabSideMenuGroup,
    GoabSideMenuHeading,
    GoabSkeleton,
    GoabSpacer,
    GoabTab,
    GoabTable,
    GoabTableSortHeader,
    GoabTabs,
    GoabTemporaryNotificationCtrl,
    GoabText,
    GoabTextArea,
    GoabTooltip,
  ],
})
export class EverythingComponent {
  readonly accordionHeadingSizes: GoabAccordionHeadingSize[] = ["small", "medium"];
  readonly accordionIconPositions: GoabAccordionIconPosition[] = ["left", "right"];
  readonly badgeTypes: GoabBadgeType[] = [
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
  readonly buttonTypes: GoabButtonType[] = [
    "primary",
    "submit",
    "secondary",
    "tertiary",
    "start",
  ];
  readonly buttonVariants: GoabButtonVariant[] = ["normal", "destructive", "inverse"];
  readonly buttonSizes: GoabButtonSize[] = ["normal", "compact"];
  readonly calloutTypes: GoabCalloutType[] = [
    "information",
    "success",
    "important",
    "emergency",
    "event",
  ];
  readonly calloutIconThemes: GoabCalloutIconTheme[] = ["outline", "filled"];
  readonly circularProgressVariants: GoabCircularProgressVariant[] = [
    "inline",
    "fullscreen",
  ];
  readonly circularProgressSizes: GoabCircularProgressSize[] = ["small", "large"];
  readonly containerTypes: GoabContainerType[] = [
    "interactive",
    "non-interactive",
    "info",
    "error",
    "success",
    "important",
  ];
  readonly containerAccents: Array<GoabContainerAccent | undefined> = [
    undefined,
    "thin",
    "thick",
    "filled",
  ];
  readonly containerPaddings: GoabContainerPadding[] = ["compact", "relaxed"];
  readonly containerWidths: GoabContainerWidth[] = ["content", "full"];
  readonly datePickerInputs: GoabDatePickerInputType[] = ["calendar", "input"];
  readonly drawerPositions: GoabDrawerPosition[] = ["left", "right", "bottom"];
  readonly dropdownMountTypes: GoabDropdownItemMountType[] = [
    "append",
    "prepend",
    "reset",
  ];
  readonly filterChipThemes: GoabFilterChipTheme[] = ["outline", "filled"];
  readonly formItemLabelSizes: GoabFormItemLabelSize[] = ["regular", "large"];
  readonly formItemRequirements: GoabFormItemRequirement[] = ["optional", "required"];
  readonly formStepStatuses: GoabFormStepStatus[] = [
    "not-started",
    "incomplete",
    "complete",
  ];
  readonly formStepperTypes: GoabFormStepperType[] = ["constrained", "free"];
  readonly iconButtonVariants: GoabIconButtonVariant[] = [
    "color",
    "nocolor",
    "dark",
    "light",
    "destructive",
  ];
  readonly iconTypes: GoabIconType[] = [
    "home",
    "alert",
    "checkmark-circle",
    "information-circle",
    "menu",
  ];
  readonly linkButtonTypes: GoabLinkButtonType[] = [
    "start",
    "primary",
    "secondary",
    "tertiary",
  ];
  readonly paginationVariants: GoabPaginationVariant[] = ["all", "links-only"];
  readonly popoverPositions: GoabPopoverPosition[] = ["auto", "above", "below"];
  readonly spacerSizes: Spacing[] = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl"];
  readonly spinnerTypes: GoabSpinnerType[] = ["infinite", "progress"];
  readonly spinnerSizes: GoabSpinnerSize[] = ["small", "medium", "large", "xlarge"];
  readonly notificationTypes: GoabNotificationType[] = [
    "information",
    "important",
    "emergency",
    "event",
  ];
  readonly modalCalloutVariants: GoabModalCalloutVariant[] = [
    "information",
    "important",
    "emergency",
    "success",
    "event",
  ];
  readonly skeletonTypes: GoabSkeletonType[] = [
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
  readonly skeletonSizes: GoabSkeletonSize[] = ["1", "2", "3", "4"];
  readonly tableVariants: GoabTableVariant[] = ["normal", "relaxed"];
  readonly tooltipPositions: GoabTooltipPosition[] = ["top", "bottom", "left", "right"];
  readonly tooltipAlignments: GoabTooltipHorizontalAlignment[] = [
    "left",
    "center",
    "right",
  ];
  readonly textSizes: GoabTextSize[] = [
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
  readonly textColors: GoabTextColor[] = ["primary", "secondary"];
  readonly textareaCountByOptions: GoabTextAreaCountBy[] = ["", "character", "word"];

  readonly eventLog = signal<EventLogEntry[]>([]);

  readonly linkedDropdownCategories: Array<{ value: SizeCategory; label: string }> = [
    { value: "all", label: "All" },
    { value: "big", label: "Big" },
    { value: "small", label: "Small" },
  ];
  private readonly linkedDropdownItems: Record<SizeCategory, DropdownOption[]> = {
    all: [
      { value: "elephant", label: "Elephant" },
      { value: "truck", label: "Truck" },
      { value: "bus", label: "Bus" },
      { value: "key", label: "Key" },
      { value: "pen", label: "Pen" },
      { value: "watch", label: "Watch" },
    ],
    big: [
      { value: "elephant", label: "Elephant" },
      { value: "truck", label: "Truck" },
      { value: "bus", label: "Bus" },
    ],
    small: [
      { value: "key", label: "Key" },
      { value: "pen", label: "Pen" },
      { value: "watch", label: "Watch" },
    ],
  };
  linkedDropdownCategory: SizeCategory = "all";
  linkedDropdownItem = "";
  dependentDropdownItems: DropdownOption[] = [...this.linkedDropdownItems.all];

  showFullScreenProgress = false;

  readonly reactiveFormInitialValue: DemoFormValue = {
    radio: "pickup",
    checkbox: false,
    input: "",
    dropdown: "",
    date: null,
    checkboxList: [],
    textarea: "",
  };
  readonly reactiveRadioOptions: DropdownOption[] = [
    { value: "pickup", label: "Pickup" },
    { value: "delivery", label: "Delivery" },
    { value: "courier", label: "Courier" },
  ];
  readonly reactiveCheckboxListOptions: DropdownOption[] = [
    { value: "apples", label: "Apples" },
    { value: "bananas", label: "Bananas" },
    { value: "pears", label: "Pears" },
  ];
  readonly reactiveDropdownOptions: DropdownOption[] = [
    { value: "option-a", label: "Option A" },
    { value: "option-b", label: "Option B" },
    { value: "option-c", label: "Option C" },
  ];
  reactiveDemoForm!: FormGroup;

  checkboxValue = false;
  checkboxListSelection: string[] = [];
  dropdownSelection?: string;
  dropdownMultiSelection?: string;
  selectedRadio = "option-1";
  datePickerValue = "2025-05-15";
  datePickerInputValue: string | Date | undefined = "2025-05-20";
  textInputValue = "Sample value";
  numberInputValue = 42;
  textareaValue = "Sample multiline text\nsecond line";
  spinnerProgress = 65;
  paginationState = { page: 1, perPage: 10, total: 75, offset: 0 };
  tableSortState: GoabTableOnSortDetail = { sortBy: "name", sortDir: -1 };
  tabsState = { selected: 1 };
  formStepperState = { step: 1 };
  drawerState = { open: false, position: "right" as GoabDrawerPosition };
  modalState = { standard: false, alert: false };
  notificationDismissed = false;
  heroBannerExpanded = true;
  accordionLastToggle?: { heading: string; open: boolean };
  calendarSelectedDate?: string;
  chipClicks = 0;
  filterChipClicks = 0;
  fileUploadCardEvents: string[] = [];
  fileUploadInputFiles: string[] = [];
  headerMenuActivated = false;
  iconButtonClickCount: Record<GoabIconButtonVariant, number> = {
    color: 0,
    nocolor: 0,
    dark: 0,
    light: 0,
    destructive: 0,
  };
  inputTrailingClicks = 0;
  numberInputTrailingClicks = 0;
  menuAction?: string;
  readonly tabItems = [
    { id: "tab-1", heading: "Overview" },
    { id: "tab-2", heading: "Details" },
    { id: "tab-3", heading: "Attachments" },
  ];
  pageData: User[] = [];
  readonly tableData: User[] = [
    { name: "Nobe Matusiak", created: "2025-04-13", status: "Active", progress: 60 },
    { name: "Leighton Frowd", created: "2025-06-19", status: "Active", progress: 24 },
    { name: "Glendon Hardison", created: "2025-09-09", status: "Active", progress: 10 },
    {
      name: "Annadiana Delacoste",
      created: "2025-06-16",
      status: "Paused",
      progress: 78,
    },
    { name: "Kerwinn Lees", created: "2024-12-09", status: "Active", progress: 100 },
    { name: "Clair Lethbury", created: "2025-04-13", status: "Paused", progress: 86 },
    { name: "Barrie Crotty", created: "2025-05-24", status: "Active", progress: 10 },
    { name: "Bale Starkey", created: "2024-10-21", status: "Active", progress: 53 },
    { name: "Roanne Shildrick", created: "2025-05-11", status: "Active", progress: 74 },
    { name: "Ermin O'Dunneen", created: "2025-08-21", status: "Paused", progress: 50 },
    { name: "Blake Broadhurst", created: "2024-10-21", status: "Active", progress: 95 },
    { name: "Jannelle Derricoat", created: "2025-02-03", status: "Active", progress: 8 },
    { name: "Aron Brammall", created: "2025-02-25", status: "Active", progress: 47 },
    { name: "Eunice Smeuin", created: "2025-01-09", status: "Active", progress: 49 },
    { name: "Delmore Crewes", created: "2025-09-05", status: "Active", progress: 28 },
    {
      name: "Rafaellle Serchwell",
      created: "2024-11-25",
      status: "Active",
      progress: 14,
    },
    { name: "Flossie Slyford", created: "2025-06-17", status: "Active", progress: 23 },
    { name: "Jeth Pollastro", created: "2025-08-12", status: "Active", progress: 77 },
    { name: "Judie Spivie", created: "2025-04-08", status: "Paused", progress: 62 },
    { name: "Bertine Uphill", created: "2024-12-17", status: "Active", progress: 51 },
    { name: "Anabelle Pretsel", created: "2025-02-05", status: "Paused", progress: 49 },
    { name: "Sarene Kill", created: "2025-04-24", status: "Active", progress: 37 },
    { name: "Dulcie Critten", created: "2025-02-18", status: "Active", progress: 6 },
    { name: "Winnie Beazley", created: "2025-04-27", status: "Active", progress: 88 },
    { name: "Elsworth Ruprechter", created: "2024-12-30", status: "Paused", progress: 8 },
    { name: "Mari Dudliston", created: "2025-09-06", status: "Active", progress: 4 },
    { name: "Bradney Hartigan", created: "2025-04-28", status: "Paused", progress: 63 },
    {
      name: "Hedwiga Spellsworth",
      created: "2025-07-05",
      status: "Active",
      progress: 31,
    },
    { name: "Misti Fine", created: "2025-02-14", status: "Paused", progress: 38 },
    { name: "Maurene Schurcke", created: "2025-06-09", status: "Active", progress: 84 },
    { name: "Benson Bithell", created: "2025-02-11", status: "Active", progress: 10 },
    { name: "Jenelle Gorke", created: "2025-02-18", status: "Paused", progress: 94 },
    { name: "Emmalyn Cosely", created: "2025-07-03", status: "Paused", progress: 73 },
    { name: "Lucretia Baiss", created: "2025-01-28", status: "Paused", progress: 6 },
    { name: "Neel Flury", created: "2025-10-14", status: "Paused", progress: 7 },
    { name: "Celisse Grennan", created: "2025-06-06", status: "Paused", progress: 78 },
    { name: "Lorena Turbat", created: "2024-12-01", status: "Active", progress: 17 },
    { name: "Kingsly Fairlem", created: "2025-07-16", status: "Paused", progress: 33 },
    { name: "Karlen Bettesworth", created: "2024-11-14", status: "Active", progress: 70 },
    { name: "Rosalinda Ruston", created: "2025-08-25", status: "Active", progress: 43 },
    { name: "Lela Miko", created: "2025-05-11", status: "Active", progress: 2 },
    { name: "Inigo Kitcatt", created: "2024-11-03", status: "Paused", progress: 58 },
    { name: "Harrietta Blabey", created: "2025-03-31", status: "Active", progress: 95 },
    { name: "Hephzibah Hutley", created: "2025-02-09", status: "Active", progress: 61 },
    { name: "Hagan MacCafferky", created: "2025-06-30", status: "Paused", progress: 46 },
    { name: "Georgena Ternent", created: "2025-04-12", status: "Paused", progress: 90 },
    { name: "Ari Giacopello", created: "2025-05-02", status: "Active", progress: 20 },
    { name: "Brandea McCuish", created: "2025-03-03", status: "Paused", progress: 42 },
    { name: "Rooney Nund", created: "2025-04-15", status: "Paused", progress: 9 },
    { name: "Angie Stelfox", created: "2025-07-11", status: "Paused", progress: 18 },
    { name: "Michale Reede", created: "2025-04-16", status: "Active", progress: 36 },
    { name: "Clive Lathbury", created: "2025-04-20", status: "Active", progress: 39 },
    { name: "Bridget Stockey", created: "2025-07-27", status: "Paused", progress: 15 },
    { name: "Bentlee Becaris", created: "2024-11-22", status: "Active", progress: 4 },
    { name: "Lee Schimoni", created: "2024-11-03", status: "Paused", progress: 86 },
    { name: "Abby Yardy", created: "2024-12-13", status: "Paused", progress: 58 },
    { name: "Wilfrid Wornham", created: "2024-12-26", status: "Paused", progress: 69 },
    { name: "Hamid McGerr", created: "2024-12-19", status: "Active", progress: 50 },
    { name: "Brooks Gregon", created: "2025-03-08", status: "Paused", progress: 17 },
    { name: "Gaelan Stoite", created: "2024-10-26", status: "Paused", progress: 49 },
    { name: "Arabella Kepe", created: "2024-12-01", status: "Paused", progress: 3 },
    { name: "Corene Briffett", created: "2025-06-11", status: "Paused", progress: 95 },
    { name: "Gale Jacques", created: "2025-04-24", status: "Active", progress: 16 },
    { name: "Jarvis Swainsbury", created: "2025-08-26", status: "Active", progress: 53 },
    { name: "Georgia Carr", created: "2024-11-06", status: "Paused", progress: 79 },
    { name: "Jerome Bradberry", created: "2025-03-12", status: "Active", progress: 27 },
    { name: "Jeremias Samet", created: "2025-02-23", status: "Active", progress: 52 },
    { name: "Leif Cayford", created: "2025-03-26", status: "Paused", progress: 92 },
    { name: "Avie Parlour", created: "2025-02-07", status: "Active", progress: 59 },
    { name: "Willette Pauletto", created: "2025-03-15", status: "Active", progress: 44 },
    { name: "Mahala Sherwill", created: "2025-05-25", status: "Paused", progress: 46 },
    { name: "Cherie Whether", created: "2024-12-10", status: "Paused", progress: 28 },
    { name: "Corrianne Lack", created: "2025-08-19", status: "Paused", progress: 18 },
    { name: "Andras Elger", created: "2025-08-04", status: "Paused", progress: 25 },
    { name: "Roscoe Savage", created: "2024-11-12", status: "Active", progress: 31 },
  ];

  logEvent(name: string, detail: unknown) {
    console.log(`[feat2802][angular] ${name}`, detail);
    const entry: EventLogEntry = {
      name,
      detail,
      timestamp: new Date().toISOString(),
    };
    this.eventLog.update((current) => [entry, ...current].slice(0, 50));
  }

  toggleDrawer(position: GoabDrawerPosition) {
    this.drawerState = {
      open: !this.drawerState.open || this.drawerState.position !== position,
      position,
    };
    this.logEvent("drawer.toggle", { open: this.drawerState.open, position });
  }

  openModal(kind: "standard" | "alert") {
    this.modalState[kind] = true;
    this.logEvent(`modal.${kind}.open`, true);
  }

  closeModal(kind: "standard" | "alert") {
    this.modalState[kind] = false;
    this.logEvent(`modal.${kind}.close`, true);
  }

  onButtonClick(
    type: GoabButtonType,
    variant?: GoabButtonVariant,
    size?: GoabButtonSize,
  ) {
    this.logEvent("button.click", { type, variant, size });
  }

  toggleFullScreenProgress() {
    this.showFullScreenProgress = !this.showFullScreenProgress;
    this.logEvent("circularProgress.fullscreenToggle", {
      open: this.showFullScreenProgress,
    });
  }

  onAccordionChange(heading: string, open: boolean) {
    this.accordionLastToggle = { heading, open };
    this.logEvent("accordion.change", { heading, open });
  }

  onCheckboxChange(detail: GoabCheckboxOnChangeDetail) {
    this.checkboxValue = detail.checked;
    this.logEvent("checkbox.change", detail);
  }

  onCheckboxListChange(detail: GoabCheckboxListOnChangeDetail) {
    this.checkboxListSelection = detail.value || [];
    this.logEvent("checkboxList.change", detail);
  }

  resetReactiveDemoForm() {
    this.reactiveDemoForm.reset({
      ...this.reactiveFormInitialValue,
      checkboxList: [...this.reactiveFormInitialValue.checkboxList],
    });
    this.logEvent("reactiveForm.reset", this.reactiveDemoForm.getRawValue());
  }

  onDropdownChange(detail: GoabDropdownOnChangeDetail) {
    this.dropdownSelection = detail.value;
    this.dropdownMultiSelection = detail.value;
    this.logEvent("dropdown.change", detail);
  }

  onLinkedDropdownCategoryChange(detail: GoabDropdownOnChangeDetail) {
    const nextCategory = (detail.value as SizeCategory) || "all";
    this.linkedDropdownCategory = nextCategory;
    this.dependentDropdownItems = [...this.linkedDropdownItems[nextCategory]];
    if (
      !this.dependentDropdownItems.some((item) => item.value === this.linkedDropdownItem)
    ) {
      this.linkedDropdownItem = "";
    }
    this.logEvent("linkedDropdown.categoryChange", detail);
  }

  onLinkedDropdownItemChange(detail: GoabDropdownOnChangeDetail) {
    this.linkedDropdownItem = detail.value || "";
    this.logEvent("linkedDropdown.itemChange", detail);
  }

  onCalendarChange(detail: GoabCalendarOnChangeDetail) {
    this.calendarSelectedDate = detail.value;
    this.logEvent("calendar.change", detail);
  }

  onChipClick(label: string) {
    this.chipClicks += 1;
    this.logEvent("chip.click", { label, count: this.chipClicks });
  }

  onFilterChipClick(label: string) {
    this.filterChipClicks += 1;
    this.logEvent("filterChip.click", { label, count: this.filterChipClicks });
  }

  onRadioChange(detail: GoabRadioGroupOnChangeDetail) {
    this.selectedRadio = detail.value;
    this.logEvent("radio.change", detail);
  }

  onDatePickerChange(detail: GoabDatePickerOnChangeDetail) {
    this.datePickerValue = detail.value?.toString() || "";
    this.logEvent("datePicker.change", detail);
  }

  onDateInputChange(detail: GoabDatePickerOnChangeDetail) {
    this.datePickerInputValue = detail.value;
    this.logEvent("datePicker.input", detail);
  }

  onInputChange(detail: GoabInputOnChangeDetail) {
    this.textInputValue = detail.value;
    this.logEvent("input.change", detail);
  }

  onInputFocus(detail: GoabInputOnFocusDetail) {
    this.logEvent("input.focus", detail);
  }

  onInputBlur(detail: GoabInputOnBlurDetail) {
    this.logEvent("input.blur", detail);
  }

  onInputKeyPress(detail: GoabInputOnKeyPressDetail) {
    this.logEvent("input.keyPress", detail);
  }

  onInputTrailingIconClick() {
    this.inputTrailingClicks += 1;
    this.logEvent("input.trailingIconClick", { count: this.inputTrailingClicks });
  }

  onInputNumberChange(detail: GoabInputOnChangeDetail) {
    this.numberInputValue = Number(detail.value);
    this.logEvent("input-number.change", detail);
  }

  onInputNumberTrailingIconClick() {
    this.numberInputTrailingClicks += 1;
    this.logEvent("input-number.trailingIconClick", {
      count: this.numberInputTrailingClicks,
    });
  }

  onTextareaChange(detail: GoabTextAreaOnChangeDetail) {
    this.textareaValue = detail.value;
    this.logEvent("textarea.change", detail);
  }

  onTextareaKeyPress(detail: GoabTextAreaOnKeyPressDetail) {
    this.logEvent("textarea.keyPress", detail);
  }

  onTextareaBlur(detail: GoabTextAreaOnBlurDetail) {
    this.logEvent("textarea.blur", detail);
  }

  onFileUploadCardCancel(detail: GoabFileUploadOnCancelDetail) {
    this.fileUploadCardEvents = [
      `Cancelled: ${detail.filename}`,
      ...this.fileUploadCardEvents,
    ].slice(0, 5);
    this.logEvent("fileUploadCard.cancel", detail);
  }

  onFileUploadCardDelete(detail: GoabFileUploadOnDeleteDetail) {
    this.fileUploadCardEvents = [
      `Deleted: ${detail.filename}`,
      ...this.fileUploadCardEvents,
    ].slice(0, 5);
    this.logEvent("fileUploadCard.delete", detail);
  }

  onFileUploadInputSelect(detail: GoabFileUploadInputOnSelectFileDetail) {
    if (detail.file) {
      this.fileUploadInputFiles = [detail.file.name, ...this.fileUploadInputFiles].slice(
        0,
        5,
      );
    }
    this.logEvent("fileUploadInput.select", {
      name: detail.file?.name,
      size: detail.file?.size,
      type: detail.file?.type,
    });
  }

  onHeaderMenuClick() {
    this.headerMenuActivated = true;
    this.logEvent("header.menuClick", {});
  }

  onIconButtonClick(variant: GoabIconButtonVariant) {
    this.iconButtonClickCount[variant] = (this.iconButtonClickCount[variant] || 0) + 1;
    this.logEvent("iconButton.click", {
      variant,
      count: this.iconButtonClickCount[variant],
    });
  }

  onMenuAction(detail: GoabMenuButtonOnActionDetail) {
    this.menuAction = detail.action;
    this.logEvent("menu.action", detail);
  }

  onPaginationChange(detail: GoabPaginationOnChangeDetail) {
    this.paginationState.page = detail.page;
    this.paginationState.offset = (detail.page - 1) * this.paginationState.perPage;
    this.pageData = this.tableData.slice(
      this.paginationState.offset,
      this.paginationState.offset + this.paginationState.perPage,
    );
    this.logEvent("pagination.change", detail);
  }

  onTabsChange(detail: GoabTabsOnChangeDetail) {
    this.tabsState.selected = detail.tab;
    this.logEvent("tabs.change", detail);
  }

  onTableSort(detail: GoabTableOnSortDetail) {
    this.tableSortState = detail;
    const { sortBy, sortDir } = detail;
    this.tableData.sort((a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir);
    this.pageData = this.tableData.slice(
      this.paginationState.offset,
      this.paginationState.offset + this.paginationState.perPage,
    );
    this.logEvent("table.sort", detail);
  }

  onFormStepperChange(detail: GoabFormStepperOnChangeDetail) {
    this.formStepperState.step = detail.step;
    this.logEvent("formStepper.change", detail);
  }

  onDrawerClose() {
    this.drawerState = { ...this.drawerState, open: false };
    this.logEvent("drawer.close", {});
  }

  onModalClose(kind: "standard" | "alert") {
    this.modalState[kind] = false;
    this.logEvent(`modal.${kind}.closeEvent`, true);
  }

  onNotificationDismiss() {
    this.notificationDismissed = true;
    this.logEvent("notification.dismiss", {});
  }

  showTempNotification() {
    TemporaryNotification.show("This is a notification message", {
      type: "basic",
      duration: "short",
    });
  }

  getIconSize(idx: number) {
    return ((idx % 6) + 1).toString() as GoabIconSize;
  }

  constructor(private readonly fb: FormBuilder) {
    this.reactiveDemoForm = this.fb.group({
      radio: this.fb.control(this.reactiveFormInitialValue.radio),
      checkbox: this.fb.control(this.reactiveFormInitialValue.checkbox),
      input: this.fb.control(this.reactiveFormInitialValue.input),
      dropdown: this.fb.control(this.reactiveFormInitialValue.dropdown),
      date: this.fb.control(this.reactiveFormInitialValue.date),
      checkboxList: this.fb.control([...this.reactiveFormInitialValue.checkboxList]),
      textarea: this.fb.control(this.reactiveFormInitialValue.textarea),
    });
    this.pageData = this.tableData.slice(0, this.paginationState.perPage);
  }
}
