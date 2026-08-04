# Component Search

Search and retrieve information from the Government of Alberta Design System's AI-friendly markdown endpoints.

## What it does

This skill enables AI agents to discover and query the design system's component documentation through its AI-friendly endpoints:

- **`/llms.txt`** - Complete index of all components and examples
- **`/components/[slug].md`** - Full API documentation, usage guidance, and accessibility guidance for each component in clean markdown format

Unlike scraping HTML pages, these endpoints return structured, machine-readable content specifically designed for AI consumption.

## Use Cases

| Query Type | Example | What it Returns |
|------------|---------|----------------|
| Component discovery | "What components do you have for forms?" | List of form-related components with descriptions |
| API lookup | "Show me React props for Button" | Extracted props table with types, defaults, descriptions |
| Cross-component search | "Which components have a `disabled` prop?" | List of all components with that prop across all frameworks |
| Guidance search | "What are the accessibility requirements for Input?" | Accessibility guidance section with do/don't/tip/warning notes |
| Example search | "Show me examples for tables" | List of table-related examples with descriptions |
| Comparison | "Compare Button and Icon button" | Side-by-side comparison of APIs and guidance |

## How it works

1. **Index**: Fetches `llms.txt` once per session to build a searchable index of all components and examples
2. **Resolve**: Maps component names to slugs using the index
3. **Fetch**: Retrieves individual component markdown files (`/components/{slug}.md`)
4. **Parse**: Extracts relevant sections (APIs, props, guidance) from the markdown
5. **Present**: Returns clean, formatted information optimized for readability

## Installation

```bash
npx skills add GovAlta/ui-components --skill component-search
```

## Base URL

Production: `https://design.alberta.ca/`

Local development: `http://localhost:4203/`

## Design System Version

This skill is compatible with the design system's AI-friendly endpoints introduced in:
- `d2b9b8afb2` - feat: add /llms.txt AI agent discovery index
- `e87edf906b` - feat: add /components/[slug].md AI-friendly Markdown endpoint

## Related Skills

| Skill | Purpose | Relationship |
|-------|---------|--------------|
| [using-goa-design-system](../using-goa-design-system/) | High-level product type and template navigation | Use for architectural questions; this skill for component details |
| [content-design](../content-design/) | Writing user-facing content | Complementary - handles content; this handles technical docs |

## File Structure

```
skills/component-search/
├── SKILL.md    # AI instructions (loaded automatically)
└── README.md   # This file (human documentation)
```

## Implementation Details

### Supported Frameworks

- **React** - Props, events
- **Angular** - Props, events
- **Web Components** - Attributes, events, slots

### Documentation Sections

Each component markdown includes:
- Basic info (status, category, docs link)
- Framework-specific APIs
- Usage guidance (with [Do] / [Don't] / [Tip] / [Warning] / [Note])
- Accessibility guidance (same format)
- Related examples
- Related components

### Caching

- `llms.txt` index: Cached for session
- Component markdown: Cached after first fetch
- Rate limited to ~10 requests/second

### Error Handling

- Missing llms.txt: "Cannot access design system index"
- Missing component: "Component '[name]' not found"
- Site unavailable: "Design system documentation is currently unavailable"

## Examples

### Simple Query
**Input:** "Tell me about the Button component"

**Output:** Full Button documentation including description, status, category, React/Angular/Web Components APIs, usage guidance, accessibility guidance, examples, and related components.

### API-Specific Query
**Input:** "What are the Web Components attributes for Modal?"

**Output:** Extracted Web Components section showing the tag (`goa-modal`), all attributes in a table format, events, and slots.

### Guidance Query
**Input:** "What should I avoid when using Checkbox?"

**Output:** All "[Don't]" entries from the Checkbox usage and accessibility guidance sections.

### Search Query
**Input:** "Find components for date selection"

**Output:** List of matching components (Date picker, possibly others) with their descriptions and links.

## Contributing

To update this skill:
1. Edit `SKILL.md` with new capabilities or corrected behavior
2. Update this `README.md` with any user-facing changes
3. Test by loading the skill and trying various queries

The skill automatically adapts to changes in the design system's markdown endpoints, as it parses the content dynamically rather than relying on hardcoded patterns.

## License

Same as the ui-components repository.
