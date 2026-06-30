---
name: write-issue
description: Use when filing a new GitHub issue for the Design system (bug, feature, or task). Covers the title and body template, the required priority and component labels, and setting the issue Type via GraphQL rather than a label. Do not use for writing PR descriptions.
---

# Skill: Write a Design system issue

Use when creating a GitHub issue in `GovAlta/ui-components`. The goal is an issue another contributor (or their Claude session) can pick up cold, with no missing scope.

## 1. Title

Format: `{Component}: {short imperative description of the problem}`.

Examples: `Button: does not take full width inside ButtonGroup on mobile`, `DatePicker: month dropdown shows raw value instead of placeholder`.

Keep it specific. Avoid vague titles like "Button bug" or "fix styling".

## 2. Body

Use these sections, in order:

- **Description** — what is wrong or what is needed, in plain language.
- **Expected behavior** — the target state. Include exact token names, colour values, or measurements when the issue is visual. Do not leave the implementer to guess.
- **Steps to reproduce** (bugs) — numbered steps.
- **Screenshots** — paste before/after or annotated images for any visual issue.
- **Acceptance criteria** — a checklist of what "done" means.

The body is the source of truth for scope. If a value is unknown (a token name, a colour), say so explicitly and flag it as a question rather than inventing one.

## 3. Labels

Every issue needs:

- A **priority** label (for example `P3`). Set it from the team's backlog scoring, not by gut feel.
- A **component** label naming the affected component (for example `Button`, `DatePicker`).

The `bug` / `feature` / `task` distinction is the issue **Type**, not a label (see below).

## 4. Set the Type via GraphQL

The issue Type (Bug, Feature, Task) is a GitHub project field, not a label. Setting a `bug` label does not set the Type. Use the GraphQL API:

```bash
# 1. Find the type id for the repo
gh api graphql -f query='
  query { repository(owner:"GovAlta", name:"ui-components") {
    issueTypes(first:10) { nodes { id name } } } }'

# 2. Apply it to the issue (look up the issue node id first with gh issue view)
gh api graphql -f query='
  mutation($issue:ID!, $type:ID!) {
    updateIssueIssueType(input:{issueId:$issue, issueTypeId:$type}) {
      issue { number issueType { name } } } }' \
  -f issue=<ISSUE_NODE_ID> -f type=<TYPE_NODE_ID>
```

## 5. Style

No em dashes or en dashes anywhere in the issue. Use periods, commas, or colons.
