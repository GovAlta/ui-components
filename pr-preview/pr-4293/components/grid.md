# Grid

Arrange a number of components into a responsive grid pattern.

**Status:** stable | **Category:** Utilities | **Docs:** https://design.alberta.ca/components/grid

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `gap` | Spacing | `m` | No | Gap between child items. |
| `mb` | Spacing | (none) | No | (none) |
| `minChildWidth` | string | (none) | Yes | Minimum width of the child elements. |
| `ml` | Spacing | (none) | No | (none) |
| `mr` | Spacing | (none) | No | (none) |
| `mt` | Spacing | (none) | No | (none) |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `gap` | Spacing | (none) | No | Gap between child items. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `minChildWidth` | string | (none) | Yes | Minimum width of the child elements. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |

---

## Web Components

Tag: `goa-grid`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `gap` | Spacing | `m` | No | Gap between child items. |
| `mb` | Spacing | (none) | No | Bottom margin. |
| `minchildwidth` | string | (none) | Yes | Minimum width of the child elements |
| `ml` | Spacing | (none) | No | Left margin. |
| `mr` | Spacing | (none) | No | Right margin. |
| `mt` | Spacing | (none) | No | Top margin. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |

---

## Usage guidance

### Other

- **[Don't]** Don't use a container for general page layout. Containers are for visual emphasis and grouping content.

### Sizing

- **[Warning]** minChildWidth is required on Grid. Set it based on the content's minimum readable width so items wrap properly.

---

## Examples

- [Basic page layout](/examples/basic-page-layout)
- [Card grid](/examples/card-grid)
- [Review and action](/examples/review-and-action)

---

## Related components

- [Container](/components/container): Group information, create hierarchy, and show related information.
- [Spacer](/components/spacer): Negative area between the components and the interface.
