# Framework Wrapper Standards

## Cross-Framework Rule

Every Svelte prop, event, or API change requires corresponding React and Angular wrapper updates. Props must match across all three frameworks (required/optional, naming, types, data formats). This is the #1 source of review rounds.

CSS-only changes in the Svelte file do not need wrapper updates. Wrappers contain no styling, they pass attributes through to the web component, which owns all CSS.

For the React and Angular wrapper templates and the patterns that go with them, see the `write-wrapper` skill.
