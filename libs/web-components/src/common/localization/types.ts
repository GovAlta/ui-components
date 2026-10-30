export const SUPPORTED_LANGUAGES = ["en-CA", "fr-CA"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface Translations {
  dateTime: {
    locale: SupportedLanguage;
    today: string;
    yesterday: string;
    now: string;
    minutesAgo: (count: number) => string;
    hoursAgo: (count: number) => string;
    daysAgo: (count: number) => string;
  };
  calendar: {
    month: string;
    year: string;
    dayFormat: string;
    yearFormat: string;
    selectMonth: string;
    selectMonthCompact: string;
    months: readonly string[];
    weekdays: readonly string[];
    monthAriaLabel: (name: string) => string;
    yearAriaLabel: (name: string) => string;
  };
  dropdown: {
    select: string;
    noMatchesFound: string;
    clearInput: string;
  };
  dropdownMultiselect: {
    select: string;
    filter: string;
    filterOptions: string;
    clearFilter: string;
    options: string;
    selectAll: string;
    selectedItems: (count: number) => string;
  };
  pagination: {
    page: string;
    of: string;
    previous: string;
    next: string;
  };
  appHeader: {
    governmentOfAlbertaLogo: string;
    serviceName: string;
    utilitiesMenu: string;
    menu: string;
  };
  appHeaderNavigation: {
    more: string;
  };
  micrositeHeader: {
    alpha: string;
    beta: string;
    officialSiteBeforeGovernment: string;
    officialSiteAfterGovernment: string;
    newServiceBeforeGovernment: string;
    newServiceAfterGovernment: string;
    governmentOfAlberta: string;
    feedbackPrompt: string;
    feedback: string;
  };
  fileUploadInput: {
    invalidFileType: string;
    fileTooLarge: (maximumSize: string) => string;
    dragAndDrop: string;
    or: string;
    browseFiles: string;
    maximumFileSize: (maximumSize: string) => string;
    chooseFile: string;
  };
  fileUploadCard: {
    uploadedOn: (date: Date) => string;
    cancel: string;
    remove: string;
    unavailable: string;
  };
  footer: {
    copyright: (year: number) => string;
  };
  formItem: {
    optional: string;
    required: string;
  };
  filterChip: {
    removeFilter: (content?: string) => string;
  };
  menuButton: {
    openMenu: string;
  };
  linearProgress: {
    inProgress: string;
  };
  modal: {
    modal: string;
    closeModal: string;
  };
  drawer: {
    closeDrawer: string;
  };
  pushDrawer: {
    closeDrawer: string;
  };
  scrollPanel: {
    header: string;
    content: string;
    footer: string;
  };
  textArea: {
    count: (count: number, countBy: "character" | "word") => string;
    tooMany: (count: number, countBy: "character" | "word") => string;
    remaining: (count: number, countBy: "character" | "word") => string;
  };
  workspaceLayout: {
    openMenu: string;
    sideNavigation: string;
    pageContent: string;
    pushDrawer: string;
  };
  workSideMenu: {
    hideMenu: string;
    governmentOfAlbertaLogo: string;
    collapseMenu: string;
    expandMenu: string;
  };
  workSideMenuGroup: {
    closeGroup: string;
    openGroup: string;
  };
  workSideNotificationPanel: {
    notifications: string;
    closeNotifications: string;
    unread: string;
    urgent: string;
    all: string;
    caughtUp: string;
    noUnreadNotifications: string;
    noUrgentNotifications: string;
    noNotifications: string;
    viewAll: string;
    markAllAsRead: string;
  };
  workSideNotificationItem: {
    information: string;
    warning: string;
    success: string;
    critical: string;
  };
}
