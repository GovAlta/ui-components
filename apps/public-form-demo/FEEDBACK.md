# Public Form Pattern Feedback

## Summary

While implementing a full public form demo using `GoabPublicForm`, we encountered friction points and gaps in the current pattern. This document catalogs those issues along with workarounds we implemented and suggestions for pattern improvements.

**Demo:** https://publicform.netlify.app

**Overview:**
- 4 bug fixes applied
- 6 enhancements implemented (logic changes)
- 6 checkbox/form pattern issues documented
- 5 related component bugs found
- 11 suggestions
- Styling adjustments
- ⚠️ **~1,550 lines deleted** — architecture simplified (see "Architecture Changes" section)

---

## Issues & Workarounds

### Back Navigation

**The scenario:** On the first question of a task, "Back" should say "Back to all tasks" and return to the task list. On subsequent questions, it should say "Back" and go to the previous question. This is the standard Figma pattern for multi-task forms.

**The problems:**

- **No `backText` prop** — Can't customize the back button text per page. We needed "Back to all tasks" on first page, "Back" on others.

- **No first-page detection** — No way to know if current page is first in the form, so we can't conditionally show different text/behavior.

- **No `onBack` callback** — When user clicks the form's Back button, the parent component isn't notified. We need to know when they click "Back to all tasks" so we can navigate to the task list instead of the previous question.

- **Content renders below heading** — The back link needs to appear *above* the page heading (per Figma), but `GoabPublicFormPage` children render below it.

**What we did:** Hide the native back button (`backVisibility="hidden"`), render our own `BackLink` component *outside* `GoabPublicForm`, and manually track the current page from state to determine what text to show and where to navigate.

**Open to better approaches** — If there's a cleaner way to handle this (props, callbacks, slots), happy to refactor.

### Link-Style Buttons

**The scenario:** Forms need action links that look like text links but trigger actions — "Save and exit", "Back to all tasks", etc. These aren't navigation links (no href), they're buttons styled as links.

**The problem:** No component currently handles this. GoabxLink is for navigation (no onClick), and Button doesn't have a text/link variant.

**What we did:** Created custom `BackLink` and `ActionLink` components using styled `<button>` elements that visually match the link styling.

**Note:** We know this is an active discussion — there are stories around text-style buttons and goa-link-button, but no conclusion yet. Just flagging that public forms need this pattern, whatever form the solution takes.

### Conditional Validation

**The scenario:** Common form pattern — "How should we contact you?" with checkboxes for Phone and Email. If they check Phone, the phone number field becomes required. If they don't check it, phone number is optional.

**The problem:** We couldn't get the checkbox reveal pattern to validate correctly. The input inside the reveal wasn't getting validated when the checkbox was checked.

**What we did:** Extended the validator system to support "page validators" that receive the full page data:

- Added `PageValidator` type that gets all field values, not just one
- Added `ConditionalRequiredValidator(fieldName, condition, message)` factory
- Modified `Form.svelte` to detect page validators and pass full `dataBuffer`

**Example usage:**
```typescript
phone: {
  label: "Phone number",
  validators: [
    ConditionalRequiredValidator(
      "phone",
      (data) => !!data?.contactByPhone,  // required if checkbox checked
      "Enter a phone number"
    )
  ]
}
```

**Files modified:**
- `validators.ts` — Added types and factory
- `public-form.ts` — Changed `validators` type to `AnyValidator[]`
- `Form.svelte` — Pass full `dataBuffer` to page validators

**Note:** You mentioned this might work with just checkboxes (no CheckboxList needed). If there's a simpler way to do this that we missed, happy to refactor. The PageValidator approach works but adds complexity.

### Public Form + Checkbox Issues

**The scenario:** Forms commonly need checkbox patterns — "Select all that apply", "Check to reveal more options", conditional fields based on checkbox state.

**What we ran into:** We had trouble getting several checkbox patterns to work:

- **CheckboxList** — Couldn't get the grouped checkbox component working with public form.

- **Multiple checkboxes with same name** — Only the last checkbox registered. We gave each a unique name as a workaround.

- **Reveal slot inputs** — Inputs inside checkbox reveal slots didn't seem to register. We moved the input outside the reveal.

- **Conditionally rendered inputs** — React conditionals caused "Invalid formField key" errors. We used `display: none` CSS instead.

