# Hero banner

A visual band of text, including an image and a call to action.

**Status:** stable | **Category:** Content Layout | **Docs:** https://design.alberta.ca/components/hero-banner

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `backgroundColor` | string | `#f8f8f8` | No | Hero Banner background color when no background image is provided. |
| `backgroundUrl` | string | (none) | No | Background image url. |
| `heading` | string | (none) | Yes | Main heading text. |
| `maxContentWidth` | string | `100%` | No | Maximum width of the content area. |
| `minHeight` | string | (none) | No | Minimum height of the hero banner. Defaults to 600px when a background image is provided. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `textColor` | string | (none) | No | Text color within the hero banner. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the actions slot. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `backgroundColor` | string | (none) | No | Hero Banner background color when no background image is provided. |
| `backgroundUrl` | string | (none) | No | Background image url. |
| `heading` | string | (none) | No | Main heading text. |
| `maxContentWidth` | string | (none) | No | Maximum width of the content area. |
| `minHeight` | string | (none) | No | Minimum height of the hero banner. Defaults to 600px when a background image is provided. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `textColor` | string | (none) | No | Text color within the hero banner. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the actions slot. |

---

## Web Components

Tag: `goa-hero-banner`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `backgroundcolor` | string | `#f8f8f8` | No | Hero Banner background color when no background image is provided |
| `backgroundurl` | string | (none) | Yes | Background image url |
| `heading` | string | (none) | Yes | Main heading text |
| `maxcontentwidth` | string | `100%` | No | Maximum width of the content area |
| `minheight` | string | (none) | Yes | Minimum height of the hero banner. Defaults to 600px when a background image is provided. |
| `testid` | string | `background` | No | Sets a data-testid attribute for automated testing. |
| `textcolor` | string | (none) | No | Text color within the hero banner. |

### Slots

| Slot | Required | Description |
|------|----------|-------------|
| `actions` | No | Content rendered in the actions slot. |

---

## Usage guidance

### Interaction

- **[Don't]** Don't include a call-to-action link in a hero banner unless it is on the home page.

### Content

- **[Don't]** Don't select photos with focal points at the edges, as text overlays the imagery.
- **[Don't]** Don't use a photograph without first cropping and resizing to fit the hero banner.
- **[Do]** Select photos that place the subject matter or focal point in the center.

### Performance

- **[Do]** Enable image optimization for desktop, tablet, and mobile to minimize loading times.

---

## Accessibility guidance

### Accessibility

- **[Do]** Ensure hero banner images are accessible by using descriptive alt text.

---

## Examples

- [Hero banner with actions](/examples/hero-banner-with-actions)
