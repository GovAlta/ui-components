## Contributing  

Have a new component that you think will be usable or encountered a bug and would like to fix it yourself?  
We encourage contributions to the UI Component Library, but, in order to maintain organization and ensure quality components we have some processes and guidelines to be followed.

### The Process

Here is an overview of our contribution process.  Written instructions for bugs and features can be found linked below.
```mermaid
graph TD
subgraph Content Author
	1(Create issue request) --> 2(Implement in branch)
	2 --> 3(Comment that branch is ready to notify Platform team)
  4[Review Issue]
end
subgraph Platform Team
3 --> |*Content Author may be brought onto Platform team for sprint*| A
A[Create JIRA item and prioritize] --> B[Pull into sprint]
B --> C[Make changes and complete item]
C --> |is feature?| D[Publish to NPM next label]
C --> |is bug?| E[Publish to NPM latest label]
E --> F[Close issue]
D --> F
F --> 4
end


```

### Bug Fixes

[Contributing bug fixes](.gitlab/contribution_guidelines/contributing_bugfix.md)

### Features

[Contributing features](.gitlab/contribution_guidelines/contributing_feature.md)
