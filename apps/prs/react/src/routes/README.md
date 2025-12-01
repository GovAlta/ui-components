# Playground Test Routes

This directory contains test pages for verifying bug fixes and new features before they're merged.

## Quick Start

1. Copy `_TEMPLATE.tsx` to the appropriate folder
2. Update the issue details and component name
3. Wire it up in `main.tsx` and `app.tsx`
4. Add your test cases

## Adding a New Test Page

### Step 1: Create the route file

Copy the template to the correct location:

```bash
# For a bug (e.g., issue #2878)
cp src/routes/_TEMPLATE.tsx src/routes/bugs/bug2878.tsx

# For a feature (e.g., issue #1547)
cp src/routes/_TEMPLATE.tsx src/routes/features/feat1547.tsx
```

### Step 2: Update the route file

Open your new file and:

1. **Rename the component** (find/replace `Template` with your issue type+number):
   - Bug: `Bug2878Route`
   - Feature: `Feat1547Route`

2. **Update the constants**:
   ```tsx
   const ISSUE_NUMBER = "2878";
   const ISSUE_TYPE: "bug" | "feature" = "bug";
   const ISSUE_TITLE = "DatePicker onChange Event";
   const ISSUE_DESCRIPTION = `
   The DatePicker component is not firing onChange events when...
   `;
   ```

3. **Add your component imports** and test cases

### Step 3: Add the import to `main.tsx`

Add an import statement near the other imports:

```tsx
// For bugs
import { Bug2878Route } from "./routes/bugs/bug2878";

// For features
import { Feat1547Route } from "./routes/features/feat1547";
```

### Step 4: Add the route to `main.tsx`

Inside the `<Routes>` component, add your route in the appropriate section:

```tsx
{/* In the bugs section */}
<Route path="bugs/2878" element={<Bug2878Route />} />

{/* In the features section */}
<Route path="features/1547" element={<Feat1547Route />} />
```

**Note:** Keep routes in numerical order for easy scanning.

### Step 5: Add navigation to `app.tsx`

In the `GoabSideMenu`, add a link in the appropriate `GoabSideMenuGroup`:

```tsx
{/* For bugs - include short descriptive label */}
<Link to="/bugs/bug2878">2878 DatePicker onChange</Link>

{/* For features */}
<Link to="/features/feat1547">1547 Tooltip Multiline</Link>
```

**Navigation label format:** `{NUMBER} {Short Title}`
- Keep titles concise (2-4 words)
- Focus on the component/behavior being tested
- The number allows quick reference to the GitHub issue

## Checklist

Use this checklist when adding a new test page:

- [ ] Created route file in correct folder (`bugs/` or `features/`)
- [ ] Renamed component from `TemplateRoute` to `Bug{N}Route` or `Feat{N}Route`
- [ ] Updated `ISSUE_NUMBER`, `ISSUE_TYPE`, `ISSUE_TITLE`
- [ ] Added issue description from GitHub
- [ ] Added component imports needed for testing
- [ ] Created test cases with clear descriptions
- [ ] Added import to `main.tsx`
- [ ] Added `<Route>` to `main.tsx` (in numerical order)
- [ ] Added `<Link>` to `app.tsx` side menu with descriptive label
- [ ] Verified page loads at the correct URL
- [ ] Verified navigation link works

## File Structure

```
src/routes/
├── _TEMPLATE.tsx          # Template - copy this for new pages
├── README.md              # This file
├── bugs/
│   ├── bug2152.tsx        # Bug test pages
│   ├── bug2331.tsx
│   └── ...
├── features/
│   ├── feat1547.tsx       # Feature test pages
│   ├── feat1813.tsx
│   └── ...
└── everything.tsx         # All components showcase
```

## Page Structure

Each test page should include:

1. **Header** - Issue type, number, and title
2. **GitHub Link** - Direct link to the issue
3. **Issue Description** - Expandable details section with the full issue description
4. **Test Cases** - Individual tests with:
   - Descriptive heading
   - Explanation of what's being tested
   - The actual component(s)
   - Expected behavior notes

## Component Style Guide

Keep component usage minimal - use semantic tags and let defaults work for you.

### GoabText - Use `tag` prop only

After PR #3233, sizes are automatically mapped from the tag:

```tsx
// Good - minimal, semantic
<GoabText tag="h1">Page Title</GoabText>      // → heading-xl
<GoabText tag="h2">Section</GoabText>         // → heading-l
<GoabText tag="h3">Subsection</GoabText>      // → heading-m
<GoabText tag="p">Body text</GoabText>        // → body-m

// Avoid - unnecessary attributes
<GoabText tag="h1" size="heading-xl">Title</GoabText>
```

### GoabBlock - Use defaults

The default `gap="m"` works for most cases:

```tsx
// Good - rely on defaults
<GoabBlock direction="column">
  ...
</GoabBlock>

// Only specify gap when you need something different
<GoabBlock direction="column" gap="l">
  ...
</GoabBlock>
```

### General principle

Only add attributes when you need to override the default behavior.

## Tips

- **Copy the issue description** from GitHub so reviewers don't need to switch contexts
- **Number your test cases** for easy reference in PR comments
- **Be specific** in test descriptions - "should not show icon when `icon={false}`" is better than "icon test"
- **Test edge cases** - empty states, long content, disabled states, etc.
- **Group related tests** - if testing multiple variants, group them under a subheading
