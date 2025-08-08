# Project Overview
This project contains the Government of Alberta UI components.

## Libraries and Frameworks
- Components are built with Svelte.
- Angular and React wrappers are provided for each component.

## Folder Structure
- `libs/web-components/src/components/`: Contains Svelte components.
- `libs/angular-components/src/lib/components/`: Contains Angular components.
- `libs/react-components/src/lib/`: Contains React components.

## Commits & Pull Requests
- Use Conventional Commits format for commit messages.
- Use the present tense.
- Use the imperative mood.
- Limit the first line to 72 characters or less.
- Start the commit message with a reference to the GitHub Issue number, such as `feat(#1234):`
- If the commit relates to an issue, include "Closes #ISSUE_NUMBER" in the commit message.
- If the commit relates to a breaking change, include "BREAKING CHANGE:" in the commit message.

## Pull Requests
- Only add a single commit to a Pull Request.
- Start the Pull Request title with a reference to the GitHub Issue number, such as `feat(#1234):`

## CSS and Design Tokens
- Use CSS custom properties that are defined by our design tokens.
- Name custom properties for global styles in this format: `--goa-[category]-[name]`, such as `--goa-color-primary`.
- Name custom properties for component-specific styles in this format: `--goa-[component]-[category]-[name]`.
