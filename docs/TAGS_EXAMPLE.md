# Adding Tags to Component Documentation

Tags are now supported in the search index! You can add tags to any component documentation file using YAML frontmatter.

## Example: Adding Tags to a Doc File

To add tags to a component's documentation, add frontmatter at the top of the file:

````markdown
---
title: Button Component
tags: [form, input, interactive, primary]
---

# Button Library

Use a button to carry out an important action or to navigate to another page.

Use it like this:

\```html
<goa-button (\_click)="onClick()" type="primary">Primary</goa-button>
\```
````

## Frontmatter Format

The frontmatter must:

- Start and end with `---` on its own line
- Use YAML syntax
- Come at the very beginning of the file

### Supported Fields

- **title**: Override the auto-extracted title from the first `#` heading
- **tags**: Array of tags to categorize and make the component searchable

### Tags Format

Tags can be specified in several ways:

```yaml
# Array notation (recommended)
tags: [form, input, interactive]

# Multi-line array
tags:
  - form
  - input
  - interactive
```

## Suggested Tag Categories

Here are some suggested tag categories for component documentation:

### By Purpose

- `form` - Form-related components
- `input` - Input controls
- `display` - Display/presentational components
- `navigation` - Navigation components
- `layout` - Layout/container components
- `feedback` - User feedback (notifications, alerts, etc.)
- `data` - Data display (tables, lists, etc.)

### By Interaction

- `interactive` - User can interact with it
- `static` - Non-interactive display
- `clickable` - Responds to clicks

### By Complexity

- `simple` - Simple, standalone component
- `composite` - Made up of multiple components
- `advanced` - Advanced features/configuration

### By Framework

- `react` - Has React-specific features
- `angular` - Has Angular-specific features
- `web-components` - Standard web component

## Example: Button Component

```markdown
---
title: Button Component
tags: [form, input, interactive, clickable, simple]
---

# Button Library

Use a button to carry out an important action...
```

## Example: Form Item Component

```markdown
---
title: Form Item Wrapper
tags: [form, layout, composite, wrapper]
---

# Form Item Library

A form item wraps an input control...
```

## How Tags Appear in Search

Once you add tags to a doc file and regenerate the index:

1. Tags are indexed for searching - users can search by tag name
2. Tags appear as small badges in search results
3. Tags help users quickly identify component categories

## Regenerate the Index

After adding tags to doc files, regenerate the search index:

```bash
npm run index:docs
```

This will update both:

- `docs/search-index.json`
- `docs/public/search-index.json`
