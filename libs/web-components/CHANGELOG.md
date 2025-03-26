# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.18.1] - 2024-01-16

### Fixed

- Dropdown width percentage is now based off parent container instead of window ([#1496](https://github.com/GovAlta/ui-components/issues/1496))
- Radio focus state now stays after element is selected ([#1430](https://github.com/GovAlta/ui-components/issues/1430))
- Helper text in Form Item no longer has a margin right ([#1318](https://github.com/GovAlta/ui-components/issues/1318))
- Disabled Radio no longer has a focus state ([#1431](https://github.com/GovAlta/ui-components/issues/1431))
- Dropdown shows the initial page number in Pagination ([#1458](https://github.com/GovAlta/ui-components/issues/1458))
- Second "eye" icon no longer shows in Edge browser for password Input ([#1499](https://github.com/GovAlta/ui-components/issues/1499))

## [1.18.0] - 2023-12-07

### Added

- Added a `keyPress` event to the Input component ([#1398](https://github.com/GovAlta/ui-components/issues/1398))
- Added a character and word counter to the TextArea component ([#1204](https://github.com/GovAlta/ui-components/issues/1204))

### Fixed

- Updated the Datepicker component to allow values to be changed programmatically ([#1443](https://github.com/GovAlta/ui-components/issues/1443))

## [1.17.0] - 2023-11-27

### Added

- Added properties to control if Microsite Header links open in a new tab or not ([#1330](https://github.com/GovAlta/ui-components/issues/1330))

### Fixed

- Improved Side Menu URL matching ([#1444](https://github.com/GovAlta/ui-components/issues/1444))
- Fixed maxWidth functionality for the Modal component ([#1446](https://github.com/GovAlta/ui-components/issues/1446))
- Dropdown change event will no longer fire on page load ([#1378](https://github.com/GovAlta/ui-components/issues/1378))
- Disabled inputs will now appear properly as disabled ([#1453](https://github.com/GovAlta/ui-components/issues/1453))
- Pagination page select dropdown will now be properly sized ([#1360](https://github.com/GovAlta/ui-components/issues/1360))
- Removed top grey border from App Header links ([#1464](https://github.com/GovAlta/ui-components/issues/1286)

## [1.15.0] - 2023-10-31

### Added

- New properties for [Hero Banner](https://ui-components.alberta.ca/?path=/docs/components-hero-banner--basic), `backgroundcolor` and `textcolor`
- Modified the default background for Hero Banner, light grey with no gradient
- Added a `maxwidth` property for Modal component
- New [Datepicker](https://ui-components.alberta.ca/?path=/docs/components-datepicker--basic) component has been created
- New [`labelsize`](https://ui-components.alberta.ca/?path=/docs/utility-form-item--label-size) property for Form Item component

### Fixed

- Width property on Dropdown component now behaving as expected
- `name` is no longer mandatory for Radio component
- Table component should now have a horizontal scroll added to it if it's to large for the container
- Accordion component on smaller screens now have proper padding
- SideMenu component will properly highlight links if your URLs have different elements in them

## [1.14.0] - 2023-08-30

### Added

- New [Side Menu Heading](https://ui-components.alberta.ca/?path=/docs/components-sidemenu--section-headings) component added to Side Menu component
- New [description](https://ui-components.alberta.ca/?path=/docs/components-radio--description) property added to Radio component
- New [description](https://alpha.ui-components.alberta.ca/?path=/docs/components-checkbox--description) property added to Checkbox component
- Button property `type` of submit now renders an actual submit button. This has no effect on the actual button due to web component limitations.
- Added `filterable` property to Dropdown component which turns it into a Combobox
- Added `arialabelledby` property to Dropdown, Form Item, and Input components for increased accessibility when combined with Form Item component

### Fixed

- Keyboard accessibility for Dropdown component now working as intended
- `LeadingContent` and `TrailingContent` properties on Input component should no longer have margin-bottom
- Icon in Dropdown component will now flip when dropdown is open vs. closed
- Table sorting is working properly again

## [1.13.0] - 2023-08-01

### Added
- New property for Dropdown component `relative` that is required if a parent container has relative positioning
- New events available for the Input component, onFocus and onBlur

### Fixed
- Toggling the native property on a dropdown no longer results in console errors
- onClick events inside the Table component will now fire correctly
- The left padding in a TextArea should now line up with an Input component

## [1.12.0] - 2023-07-17

### Added
- New component [Tooltip](https://ui-components.alberta.ca/?path=/docs/components-tooltip--basic)
- New component [Tabs](https://ui-components.alberta.ca/?path=/docs/components-tabs--basic)

### Fixed
- File Upload Card no lunger truncates the file name
- Updated right padding on `trailingIcon` property for Input component
- No console errors when opening a modal
- Incorrect values are no longer emitted by the Dropdown component when using objects
- Dropdown component keyboard accesibility has been fixed when using objects

## [1.11.0] - 2023-06-19
- Removed `onHover` and `onFocus` treatments from the Icon component
- Updated paddings and margins for the Modal component mobile view
- Added an `arialive` property to the Notification Banner component
- Updated the visual appearance of the File Upload component
- Added an `arialabel` property for the Badge component
- New `position` property added to Popover component
- Large update to the App Header component
  - The ability to add navigaton items using the new component App Header Menu
  - You can now have a "signed in" dropdown for user functionality
  - Notification icon to support in app notifications
  - Increased accessibility w/ Navigation Landmark and Keyboard Navigation
- Container has been updated to align in size when used inside a Grid component
- Removed `max-width` from Callout component
- Added `open` property to Details component
- Added the ability to apply sorting to the Table component on creation
- Textarea component will now update properly if the browser's spellcheck is used
- Dropdown component can now be reset to a "blank" value
- Added a `maxlength` property to the Input component
- Modified Form Stepper component to allow for freely traversing all complete steps
- Added a new Side Menu component

## [1.10.0] - 2023-04-21
- Added a 3-column layout: https://ui-components.alberta.ca/?path=/docs/layouts-three-column--basic
- Added a smaller callout variant for space-efficient use on small screens.
- Enhanced Popover component with dynamic positioning, allowing it to appear above, below, or to the left and right as needed.
- Removed the Alberta logo from the “production” Microsite header, increasing space for content on narrow screens.
- Fixed icon overrides for “pencil,” “checkmark,” and “remove.”
- Removed click effects on the active step of the Stepper component.
- Improved accessibility by indicating disabled stepper steps to screen readers.
- Enabled programmatic control of the Modal’s opening and closing through the “open” property.
- Increased spacing between the Footer’s header and underline.
- Updated the Table header’s border-bottom color to grey-600.

## [1.9.0] - 2023-04-11

- New component [File Upload](https://ui-components.alberta.ca/?path=/docs/components-file-upload--basic)
- Variables can now be used for `type` properties for the following components:
  - `Badge`
  - `Callout`
  - `Microsite Header`
  - `Notification Banner`
  - `Skeleton`
- Yellow border now appears `onFocus` for elements in the `Form Stepper` component on Safari
- Long headers will now wrap properly in Modals.
- If no header or `closable` property in a Modal, the content will now fill that space appropriately
- Interaction states (hover, focus, error), will now only appear on the `Input` element, and not on any leading or trailing content
- Hover state on Icons in Containers and Callouts now doesn't happen

## [1.8.0] - 2023-03-28

- New `destructive` variant for `goa-icon`
- Page selector for `goa-pagination` has been changed to a dropdown
- `goa-accordion`, `goa-container`, and `goa-details` now have the final `<p>` tag with a zero margin-bottom
- The sort functionality now works for dynamic headers in Angular v15
- `goa-dropdown` positioning has been adjusted to open up when opened at the bottom of a page
- Selected value of dropdowns can now be changed via code

## [1.7.0] - 2023-03-14

- New component [Form Stepper](https://ui-components.alberta.ca/?path=/docs/components-form-stepper--basic)
- New component [Popover](https://ui-components.alberta.ca/?path=/docs/components-popover--basic)
- There's now a separation between Modal content and the Modal actions
- Focus state on checkbox and radio now appears correctly in Safari
- Modals can now be closed with the ESC button
- Fallback fonts added via design tokens

## [1.6.0] - 2023-02-27

### Added

- New component [Details](https://ui-components.alberta.ca/?path=/docs/components-details--basic)
- New component [Accordion](https://ui-components.alberta.ca/?path=/docs/components-accordion--basic)
- New feature for `goa-table`, [Sortable](https://ui-components.alberta.ca/?path=/docs/components-table--sortable)
- New property for `goa-notification`, [_dismiss](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
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
- New component [Notification](https://ui-components.alberta.ca/?path=/docs/components-notification-banner--types)
- New component [Button Group](https://ui-components.alberta.ca/?path=/docs/components-button-group--alignment)

## [1.0.0] - 2022-11-07

### Added

- First Production Release