- **"At least one" validation** — Couldn't figure out a clean way to validate "select at least one" across multiple checkboxes.

**What we did:** Worked around each individually, but it felt like we might be missing something.

**Question:** Are there patterns or approaches for these that we missed? Happy to learn the right way if these are supposed to work.

---

## Bug Fixes Applied

### `_subformChange` Event Not Reaching React

**Problem:** When saving a subform item, React wrapper never received the state update. List stayed empty.

**Root cause:** `Form.svelte` dispatched `_subformChange` from the inner `<form>` element, but React wrapper listens on `<goa-public-form>` (the host element). Without `bubbles: true`, event stopped at the inner form.

**Solution:** Added `{ bubbles: true }` to both `dispatch(_rootEl, "_subformChange", _state)` calls.

**File modified:** `libs/web-components/src/components/form/Form.svelte`

---

### dataBuffer Not Populated on Form Re-entry

**Problem:** When re-entering a completed task (e.g., clicking a completed task from the task list), fields appeared visually filled but validation failed. For example, a checkbox would show as checked, but clicking "Continue" would show a validation error saying the field is required.

**Root cause:** The form has two mechanisms that weren't aligned:

1. **`bindFormFieldValues()`** - Restores visual state by setting element attributes (`checked`, `value`) from `state.data`
2. **`validate()`** - Checks `state.dataBuffer` for field values

During normal navigation, `setPageVisibility()` populates `dataBuffer` from `data[pageId]`:
```javascript
// In setPageVisibility() - line 514
_state.dataBuffer = (_state.data[pageId] as PFPage) || {};
```

But during `init()`, page visibility is set directly without calling `setPageVisibility()`, so `dataBuffer` stays empty. Fields look filled (via `bindFormFieldValues`) but `dataBuffer` has no values for validation.

**Solution:** Added dataBuffer initialization in `init()` after setting `_state`:

**File modified:** `libs/web-components/src/components/form/Form.svelte`

```javascript
// After line 312: _state = state;
// Added:
_state.dataBuffer = (_state.data[_currentPage] as PFPage) || {};
```

**Recommendation:** Consider refactoring to have `init()` call `setPageVisibility(_currentPage)` instead of setting display styles directly, to ensure consistent behavior.

### Error Reset Timing

**Problem:** When user fixed one error and resubmitted, the fixed field still showed error styling because `resetErrors()` was only called when ALL errors were fixed.

**Solution:** Moved `resetErrors()` call to BEFORE validation check, not after. Now errors are always cleared first, then only current errors are shown.

**File modified:** `libs/web-components/src/components/form/Form.svelte`

---

### FormSummary Null Check

**Problem:** `showInSummary()` crashed when `page` was undefined.

**Solution:** Added early return: `if (!page) return false;`

**File modified:** `libs/web-components/src/components/form/FormSummary.svelte`

---

## Enhancements Implemented

### Subform Add Button Customization

**Problem:** The `GoabPfSubform` component's Add button was hardcoded as primary style, default size, with text "Add". Figma designs show the button should be tertiary, compact, with "+ Add a dependant" text and a leading plus icon.

**Solution implemented:** Added six new props to `GoabPfSubform`:

- `addButtonText` (string, default "Add") — Custom text for the Add button
- `addButtonType` (GoabButtonType, default "primary") — Button type
- `addButtonSize` (GoabButtonSize, default "default") — Button size
- `addButtonIcon` (string, default "") — Leading icon name
- `addHeading` (string) — Modal heading when adding
- `editHeading` (string) — Modal heading when editing

**Files modified:**
- `libs/web-components/src/components/form/Subform.svelte`
- `libs/react-components/src/lib/form/public-subform.tsx`

**Usage example:**
```tsx
<GoabPfSubform
  formContent={<DependantForm />}
  addButtonText="Add a dependant"
  addButtonType="tertiary"
  addButtonSize="compact"
  addButtonIcon="add"
  addHeading="Add a dependant"
  editHeading="Edit dependant"
>
  {/* list content */}
</GoabPfSubform>
```

This is backward-compatible - existing usages without these props continue to work with the original defaults.

### Error Summary

**Problem:** When validation fails, users only see field-level errors. Figma design shows an error summary callout at the top of the form listing all errors.

