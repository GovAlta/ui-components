/**
 * Configuration Registry
 *
 * Central export for all component configurations.
 * Add new component configurations here as they're created.
 */

export * from "./types";

// Form components
export { buttonConfigurations } from "./button";
export { inputConfigurations } from "./input";
export { dropdownConfigurations } from "./dropdown";
export { checkboxConfigurations } from "./checkbox";
export { checkboxListConfigurations } from "./checkbox-list";
export { radioGroupConfigurations } from "./radio-group";
export { radioItemConfigurations } from "./radio-item";
export { textAreaConfigurations } from "./text-area";
export { formItemConfigurations } from "./form-item";
export { formConfigurations } from "./form";
export { formStepperConfigurations } from "./form-stepper";
export { formStepConfigurations } from "./form-step";
export { datePickerConfigurations } from "./date-picker";
export { calendarConfigurations } from "./calendar";
export { fileUploadInputConfigurations } from "./file-upload-input";
export { fileUploadCardConfigurations } from "./file-upload-card";

// Feedback components
export { calloutConfigurations } from "./callout";
export { notificationConfigurations } from "./notification";
export { temporaryNotificationConfigurations } from "./temporary-notification";
export { badgeConfigurations } from "./badge";
export { chipConfigurations } from "./chip";
export { filterChipConfigurations } from "./filter-chip";
export { tooltipConfigurations } from "./tooltip";
export { spinnerConfigurations } from "./spinner";
export { circularProgressConfigurations } from "./circular-progress";
export { linearProgressConfigurations } from "./linear-progress";
export { skeletonConfigurations } from "./skeleton";

// Layout components
export { containerConfigurations } from "./container";
export { blockConfigurations } from "./block";
export { gridConfigurations } from "./grid";
export { pageBlockConfigurations } from "./page-block";
export { pagesConfigurations } from "./pages";
export { dividerConfigurations } from "./divider";
export { spacerConfigurations } from "./spacer";
export { scrollableConfigurations } from "./scrollable";
export { heroBannerConfigurations } from "./hero-banner";

// Navigation components
export { tabsConfigurations } from "./tabs";
export { tabConfigurations } from "./tab";
export { paginationConfigurations } from "./pagination";
export { sideMenuConfigurations } from "./side-menu";
export { sideMenuGroupConfigurations } from "./side-menu-group";
export { sideMenuHeadingConfigurations } from "./side-menu-heading";
export { workSideMenuConfigurations } from "./work-side-menu";
export { menuButtonConfigurations } from "./menu-button";
export { appHeaderConfigurations } from "./app-header";
export { appHeaderMenuConfigurations } from "./app-header-menu";
export { micrositeHeaderConfigurations } from "./microsite-header";
export { footerConfigurations } from "./footer";
export { footerNavSectionConfigurations } from "./footer-nav-section";
export { footerMetaSectionConfigurations } from "./footer-meta-section";
export { linkButtonConfigurations } from "./link-button";

// Display components
export { cardConfigurations } from "./card";
export { cardGroupConfigurations } from "./card-group";
export { cardContentConfigurations } from "./card-content";
export { cardImageConfigurations } from "./card-image";
export { cardActionsConfigurations } from "./card-actions";
export { tableConfigurations } from "./table";
export { tableSortHeaderConfigurations } from "./table-sort-header";
export { dataGridConfigurations } from "./data-grid";
export { modalConfigurations } from "./modal";
export { drawerConfigurations } from "./drawer";
export { pushDrawerConfigurations } from "./push-drawer";
export { popoverConfigurations } from "./popover";
export { accordionConfigurations } from "./accordion";
export { detailsConfigurations } from "./details";

// Utility components
export { iconConfigurations } from "./icon";
export { iconButtonConfigurations } from "./icon-button";
export { buttonGroupConfigurations } from "./button-group";
export { linkConfigurations } from "./link";
export { textConfigurations } from "./text";
export { focusTrapConfigurations } from "./focus-trap";

