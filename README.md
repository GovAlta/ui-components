# About the Project

The project contains the Government of Alberta UI components. The output packages support multiple model frontend frameworks, such as React, Angular and Vue.

## Contribution Guidelines

The design system team is using “Discussions” in the UI-components GitHub repository for managing the creation and assessment of new ideas for platform components, services, and capabilities.

### Ideas for enhancements, additions, or improvements

Before creating a new discussion topic, check the discussion board for any existing ideas that may match yours. If there is a good match, please add your examples and comments to the existing discussion instead of creating a new one.

Add a new discussion topic

If a related discussion topic already exists please join in the discussion!

Provide a high-level description, relevant links and examples of the idea to the discussion topic.

Socialize your discussion topic with your colleges to help refine and drive out contexts and use cases. If possible have those team members join the “discussion”.

“Vote” on the topics that you think are the highest priority.

### What happens to these "discussions?"

Discussion topics that have the most votes and/or input from a number of different team members will be evaluated every two-week cycle by the Design System team. Those items that

Discussion topics that have the most number of votes and/or input will be evaluated

Opportunities are assessed against WIP limits.

After an assessment, selected “discussions” will be transitioned to “issues” and assigned and prioritized in the different “project” views (Figma, Angular, React, etc.)

[Contributing](contributing.md)

### Library and Applications

| Library          | Description                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| web-components   | Library of native web components. Published to NPM [@abgov/web-components](https://www.npmjs.com/package/@abgov/web-components).    |
| styles           | Library of GoA web styles. Published to NPM [@abgov/styles](https://www.npmjs.com/package/@abgov/styles).                           |
| react-components | Library of components for React. Published to NPM [@abgov/react-components](https://www.npmjs.com/package/@abgov/react-components). |


## WSL Setup

### Install
```bash
wsl --install -d Ubuntu-20.04
```

### Start
```bash
wsl -d Ubuntu-20.04
sudo apt update && sudo apt upgrade
sudo apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

### Install NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 14.16.1 --default
```

### Code
```bash
git clone https://github.com/GovAlta/ui-components.git
cd ui-components
git checkout alpha
npm ci
```

https://shouv.medium.com/how-to-run-cypress-on-wsl2-989b83795fb6
https://sourceforge.net/projects/vcxsrv/

### Cypress
```bash
cd apps/angular-demo-e2e
npx cypress open
```
