---
name: review-pr
description: Use when reviewing a pull request in GovAlta/ui-components. Covers review scope, acceptance criteria, validating Goab / goab- / goa- component usage against the libraries, generated-file and documentation-migration checks, spotting unnecessary or technically wrong code, and the review output format.
---

# Testing Standards for PR Reviews

Use this guide when reviewing pull requests in this repository. The goal is to verify that the PR meets its acceptance criteria, does not introduce regressions, and follows the standards already established by nearby code.

## Review Scope

Test only code introduced or changed by the PR, but treat all changed code as new code for review purposes.

This includes migrated, copied, generated, or reformatted code. If a new file carries forward a problem from an older file, it should still be reviewed against current standards. It may be called out as a non-regression cleanup item if the behavior already existed, but it should not be ignored just because the source content came from old code.

Do not review unrelated local worktree changes unless they affect the PR. If the worktree is dirty, identify which changes are part of the PR before drawing conclusions.

## Acceptance Criteria

Start from the issue, PR description, and any linked design or implementation notes.

For each acceptance criterion:

- Identify the files and behavior that should satisfy it.
- Verify both the intended success path and obvious edge cases.
- Check that generated artifacts, routing, navigation, search, documentation, and public APIs are updated when the criterion implies they should be.
- If an acceptance criterion is ambiguous, state the assumption used during review.

## Component Usage

All example or documentation code that uses `Goab`, `goab-`, or `goa-` prefixes must be checked against the actual component libraries.

Validate usage against the relevant source of truth:

- React examples: compare `Goab*` components and props against `libs/react-components`.
- Angular examples: compare `goab-*` selectors, inputs, outputs, and usage patterns against `libs/angular-components`.
- Web component or Svelte examples: compare `goa-*` elements and attributes against `libs/web-components`.
- Generated docs/API data: compare against `docs/generated/component-apis/*.json` when available.

Unknown props, stale props, incorrect casing, invalid enum values, obsolete attributes, and framework-specific syntax used in the wrong context should be reported.

Custom elements may tolerate unknown attributes at runtime, so a passing build is not enough. If the component API does not define the attribute or property, treat it as a standards issue unless nearby code establishes an intentional exception.

Do not automatically treat framework `children`, content projection, or nested child components as documented slots. For example, a React `children?: ReactNode` prop used only to compose child components such as dropdown items does not need to appear in a slots table when examples and code snippets already show that composition pattern. Report missing slot documentation only when the public API exposes a named slot, default slot, `TemplateRef`, or equivalent content hook that users must understand independently of child-component composition.

For generated API changes, first verify whether each generated row should exist at all before judging whether its name or type is correct. Classify every changed generated API row as one of:

- Public prop or input.
- Event or output.
- Real named web component slot.
- React `children` or composition.
- Angular content projection.
- Angular `TemplateRef` input.
- Incorrect generated noise.

For any React or Angular slot row, prove from `libs/react-components` or `libs/angular-components` that the framework wrapper exposes a real public slot-like API, such as a `TemplateRef` input or a documented content hook. If the wrapper only uses React `children`, nested child components, or Angular `ng-content` projection, do not treat that as a generated slot row unless nearby code establishes that the docs intentionally document it as a separate content hook. Report rows that cannot be proven as real public API, even when the generated type looks plausible.

## Existing Standards

Preserve standards set by similar files.

Before judging a change, inspect nearby examples in the same folder, feature area, or framework. Check for consistency in:

- File organization and naming.
- Import style and path aliases.
- Content collection schemas and frontmatter.
- Routing and slug conventions.
- Generated artifact shape.
- Component prop naming and casing.
- Accessibility patterns.
- Error handling and fallback behavior.
- Test naming and test structure.
- Formatting and lint expectations.

Do not introduce a new pattern when an existing local pattern solves the same problem.

## Unnecessary or Technically Wrong Code

