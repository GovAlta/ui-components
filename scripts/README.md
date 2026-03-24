# Scripts

This folder contains utility scripts for the GoA Design System component library.

---

## `add-jsdocs.js` — JSDoc Codegen

Reads JSDoc comments from the Svelte source-of-truth components and injects
them into the corresponding React (`.tsx`) and Angular (`.ts`) wrapper files.

Only adds JSDoc where it is **missing** — safe to run multiple times.

### Usage

```bash
node scripts/add-jsdocs.js            # write changes to disk
node scripts/add-jsdocs.js --dry-run  # preview changes without writing
```

### When to run

Run after:
- Adding a new component (Svelte + wrapper files created)
- Adding new props to an existing Svelte component
- Updating JSDoc in a Svelte source file

### How it works

1. For each Angular/React wrapper file, finds the corresponding `.svelte` source
   file by matching the component directory and file name.
2. Parses `/** ... */` comments above every `export let` in the Svelte file.
3. Injects those comments above the matching `@Input()` decorator (Angular) or
   interface prop (React) wherever JSDoc is currently absent.
4. Emits single-line `/** desc */` comments for simple props and multi-line
   blocks when `@default`, `@required`, or `@deprecated` tags are needed.
5. Skips props marked `@internal` in the Svelte source.

### Behaviour notes

- `"false"` / `"true"` string defaults in Svelte are normalised to `false` /
  `true` in the wrapper JSDoc (web component strings → typed booleans).
- `@required` from a Svelte JSDoc is carried over as a `@required` JSDoc tag in
  React wrappers; for Angular `@Input({ required: true })` it is omitted because
  TypeScript already enforces the requirement.
- Props without a Svelte counterpart (e.g., Angular `TemplateRef` inputs, React
  event-handler props) are left untouched and can be documented manually.

---

## `indexdocs.ts` — Documentation Indexing Script

Generates a FlexSearch-compatible index from the component documentation files.

### Usage

To generate or update the search index:

```bash
npm run index:docs
```

This will:
- Scan all `.md` and `.doc.md` files in `libs/web-components/src/components/`
- Extract the title and content from each file
- Generate a JSON index file at `docs/search-index.json`

### Output Format

The generated index is an array of objects with the following structure:

```json
[
  {
    "id": "button",
    "title": "Button Library",
    "content": "Full markdown content...",
    "component": "button",
    "path": "libs/web-components/src/components/button/doc.md",
    "tags": ["form", "input", "interactive"]
  }
]
```

### Adding Tags to Documentation

Tags are extracted from YAML frontmatter in the markdown files. To add tags:

```markdown
---
title: Button Component
tags: [form, input, interactive]
---

# Button Library

Component documentation here...
```

See `docs/TAGS_EXAMPLE.md` for detailed examples and suggested tag categories.

### Using with FlexSearch

Here's an example of how to use the generated index with FlexSearch:

```typescript
import FlexSearch from 'flexsearch';
import searchIndex from './docs/search-index.json';

// Create a document index
const index = new FlexSearch.Document({
  tokenize: 'forward', // Enable prefix matching
  document: {
    id: 'id',
    index: ['title', 'content', 'component', 'description', 'tags:0', 'tags:1', 'tags:2'],
    store: ['title', 'component', 'path', 'tags', 'description']
  }
});

// Add all documents to the index
searchIndex.forEach(doc => {
  index.add(doc);
});

// Search
const results = index.search('button');
console.log(results);
```

### Browser Usage

```html
<script type="module">
  import FlexSearch from 'flexsearch';

  // Fetch the index
  const response = await fetch('/search-index.json');
  const searchIndex = await response.json();

  // Create and populate index
  const index = new FlexSearch.Document({
    tokenize: 'forward', // Enable prefix matching
    document: {
      id: 'id',
      index: ['title', 'content', 'component', 'description', 'tags:0', 'tags:1', 'tags:2'],
      store: ['title', 'component', 'path', 'tags', 'description']
    }
  });

  searchIndex.forEach(doc => index.add(doc));

  // Search function
  function search(query) {
    return index.search(query, {
      limit: 10,
      enrich: true
    });
  }
</script>
```

### When to Run

Run the indexing script whenever:
- New component documentation is added
- Existing documentation is updated
- Before deploying the documentation site
- As part of your build process (optional)

You can add it to your build process by updating the `build:docs` script in `package.json`:

```json
"build:docs": "npm run index:docs && nx run docs:build"
```
