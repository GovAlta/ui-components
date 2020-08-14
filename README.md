## About the Project

The project contains the Government of Alberta UI components. The output packages support multiple model frontend frameworks, such as React, Angular, etc.

### Contribution Guidelines

[Contributing](contributing.md)

### Library and Applications

| Library | Description |
| ------ | ------ |
| core-css | Library of core CSS, SCSS, SVGs, and JavaScript.  Published to NPM [@abgov/core-css](https://www.npmjs.com/package/@abgov/core-css). |
| angular-components | Library of components for Angular.  Published to NPM [@abgov/angular-components](https://www.npmjs.com/package/@abgov/angular-components). | 
| vue-components | Library of components for Vue.  Not currently published. |
| shared/storybook-common | Library containing stories and elements common to all library storybook documentation. |
| shared/common | Library containing common javascript which will be used by all ui frameworks. |
| shared/styles | Library containing common scss which will be used by all ui frameworks. |
| samples | Sample applications showing how to integrate the NPM packages into each library type. |

### Building

To build all libraries and applications run `npm build:all`.  
To build only changed libraries and applications run `npm run affected:build --base=branchtocompareagainst`.  
To build the storybooks run `npm run build:storybook` or choose and individual storybook `npm run build:UIPROJECTNAME`.  

### Running Locally

There are currently no applications.  
To run a storybook run `npm run nx run angular-components:storybook` or `npm run nx run core-css:storybook` or `npm run nx run vue-components:storybook`.

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

| Branch Name | Website URL                                            | Comments |
| ----------- | ------------------------------------------------------ | -------- |
| dev         | [Click](https://ui-components-dio-dev.os99.gov.ab.ca/) | Contains NPM packages under active development under the @next label. |
| master      |                                                        | Contains NPM packages under stable @latest label. |

## Setting up OpenShift for Pipeline Builds

### Install Jenkins NodeJS 12 slave agent
