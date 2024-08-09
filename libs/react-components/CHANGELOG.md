# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.18.0] - 2023-12-07

### Added

- Added a `keyPress` event to the Input component ([#1398](https://github.com/GovAlta/ui-components/issues/1398))
- Added a character and word counter to the TextArea component ([#1204](https://github.com/GovAlta/ui-components/issues/1204))

## [4.17.0] - 2023-11-27

### Added

- Added properties to control if Microsite Header links open in a new tab or not ([#1330](https://github.com/GovAlta/ui-components/issues/1330))

### Fixed

- Removed `scrollable` property from Modal. It was never actually used. ([#1346](https://github.com/GovAlta/ui-components/issues/1346))

## [4.15.0] - 2023-10-31

### Added

- New properties for [Hero Banner](https://ui-components.alberta.ca/?path=/docs/components-hero-banner--basic), `backgroundcolor` and `textcolor`
- Modified the default background for Hero Banner, light grey with no gradient
- Added a `maxwidth` property for Modal component
- New [Datepicker](https://ui-components.alberta.ca/?path=/docs/components-datepicker--basic) component has been created
- New `labelsize` property for Form Item component

### Fixed

- `name` is no longer mandatory for Radio component

## [4.14.0] - 2023-08-30

### Added
- New [Side Menu Heading](https://ui-components.alberta.ca/?path=/docs/components-sidemenu--section-headings) component added to Side Menu component
- New [description](https://ui-components.alberta.ca/?path=/docs/components-radio--description) property added to Radio component
- New [description](https://alpha.ui-components.alberta.ca/?path=/docs/components-checkbox--description) property added to Checkbox component
- Added `filterable` property to Dropdown component which turns it into a Combobox
- Added `arialabelledby` property to Dropdown, Form Item, and Input components for increased accessibility when combined with Form Item component

### Fixes
- No `children` errors should exist when using the latest version of React
- `label` property no longer required for Form Item component

## [4.13.0] - 2023-08-01

### Added

- New property for Dropdown component `relative` that is required if a parent container has relative positioning
- New events available for the Input component, onFocus and onBlur

### Fixed

- onClick events inside a GoABTable will now fire correctly

## [4.12.0] - 2023-07-17

### Added

- New component [Tooltip](https://ui-components.alberta.ca/?path=/docs/components-tooltip--basic)
- New component [Tabs](https://ui-components.alberta.ca/?path=/docs/components-tabs--basic)

### Fixed

- Added children properties for Accordion and Popover components
- Can no longer cause a page crash entering an invalid number with the `GoABInputDate` component

## [4.11.0] - 2023-06-19

- Added a new wrapper for `GoABTableSortHeader`
- Added an `ariaLive` property for `GoABNotification`
- Added an `ariaLabel` property for `GoABBadge`
- New component added, `GoABAppHeaderMenu` for use inside `GoABAppHeader`
- New `position` property added to `GoABPopover`
- Added `open` property to `GoABDetails`
- Added `maxLength` property to `GoABInput`
- Added new `GoABFormStepStatusType` for `GoABFormStep` component, to be used to remove eslint messages
- Added new `GoABSideMenuGroup` and `GoABSideMenu` component
- Fixed an issue with the clear button on `GoABInputDate` - it no longer returns a value

## [4.10.0] - 2023-04-21

- Added a 3-column layout [3-column layout](https://ui-components.alberta.ca/?path=/docs/layouts-three-column--basic)
- Added a smaller callout variant for space-efficient use on small screens.

## [4.9.0] - 2023-04-11

- New component [File Upload](https://ui-components.alberta.ca/?path=/docs/components-file-upload--basic)

## [4.8.0] - 2023-03-28

- New `destructive` variant for `goa-icon`

## [4.7.0] - 2023-03-14

- New component [Form Stepper](https://ui-components.alberta.ca/?path=/docs/components-form-stepper--basic)
- New component [Popover](https://ui-components.alberta.ca/?path=/docs/components-popover--basic)
- `Table` component, `variant` property is now passed correctly

## [4.6.0] - 2023-02-27

### Added

- New component [Details](https://ui-components.alberta.ca/?path=/docs/components-details--basic)
- New component [Accordion](https://ui-components.alberta.ca/?path=/docs/components-accordion--basic)
- New feature for `GoABTable`, [Sortable](https://ui-components.alberta.ca/?path=/docs/components-table--sortable)
- New property for `GoABNotificationBanner`, [onDismiss](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
- New property has been added to all components, `testid` is available for supporting automated testing

## [4.5.0] - 2023-01-31

### Added

- New component [Pagination](https://ui-components.alberta.ca/?path=/docs/components-pagination--basic)

### Removed

- Support for the library [Styles](https://www.npmjs.com/package/@abgov/styles)
  - Remove `@abgov/styles` from your `package.json`
  - Wherever you import `@abgov/styles/styles.esm.css`, change that to `@import "@abgov/web-components/index.css"`

## [4.4.0] - 2023-01-17

### Added

- `GoABTable` has a new `relaxed` [variant](https://ui-components.alberta.ca/?path=/docs/components-table--relaxed-variant)

## [4.3.0] - 2023-01-04

### Added

- `ariaLabel` property added for `GoABCheckbox` and `GoABRadioGroup` components
- New `GoABHeroBanner` property, [minHeight](https://ui-components.alberta.ca/?path=/docs/components-hero-banner--min-height)
- New component [Table](https://ui-components.alberta.ca/?path=/docs/components-table--basic)
- New `GoABDropdown` property, [native](https://ui-components.alberta.ca/?path=/docs/components-dropdown--native)

### Changed

- `prefix` and `suffix` properties have been changed to `leadingContent` and `trailingContent` [slots](https://ui-components.alberta.ca/?path=/docs/components-inputs--leading-content-and-trailing-content)

### Fixed

- `ariaLabel` properties now work for all components

## [4.2.0] - 2022-12-05

### Added

- New component [Divider](https://ui-components.alberta.ca/?path=/docs/utility-divider--spacing)
- New component [Block](https://ui-components.alberta.ca/?path=/docs/utility-block--horizontal)
- New component [Grid](https://ui-components.alberta.ca/?path=/docs/utility-grid--basic)
- New component [Spacer](https://ui-components.alberta.ca/?path=/docs/utility-spacer--basic)
- New properties for all components to control margins (`mt`, `mr`, `mb`, `ml`)

## [4.1.0] - 2022-11-16

### Added

- New modal variant [Callout](https://ui-components.alberta.ca/?path=/docs/components-modal--callout-variant)
- New component [Notification Banner](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
- New component [Button Group](https://ui-components.alberta.ca/?path=/docs/components-button-group--alignment)

## [4.0.0] - 2022-11-07

### Added

- First Production Release
