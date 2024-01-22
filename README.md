# About

This project contains the Government of Alberta UI components. This web component project supports multiple frontend frameworks, React and Angular. The project is designed to be used to help bring consistency to all Government of Alberta websites and web applications. It's also being designed to help ease the burden on designers and developers alike throughout the development process.

## Playground Setup

Run the `app-setup.sh` file.

```
./app-setup.sh
```

You can then test the playground apps at `localhost:4200` by running one of the following:

```
npm run dev:angular
npm run dev:react
npm run dev:web 
```



## Contribution Guidelines

The design system team is using “Discussions” in the UI-components GitHub repository for managing the creation and assessment of new ideas for platform components, services, and capabilities.

### Ideas for enhancements, additions, or improvements

Before creating a new discussion topic, check the discussion board for any existing ideas that may match yours. If there is a good match, please add your examples and comments to the existing discussion instead of creating a new one. If a related discussion topic already exists please join in the discussion!

Provide a high-level description, relevant links and examples of the idea to the discussion topic.

Socialize your discussion topic with your colleague's to help refine and drive out contexts and use cases. If possible have those team members join the “discussion”.

“Vote” on the topics that you think are the highest priority.

### What happens to these "discussions?"

Discussion topics that have the most votes and/or input from a number of different team members will be evaluated every two-week cycle by the Design System team. Those items that have the most number of votes and/or input will be evaluated

Opportunities are assessed against WiP limits.

After an assessment, selected “discussions” will be transitioned to “issues” and assigned and prioritized in the different “project” views (Figma, Angular, React, etc.)

## Documentation

You can view the documentation [here](https://design.alberta.ca). This has all the info on how to implement our components, as well as how to get setup to contribute.

## How to Contribute

You can view how you can contribute [here](contributing.md).

### Library and Applications

| Library            | Description                                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| web-components     | Library of native web components. Published to NPM [@abgov/web-components](https://www.npmjs.com/package/@abgov/web-components).          |
| react-components   | Library of components for React. Published to NPM [@abgov/react-components](https://www.npmjs.com/package/@abgov/react-components).       |
| angular-components | Library of components for Angular. Published to NPM [@abgov/angular-components](https://www.npmjs.com/package/@abgov/angular-components). |
| ~~styles~~         | Deprecated [^1]                                                                                                                           |

[^1]: The npm package, @abgov/styles is now deprecated. Import styles(css) from the web-components package. `@import "@abgov/web-components/index.css";`. For more instructions find the appropriate setup documentation [here](https://ui-components.alberta.ca)
