# Skeleton loader

Provide visual feedback to users while loading a content heavy page or page element.

**Status:** stable | **Category:** Feedback And Alerts | **Docs:** https://design.alberta.ca/components/skeleton

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `lineCount` | number | `3` | No | Used within components that contain multiple lines. Currently only used in card skeleton type. |
| `maxWidth` | string | `300px` | No | Sets the maximum width. Currently only used in card skeleton type. |
| `mb` | Spacing | (none) | No | (none) |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `size` | GoabSkeletonSize | `1` | No | Size can affect either the height, width or both for different skeleton types. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabSkeletonType | (none) | Yes | Sets the skeleton shape to represent your content. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `lineCount` | number | (none) | No | Used within components that contain multiple lines. Currently only used in card skeleton type. |
| `maxWidth` | string | `300px` | No | Sets the maximum width. Currently only used in card skeleton type. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `size` | GoabSkeletonSize | (none) | No | Size can affect either the height, width or both for different skeleton types. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `type` | GoabSkeletonType | (none) | Yes | Sets the skeleton shape to represent your content. |

---

## Web Components

Tag: `goa-skeleton`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `linecount` | number | `3` | No | Used within components that contain multiple lines. Currently only used in card skeleton type |
| `maxwidth` | string | `300px` | No | Sets the maximum width. Currently only used in card skeleton type. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `size` | "1" \| "2" \| "3" \| "4" | `1` | No | Size can affect either the height, width or both for different skeleton types. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "image" \| "text" \| "title" \| "text-small" \| "avatar" \| "header" \| "paragraph" \|… | (none) | Yes | Sets the skeleton shape to represent your content. |

---

## Usage guidance

### Other

- **[Do]** Choose the right loading indicator for your context.

### Types

- **[Tip]** Pick the loading indicator that matches the context. Use CircularProgress with the inline variant for a section of the page that's loading. Use the fullscreen variant when the whole page is loading and the user can't do anything else yet. Use Skeleton when part of the page can show while the rest loads, so users see structure right away instead of an empty space.
- **[Tip]** Match the skeleton type to your actual content shape. Accurate shapes reduce perceived load time and prevent layout shifts.

### States

- **[Warning]** Show an error state if loading takes too long. Don't leave skeletons showing indefinitely without feedback.

---

## Examples

- [Basic page layout](/examples/basic-page-layout)