**Solution implemented:**
- `FormPage.svelte`: Added `errors` prop (JSON string), renders `goa-callout` with `type="emergency"` `emphasis="low"` `version="2"`
- `Form.svelte`: Updated `renderErrors()` to set `errors` attribute on FormPage, added scroll to top

**Known limitation:** Error summary items are displayed as plain text, NOT as clickable links that focus the related field. Figma design shows these as anchor links (see node-id=60984-119204). Click handlers inside nested web component slots don't work reliably - **this needs proper implementation**.

### Description Slot

**Problem:** Figma order is: heading → description text → error summary → inputs. Without a slot, description text ended up after error summary.

**Solution:** Added `<slot name="description" />` to FormPage.svelte that renders before error summary.

**Usage:**
```tsx
<GoabPublicFormPage id="dependants">
  <p slot="description">Add all dependants under 18...</p>
  {/* inputs */}
</GoabPublicFormPage>
```

**File modified:** `libs/web-components/src/components/form/FormPage.svelte`

---

### Error Summary Position

Added `errorSummaryPosition` prop to `GoabPublicFormPage`:

- `"top"` (default) — Below heading, before inputs. Scrolls to top.
- `"none"` — No error summary, field-level errors only. Scrolls to first error field.

### Skip Validation for Subform Pages

**Problem:** Validators for subform fields (e.g., `dependantName`) ran when clicking Continue on the parent page. But subform data is in `data.dependants[]`, not `dataBuffer.dependantName`. Items are validated when saved in modal.

**Solution:** Form.svelte now skips validation for pages that define subform fields.

**File modified:** `libs/web-components/src/components/form/Form.svelte`

---

### PFField `type` Property

**Problem:** FormSummary needs to know which fields are file uploads so it can render them as clickable links instead of plain text.

**Solution:** Added `type?: "file" | "text"` to PFField interface.

**File modified:** `libs/common/src/lib/public-form.ts`

---

## Related Component Issues

These V2 components are used within public forms but have bugs that affect the experience:

