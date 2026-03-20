# FlexSearch Integration

FlexSearch has been successfully integrated into the GoA UI Components documentation site.

## Features

- **Real-time search** across all component documentation
- **Intelligent highlighting** of search terms in results
- **Tag support** - search by tags and view component categories
- **Preview snippets** showing context around matched terms
- **Fast, client-side search** with no server required
- **Responsive UI** with keyboard navigation

## How It Works

### 1. Index Generation

The search index is generated from all component documentation files:

```bash
npm run index:docs
```

This script:

- Scans all `.md` and `.doc.md` files in `libs/web-components/src/components/`
- Extracts titles and content
- Generates `docs/search-index.json` and `docs/public/search-index.json`

### 2. Search Component

Located at `docs/src/components/Search.tsx`, this React component:

- Loads the search index on page load
- Provides a search input with auto-complete suggestions
- Displays search results with highlighted matches
- Shows contextual previews of matched content

### 3. Integration

The search component is integrated into the docs site via `docs/src/pages/index.astro`:

```astro
import Search from '../components/Search';

<Search client:load />
```

## Files Created/Modified

### Created:

- `docs/src/components/Search.tsx` - Main search component
- `docs/src/types/web-components.d.ts` - Type declarations
- `docs/public/search-index.json` - Search index (generated)
- `scripts/README.md` - Documentation for the indexing script

### Modified:

- `scripts/indexdocs.ts` - Updated to copy index to public folder
- `docs/src/pages/index.astro` - Added Search component
- `docs/package.json` - Added flexsearch dependency
- `package.json` - Added `index:docs` script

## Usage

### For End Users

Simply type in the search box on the documentation homepage. The search will:

- Search across component titles, content, and names
- Display results in real-time as you type
- Highlight matching terms in yellow
- Show relevant content snippets

### For Developers

To update the search index after documentation changes:

```bash
npm run index:docs
```

To integrate search on additional pages:

```astro
---
import Search from '../components/Search';
---

<Search client:load placeholder="Custom placeholder..." />
```

## Search Index Structure

Each entry in the index contains:

```json
{
  "id": "button",
  "title": "Button Library",
  "content": "Full markdown content...",
  "component": "button",
  "path": "libs/web-components/src/components/button/doc.md",
  "tags": ["form", "input", "interactive"]
}
```

### Adding Tags

Tags are extracted from YAML frontmatter in doc files. See `docs/TAGS_EXAMPLE.md` for examples:

```markdown
---
title: Button Component
tags: [form, input, interactive]
---

# Button Library

...
```

## Performance

- **Index size**: ~31KB (47 components)
- **Load time**: Loads asynchronously on page load
- **Search speed**: Near-instant client-side searching
- **Bundle size**: FlexSearch adds ~15KB gzipped

## Customization

### Styling

The search component uses inline styles. To customize, edit `docs/src/components/Search.tsx` in the `<style>` section.

### Search Behavior

Configure FlexSearch options in the component:

```typescript
const index = new Document<SearchResult>({
  tokenize: "forward", // Enables prefix matching (e.g., "acco" matches "Accordion")
  document: {
    id: "id",
    index: ["title", "content", "component", "description", "tags:0", "tags:1", "tags:2"], // Fields to search
    store: ["id", "title", "component", "path", "tags", "description"], // Fields to return
  },
});
```

**Tokenization Options:**

- `forward` (current) - Prefix matching: "acco" matches "Accordion"
- `full` - Any substring matching (more memory intensive)
- `strict` - Exact word matching only
- `reverse` - Suffix matching

Note: Tags are indexed with array indices (tags:0, tags:1, etc.) to enable searching within tag arrays.

### Result Limit

Change the number of results displayed:

```typescript
const searchResults = indexRef.current.search(query, {
  limit: 10, // Change this value
  enrich: true,
});
```

## Maintenance

### When to Regenerate the Index

Run `npm run index:docs` when:

- Adding new component documentation
- Updating existing documentation
- Before deploying to production
- As part of your CI/CD pipeline

### Automation

To automatically regenerate the index before building docs, update `package.json`:

```json
{
  "scripts": {
    "build:docs": "npm run index:docs && nx run docs:build"
  }
}
```

## Known Issues

- There's a pre-existing build error related to `PublicFormController` export in react-components that needs to be fixed separately
- TypeScript check passes successfully, but the full build requires fixing the export issue

## Future Enhancements

Possible improvements:

- Add keyboard shortcuts (e.g., Cmd+K to focus search)
- Add search history
- Add filter by component type
- Add "did you mean" suggestions
- Add analytics for popular searches