Review changed files for code that is not needed, even when it does not break runtime behavior or CI.

Call out unnecessary code when it adds noise, weakens maintainability, or makes the implementation technically incorrect according to nearby standards. Examples include:

- Duplicate imports or imports that should be combined with an existing import from the same module.
- Unused variables, props, components, modules, helpers, route files, generated entries, or test setup.
- Redundant event handlers, callbacks, assertions, wrappers, or state that do not change behavior.
- Workarounds, defensive code, comments, or examples that were useful during debugging but are not part of the final implementation.
- Code added to an unrelated framework, app, route, generated artifact, or public API surface.
- Props, attributes, module imports, or component usage that happen to be tolerated at runtime but are not part of the documented or local API.
- Test code that passes but does not exercise the behavior it claims to test.

Classify these findings by impact. If the code is harmless but inconsistent or noisy, mark it as cleanup. If it can mislead future maintainers, document incorrect usage, or expand the public surface by accident, mark it as non-blocking or blocking depending on the risk.

Before reporting unnecessary code, compare against nearby files. Do not ask for cleanup just because the code could be written differently; report it when it conflicts with an existing local pattern, is technically wrong, or has no clear purpose in satisfying the PR.

## Generated Files

If the PR changes anything that generated files are based on, verify that new files have been generated and are in the PR and are accurate

If the PR changes generated artifacts, verify both the source generator and the generated output.

Check that generated output is deterministic and platform-neutral where it represents URLs, slugs, public paths, IDs, or machine-readable data. For example, generated URL slugs should use `/`, not OS-specific path separators.

If generated files are produced only by CI or a documented build step, verify that the source generator would produce correct output in that environment. If local output differs because of OS behavior, call that out when the generated artifact may be consumed by non-browser tools, scripts, search indexes, MCP servers, or other direct JSON readers.

## Documentation and Content

For documentation migrations, test the content as new code.

Verify that:

- URLs remain stable unless the PR intentionally changes them.
- Sidebar, breadcrumbs, table of contents, and search results still point to valid pages.
- Titles, descriptions, labels, and ordering match the intended content model.
- Links use the repo's base URL helper where needed.
- MDX imports resolve from the new file location.
- Frontmatter satisfies the collection schema.
- New content is discoverable by the systems that need it, such as search, markdown bundles, or MCP generators.

Copied content should still be checked for obsolete component props, broken links, invalid markup, and standards drift.

## Regression Checks

Look for regressions at boundaries touched by the PR:

- Public URLs and redirects.
- Client-side navigation.
- Search indexing and result navigation.
- Content collection consumers.
- Build-time rendering.
- Server-side rendering and hydration.
- Browser-only code guarded from SSR.
- Base path behavior for previews or GitHub Pages.
- Cross-platform path handling.
- Accessibility behavior and semantics.

Prioritize bugs that can affect users, CI, deployment, or downstream consumers.

## Verification

Do not run tests, builds, or long validation commands during this review unless explicitly asked. Assume those commands have already been run manually before the review starts.

Use source inspection and existing artifacts to cover the risk.

Useful checks include:

- Static source inspection against nearby patterns.
- Targeted search with `rg`.
- Generated output inspection.
- Browser checks for user-facing flows.
- API/schema comparisons for component examples.

When test, lint, or build results are relevant, rely on the results provided by the user, existing CI status, or already-generated artifacts. Do not claim a test passed unless it was confirmed by the user, verified from CI, or visible in existing output.

## Review Output

Report findings first, ordered by severity.

Each finding should include:

- A concrete file and line reference.
- The expected behavior or standard.
- The actual issue.
- Why it matters.
- Whether it is blocking, non-blocking, or cleanup.
- Be descriptive, these comments are used to generate comments in the PR

Separate confirmed bugs from optional improvements. If something is only a robustness concern, label it that way.

If no issues are found, say that clearly and list any meaningful verification gaps.
