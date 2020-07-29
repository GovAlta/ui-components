## About the Project

The project contains the Government of Alberta UI components. The output packages support multiple model frontend frameworks, such as ReactJS, AngularJS, etc.

### Library and Applications

core-css
: Publishable npm library containing the core resources CSS, SVGs, and JavaScript for HTML component development.

angular-components
: Publishable npm librarty containing Angular 10 components for development.

storybook-common
: Library containing stories or components which will be common in all of the storybooks.

angular-components-e2e
: Not currently used cypress e2e example for the angular storybook.

core-css-e2e
: Not currently used cypress e2e example for the core storybook.

### Building

To build all libraries and applications run `npm build:all`.
To build only changed libraries and applications run `npm run affected:build --base=branchtocompareagainst`.
To build the storybooks run `npm run build:angular-storybook` or `npm run build:core-storybook`.

### Running Locally

There are currently no applications.
To run a storybook run `npm run nx run angular-components:storybook` or `npm run nx run core-css:storybook`.

### Running Tests

To run all of the available unit tests run `npm run test:all`.
To run only the current affected tests run `npm run affected:test --base=branchtocompareagainst`.
To run e2e tests run `npm run affected:e2e --base=branchtocompareagainst`.

### NodeJS version

For local developer, please use the NodeJS 12.

### OpenShift Deployment Key

| OpenShift Project | Key Name                  |
| ----------------- | ------------------------- |
| DIO Sandbox       | gitlab-core-ui-components |

## Environments

| Branch Name | Website URL                                            |
| ----------- | ------------------------------------------------------ |
| dev         | [Click](https://ui-components-dio-dev.os99.gov.ab.ca/) |

## Setting up OpenShift for Pipeline Builds

### Install Jenkins NodeJS 12 slave agent
