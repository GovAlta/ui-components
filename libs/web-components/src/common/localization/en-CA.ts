import type { Translations } from "./types";
import { getTimestamp } from "../utils";

function countUnit(count: number, countBy: "character" | "word"): string {
  return `${countBy}${count === 1 ? "" : "s"}`;
}

export const enCAMessages: Translations = {
  dateTime: {
    locale: "en-CA",
    today: "Today",
    yesterday: "Yesterday",
    now: "Now",
    minutesAgo: (count) => `${count} min ago`,
    hoursAgo: (count) => `${count} h ago`,
    daysAgo: (count) => `${count} d ago`,
  },
  calendar: {
    month: "Month",
    year: "Year",
    dayFormat: "Day (DD)",
    yearFormat: "Year (YYYY)",
    selectMonth: "—Select a month—",
    selectMonthCompact: "—Month—",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthAriaLabel: (name) => `${name} month`,
    yearAriaLabel: (name) => `${name} year`,
  },
  dropdown: {
    select: "—Select—",
    noMatchesFound: "No matches found",
    clearInput: "Clear input",
  },
  dropdownMultiselect: {
    select: "—Select—",
    filter: "Filter...",
    filterOptions: "Filter options",
    clearFilter: "Clear filter",
    options: "Options",
    selectAll: "Select all",
    selectedItems: (count) => `${count} items`,
  },
  pagination: {
    page: "Page",
    of: "of",
    previous: "Previous",
    next: "Next",
  },
  appHeader: {
    governmentOfAlbertaLogo: "Government of Alberta logo",
    serviceName: "[Service Name]",
    utilitiesMenu: "Utilities menu",
    menu: "Menu",
  },
  appHeaderNavigation: {
    more: "More",
  },
  micrositeHeader: {
    alpha: "Alpha",
    beta: "Beta",
    officialSiteBeforeGovernment: "An official site of the",
    officialSiteAfterGovernment: "",
    newServiceBeforeGovernment: "This is a new",
    newServiceAfterGovernment: "service",
    governmentOfAlberta: "Alberta Government",
    feedbackPrompt: "— help us improve it by giving",
    feedback: "feedback",
  },
  fileUploadInput: {
    invalidFileType: "Invalid file type",
    fileTooLarge: (maximumSize) => `The file must be less than ${maximumSize}`,
    dragAndDrop: "Drag and drop files here",
    or: "or",
    browseFiles: "Browse files",
    maximumFileSize: (maximumSize) => `Maximum file size is ${maximumSize}`,
    chooseFile: "Choose file",
  },
  fileUploadCard: {
    uploadedOn: (date) => `Uploaded on ${getTimestamp(date)}`,
    cancel: "Cancel",
    remove: "Remove",
    unavailable: "n/a",
  },
  footer: {
    copyright: (year) => `© ${year} Government of Alberta`,
  },
  formItem: {
    optional: "optional",
    required: "required",
  },
  filterChip: {
    removeFilter: (content) =>
      content ? `Remove filter: ${content}` : "Remove filter",
  },
  menuButton: {
    openMenu: "Open menu",
  },
  linearProgress: {
    inProgress: "In progress",
  },
  modal: {
    modal: "Modal",
    closeModal: "Close the modal",
  },
  drawer: {
    closeDrawer: "Close the drawer",
  },
  pushDrawer: {
    closeDrawer: "Close the drawer",
  },
  scrollPanel: {
    header: "Panel header",
    content: "Scrollable content",
    footer: "Panel footer",
  },
  textArea: {
    count: (count, countBy) => `${count} ${countUnit(count, countBy)}`,
    tooMany: (count, countBy) =>
      `${count} ${countUnit(count, countBy)} too many`,
    remaining: (count, countBy) =>
      `${count} ${countUnit(count, countBy)} remaining`,
  },
  workspaceLayout: {
    openMenu: "Open menu",
    sideNavigation: "Side navigation",
    pageContent: "Page content",
    pushDrawer: "Push drawer",
  },
  workSideMenu: {
    hideMenu: "Hide menu",
    governmentOfAlbertaLogo: "Government of Alberta logo",
    collapseMenu: "Collapse menu",
    expandMenu: "Expand menu",
  },
  workSideMenuGroup: {
    closeGroup: "Close group",
    openGroup: "Open group",
  },
  workSideNotificationPanel: {
    notifications: "Notifications",
    closeNotifications: "Close notifications",
    unread: "Unread",
    urgent: "Urgent",
    all: "All",
    caughtUp: "You're all caught up",
    noUnreadNotifications: "No unread notifications",
    noUrgentNotifications: "No urgent notifications",
    noNotifications: "No notifications",
    viewAll: "View all",
    markAllAsRead: "Mark all as read",
  },
  workSideNotificationItem: {
    information: "Information",
    warning: "Warning",
    success: "Success",
    critical: "Critical",
  },
};
