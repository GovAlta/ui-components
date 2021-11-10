## Contributing

Have a new component that you think will be useful or encountered a bug and would like to fix it yourself?
We encourage contributions to the UI Component Library, but, in order to maintain organization and ensure quality components we have some processes and guidelines to be followed.

### Coding Guidelines

[Coding Guidelines](.github/contribution_guidelines/coding_standards.md)

### The Process

Here is an overview of our contribution process. Specific instructions for bugs and features can be found linked below.

```mermaid
graph TD
subgraph Content Author
	1[Create issue request] --> 2[Implement in branch]
	2 --> 3[Comment on issue that branch is ready to notify Platform team]
  4[Review Issue, re-open if necessary]
end
subgraph Platform Team
3 --> |*Content Author may be brought onto Platform team for sprint*| A
A[Create JIRA item and prioritize] --> B[Pull into sprint]
B --> C[Make changes, complete item, merge branch]
C --> D[Publish to NPM next label]
D --> F[Close issue]
F --> G[Promote to NPM latest label]
D --> 4
end


```

### Bug Fixes

[Contributing bug fixes](.github/contribution_guidelines/contributing_bugfix.md)

### Features

[Contributing features](.github/contribution_guidelines/contributing_feature.md)
