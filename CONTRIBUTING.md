# Contributing

Thank you for your interest in contributing to the Government of Alberta UI Components.

Before opening an issue or pull request, review the contribution guidance at [design.alberta.ca/get-started/contribute](https://design.alberta.ca/get-started/contribute/).

## Support and maintenance

This repository is provided as-is. There is no guarantee of ongoing maintenance, support, compatibility updates, or responses to issues or pull requests.

Point of contact: [Sheldon Bauld](sheldon.bauld@gov.ab.ca)

## Code of conduct

Participation in this project is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing, you agree to follow it.

## Getting started

This repo uses Nx

Install dependencies:

```bash
npm install
```

Useful local commands:

- `npm run serve:docs` to run the docs site locally.
- `npm run dev:watch` to rebuild `web-components` while developing against a preview app.
- `npm run serve:prs:react` to run the React preview app.
- `npm run serve:prs:angular` to run the Angular preview app.
- `npm run test:pr` to run all tests (unit, browser, etc...).
- `npm run build` to build affected projects.
- `npm run validate` to run the full validation pipeline.

## Pull requests

When opening a pull request:

- Keep changes focused on one issue, fix, or feature.
- Include tests or update existing tests when behavior changes.
- Update documentation or examples when public usage changes.
- Run the most relevant checks locally before submitting.
- Describe the change, why it is needed, and any known risks or follow-up work.

## Issues

When opening an issue:

- Search existing issues first.
- Include the package or component affected.
- Provide steps to reproduce, expected behavior, and actual behavior for bugs.
- Include screenshots, browser details, framework versions, or package versions when relevant.