- **GoabxBadge iconType not displaying** — `iconType="time"` with `icon={true}` shows space but no icon. Might be specific to the "time" icon.
- **GoabText mt/mb inconsistent** — Some instances ignored `mt="none"` or `mb="none"`, others worked. Couldn't identify the pattern.
- **GoabText missing heading-2xs** — Figma has Heading/2XSmall, component only goes to `heading-xs`. [Issue #3396](https://github.com/GovAlta/ui-components/issues/3396)
- **Checkbox reveal spacing** — Reveal slot content appears too close to checkbox text
- **GoabxInput width="100%" doesn't work** — Input remains at default width in modal subform

---

## Suggestions

### 1. Add `backText` prop to GoabPublicFormPage
**Why:** First page of each task needs "Back to all tasks" to return to task list. Subsequent pages need "Back" to go to previous question. Can't customize per page currently.

### 2. Add `onBack` callback
**Why:** When user clicks "Back to all tasks", the parent component needs to navigate to the task list instead of the previous form page. Currently we listen for DOM events manually.

### 3. Expose current page info
**Why:** Need to conditionally show/hide back button and change its text based on whether we're on the first page. Currently we manually check `currentPage === "urgent-need"`.

### 4. Add Button variant="text"
**Why:** Forms need action buttons styled as links ("Save and exit", "Back to all tasks"). GoabxLink is for navigation only. We created custom styled buttons as workaround.

### 5. Don't mutate state directly
**Why:** Form mutates `_state.history` with `pop()`. In React, this causes reference issues — React doesn't detect the change. Creating a new array instead would work better with React's state model.

### 6. Built-in conditional validation support
**Why:** Common pattern: "phone required if phone checkbox selected." We built `ConditionalRequiredValidator` but it adds complexity. Could be a core feature.

### 7. Error summary should be built-in
**Why:** Figma designs show error summary callout at top of page. Standard accessibility pattern. We added it manually via props, but it could be default behavior.

### 8. Error summary links should focus fields
**Why:** Figma shows error summary items as clickable links that focus the related field. Standard accessibility pattern. We implemented as plain text because click handlers in nested shadow DOMs didn't work reliably.

### 9. Subform needs API for external edit/delete triggers
**Why:** React slot children don't update dynamically, so we render the repeater list outside `<GoabPfSubform>`. But then Edit/Delete buttons can't trigger subform actions. We reach into shadow DOM as workaround. Methods like `subform.edit(id)` would be cleaner.

### 10. Refactor init() to use setPageVisibility()
**Why:** `init()` sets page visibility directly, bypassing `setPageVisibility()` which also populates `dataBuffer`. This caused validation bugs on form re-entry. We patched it, but refactoring would be cleaner.

### 11. Make FormPage heading margin configurable
**Why:** Currently hardcoded `mb="xl"` (32px). Pages with description text below the heading need tighter spacing (~8px gap between heading and description).

---

## Styling Adjustments

These are visual changes to match Figma — no logic changes.

### FormSummary Styling

Rewrote FormSummary.svelte template and styles to match Figma review cards:

- Card wrapper: `goa-container` → simple div with border
- Layout: table 50/50 → flexbox with wrap
- Question typography: `heading-s` → `heading-xs`
- Long answers: constrained to 50% → wraps full width below

**Also added helper functions:**
- `isFileField()` — file answers render as clickable links
- `formatValue()` — converts "checked" → "Yes"
- `shouldShowHeading()` — hides redundant heading for single-field pages

### FormPage Spacing

Adjusted hardcoded spacing to match Figma:

- Heading margin: `mb="m"` (16px) → `mb="xl"` (32px)
- Button margin: `mt="2xl"` (48px) → `mt="xl"` (32px)

---

## Architecture Changes & Files Deleted

⚠️ **Heads up:** This PR deletes several files and simplifies the architecture. This wasn't planned — it emerged from trying to get things working. Happy to discuss whether this direction is right or if we should restore the original approach.

### What Changed

The original architecture used a **relay/receive messaging system** where components communicated via custom message types (`FormBindMsg`, `FieldsetChangeMsg`, `FormToggleActiveMsg`, etc.) defined in `relay-types.ts`.

The new architecture uses **direct DOM event dispatching** with `bubbles: true` — standard browser events instead of the custom relay system.

### Files Deleted

| File | Lines Removed | Reason |
|------|---------------|--------|
| `Fieldset.svelte` | ~400 | Abstraction layer removed. Form.svelte now queries `[data-pf-item]` elements directly. |
| `SubForm.svelte` | ~340 | Replaced by simpler `Subform.svelte` (83 lines). New version is just a modal wrapper. |
| `SubFormIndex.svelte` | ~80 | List rendering moved to consuming app. React manages the list directly. |
| `public-form-controller.ts` | ~380 | State management consolidated into Form.svelte. Types moved to `public-form.ts`. |
| `use-public-form-controller.ts` | ~110 | React hook replaced by `_init` callback pattern. |
| `relay-types.ts` | ~230 | Custom message types no longer needed with direct dispatch. |

**Total removed:** ~1,550 lines

### Why This Happened

While building the demo, I ran into issues with the relay system:
1. Events not reaching React wrappers (the `bubbles: true` bug)
2. Difficulty tracing the message flow between components
3. Subform state not syncing properly with parent form

Rather than patch each issue individually, I ended up simplifying the communication model.

### Questions

1. **Was the relay system intentional?** Did it solve problems I didn't encounter?
2. **Is the simplification acceptable?** Or should we restore the abstraction layers?
3. **Subform list management** — Is having React manage the list externally a problem?

If the original architecture was serving a purpose I missed, we can restore it and apply the bug fixes on top.

---

## Files Changed

**libs/web-components/src/components/form/**
- `Form.svelte` — Bug fixes (bubbles, dataBuffer, resetErrors), PageValidator support, error passing, subform validation skip
- `FormPage.svelte` — Error summary, errorSummaryPosition, description slot, spacing
- `FormSummary.svelte` — Styling overhaul, helper functions
- `Subform.svelte` — Customization props

**libs/react-components/src/lib/form/**
- `public-form-page.tsx` — errorSummaryPosition prop
- `public-subform.tsx` — Subform customization props

**libs/common/src/lib/**
- `validators.ts` — PageValidator, ConditionalRequiredValidator
- `public-form.ts` — AnyValidator type, PFField type property

**Also touched (minor):**
- `DatePicker.svelte` — Label text fix ("—Select month—")

---

## Reference

- **Live demo:** https://publicform.netlify.app
- **Code:** Will share repo access when ready to collaborate on changes
