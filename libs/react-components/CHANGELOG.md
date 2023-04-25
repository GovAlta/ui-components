# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- New feature for `GoATable`, [Sortable](https://ui-components.alberta.ca/?path=/docs/components-table--sortable)
- New property for `GoANotificationBanner`, [onDismiss](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
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

- `GoATable` has a new `relaxed` [variant](https://ui-components.alberta.ca/?path=/docs/components-table--relaxed-variant)

## [4.3.0] - 2023-01-04

### Added

- `ariaLabel` property added for `GoACheckbox` and `GoARadioGroup` components
- New `GoAHeroBanner` property, [minHeight](https://ui-components.alberta.ca/?path=/docs/components-hero-banner--min-height)
- New component [Table](https://ui-components.alberta.ca/?path=/docs/components-table--basic)
- New `GoADropdown` property, [native](https://ui-components.alberta.ca/?path=/docs/components-dropdown--native)

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
