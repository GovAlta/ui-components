---
name: component-search
description: Search and retrieve information from the Government of Alberta Design System's AI-friendly markdown endpoints (llms.txt and /components/[slug].md). Use when the user asks about design system components, APIs, props, events, usage guidance, or accessibility guidance.
---

# Design System Component Search

## Overview

This skill enables AI agents to search and retrieve structured documentation from the Government of Alberta Design System using its AI-friendly markdown endpoints. The design system provides:

- **llms.txt** - A complete index of all components and examples
- **/components/[slug].md** - AI-friendly markdown for each component containing full API documentation, usage guidance, and accessibility guidance

These endpoints return clean, structured markdown without custom elements or JavaScript, making them ideal for AI consumption.

**Base URL**: `https://design.alberta.ca/`

## When to Use

Apply this skill when the user's request relates to:
- Government of Alberta Design System components
- Questions about component APIs (React, Angular, Web Components)
- Props, events, slots, or attributes
- Usage guidance or accessibility requirements
- Finding components for specific purposes
- Examples and patterns

When NOT to use:
- General web development questions unrelated to the GoA Design System
- Questions about frameworks not covered by the design system
- Non-documentation requests

## Discovery & Indexing

### Step 1: Fetch the Master Index

```
GET https://design.alberta.ca/llms.txt
```

This file contains the complete inventory organized into two sections:

**Components Section** (starts with `## Components`):
```
- [Component Name](/components/{slug}.md): Brief description of purpose
```

**Examples Section** (starts with `## Examples`):
```
- [Example Name](/examples/{slug}): Brief description
```

### Step 2: Parse and Cache

Parse llms.txt to extract:
- Component names, slugs, descriptions
- Example names, slugs, descriptions
- Build an in-memory index for quick lookup

Cache the parsed index for the session to avoid repeated fetching.

## Component Markdown Structure

Each component markdown file (`/components/{slug}.md`) follows this structure:

```markdown
# Component Name

Description of the component.

**Status:** stable | **Category:** Category Name | **Docs:** https://design.alberta.ca/components/{slug}

---

## React
Tag: (none for React)

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `propName` | type | default | Yes/No | Description |

### Events
| Event | Type | Description |
|-------|------|-------------|

---

## Angular

### Props
| Prop | Type | Default | Required | Description |

### Events
| Event | Type | Description |

---

## Web Components
Tag: `goa-{slug}`

### Attributes
| Prop | Type | Default | Required | Description |

### Events
| Event | Type | Description |

### Slots
| Slot | Required | Description |

---

## Usage guidance

### [Topic Name]
- ✅ Do: Recommended practice
- ❌ Don't: Anti-pattern to avoid
- 💡 Tip: Helpful suggestion
- ⚠️ Warning: Important caution
- ℹ️ Note: Informational note

---

## Accessibility guidance

### [Topic Name]
- ✅ Do: ...
- ❌ Don't: ...

---

## Examples
- [Example Name](/examples/{slug}): Description

---

## Related components
- [Component Name](/components/{slug}): Description
```

## Search Capabilities

### 1. Component Discovery

**Query patterns:**
- "Find components for [purpose]"
- "List all [category] components"
- "What components handle [function]?"
- "Show me input components"
- "What table components do you have?"

**Action:**
1. Search the cached llms.txt index for matching component names and descriptions
2. Return matching components with:
   - Component name
   - Slug
   - Brief description
   - Category (if available)
3. Offer to fetch full details for specific matches

### 2. Detailed Component Lookup

**Query patterns:**
- "Tell me about [Component Name]"
- "Show me the [Component Name] API"
- "What are the props for [Component Name]?"
- "Show me React props for Button"
- "What events does Modal have?"
- "What are the accessibility requirements for Input?"

**Action:**
1. Resolve component name to slug using the llms.txt index
2. Fetch `https://design.alberta.ca/components/{slug}.md`
3. Parse the markdown to extract the requested information:
   - For API questions: Extract the relevant framework section (React/Angular/Web Components)
   - For props/attributes: Extract and format the Props/Attributes table
   - For events: Extract and format the Events table
   - For guidance: Extract Usage or Accessibility guidance sections
4. Return the information in a clean, readable format

### 3. Cross-Component Search

