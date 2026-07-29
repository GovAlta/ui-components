# Microsite header

Communicate what stage the service is at, connect to Alberta.ca, and gather feedback on your service.

**Status:** stable | **Category:** Structure And Navigation | **Docs:** https://design.alberta.ca/components/microsite-header

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `feedbackUrl` | string | (none) | No | URL to a feedback page displayed when provided. |
| `feedbackUrlTarget` | GoabLinkTarget | `blank` | No | Sets the target attribute for the feedback URL link. |
| `headerUrlTarget` | GoabLinkTarget | `blank` | No | Sets the target attribute for the header link. |
| `maxContentWidth` | string | `100%` | No | Maximum width of the content area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabServiceLevel | (none) | Yes | The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. |
| `version` | string \| React.ReactNode | (none) | No | App or service version displayed on the right side of the header. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onFeedbackClick` | () => void | Callback fired when the feedback link is clicked, enables custom feedback handling. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `feedbackUrl` | string | (none) | No | Url to feedback page that will be displayed when provided. |
| `feedbackUrlTarget` | GoabLinkTarget | (none) | No | For internal feedback urls sets target. |
| `headerUrlTarget` | GoabLinkTarget | (none) | No | Sets the target attribute for the header link. |
| `maxContentWidth` | string | (none) | No | Maximum width of the content area. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | GoabServiceLevel | (none) | Yes | The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. |
| `version` | string \| TemplateRef<any> | (none) | No | App or service version displayed on the right side of the header. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onFeedbackClick` | () => void | Emits when the feedback link is clicked. |

---

## Web Components

Tag: `goa-microsite-header`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `feedbackurl` | string | (none) | No | Url to feedback page that will be displayed when provided. |
| `feedbackurltarget` | "self" \| "blank" | `blank` | No | For internal feedback urls sets target= |
| `hasfeedbackhandler` | boolean | `false` | No | When true, enables a custom feedback click handler via the _feedbackClick event instead of navigating to feedbackurl. |
| `headerurltarget` | "self" \| "blank" | `blank` | No | Sets the target attribute for the header link. |
| `maxcontentwidth` | string | `100%` | No | Maximum width of the content area |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `type` | "live" \| "alpha" \| "beta" | (none) | Yes | The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_feedbackClick` | CustomEvent | (none) |

---

## Examples

- [Link the user to give feedback to the service](/examples/link-the-user-to-give-feedback-to-the-service)
- [Show version number](/examples/show-version-number)

---

## Related components

- [Header](/components/app-header): Provide structure to help users find their way around the service.
