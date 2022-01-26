## About the Project

The project contains the Government of Alberta UI components. The output packages support multiple model frontend frameworks, such as React, Angular and Vue.

### Contribution Guidelines

The design system team is using “Discussions” in the UI-components GitHub repository for managing the creation and assessment of new ideas for platform components, services, and capabilities.

#### Ideas for enhancements, additions, or improvements

Before creating a new discussion topic, check the discussion board for any existing ideas that may match yours. If there is a good match, please add your examples and comments to the existing discussion instead of creating a new one.

Add a new discussion topic

If a related discussion topic already exists please join in the discussion!

Provide a high-level description, relevant links and examples of the idea to the discussion topic.

Socialize your discussion topic with your colleges to help refine and drive out contexts and use cases. If possible have those team members join the “discussion”.

“Vote” on the topics that you think are the highest priority.

#### What happens to these "discussions?"

Discussion topics that have the most votes and/or input from a number of different team members will be evaluated every two-week cycle by the Design System team. Those items that

Discussion topics that have the most number of votes and/or input will be evaluated

Opportunities are assessed against WIP limits.

After an assessment, selected “discussions” will be transitioned to “issues” and assigned and prioritized in the different “project” views (Figma, Angular, React, etc.)

[Contributing](contributing.md)

### Library and Applications

| Library                     | Description                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| angular-components          | Library of components for Angular. Published to NPM [@abgov/angular-components](https://www.npmjs.com/package/@abgov/angular-components).                                   |
| vue-components              | Library of components for Vue. Published to NPM [@abgov/vue-components](https://www.npmjs.com/package/@abgov/vue-components).                                               |
| react-components            | Library of components for React. Published to NPM [@abgov/react-components](https://www.npmjs.com/package/@abgov/react-components).                                         |
| shared/storybook-common     | Library containing stories and elements common to all library storybook documentation.                                                                                      |
| shared/common               | Library containing common javascript which will be used by all ui frameworks.                                                                                               |
| styles                      | Library containing css vars that define the theme                                                                                                                           |
| samples                     | Sample applications showing how to integrate the NPM packages into each library type.                                                                                       |

### Building

To build all libraries and applications run `npm build:all`.
To build only changed libraries and applications run `npm run affected:build -- --base=branchtocompareagainst`.
To build the storybooks run `npm run build:storybook` or choose and individual storybook `npm run build:UIPROJECTNAME`.

### Running Locally

There are currently no applications.
To run a storybook run `npm run run:angular-storybook` or `npm run run:vue-storybook` or `npm run run:core-storybook` or `npm run run:react-storybook`.

### Running Tests

To run all of the available unit tests run `npm run test:all`.
To run only the current affected tests run `npm run affected:test -- --base=branchtocompareagainst`.
To run e2e tests run `npm run affected:e2e -- --base=branchtocompareagainst`.

## Environments

| Name | Website URL                                                       | Openshift Home                                                                           |
| ---- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| test | [Click](https://ui-components-ui-components-test.os99.gov.ab.ca/) | [Click](https://console.os99.gov.ab.ca:8443/console/project/ui-components-test/overview) |
| dev  | [Click](https://ui-components-ui-components-dev.os99.gov.ab.ca/)  | [Click](https://console.os99.gov.ab.ca:8443/console/project/ui-components-dev/overview)  |
| prod | [Click](https://ui-components.alpha.alberta.ca/)                  | [Click](https://console.os99.gov.ab.ca:8443/console/project/ui-components-prod/overview) |

## NPM

Current stable release can be found tagged with @latest.
Beta functionality can be found tagged with @next.

| Package                            | URL                                                                                                    | Documentation                                                     | Comments                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------- |
| @abgov/angular-components          | [@abgov/angular-components](https://www.npmjs.com/package/@abgov/angular-components)                   | [Click](https://ui-components.alpha.alberta.ca/angular/)          | Angular based components.               |
| @abgov/vue-components              | [@abgov/vue-components](https://www.npmjs.com/package/@abgov/vue-components)                           | [Click](https://ui-components.alpha.alberta.ca/vue/)              | Vue based components.                   |
| @abgov/react-components            | [@abgov/react-components](https://www.npmjs.com/package/@abgov/react-components)                       | [Click](https://ui-components.alpha.alberta.ca/react/)            | React based components.                 |

## VS Code Extensions

### Formatting

To allow for project specific formatting the follow extensions are required

- octref.vetur
- esbenp.prettier-vscode
