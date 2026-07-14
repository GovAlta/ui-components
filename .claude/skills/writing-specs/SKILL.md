---
name: writing-specs
description: "Writing tests and specs for components"
---

When writing specs always favour using `getByTestId` to locate elements, unless it is expected that the element will not exist, in which case `queryByTestId` should be used. This is because `getByTestId` will throw an error if the element is not found, which is useful for ensuring that the element exists before proceeding with further assertions.