**Query patterns:**
- "Which components have a [prop name] prop?"
- "Find all components with [specific guidance]"
- "Show me components with a `disabled` attribute"
- "Which components mention [term] in their accessibility guidance?"

**Action:**
1. First, search the cached llms.txt descriptions for likely matches — avoid fetching full markdown unless the query cannot be resolved from descriptions alone
2. For likely matches only (not all 70+ components):
   - Fetch the component markdown (use cached versions if available)
   - Search the relevant section (props table, guidance, etc.) for the query term
3. Return matching components with context about where the match was found

> **Note:** Fetching all 70+ component markdown files in one agent turn is expensive and likely to exceed tool-call limits. Rely on llms.txt descriptions as a first-pass filter and only fetch full pages for strong matches.

### 4. Example Search

**Query patterns:**
- "Show me examples for [use case]"
- "Find examples using [component]"
- "List all form examples"
- "What examples demonstrate tables?"

**Action:**
1. Parse the Examples section of llms.txt
2. Match example names and descriptions against the query
3. Return matching examples with:
   - Example name
   - Slug
   - Description
   - URL

### 5. Comparison Queries

**Query patterns:**
- "Compare [Component A] and [Component B]"
- "What's the difference between Button and Icon button?"
- "Show me React vs Angular API for [Component]"

**Action:**
1. Fetch markdown for all mentioned components
2. Extract the relevant sections (APIs, props, guidance)
3. Present side-by-side comparison in markdown tables

## Implementation Guidelines

### Caching Strategy

- **llms.txt**: Fetch once per session, cache the parsed index
- **Component markdown**: Cache after first fetch, reuse for subsequent queries in the same session
- **Cache invalidation**: Refetch only if the user explicitly requests fresh data

### Error Handling

- If `llms.txt` is unavailable: "Cannot access design system index. The documentation may be temporarily unavailable."
- If a component markdown file returns 404: "Component '[name]' not found in the design system."
- If the site is down: "Design system documentation is currently unavailable at https://design.alberta.ca/"
- If parsing fails: "Unable to parse the component documentation. The format may have changed."

### Rate Limiting

- Maximum 10 requests per second to avoid overwhelming the server
- Batch requests where possible (e.g., fetch multiple components in parallel)
- Use cached data for repeated queries

## Output Formatting

### Structured Data (Props, Events, Attributes)

Use markdown tables for tabular data:

```markdown
### Button Props (React)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | "primary" \| "secondary" \| "tertiary" | `primary` | No | Visual style of the button |
| `disabled` | boolean | `false` | No | When true, prevents user interaction |
```

### Guidance

Preserve the emoji prefixes and formatting:

```markdown
### Usage Guidance

**Content**
- ✅ **Do:** Use one word to explain the function (Save, Submit, Search)
- ❌ **Don't:** Use all uppercase or all lowercase for button labels
- 💡 **Tip:** Use descriptive verbs (Submit application, Save draft)
```

### Component Lists

Use bullet lists with links:

```markdown
### Matching Components

- **[Button](/components/button.md)**: Carry out an important action or navigate to another page
- **[Icon button](/components/icon-button.md)**: A compact button with an icon and no text
- **[Dropdown](/components/dropdown.md)**: Present a list of options to the user to select from
```

### Always Include

- Links back to the full documentation: `https://design.alberta.ca/components/{slug}`
- The component's status (stable, experimental, deprecated)
- The component's category for context

## Example Interactions

### Example 1: Component Discovery

**User:** "What components do you have for forms?"

**Agent:**
1. Fetch and parse llms.txt
2. Search for components with descriptions containing "form", "input", "field", "submit"
3. Return:

```markdown
I found these form-related components in the GoA Design System:

**Input Components:**
- **[Input](/components/input.md)**: A single-line field where users can input and edit text
- **[Text area](/components/text-area.md)**: A multi-line field where users can input and edit text
- **[Checkbox](/components/checkbox.md)**: Let the user select one or more options
- **[Radio group](/components/radio-group.md)**: Allow users to select one option from a set
- **[Dropdown](/components/dropdown.md)**: Present a list of options to the user to select from
- **[Date picker](/components/date-picker.md)**: Lets users select a date through a calendar

**Form Structure:**
- **[Form item](/components/form-item.md)**: Wraps an input control with a text label, requirement label, helper text, and error text
- **[Button](/components/button.md)**: Carry out an important action (e.g., Submit)

Would you like me to show the API for any of these components?
```

