# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2023-02-27

### Added

- New component [Details](https://ui-components.alberta.ca/?path=/docs/components-details--basic)
- New component [Accordion](https://ui-components.alberta.ca/?path=/docs/components-accordion--basic)
- New feature for `goa-table`, [Sortable](https://ui-components.alberta.ca/?path=/docs/components-table--sortable)
- New property for `goa-notification-banner`, [_dismiss](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
- New CSS class for use in `goa-table`, [Number Columns](https://ui-components.alberta.ca/?path=/docs/components-table--number-columns)
- New CSS classes for [unordered and ordererd lists](https://ui-components.alberta.ca/?path=/docs/utility-list-elements--ordered-list)

### Changed

- `goa-input`, `goa-checkbox`, `goa-dropdown`, and `goa-text-area` have had thicker borders onHover added
- Horizontal resizing has been disabled for `goa-text-area`

### Fixed

- Line height has been adjusted for line wrapping in the `goa-table` component

## [1.5.0] - 2023-01-31

### Added

- New component [Pagination](https://ui-components.alberta.ca/?path=/docs/components-pagination--basic)
- Components should now work for [Vue v2+](https://ui-components.alberta.ca/?path=/docs/setup-vue--page)

### Changed

- All components now using [Design Tokens](https://www.npmjs.com/package/@abgov/design-tokens)

### Fixed

- `goa-input` components now have a white background colour
- `goa-dropdown-item` now updates properly when populated dynamically

### Removed

- Support for the library [Styles](https://www.npmjs.com/package/@abgov/styles)
  - Remove `@abgov/styles` from your `package.json`
  - Wherever you import `@abgov/styles/styles.esm.css`, change that to `@import "@abgov/web-components/index.css"`

## [1.4.0] - 2023-01-17

### Added

- `goa-table` has a new `relaxed` [variant](https://ui-components.alberta.ca/?path=/docs/components-table--relaxed-variant)

### Fixed

- All types for `goa-input` now use the same font
- `ariaLabel` property now working for `goa-dropdown`

## [1.3.0] - 2023-01-04

### Added

- `ariaLabel` property added for `goa-checkbox` and `goa-radio-group` components
- New `goa-hero-banner` property, [minHeight](https://ui-components.alberta.ca/?path=/docs/components-hero-banner--min-height)
- New component [Table](https://ui-components.alberta.ca/?path=/docs/components-table--basic)
- New font, `roboto-mono`
- New `goa-dropdown` property, [native](https://ui-components.alberta.ca/?path=/docs/components-dropdown--native)

### Changed

- `prefix` and `suffix` properties have been changed to `leadingContent` and `trailingContent` [slots](https://ui-components.alberta.ca/?path=/docs/components-inputs--leading-content-and-trailing-content)

### Fixed

- When disabling inputs that are using either `leadingContent` or `trailingContent` the borders around that content are properly grayed out
- When disabling `goa-text-area`, it uses a proper coloured background
- `goa-app-header` has a solid white background colour
- `goa-microsite-header` is using correcting padding

## [1.2.0] - 2022-12-05

### Added

- New component [Divider](https://ui-components.alberta.ca/?path=/docs/utility-divider--spacing)
- New component [Block](https://ui-components.alberta.ca/?path=/docs/utility-block--horizontal)
- New component [Grid](https://ui-components.alberta.ca/?path=/docs/utility-grid--basic)
- New component [Spacer](https://ui-components.alberta.ca/?path=/docs/utility-spacer--basic)
- New properties for all components to control margins (`mt`, `mr`, `mb`, `ml`)

### Fixed

- `Date` and `Datetime` input component types, AM no longer changes to PM upon repeated selections

## [1.1.0] - 2022-11-16

### Added

- New modal variant [Callout](https://ui-components.alberta.ca/?path=/docs/components-modal--callout-variant)
- New component [Notification Banner](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
- New component [Button Group](https://ui-components.alberta.ca/?path=/docs/components-button-group--alignment)

## [1.0.0] - 2022-11-07

### Added

- First Production Release