// Import all configurations for registry
import type { ComponentConfigurations, ConfigurationRegistry } from "./types";
import { buttonConfigurations } from "./button";
import { inputConfigurations } from "./input";
import { dropdownConfigurations } from "./dropdown";
import { checkboxConfigurations } from "./checkbox";
import { checkboxListConfigurations } from "./checkbox-list";
import { radioGroupConfigurations } from "./radio-group";
import { radioItemConfigurations } from "./radio-item";
import { textAreaConfigurations } from "./text-area";
import { formItemConfigurations } from "./form-item";
import { formConfigurations } from "./form";
import { formStepperConfigurations } from "./form-stepper";
import { formStepConfigurations } from "./form-step";
import { datePickerConfigurations } from "./date-picker";
import { calendarConfigurations } from "./calendar";
import { fileUploadInputConfigurations } from "./file-upload-input";
import { fileUploadCardConfigurations } from "./file-upload-card";
import { calloutConfigurations } from "./callout";
import { notificationConfigurations } from "./notification";
import { temporaryNotificationConfigurations } from "./temporary-notification";
import { badgeConfigurations } from "./badge";
import { chipConfigurations } from "./chip";
import { filterChipConfigurations } from "./filter-chip";
import { tooltipConfigurations } from "./tooltip";
import { spinnerConfigurations } from "./spinner";
import { circularProgressConfigurations } from "./circular-progress";
import { linearProgressConfigurations } from "./linear-progress";
import { skeletonConfigurations } from "./skeleton";
import { containerConfigurations } from "./container";
import { blockConfigurations } from "./block";
import { gridConfigurations } from "./grid";
import { pageBlockConfigurations } from "./page-block";
import { pagesConfigurations } from "./pages";
import { dividerConfigurations } from "./divider";
import { spacerConfigurations } from "./spacer";
import { scrollableConfigurations } from "./scrollable";
import { heroBannerConfigurations } from "./hero-banner";
import { tabsConfigurations } from "./tabs";
import { tabConfigurations } from "./tab";
import { paginationConfigurations } from "./pagination";
import { sideMenuConfigurations } from "./side-menu";
import { sideMenuGroupConfigurations } from "./side-menu-group";
import { sideMenuHeadingConfigurations } from "./side-menu-heading";
import { workSideMenuConfigurations } from "./work-side-menu";
import { menuButtonConfigurations } from "./menu-button";
import { appHeaderConfigurations } from "./app-header";
import { appHeaderMenuConfigurations } from "./app-header-menu";
import { micrositeHeaderConfigurations } from "./microsite-header";
import { footerConfigurations } from "./footer";
import { footerNavSectionConfigurations } from "./footer-nav-section";
import { footerMetaSectionConfigurations } from "./footer-meta-section";
import { linkButtonConfigurations } from "./link-button";
import { cardConfigurations } from "./card";
import { cardGroupConfigurations } from "./card-group";
import { cardContentConfigurations } from "./card-content";
import { cardImageConfigurations } from "./card-image";
import { cardActionsConfigurations } from "./card-actions";
import { tableConfigurations } from "./table";
import { tableSortHeaderConfigurations } from "./table-sort-header";
import { dataGridConfigurations } from "./data-grid";
import { modalConfigurations } from "./modal";
import { drawerConfigurations } from "./drawer";
import { pushDrawerConfigurations } from "./push-drawer";
import { popoverConfigurations } from "./popover";
import { accordionConfigurations } from "./accordion";
import { detailsConfigurations } from "./details";
import { iconConfigurations } from "./icon";
import { iconButtonConfigurations } from "./icon-button";
import { buttonGroupConfigurations } from "./button-group";
import { linkConfigurations } from "./link";
import { textConfigurations } from "./text";
import { focusTrapConfigurations } from "./focus-trap";

/**
 * Registry of all component configurations.
 * Lookup by component slug.
 */
export const configurationRegistry: ConfigurationRegistry = {
  // Form components
  button: buttonConfigurations,
  input: inputConfigurations,
  dropdown: dropdownConfigurations,
  checkbox: checkboxConfigurations,
  "checkbox-list": checkboxListConfigurations,
  "radio-group": radioGroupConfigurations,
  "radio-item": radioItemConfigurations,
  "text-area": textAreaConfigurations,
  "form-item": formItemConfigurations,
  form: formConfigurations,
  "form-stepper": formStepperConfigurations,
  "form-step": formStepConfigurations,
  "date-picker": datePickerConfigurations,
  calendar: calendarConfigurations,
  "file-upload-input": fileUploadInputConfigurations,
  "file-upload-card": fileUploadCardConfigurations,

  // Feedback components
  callout: calloutConfigurations,
  notification: notificationConfigurations,
  "temporary-notification": temporaryNotificationConfigurations,
  badge: badgeConfigurations,
  chip: chipConfigurations,
  "filter-chip": filterChipConfigurations,
  tooltip: tooltipConfigurations,
  spinner: spinnerConfigurations,
  "circular-progress": circularProgressConfigurations,
  "linear-progress": linearProgressConfigurations,
  skeleton: skeletonConfigurations,

  // Layout components
  container: containerConfigurations,
  block: blockConfigurations,
  grid: gridConfigurations,
  "page-block": pageBlockConfigurations,
  pages: pagesConfigurations,
  divider: dividerConfigurations,
  spacer: spacerConfigurations,
  scrollable: scrollableConfigurations,
  "hero-banner": heroBannerConfigurations,

  // Navigation components
  tabs: tabsConfigurations,
  tab: tabConfigurations,
  pagination: paginationConfigurations,
  "side-menu": sideMenuConfigurations,
  "side-menu-group": sideMenuGroupConfigurations,
  "side-menu-heading": sideMenuHeadingConfigurations,
  "work-side-menu": workSideMenuConfigurations,
  "menu-button": menuButtonConfigurations,
  "app-header": appHeaderConfigurations,
  "app-header-menu": appHeaderMenuConfigurations,
  "microsite-header": micrositeHeaderConfigurations,
  footer: footerConfigurations,
  "footer-nav-section": footerNavSectionConfigurations,
  "footer-meta-section": footerMetaSectionConfigurations,
  "link-button": linkButtonConfigurations,

  // Display components
  card: cardConfigurations,
  "card-group": cardGroupConfigurations,
  "card-content": cardContentConfigurations,
  "card-image": cardImageConfigurations,
  "card-actions": cardActionsConfigurations,
  table: tableConfigurations,
  "table-sort-header": tableSortHeaderConfigurations,
  "data-grid": dataGridConfigurations,
  modal: modalConfigurations,
  drawer: drawerConfigurations,
  "push-drawer": pushDrawerConfigurations,
  popover: popoverConfigurations,
  accordion: accordionConfigurations,
  details: detailsConfigurations,

  // Utility components
  icon: iconConfigurations,
  "icon-button": iconButtonConfigurations,
  "button-group": buttonGroupConfigurations,
  link: linkConfigurations,
  text: textConfigurations,
  "focus-trap": focusTrapConfigurations,
};

/**
 * Get configurations for a component by slug.
 * Returns undefined if no configurations exist.
 */
export function getComponentConfigurations(
  slug: string,
): ComponentConfigurations | undefined {
  return configurationRegistry[slug];
}

/**
 * Check if a component has configurations defined.
 */
export function hasConfigurations(slug: string): boolean {
  return slug in configurationRegistry;
}