### Example 2: Detailed API Lookup

**User:** "Show me the React props for Button"

**Agent:**
1. Find Button slug from llms.txt (button)
2. Fetch `/components/button.md`
3. Extract the React section and Props table
4. Return:

```markdown
## Button - React API

**Status:** stable | **Category:** Inputs And Actions

Full docs: https://design.alberta.ca/components/button

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | GoabButtonType | `primary` | No | Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, "start" for prominent call-to-action buttons, and "text" for text-only buttons. |
| `size` | GoabButtonSize | `normal` | No | Controls the size of the button. Use "compact" for inline actions or space-constrained layouts. |
| `disabled` | boolean | `false` | No | When true, prevents user interaction and applies disabled styling. |
| `leadingIcon` | GoabIconType | — | No | Icon displayed before the button text. |
| `trailingIcon` | GoabIconType | — | No | Icon displayed after the button text. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | () => void | Callback fired when the button is clicked. |

*See [Button component docs](https://design.alberta.ca/components/button) for complete usage guidance.*
```

### Example 3: Cross-Component Search

**User:** "Which components have a `disabled` prop?"

**Agent:**
1. Iterate through all components from llms.txt
2. For each, fetch markdown and search for "disabled" in props/attributes tables
3. Return:

```markdown
These components have a `disabled` prop/attribute:

| Component | Framework | Type | Default | Description |
|-----------|-----------|------|---------|-------------|
| [Button](/components/button.md) | React | boolean | `false` | When true, prevents user interaction |
| [Button](/components/button.md) | Angular | boolean | `false` | Sets the disabled state |
| [Button](/components/button.md) | Web Components | boolean | `false` | When true, prevents user interaction |
| [Input](/components/input.md) | React | boolean | `false` | When true, prevents user input |
| [Input](/components/input.md) | Angular | boolean | `false` | When true, prevents user input |
| [Checkbox](/components/checkbox.md) | React | boolean | `false` | When true, prevents user interaction |
| [Dropdown](/components/dropdown.md) | React | boolean | `false` | When true, prevents user interaction |

Would you like to see the full API for any of these components?
```

### Example 4: Guidance Search

**User:** "What are the accessibility requirements for buttons?"

**Agent:**
1. Find Button slug (button)
2. Fetch `/components/button.md`
3. Extract Accessibility guidance section
4. Return:

```markdown
## Button - Accessibility Guidance

### Screen Readers
- ❌ **Don't:** Don't read the icon class or description for icon buttons with labels. Screen readers should read the button label only.
- ✅ **Do:** Icon-only buttons must include a descriptive label for screen readers.

### Focus
- ❌ **Don't:** Don't focus on just the icon within a button. Focus the button as a whole.

*See [Button accessibility docs](https://design.alberta.ca/components/button#accessibility) for more details.*
```

## Performance Considerations

1. **First query**: Fetch llms.txt and build the index (one request)
2. **Subsequent queries**: Use cached index, only fetch new component markdown as needed
3. **Batch operations**: When searching across all components, consider:
   - First try searching the cached llms.txt descriptions
   - Only fetch full markdown for likely matches
   - Parallelize fetches where possible

## Integration with Other Skills

This skill complements other GoA Design System skills:
- **using-goa-design-system**: For high-level product type and template navigation
- **content-design**: For writing user-facing content

When a user asks a specific component question, this skill provides the detailed technical information. When they ask about building a feature, defer to using-goa-design-system for the architectural guidance.

## Common Mistakes to Avoid

- **Don't fetch llms.txt repeatedly**: Cache it for the session
- **Don't assume slug == name**: Use the slug from llms.txt, not a URL-ified version of the name
- **Don't invent information**: Only return what's in the markdown files
- **Don't ignore the guidance sections**: Usage and accessibility guidance are as important as the API
- **Do present the markdown as-is**: The `.md` files are already clean and structured — render or present them directly rather than reparsing and reformatting, which risks losing information
- **Do handle 404s gracefully**: Components may be renamed or removed

## Version

This skill is designed for the GoA Design System's AI-friendly markdown endpoints as documented in commit `d2b9b8afb2` (feat: add /llms.txt AI agent discovery index) and `e87edf906b` (feat: add /components/[slug].md AI-friendly Markdown endpoint).
